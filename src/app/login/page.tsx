import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CredentialsSignin } from "next-auth"
import { auth, signIn } from "@/auth"
import connectDB from "../lib/connnectDB"
import { LoginForm } from "@/components/client/form"
import { redirect } from "next/navigation"
import { GoogleAction } from "@/components/client/googleActionFooter"

const Login = async() => {
    const session = await auth()
    if(session?.user) redirect('/')
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>

                <CardContent>
                    <LoginForm />
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  <GoogleAction />
                    <Link className="mt-2" href="/signup">
                        Don't have an account? Sign up
                    </Link>
                </CardFooter>
            </Card>

        </div>
    )
}

export default Login