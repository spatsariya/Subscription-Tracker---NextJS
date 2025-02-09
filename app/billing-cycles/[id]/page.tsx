"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import type { BillingCycle } from "@/types/billing-cycle"

export default function ViewBillingCyclePage() {
  const params = useParams()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [cycle, setCycle] = useState<BillingCycle | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const savedCycles = JSON.parse(localStorage.getItem("billingCycles") || "[]")
    const foundCycle = savedCycles.find((c: BillingCycle) => c.id === params.id)
    if (foundCycle) {
      setCycle(foundCycle)
    } else {
      router.push("/billing-cycles")
    }
  }, [params.id, router])

  const handleDelete = () => {
    if (!cycle) return

    const savedCycles = JSON.parse(localStorage.getItem("billingCycles") || "[]")
    const updatedCycles = savedCycles.filter((c: BillingCycle) => c.id !== cycle.id)
    localStorage.setItem("billingCycles", JSON.stringify(updatedCycles))
    router.push("/billing-cycles")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cycle) return
    setError("")

    // Validate form
    if (!cycle.name.trim()) {
      setError("Billing cycle name is required")
      return
    }
    if (!cycle.days || cycle.days <= 0) {
      setError("Number of days must be greater than 0")
      return
    }

    const savedCycles = JSON.parse(localStorage.getItem("billingCycles") || "[]")
    const updatedCycles = savedCycles.map((c: BillingCycle) => (c.id === cycle.id ? cycle : c))
    localStorage.setItem("billingCycles", JSON.stringify(updatedCycles))
    setIsEditing(false)
  }

  if (!cycle) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/billing-cycles" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">
          {isEditing ? "Update Billing Cycle" : "View Billing Cycle"}
        </h1>
      </header>

      <div className="p-4">
        {!isEditing ? (
          <div className="space-y-6">
            <div className="p-4 bg-[#ecf8f7] rounded-lg space-y-4">
              <div>
                <label className="text-sm text-[#4f5e71]">Billing cycle name</label>
                <div className="text-[#252a31] font-medium">{cycle.name}</div>
              </div>
              <div>
                <label className="text-sm text-[#4f5e71]">Number of days</label>
                <div className="text-[#252a31] font-medium">{cycle.days}</div>
              </div>
            </div>

            <div className="flex gap-4">
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
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#252a31]">Billing cycle name</label>
                <Input
                  value={cycle.name}
                  onChange={(e) => setCycle({ ...cycle, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#252a31]">Number of days</label>
                <Input
                  type="number"
                  min="1"
                  value={cycle.days}
                  onChange={(e) => setCycle({ ...cycle, days: Number.parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>

              {error && <div className="text-[#D21C1C] text-sm">{error}</div>}
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-[#ecf8f7] text-[#00a58e] hover:bg-[#ecf8f7]/80"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-[#00a58e] text-[#ffffff] hover:bg-[#007f6d]">
                Update/Save
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

