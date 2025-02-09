"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-white p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="identifier" className="text-[#252A31] text-lg font-medium">
            Username/ E-mail/ Mobile Number
          </label>
          <Input
            id="identifier"
            type="text"
            placeholder="username"
            className="w-full border-[#E8EDF1] placeholder:text-[#697D95]"
            value={formData.identifier}
            onChange={(e) => setFormData((prev) => ({ ...prev, identifier: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-[#252A31] text-lg font-medium">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="type your password"
              className="w-full border-[#E8EDF1] placeholder:text-[#697D95]"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#697D95]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Link href="/forgot-password" className="block text-[#00A58E] text-center hover:underline">
          Forget your password?
        </Link>

        <Button type="submit" className="w-full bg-[#00A58E] hover:bg-[#00A58E]/90 text-white text-lg py-6">
          Sign-in
        </Button>

        <Link href="/signup">
          <Button
            type="button"
            variant="secondary"
            className="w-full bg-[#ECF8F7] hover:bg-[#ECF8F7]/90 text-[#00A58E] text-lg py-6"
          >
            Register
          </Button>
        </Link>
      </form>
    </div>
  )
}

