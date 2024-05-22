// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession, Profile as DefaultProfile, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {

  interface Session {
    user: {
        id: string | number
        name: string,
        email: string,
        role: string,
        accessToken: string
    };
  }

  interface User extends DefaultUser {
    id: number,
    name: string,
    email: string,
    role: string,
    accessToken: string
  }
}


declare module "next-auth/jwt" {

    interface JWT {
        name: string,
        email: string,
        role: string,
        accessToken: string

  }
  
}