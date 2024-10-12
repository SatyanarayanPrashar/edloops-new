"use client"

import { redirect } from 'next/navigation'

export default function Course() {
    return (
        redirect("/dashboard")
    )
}
