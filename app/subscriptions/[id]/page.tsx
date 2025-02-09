"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { SubscriptionForm } from "@/components/subscription-form"
import type { Subscription } from "@/types/subscription"
import type { SubscriptionFormData } from "@/types/subscriptionFormData"

export default function ViewSubscriptionPage() {
  const params = useParams()
  const router = useRouter()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [billingCycles, setBillingCycles] = useState<any[]>([])

  useEffect(() => {
    // Load subscription from localStorage
    const savedSubscriptions = JSON.parse(localStorage.getItem("subscriptions") || "[]")
    const foundSubscription = savedSubscriptions.find((sub: Subscription) => sub.id === params.id)
    if (foundSubscription) {
      setSubscription(foundSubscription)
    } else {
      router.push("/subscriptions")
    }

    // Load billing cycles
    const savedBillingCycles = JSON.parse(localStorage.getItem("billingCycles") || "[]")
    setBillingCycles(savedBillingCycles)
  }, [params.id, router])

  const handleSubmit = (data: SubscriptionFormData) => {
    const updatedData = {
      ...data,
      sharedUsers: data.sharedUsers.map((user) => ({
        ...user,
        amount: Number(user.amount),
        percentage: Number(user.percentage),
      })),
    }

    const savedSubscriptions = JSON.parse(localStorage.getItem("subscriptions") || "[]")
    const updatedSubscriptions = savedSubscriptions.map((sub: Subscription) =>
      sub.id === params.id ? { ...sub, ...updatedData } : sub,
    )
    localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions))
    setSubscription(updatedData as Subscription)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (!subscription) return

    const savedSubscriptions = JSON.parse(localStorage.getItem("subscriptions") || "[]")
    const updatedSubscriptions = savedSubscriptions.filter((sub: Subscription) => sub.id !== subscription.id)
    localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions))
    router.push("/subscriptions")
  }

  if (!subscription) {
    return <div>Loading...</div>
  }

  const getCycleName = (cycleId: string) => {
    const cycle = billingCycles.find((c) => c.id === cycleId)
    return cycle ? cycle.name : "N/A"
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/subscriptions" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">
          {isEditing ? "Edit Subscription Details" : "View Subscription Details"}
        </h1>
      </header>

      <div className="p-4">
        <SubscriptionForm
          initialData={{
            ...subscription,
            cycle: getCycleName(subscription.cycle),
            splitEqually: subscription.sharedUsers.every(
              (user) => user.percentage === 100 / subscription.sharedUsers.length,
            ),
          }}
          mode={isEditing ? "edit" : "view"}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)}
        />

        {!isEditing && (
          <div className="flex gap-4 mt-6">
            <Button
              variant="secondary"
              onClick={handleDelete}
              className="flex-1 border-[#D21C1C] text-[#D21C1C] hover:bg-red-50"
            >
              <Trash className="w-5 h-5 mr-2" />
              Delete
            </Button>
            <Button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-[#00a58e] text-[#ffffff] hover:bg-[#007f6d]"
            >
              <Pencil className="w-5 h-5 mr-2" />
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

