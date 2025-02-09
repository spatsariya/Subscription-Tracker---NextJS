"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset request
    console.log(identifier)
  }

  return (
    <div className="min-h-screen bg-white p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="identifier" className="text-[#252A31] text-lg font-medium">
            Username/ E-mail
          </label>
          <Input
            id="identifier"
            type="text"
            placeholder="type your username"
            className="w-full border-[#E8EDF1] placeholder:text-[#697D95]"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <Link href="/signin" className="inline-flex items-center text-[#00A58E] hover:underline">
          <div className="w-8 h-8 mr-2 bg-[#ECF8F7] rounded-lg flex items-center justify-center">←</div>
          go back to Sign-in
        </Link>

        <Button
          type="submit"
          className="w-full bg-[#00A58E] hover:bg-[#00A58E]/90 text-white text-lg py-6 flex items-center justify-between px-6"
        >
          Request new password
          <ChevronRight size={24} />
        </Button>
      </form>
    </div>
  )
}

