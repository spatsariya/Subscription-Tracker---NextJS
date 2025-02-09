"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SubscriptionForm } from "@/components/subscription-form"
import type { SubscriptionFormData } from "@/types/subscription"

export default function AddSubscriptionPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = (data: SubscriptionFormData) => {
    setError("")

    try {
      // Ensure valid dates
      const startDate = data.startDate ? new Date(data.startDate).toISOString() : null
      const endDate = data.endDate ? new Date(data.endDate).toISOString() : null
      const subscribedDate = new Date().toISOString()

      // Get existing subscriptions from localStorage
      const existingSubscriptions = JSON.parse(localStorage.getItem("subscriptions") || "[]")

      // Add new subscription with a unique id
      const newSubscription = {
        ...data,
        id: Date.now().toString(),
        startDate,
        endDate,
        subscribedDate,
        totalSpent: 0, // Initialize total spent
      }

      // Update subscriptions in localStorage
      localStorage.setItem("subscriptions", JSON.stringify([...existingSubscriptions, newSubscription]))

      // Navigate back to subscriptions page
      router.push("/subscriptions")
    } catch (err) {
      setError("Failed to save subscription. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/dashboard" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">Add Subscription</h1>
      </header>

      <div className="p-4">
        <SubscriptionForm onSubmit={handleSubmit} onCancel={() => router.push("/dashboard")} />
        {error && <p className="mt-4 text-[#d21c1c]">{error}</p>}
      </div>
    </div>
  )
}

