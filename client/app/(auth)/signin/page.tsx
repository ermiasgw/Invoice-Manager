"use client"
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
import { signin } from "@/app/actions/auth"
import { useActionState } from "react"
import { useFormStatus, useFormState } from "react-dom"

export default function LoginForm() {
  const [state, action] = useFormState(signin, undefined)
  function Submit() {
    const status = useFormStatus();
    return <Button type="submit" aria-disabled={status.pending} className="w-full">
    {status.pending ? 'Submitting...' : 'Login'}
    </Button>
  }

  return (
    <Card className="mx-auto max-w-sm mt-10">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
            {state?.errors?.email && <p>{state.errors.email}</p>}
          
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            {state?.errors?.password && <p>{state.errors.password}</p>}
          </div>
          {state?.messages && <p>{state.messages}</p>}
          <Submit />
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
        </form>
      </CardContent>
    </Card>
  )
}