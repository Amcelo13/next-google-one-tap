'use server'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toaster, toast } from 'sonner'
import Link from "next/link"
import { redirect } from "next/navigation"
import connectDB from "../lib/connnectDB"
import { NextResponse } from "next/server"
import UserModel from "../models/user.model"
import { postUser } from "@/actions"
import { GoogleAction } from "@/components/client/googleActionFooter"
import { auth } from "@/auth"


const Signup = async() => {
    const session = await auth()
    if(session?.user) redirect('/')
    const handleSignup = async (formData: FormData) => {
        'use server'
        const name = formData.get('name') as string | undefined
        const email = formData.get('email') as string | undefined
        const password = formData.get('password') as string | undefined
        if (!name || !email || !password) return NextResponse.json({ error: 'Bad payload' }, { status: 400 })
        //Connecting db
        await connectDB()
        if (!UserModel) {
            return NextResponse.json({ error: "User model not defined" }, { status: 500 });
        }
        else {
            const res = await postUser(name, email, password)
            if (res.errorResponse?.code === 11000) {
                return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
            }
            else if (res.errorResponse) return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
            // else redirect('/login')
            return redirect('/login')

        }
    }

    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>

                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                </CardHeader>

                <CardContent>
                    <form action={handleSignup}
                        className="flex flex-col gap-4 w-[500px]">

                        <Input type="text" placeholder="Name" required name='name' />
                        <Input type="email" placeholder="Email" required name='email' />
                        <Input type="password" placeholder="Password" required name='password' />
                        <Button type="submit">Sign Up</Button>

                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <GoogleAction />
                    <Link className="mt-2" href="/login">
                        Already have an account? Login
                    </Link>
                </CardFooter>

            </Card>

        </div>
    )
}

export default Signup