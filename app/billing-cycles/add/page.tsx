"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { BillingCycleFormData } from "@/types/billing-cycle"

export default function AddBillingCyclePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<BillingCycleFormData>({
    name: "",
    days: 0,
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!formData.name.trim()) {
      setError("Billing cycle name is required")
      return
    }
    if (!formData.days || formData.days <= 0) {
      setError("Number of days must be greater than 0")
      return
    }

    try {
      // Create new billing cycle
      const newCycle = {
        id: Date.now().toString(),
        ...formData,
      }

      // Get existing cycles from localStorage
      const existingCycles = JSON.parse(localStorage.getItem("billingCycles") || "[]")

      // Add new cycle
      const updatedCycles = [...existingCycles, newCycle]

      // Save to localStorage
      localStorage.setItem("billingCycles", JSON.stringify(updatedCycles))

      // Navigate back to billing cycles page
      router.push("/billing-cycles")
    } catch (err) {
      setError("Failed to save billing cycle. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/billing-cycles" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">Add New Billing Cycle</h1>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="cycle-name" className="text-sm font-medium text-[#252a31]">
              Billing cycle name
            </label>
            <Input
              id="cycle-name"
              placeholder="e.g. Monthly"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="cycle-days" className="text-sm font-medium text-[#252a31]">
              Number of days
            </label>
            <Input
              id="cycle-days"
              type="number"
              min="1"
              placeholder="e.g. 30"
              value={formData.days || ""}
              onChange={(e) => setFormData({ ...formData, days: Number.parseInt(e.target.value) || 0 })}
              className="mt-1"
            />
          </div>

          {error && <div className="text-[#D21C1C] text-sm">{error}</div>}
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push("/billing-cycles")}
            className="flex-1 bg-[#ecf8f7] text-[#00a58e] hover:bg-[#ecf8f7]/80"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-[#00a58e] text-[#ffffff] hover:bg-[#007f6d]">
            Save Cycle
          </Button>
        </div>
      </form>
    </div>
  )
}

