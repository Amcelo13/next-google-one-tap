'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useGoogleOneTapLogin } from "react-google-one-tap-login"
import { useSession } from "next-auth/react"
import { googleOneTapAction } from "@/actions"

const Login = () => {
    const session = useSession() as any
    useGoogleOneTapLogin({
        googleAccountConfigs: {
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            cancel_on_tap_outside: false,
            context: 'signup',
            state_cookie_domain: 'http://localhost:3000',
        },
        onSuccess: async (success) => await googleOneTapAction(success),
        onError: (error) => console.log(error),
        disableCancelOnUnmount: true,

    })
    if (session?.user) redirect('/')
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>

                <CardContent>
                    {/* <LoginForm /> */}
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    {/* <GoogleAction /> */}
                    <Link className="mt-2" href="/signup">
                        Don't have an account? Sign up
                    </Link>
                </CardFooter>
            </Card>
            {/* <GoogleOneTap /> */}
        </div>
    )
}

export default Login