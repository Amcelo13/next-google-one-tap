import { auth, signOut } from "@/auth"
import { UserProfile } from "@/components/client/UserProfile";
import { Button } from "@/components/ui/button";
import { decode, encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

export default async function Home() {

  const fetchProducts = async () => {
     const res = await fetch("http://localhost:3000/api/products")
     const data = await res.json()
     return data
  }

  const ProductsArray  = await fetchProducts()   
  const session = await auth()
  const user = session?.user  
  const cookiesOfNextAuth = cookies().get("authjs.session-token")

  //If want to decode it to JWT token to send it to backend
  console.log('--->',await decode({
    token: cookiesOfNextAuth?.value as string,
    salt: cookiesOfNextAuth?.name as string,
    secret: process.env.AUTH_SECRET as string,
  }))
  if(!user) redirect('/login')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserProfile user={user} />
      <form action={async()=> {
        'use server'
        await signOut()
      }}>
        <Button type="submit" variant={'destructive'}>Sign Out</Button>
      </form>
      <h1 className="text-4xl font-bold text-center">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {ProductsArray.map((product:any) => (
          <div key={product._id} className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
