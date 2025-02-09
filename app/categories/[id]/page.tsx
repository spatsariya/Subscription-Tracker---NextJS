"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import type { Category } from "@/types/category"

const icons = ["🎮", "🔧", "📺", "🛠", "📱", "💻", "🎵", "🎬", "📚", "🏠"]

export default function ViewCategoryPage() {
  const params = useParams()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [category, setCategory] = useState<Category | null>(null)

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    const foundCategory = savedCategories.find((cat: Category) => cat.id === params.id)
    if (foundCategory) {
      setCategory(foundCategory)
    } else {
      // Handle category not found
      router.push("/categories")
    }
  }, [params.id, router])

  const handleDelete = () => {
    if (!category) return

    const savedCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    const updatedCategories = savedCategories.filter((cat: Category) => cat.id !== category.id)
    localStorage.setItem("categories", JSON.stringify(updatedCategories))
    router.push("/categories")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!category) return

    const savedCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    const updatedCategories = savedCategories.map((cat: Category) => (cat.id === category.id ? category : cat))
    localStorage.setItem("categories", JSON.stringify(updatedCategories))
    setIsEditing(false)
  }

  if (!category) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <header className="flex items-center h-14 px-4 border-b border-[#e8edf1]">
        <Link href="/categories" className="mr-2">
          <ArrowLeft className="text-[#252a31]" />
        </Link>
        <h1 className="text-xl font-semibold text-[#252a31]">{isEditing ? "Update Category" : "View Category"}</h1>
      </header>

      <div className="p-4">
        {!isEditing ? (
          <div className="space-y-6">
            <div className="p-4 bg-[#ecf8f7] rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-[#252a31] font-medium">{category.name}</span>
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
                <label className="text-sm font-medium text-[#252a31]">Category name</label>
                <Input
                  value={category.name}
                  onChange={(e) => setCategory({ ...category, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#252a31]">Choose Icon</label>
                <Select value={category.icon} onValueChange={(value) => setCategory({ ...category, icon: value })}>
                  <SelectTrigger className="w-full mt-1">
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

