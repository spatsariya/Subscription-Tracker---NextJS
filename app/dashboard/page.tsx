"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Menu, Plus } from "lucide-react"
import BottomNav from "@/components/bottom-nav"
import { AppSidebar } from "@/components/app-sidebar"
import Link from "next/link"
import type { Subscription } from "@/types/subscription"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    const savedSubscriptions = JSON.parse(localStorage.getItem("subscriptions") || "[]")
    setSubscriptions(savedSubscriptions)

    const total = savedSubscriptions.reduce((acc: number, sub: Subscription) => acc + sub.totalSpent, 0)
    setTotalSpent(total)
  }, [])

  const expiringThisWeek = subscriptions.filter((sub) => {
    if (!sub.endDate) return false
    const endDate = new Date(sub.endDate)
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return endDate >= today && endDate <= nextWeek
  }).length

  const alreadyExpired = subscriptions.filter((sub) => {
    if (!sub.endDate) return false
    const endDate = new Date(sub.endDate)
    const today = new Date()
    return endDate < today
  }).length

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="flex items-center justify-between p-4 border-b border-[#e8edf1]">
        <button className="p-2" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6 text-[#252a31]" />
        </button>
        <h1 className="text-xl font-semibold text-[#252a31]">Dashboard</h1>
        <Avatar className="w-12 h-12">
          <AvatarImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Subs_Track_Pro__FCT_-xbOG6AZbmX0giFdBPxoO0EzKif1vzO.png"
            alt="User"
          />
          <AvatarFallback>SP</AvatarFallback>
        </Avatar>
      </header>

      <div className="p-4 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[#252a31] text-xl">Hello Shivam P,</h2>
            <p className="text-2xl font-bold text-[#252a31]">Don't forget to add your subscriptions</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-[#ecf8f7]">
            <h3 className="text-[#4f5e71] mb-2">Subscriptions</h3>
            <p className="text-4xl font-bold text-[#252a31]">{subscriptions.length}</p>
          </Card>
          <Card className="p-4 bg-[#ecf8f7]">
            <h3 className="text-[#4f5e71] mb-2">Amount Spent</h3>
            <p className="text-4xl font-bold text-[#252a31]">$ {totalSpent.toFixed(2)}</p>
          </Card>
        </div>

        <div className="space-y-4">
          <Button variant="ghost" className="w-full justify-between p-4 hover:bg-[#ecf8f7]">
            <div className="flex items-center gap-4">
              <span className="text-lg text-[#252a31]">Subscription Expiring this week</span>
              <span className="px-2 py-1 text-white bg-[#D21C1C] rounded-full">{expiringThisWeek}</span>
            </div>
            <ChevronRight className="text-[#4f5e71]" />
          </Button>

          <Button variant="ghost" className="w-full justify-between p-4 hover:bg-[#ecf8f7]">
            <div className="flex items-center gap-4">
              <span className="text-lg text-[#252a31]">Subscriptions already expired</span>
              <span className="px-2 py-1 text-white bg-[#D21C1C] rounded-full">{alreadyExpired}</span>
            </div>
            <ChevronRight className="text-[#4f5e71]" />
          </Button>
        </div>

        <div className="h-40 bg-[#ecf8f7] rounded-lg flex items-center justify-center text-[#4f5e71]">
          AdMob Placeholder
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/subscriptions/add" passHref>
            <Button className="w-full bg-[#00a58e] hover:bg-[#007f6d] text-[#ffffff] py-6">
              <Plus className="w-5 h-5 mr-2" />
              Add Subscription
            </Button>
          </Link>
          <Link href="/subscriptions" passHref>
            <Button variant="outline" className="w-full border-[#00a58e] text-[#00a58e] hover:bg-[#ecf8f7] py-6">
              View Subscriptions
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

