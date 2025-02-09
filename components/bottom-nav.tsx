"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Grid2X2, ListChecks, User } from "lucide-react"

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[#E8EDF1] bg-white">
      <div className="max-w-md mx-auto flex justify-around">
        <Link
          href="/dashboard"
          className={`p-4 flex flex-col items-center gap-1 ${
            pathname === "/dashboard" ? "text-[#00A58E]" : "text-[#697D95]"
          }`}
        >
          <Grid2X2 size={24} />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link
          href="/subscriptions"
          className={`p-4 flex flex-col items-center gap-1 ${
            pathname === "/subscriptions" ? "text-[#00A58E]" : "text-[#697D95]"
          }`}
        >
          <ListChecks size={24} />
          <span className="text-sm">My Subscriptions</span>
        </Link>
        <Link
          href="/profile"
          className={`p-4 flex flex-col items-center gap-1 ${
            pathname === "/profile" ? "text-[#00A58E]" : "text-[#697D95]"
          }`}
        >
          <User size={24} />
          <span className="text-sm">Profile</span>
        </Link>
      </div>
    </nav>
  )
}

