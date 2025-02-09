"use client"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Pencil, Eye, EyeOff, Camera } from "lucide-react"
import Link from "next/link"
import BottomNav from "@/components/bottom-nav"
import { AppSidebar } from "@/components/app-sidebar"

interface ProfileField {
  key: string
  label: string
  value: string
  type: string
  isEditing: boolean
}

export default function ProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Subs_Track_Pro__FCT_-xbOG6AZbmX0giFdBPxoO0EzKif1vzO.png",
  )
  const [fields, setFields] = useState<ProfileField[]>([
    {
      key: "name",
      label: "Name",
      value: "Shivam Patsariya",
      type: "text",
      isEditing: false,
    },
    {
      key: "email",
      label: "E-mail",
      value: "mr.india@susbsmanger.com",
      type: "email",
      isEditing: false,
    },
    {
      key: "contact",
      label: "Contact Number",
      value: "+1 (647) 434 5645",
      type: "tel",
      isEditing: false,
    },
    {
      key: "password",
      label: "Password",
      value: "******************",
      type: "password",
      isEditing: false,
    },
  ])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleEdit = (index: number) => {
    setFields((prev) =>
      prev.map((field, i) => ({
        ...field,
        isEditing: i === index ? !field.isEditing : field.isEditing,
      })),
    )
  }

  const handleChange = (index: number, value: string) => {
    setFields((prev) =>
      prev.map((field, i) => ({
        ...field,
        value: i === index ? value : field.value,
      })),
    )
  }

  const handleSave = (index: number) => {
    toggleEdit(index)
  }

  const isAnyFieldEditing = fields.some((field) => field.isEditing)

  return (
    <div className="min-h-screen bg-white">
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="flex items-center justify-between p-4 border-b border-[#E8EDF1]">
        <button className="p-2" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6 text-[#252A31]" />
        </button>
        <h1 className="text-xl font-semibold text-[#252A31]">Profile</h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </header>

      <div className="p-4 space-y-6">
        <div className="flex justify-center">
          <div className="relative group">
            <Avatar className="w-32 h-32 border-2 border-[#E8EDF1]">
              <AvatarImage src={avatarUrl} alt="Profile" />
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
            <button
              onClick={handleImageClick}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.key} className="space-y-2">
              <label className="text-[#252A31] font-medium">{field.label}</label>
              <div
                className={`flex items-center justify-between ${
                  field.isEditing ? "bg-white" : "bg-[#ECF8F7]"
                } rounded-lg`}
              >
                {field.isEditing ? (
                  <div className="flex-1 flex items-center">
                    <Input
                      type={field.key === "password" ? (showPassword ? "text" : "password") : field.type}
                      value={field.value}
                      onChange={(e) => handleChange(index, e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    {field.key === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 text-[#697D95]"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    )}
                    <Button
                      onClick={() => handleSave(index)}
                      size="sm"
                      className="ml-2 bg-[#00A58E] hover:bg-[#00A58E]/90 text-white"
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="p-4 text-[#697D95] flex-1">
                      {field.key === "password" ? "******************" : field.value}
                    </span>
                    <button onClick={() => toggleEdit(index)} className="p-4 text-[#697D95]">
                      <Pencil size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-4">
          <Link href="/billing-cycles">
            <Button className="w-full bg-[#00A58E] hover:bg-[#00A58E]/90 text-white py-6" disabled={isAnyFieldEditing}>
              Manage Billing Cycles
            </Button>
          </Link>

          <Link href="/categories">
            <Button className="w-full bg-[#00A58E] hover:bg-[#00A58E]/90 text-white py-6" disabled={isAnyFieldEditing}>
              Manage Categories
            </Button>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

