import { date, z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string()
    .min(8, { message: 'Be at least 8 characters long' })
    
})

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { message:"This field cannot be empty"})
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SessionPayload = {
  user: {id: number,
  name: string,
  email: string,
  role: string,
  }
  access_token: string
}

export const createInvoiceFormSchema = z.object({
  client: z
    .string()
    .trim(),
  status: z.string().trim(),
  currency: z.string().trim(),
  date: z.string() 
    
})

export const CreateProductSchema = z.object({
    name: z
      .string()
      .trim(),
    description: z.string().trim(),
    type: z.string(),
    price: z.number().min(0, 'price must be greater than 0')
})