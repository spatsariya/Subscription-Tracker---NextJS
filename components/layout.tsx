"use client"

import { Home, User, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto">
      <main className="flex-1 pb-16">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="max-w-md mx-auto flex justify-around">
          <Link
            href="/"
            className={`p-4 flex flex-col items-center ${pathname === "/" ? "text-[#00A58E]" : "text-[#697D95]"}`}
          >
            <Home size={24} />
          </Link>
          <Link
            href="/profile"
            className={`p-4 flex flex-col items-center ${
              pathname === "/profile" ? "text-[#00A58E]" : "text-[#697D95]"
            }`}
          >
            <User size={24} />
          </Link>
          <Link
            href="/settings"
            className={`p-4 flex flex-col items-center ${
              pathname === "/settings" ? "text-[#00A58E]" : "text-[#697D95]"
            }`}
          >
            <Settings size={24} />
          </Link>
        </div>
      </nav>
    </div>
  )
}

