"use client"

import { format, isValid } from "date-fns"
import type { Subscription } from "@/types/subscription"
import { useRouter } from "next/navigation"

interface SubscriptionCardProps {
  subscription: Subscription
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const router = useRouter()
  const daysUntilExpiry =
    subscription.endDate && isValid(new Date(subscription.endDate))
      ? Math.ceil((new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      : null

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A"
    const parsedDate = typeof date === "string" ? new Date(date) : date
    return isValid(parsedDate) ? format(parsedDate, "MMMM d, yyyy") : "Invalid Date"
  }

  const handleClick = () => {
    router.push(`/subscriptions/${subscription.id}`)
  }

  const getCycleName = (cycleId: string) => {
    const cycles = JSON.parse(localStorage.getItem("billingCycles") || "[]")
    const cycle = cycles.find((c: any) => c.id === cycleId)
    return cycle ? cycle.name : "N/A"
  }

  return (
    <div
      className="p-4 bg-white rounded-lg shadow-sm border border-[#e8edf1] space-y-4 cursor-pointer hover:border-[#00a58e] transition-colors"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-[#252a31]">{subscription.name}</h3>
        {daysUntilExpiry && daysUntilExpiry > 0 && (
          <span className="text-[#d21c1c]">Due in {daysUntilExpiry} days</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[#4f5e71]">Subscribed on</p>
          <p className="text-[#252a31]">{formatDate(subscription.subscribedDate)}</p>
        </div>
        <div>
          <p className="text-[#4f5e71]">Expiring on</p>
          <p className="text-[#252a31]">{formatDate(subscription.endDate)}</p>
        </div>

        <div>
          <p className="text-[#4f5e71]">Subscription Cycle</p>
          <p className="text-[#252a31] capitalize">{getCycleName(subscription.cycle)}</p>
        </div>
        <div>
          <p className="text-[#4f5e71]">Sharing</p>
          <p className="text-[#252a31]">
            {subscription.isShared ? `Shared with ${subscription.sharedUsers.length}` : "Not Shared"}
          </p>
        </div>

        <div>
          <p className="text-[#4f5e71]">Renewal Fee</p>
          <p className="text-[#252a31]">
            {subscription.currency} {subscription.amount}
          </p>
        </div>
        <div>
          <p className="text-[#4f5e71]">Amount Spent till date</p>
          <p className="text-[#252a31]">
            {subscription.currency} {subscription.totalSpent}
          </p>
        </div>
      </div>
    </div>
  )
}

