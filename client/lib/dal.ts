import 'server-only'
 
import { cookies } from 'next/headers'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { decrypt } from './sessions'
 
export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.user) {
    redirect('/signin')
  }
 
  return { isAuth: true, id: session.user, access_token: session.access_token }
})