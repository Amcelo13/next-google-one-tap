import { signIn } from "@/auth"
import { Button } from "../ui/button"

export const GoogleAction = () => {
    return (
        <div style={{textAlign:"center"}}>
            <p>Or</p>
            <form action={async()=> {
                'use server'
                await signIn('google')
            }}>
                <Button variant={'outline'}>Sign in with Google</Button>
            </form>
        </div>
    )
}