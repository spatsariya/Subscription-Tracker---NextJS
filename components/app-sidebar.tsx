"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { X, HelpCircle, MessageSquare, LogOut, Grid2X2, ListChecks, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AppSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Handle logout logic here
    router.push("/signin")
  }

  const mainNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Grid2X2 },
    { href: "/subscriptions", label: "My Subscriptions", icon: ListChecks },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const secondaryNavItems = [
    { href: "/help", label: "Help", icon: HelpCircle },
    { href: "/feedback", label: "Feedback", icon: MessageSquare },
  ]

  const footerNavItems = [
    { href: "/about", label: "About" },
    { href: "/legal", label: "Legal" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="flex flex-col h-full bg-white">
          <SheetHeader className="p-4 border-b border-[#E8EDF1]">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-[#252A31] text-xl font-semibold">Dashboard</SheetTitle>
              <button onClick={onClose} className="p-2 hover:bg-[#ECF8F7] rounded-lg">
                <X className="w-6 h-6 text-[#252A31]" />
              </button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-auto">
            <div className="p-4">
              <Link href="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#ECF8F7]">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Subs_Track_Pro__FCT_-xbOG6AZbmX0giFdBPxoO0EzKif1vzO.png"
                    alt="Profile"
                  />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-[#252A31]">Shivam P.</p>
                  <p className="text-sm text-[#697D95]">View Profile</p>
                </div>
              </Link>
            </div>

            <nav className="px-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 my-1 rounded-lg transition-colors ${
                    pathname === item.href ? "bg-[#ECF8F7] text-[#00A58E]" : "text-[#252A31] hover:bg-[#ECF8F7]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="my-4 border-t border-[#E8EDF1]" />

              {secondaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2 my-1 rounded-lg text-[#252A31] hover:bg-[#ECF8F7]"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 my-1 rounded-lg w-full text-left text-[#D21C1C] hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          <div className="mt-auto p-4 border-t border-[#E8EDF1]">
            <nav className="flex gap-4">
              {footerNavItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-[#697D95] hover:text-[#252A31]">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

