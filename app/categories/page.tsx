"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Category } from "@/types/category"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    setCategories(savedCategories)
  }, [])

  const handleAddCategory = () => {
    router.push("/categories/add")
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/profile" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">Categories</h1>
      </header>

      <div className="p-4 space-y-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="flex items-center justify-between p-4 bg-[#ffffff] rounded-lg border border-[#e8edf1] hover:bg-[#ecf8f7]/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <span className="text-[#252a31] font-medium">{category.name}</span>
            </div>
            <ChevronRight className="text-[#4f5e71]" />
          </Link>
        ))}

        <Button onClick={handleAddCategory} className="w-full bg-[#00a58e] hover:bg-[#007f6d] text-[#ffffff]">
          <Plus className="w-5 h-5 mr-2" />
          Add New Category
        </Button>
      </div>
    </div>
  )
}

