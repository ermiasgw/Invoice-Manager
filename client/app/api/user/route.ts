import { cookies } from 'next/headers'

import { decrypt } from "@/lib/sessions";
import { logout } from '@/app/actions/auth';
 
export async function GET(request: Request) {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (session && session.user) {
    return Response.json(session.user)
  }
    
}