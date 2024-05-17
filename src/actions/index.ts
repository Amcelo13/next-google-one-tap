'use server'
import { redirect } from "next/navigation"
import UserModel from "../app/models/user.model"
import connectDB from "@/app/lib/connnectDB"
import { signIn } from "@/auth"
import { AuthError, CredentialsSignin } from "next-auth"

export const getUser = async (email: string) => {
    return await UserModel.findOne({ email }).select("+password")
}


export const postUser = async (name: string, email: string, password: string) => {
    try {
        const newUser = new UserModel({ name, email, password })
        await newUser.save()
        return newUser
    }
    catch (e) {
        const error = e as CredentialsSignin
        return error.cause
    }
}

export const googlePostUser = async (name: string, email: string, image: string, id: string) => {
    try {
        return await UserModel.create({ name, email, image, googleId: id })
    } catch (error) {
        const e = error as CredentialsSignin
        return e.cause
    }
}

export const handleLogin = async (email: string | undefined, password: string | undefined) => {
    if (!email || !password) throw new Error('All fields are required')
    //Connecting db
    await connectDB()
    try {
        await signIn('credentials', {
            email, password
            // , redirect: true, redirectTo:'/'  
        })
    }
    catch (e) {
        const error = e as CredentialsSignin
        return error.cause
    }
}