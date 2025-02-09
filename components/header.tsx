import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  title: string
  backHref?: string
}

export default function Header({ title, backHref }: HeaderProps) {
  return (
    <header className="flex items-center h-14 px-4 border-b border-[#E8EDF1]">
      {backHref && (
        <Link href={backHref} className="mr-2">
          <ArrowLeft className="text-[#252A31]" />
        </Link>
      )}
      <h1 className="text-[#252A31] font-semibold">{title}</h1>
    </header>
  )
}

