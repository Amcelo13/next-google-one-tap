'use client'

import { CredentialsSignin } from "next-auth"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import connectDB from "@/app/lib/connnectDB"
import { signIn } from "@/auth"
import { toast } from "sonner"
import { handleLogin } from "@/actions"
import { redirect, useRouter } from "next/navigation"

export const LoginForm = async () => {
    const router =  useRouter()
    return <form action={async (formData: FormData) => {
        const email = formData.get('email') as string | undefined
        const password = formData.get('password') as string | undefined
        if (!email || !password) return toast.error('All fields are required')

        const toastID = toast.loading('Logging in...')
        const error = await handleLogin(email, password)

        if(!error) {
            toast.success('Login successful', {id: toastID} )
            router.refresh()  //or router.refresh() in client component to check if user is logged in or not and referesh the page to go to the home page
        }
        else return toast.error(String(error), {id: toastID} )

    }} className="flex flex-col gap-4 w-[500px]">

        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
        <Button type="submit">Login</Button>

    </form>

}