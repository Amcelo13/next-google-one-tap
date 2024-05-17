import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import email from "next-auth/providers/email"
import connectDB from "./app/lib/connnectDB"
import { getUser, googlePostUser, postUser } from "./actions"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: 'Enter your email'
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: 'Enter your password'
        },
        confirmPassword: {
          label: "Confirm Password",
          type: "password",
          placeholder: 'Confirm your password'
        }
      },
      // authorize: async({email, password, confirmPassword}) => { 
      authorize: async (credentials) => {
        const { email, password, confirmPassword } = credentials
        const user: any = await getUser(email as string)
        if (user) {
          return {
            name: user.name,
            email: user.email,
            id: user._id
          }
        }
        else {
          throw new CredentialsSignin({ cause: 'Invalid credentials' })
        }
      }
    }),
    CredentialProvider({
      id: 'oneTap',
      name: 'oneTap',
      // credentials: {
      //   credential: { type: 'text' }
      // },
      authorize: async (credentials) => {
        const { email, name, picture: image, kid } = credentials as any
        const user: any = await getUser(email as string)
        if (user) {
          return {
            name,
            email,
            id: user._id,
            image
          }
        }
        else {
          const addUser = await postUser(name, email, kid)
          return {
            name,
            email,
            id: addUser._id,
            image
          }
        }
      }
    })
  ],

  callbacks: {
    signIn: async ({ user, account }) => {

      if (account?.provider === 'google') {
        try {
          const { email, name, image, id } = user
          await connectDB()
          const userAlreadyExists = await getUser(email as string)
          if (!userAlreadyExists) {
            await googlePostUser(name as string, email as string, image as string, id as string)
          }
          return true
        } catch (error) {
          throw new AuthError({ cause: 'Error creating user' })
        }
      }
      return true
    }

  },
  pages: { signIn: '/login' }
})
