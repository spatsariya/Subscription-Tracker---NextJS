"use client"

import { useState, useEffect } from "react"
import { Menu, SlidersHorizontal, ArrowDownWideNarrow, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SubscriptionCard } from "@/components/subscription-card"
import BottomNav from "@/components/bottom-nav"
import { AppSidebar } from "@/components/app-sidebar"
import type { Subscription } from "@/types/subscription"

type FilterType = "all" | "expiring" | "non-expiring"

export default function SubscriptionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  useEffect(() => {
    const savedSubscriptions = JSON.parse(localStorage.getItem("subscriptions") || "[]")
    setSubscriptions(savedSubscriptions)
  }, [])

  const filteredSubscriptions = subscriptions.filter((sub) => {
    // First apply search filter
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.category.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    // Then apply type filter
    if (activeFilter === "all") return true
    if (activeFilter === "expiring") {
      return sub.endDate && (new Date(sub.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 30
    }
    return !sub.endDate || (new Date(sub.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) > 30
  })

  return (
    <div className="min-h-screen bg-[#ffffff] pb-16">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="flex items-center justify-between p-4 border-b border-[#e8edf1]">
        <button className="p-2" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6 text-[#252a31]" />
        </button>
        <h1 className="text-xl font-semibold text-[#252a31]">Subscriptions</h1>
        <div className="flex gap-2">
          <button className="p-2">
            <SlidersHorizontal className="w-6 h-6 text-[#4f5e71]" />
          </button>
          <button className="p-2">
            <ArrowDownWideNarrow className="w-6 h-6 text-[#4f5e71]" />
          </button>
        </div>
      </header>

      <div className="p-4">
        {/* Search Input */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#697D95] w-5 h-5" />
          <Input
            type="text"
            placeholder="Search subscriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#ECF8F7] border-none placeholder:text-[#697D95]"
          />
        </div>

        <div className="flex gap-2 mb-6 bg-[#ecf8f7] p-1 rounded-lg">
          <Button
            variant={activeFilter === "all" ? "default" : "ghost"}
            onClick={() => setActiveFilter("all")}
            className={
              activeFilter === "all" ? "flex-1 bg-white text-[#252a31]" : "flex-1 text-[#4f5e71] hover:bg-white"
            }
          >
            All
          </Button>
          <Button
            variant={activeFilter === "expiring" ? "default" : "ghost"}
            onClick={() => setActiveFilter("expiring")}
            className={
              activeFilter === "expiring" ? "flex-1 bg-white text-[#252a31]" : "flex-1 text-[#4f5e71] hover:bg-white"
            }
          >
            Expiring Soon
          </Button>
          <Button
            variant={activeFilter === "non-expiring" ? "default" : "ghost"}
            onClick={() => setActiveFilter("non-expiring")}
            className={
              activeFilter === "non-expiring"
                ? "flex-1 bg-white text-[#252a31]"
                : "flex-1 text-[#4f5e71] hover:bg-white"
            }
          >
            Non Expiring
          </Button>
        </div>

        <div className="space-y-4">
          {filteredSubscriptions.length > 0 ? (
            filteredSubscriptions.map((subscription) => (
              <SubscriptionCard key={subscription.id} subscription={subscription} />
            ))
          ) : (
            <div className="text-center py-8 text-[#697D95]">
              {searchQuery ? "No subscriptions found matching your search" : "No subscriptions found"}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

