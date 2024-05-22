import { cookies } from 'next/headers'

import { decrypt } from "@/lib/sessions";
 
export async function GET(request: Request) {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)


  const res = await fetch(`${process.env.BACKEND_URL}/invoice`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
     },
  });

  const response = await res.json()
  console.log(response)
    
  if (res.ok) {
    return Response.json({ response })
  }
    
}