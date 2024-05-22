import { cookies } from 'next/headers'

import { decrypt } from "@/lib/sessions";
import { logout } from '@/app/actions/auth';
 
export async function GET(request: Request, { params }: any) {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  const id = params.id


  const res = await fetch(`${process.env.BACKEND_URL}/invoice/${id}`, {
    method: 'GET',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
     },
  });

  const response = await res.json()

  if (res.ok && response) {
    return Response.json(response)
  }
  else if (res.status == 401) {
    return await logout()
  }
    
}