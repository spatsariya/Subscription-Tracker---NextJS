"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { CategoryFormData } from "@/types/category"

const icons = ["🎮", "🔧", "📺", "🛠", "📱", "💻", "🎵", "🎬", "📚", "🏠"]

export default function AddCategoryPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    icon: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!formData.name.trim()) {
      setError("Category name is required")
      return
    }
    if (!formData.icon) {
      setError("Please select an icon")
      return
    }

    // In a real app, this would be an API call
    const newCategory = {
      id: Date.now().toString(),
      ...formData,
    }

    // Get existing categories from localStorage
    const existingCategories = JSON.parse(localStorage.getItem("categories") || "[]")

    // Add new category
    const updatedCategories = [...existingCategories, newCategory]

    // Save to localStorage
    localStorage.setItem("categories", JSON.stringify(updatedCategories))

    // Navigate back to categories page
    router.push("/categories")
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/categories" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">Add New Category</h1>
      </header>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="category-name" className="text-sm font-medium text-[#252a31]">
              Category name
            </label>
            <Input
              id="category-name"
              placeholder="e.g. Entertainment"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="category-icon" className="text-sm font-medium text-[#252a31]">
              Choose Icon
            </label>
            <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
              <SelectTrigger id="category-icon" className="w-full mt-1">
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {icons.map((icon) => (
                  <SelectItem key={icon} value={icon}>
                    <span className="text-2xl mr-2">{icon}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && <div className="text-[#d21c1c] text-sm">{error}</div>}
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            className="flex-1 bg-[#ecf8f7] text-[#00a58e] hover:bg-[#ecf8f7]/80"
            onClick={() => router.push("/categories")}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-[#00a58e] text-[#ffffff] hover:bg-[#007f6d]">
            Save Category
          </Button>
        </div>
      </form>
    </div>
  )
}

