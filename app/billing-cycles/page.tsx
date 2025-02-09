"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ChevronRight, Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { BillingCycle } from "@/types/billing-cycle"

export default function BillingCyclesPage() {
  const [billingCycles, setBillingCycles] = useState<BillingCycle[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedCycles = localStorage.getItem("billingCycles")
    if (savedCycles) {
      setBillingCycles(JSON.parse(savedCycles))
    }
  }, [])

  const handleAddBillingCycle = () => {
    router.push("/billing-cycles/add")
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/profile" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">Billing Cycles</h1>
      </header>

      <div className="p-4 space-y-4">
        {billingCycles.map((cycle) => (
          <Link
            key={cycle.id}
            href={`/billing-cycles/${cycle.id}`}
            className="flex items-center justify-between p-4 bg-[#ffffff] rounded-lg border border-[#e8edf1] hover:bg-[#ecf8f7]/50"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#4f5e71]" />
              <div>
                <div className="text-[#252a31] font-medium">{cycle.name}</div>
                <div className="text-[#4f5e71] text-sm">{cycle.days} days</div>
              </div>
            </div>
            <ChevronRight className="text-[#4f5e71]" />
          </Link>
        ))}

        <Button onClick={handleAddBillingCycle} className="w-full bg-[#00a58e] hover:bg-[#007f6d] text-[#ffffff]">
          <Plus className="w-5 h-5 mr-2" />
          Add new billing cycle
        </Button>
      </div>
    </div>
  )
}

