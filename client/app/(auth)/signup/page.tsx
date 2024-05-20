"use client"

import { signup } from "@/app/actions/auth"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from 'react'
import { useFormStatus, useFormState } from 'react-dom'

export default function SignupForm() {
  const [state, action] = useFormState(signup, undefined)
  const { pending } = useFormStatus()


  return (
    <Card className="mx-auto max-w-sm mt-10">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form action={action}>
        <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="first-name">Name</Label>
                <Input id="name" placeholder="Max" required />
                {state?.errors?.name && <p>{state.errors.name}</p>}
            </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            {state?.errors?.email && <p>{state.errors.email}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
            {state?.errors?.password && <p>{state.errors.password}</p>}
          </div>
          <Button type="submit" className="w-full">
            {pending ? 'Submitting...' : 'Create an account'}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </form>
      </CardContent>
    </Card>
  )
}