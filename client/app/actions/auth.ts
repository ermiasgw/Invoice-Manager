'use server'
import { SignupFormSchema, FormState, SigninFormSchema } from '@/lib/definitions'
import { redirect } from 'next/navigation'
import { deleteSession, createSession } from '@/lib/sessions'

 
export async function signup(state: FormState, formData: any) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const res = await fetch(`${process.env.BACKEND_URL}/users`, {
    method: 'POST',
    headers: { 'Accept':'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password
    })
  });

  const response = await res.json();


  if (res.ok) {
    redirect('/signin')
  }
  else {
    return {
      messages: response.message,
    }
  }

  // Call the provider or db to create a user...
}

export async function signin(state: FormState, formData: any) {
    // Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
   
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: validatedFields.data.email,
        password: validatedFields.data.password
      })
    });

    const response = await res.json();

    if (res.ok && response) {
      await createSession(response)
      redirect('/dashboard/invoices')
    }

    return {messages: "email or password incorrect"}
  }

 
  export async function logout() {
    deleteSession()
    redirect('/signin')
  }  