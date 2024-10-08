'use client'

import { signIn, signOut } from "next-auth/react"
import Button from "./button"
import { LuLogOut } from "react-icons/lu"

export const LoginButton = () => {
    return <Button label={"Sign in"} onclick={ ()=> signIn() } classname={""} children={undefined} ></Button>
}

export const LogoutButton = () => {
    return (
        <div onClick={ ()=> signOut() } className="flex items-center w-full overflow-hidden hover:cursor-pointer hover:pl-2">
          <LuLogOut size={25} className="min-w-[40px]" />
          <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all duration-300">
            Logout
          </span>
        </div>
    )
}