"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-white p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="text-[#252A31] text-lg font-medium">
            Username
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Choose your desired username"
            className="w-full border-[#E8EDF1] placeholder:text-[#697D95]"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-[#252A31] text-lg font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your Email here"
            className="w-full border-[#E8EDF1] placeholder:text-[#697D95]"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-[#252A31] text-lg font-medium">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Choose your password"
              className="w-full border-[#E8EDF1] placeholder:text-[#697D95]"
              value={formData.password}
              onChange={handleChange}
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

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-[#252A31] text-lg font-medium">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Choose your password"
              className="w-full border-[#E8EDF1] placeholder:text-[#697D95]"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#697D95]"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="mobileNumber" className="text-[#252A31] text-lg font-medium">
            Mobile Number
          </label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            placeholder="Enter your mobile number"
            className="w-full border-[#E8EDF1] placeholder:text-[#697D95]"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full bg-[#00A58E] hover:bg-[#00A58E]/90 text-white text-lg py-6">
          Create a Account
        </Button>

        <div className="text-center">
          <Link href="/signin" className="text-[#00A58E] hover:underline">
            go back to Sign-in
          </Link>
        </div>
      </form>
    </div>
  )
}

