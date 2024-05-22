"use server"
import { CreateProductSchema, FormState, createInvoiceFormSchema } from "@/lib/definitions";
import { cookies } from 'next/headers'

import { decrypt } from "@/lib/sessions";
import { redirect } from "next/navigation";

export async function createInvoice(state: any, formData: any) {

    let errors: any = {}
    // Validate form fields
    const validatedFields = createInvoiceFormSchema.safeParse({
        client: formData.get('client'),
        status: formData.get('status'),
        currency: formData.get('currency'),
        date: formData.get('date'),
    })
    

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        errors = {
            ...validatedFields.error.flatten().fieldErrors,
        } 
    }

    const ids = formData.get('ids');
    if (ids.length === 0) {
        errors = {
            ...errors,
            products: ["Products must not be empty"]
        }

        return {
            errors: errors
        }
    }

    ids.split(',').map((value: any) => {
        let validatedProductFields = CreateProductSchema.safeParse({
            name: formData.get(`name_${value}`),
            description: formData.get(`description_${value}`),
            type: formData.get(`type_${value}`),
            price: Number(formData.get(`price_${value}`)),
        })

        if (!validatedProductFields.success) {
            errors[`name_${value}`] = validatedProductFields.error.flatten().fieldErrors.name
            errors[`description_${value}`] = validatedProductFields.error.flatten().fieldErrors.description
            errors[`type_${value}`] = validatedProductFields.error.flatten().fieldErrors.type
            errors[`price_${value}`] = validatedProductFields.error.flatten().fieldErrors.price
        }
    })

    if (Object.keys(errors).length !== 0) {
        return {
            errors: errors
        }
    }

    let products: any = []

    ids.split(',').map((value: any) => {
        products.push({
            name: formData.get(`name_${value}`),
            description: formData.get(`description_${value}`),
            type: formData.get(`type_${value}`),
            price: Number(formData.get(`price_${value}`)),
        })
    })


    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)

    const res = await fetch(`${process.env.BACKEND_URL}/invoice`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
         },
        body: JSON.stringify({
            currency: formData.get('currency'),
            dueDate:  (new Date(formData.get('date'))).toISOString(),
            offerings: products
        })
      });

      const response = await res.json()
      if (res.ok) {
        redirect('/dashboard/invoices')
      }
      else {
        return {
          messages: response.message,
        }
      }
}
export async function updateInvoice(state: FormState, formData: any) {
    let errors: any = {}
    // Validate form fields
    const validatedFields = createInvoiceFormSchema.safeParse({
        client: formData.get('client'),
        status: formData.get('status'),
        currency: formData.get('currency'),
        date: formData.get('date'),
    })
    

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        errors = {
            ...validatedFields.error.flatten().fieldErrors,
        } 
    }

    const ids = formData.get('ids');
    if (ids.length === 0) {
        errors = {
            ...errors,
            products: ["Products must not be empty"]
        }

        return {
            errors: errors
        }
    }

    ids.split(',').map((value: any) => {
        let validatedProductFields = CreateProductSchema.safeParse({
            name: formData.get(`name_${value}`),
            description: formData.get(`description_${value}`),
            type: formData.get(`type_${value}`),
            price: Number(formData.get(`price_${value}`)),
        })

        if (!validatedProductFields.success) {
            errors[`name_${value}`] = validatedProductFields.error.flatten().fieldErrors.name
            errors[`description_${value}`] = validatedProductFields.error.flatten().fieldErrors.description
            errors[`type_${value}`] = validatedProductFields.error.flatten().fieldErrors.type
            errors[`price_${value}`] = validatedProductFields.error.flatten().fieldErrors.price
        }
    })

    if (Object.keys(errors).length !== 0) {
        return {
            errors: errors
        }
    }

    let products: any = []

    ids.split(',').map((value: any) => {
        products.push({
            name: formData.get(`name_${value}`),
            description: formData.get(`description_${value}`),
            type: formData.get(`type_${value}`),
            price: Number(formData.get(`price_${value}`)),
        })
    })

    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)

    const res = await fetch(`${process.env.BACKEND_URL}/invoice`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
         },
        body: JSON.stringify({
            currency: formData.get('currency'),
            dueDate:  (new Date(formData.get('date'))).toISOString(),
            offerings: products
        })
      });

      const response = await res.json()

      if (res.ok) {
        redirect('/dashboard/invoices')
      }
      else {
        return {
          messages: response.message,
        }
      }

}


export async function deleteInvoice(id: string) {


}