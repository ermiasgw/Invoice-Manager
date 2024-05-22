import { decrypt } from "@/lib/sessions"
import { cookies } from "next/headers"

export async function GET(request: Request) {
    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)
  
    const res = await fetch(`${process.env.BACKEND_URL}/export/pdf`, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${session?.access_token}`
         },
      });

      
    

  }