"use client"

import { useState, useEffect } from "react"
import { Calendar, LinkIcon, DollarSign, Percent, User, Mail, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SubscriptionFormData, SharedUser, Category, BillingCycle } from "@/types/subscription"
import { isValid } from "date-fns"

interface SubscriptionFormProps {
  initialData?: Partial<SubscriptionFormData>
  mode?: "add" | "edit" | "view"
  onSubmit: (data: SubscriptionFormData) => void
  onCancel: () => void
}

export function SubscriptionForm({ initialData, mode = "add", onSubmit, onCancel }: SubscriptionFormProps) {
  const [formData, setFormData] = useState<Partial<SubscriptionFormData>>({
    category: "",
    name: "",
    serviceUrl: "",
    amount: 0,
    currency: "USD",
    cycle: "",
    autoRenewal: true,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    isShared: false,
    sharedUsers: [],
    ...initialData,
  })

  const [showEndDate, setShowEndDate] = useState(!!initialData?.endDate)
  const [splitEqually, setSplitEqually] = useState(initialData?.splitEqually ?? true)
  const [showAmount, setShowAmount] = useState(false)
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>(
    initialData?.sharedUsers?.map((user) => ({
      name: user.name || "",
      email: user.email || "",
      amount: user.amount || 0,
      percentage: user.percentage || 0,
    })) || [],
  )
  const [categories, setCategories] = useState<Category[]>([])
  const [billingCycles, setBillingCycles] = useState<BillingCycle[]>([])

  const isViewMode = mode === "view"

  useEffect(() => {
    // Load categories and billing cycles from localStorage
    const savedCategories = JSON.parse(localStorage.getItem("categories") || "[]")
    const savedBillingCycles = JSON.parse(localStorage.getItem("billingCycles") || "[]")
    setCategories(savedCategories)
    setBillingCycles(savedBillingCycles)
  }, [])

  useEffect(() => {
    if (splitEqually && sharedUsers.length > 0) {
      const equalShare = 100 / sharedUsers.length
      const updatedUsers = sharedUsers.map((user) => ({
        ...user,
        percentage: equalShare,
        amount: (formData.amount || 0) * (equalShare / 100),
      }))
      setSharedUsers(updatedUsers)
    }
  }, [splitEqually, sharedUsers.length, formData.amount, formData]) // Added formData dependency

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit && formData) {
      const updatedSharedUsers = sharedUsers.map((user) => ({
        ...user,
        amount: showAmount
          ? Number(user.amount)
          : Number(((formData.amount || 0) * (Number(user.percentage) / 100)).toFixed(2)),
        percentage: showAmount
          ? Number(((Number(user.amount) / (formData.amount || 1)) * 100).toFixed(2))
          : Number(user.percentage),
      }))
      onSubmit({
        ...formData,
        sharedUsers: updatedSharedUsers,
        splitEqually,
      } as SubscriptionFormData)
    }
  }

  const addSharedUser = () => {
    setSharedUsers([...sharedUsers, { name: "", email: "", amount: 0, percentage: 0 }])
  }

  const removeSharedUser = (index: number) => {
    setSharedUsers(sharedUsers.filter((_, i) => i !== index))
  }

  const updateSharedUser = (index: number, field: keyof SharedUser, value: string | number) => {
    const newUsers = [...sharedUsers]
    newUsers[index] = { ...newUsers[index], [field]: value }

    if (!splitEqually) {
      if (showAmount) {
        const amount = Number(value)
        newUsers[index].amount = amount
        newUsers[index].percentage = (amount / (formData.amount || 1)) * 100
      } else {
        const percentage = Number(value)
        newUsers[index].percentage = percentage
        newUsers[index].amount = (formData.amount || 0) * (percentage / 100)
      }
    }

    setSharedUsers(newUsers)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-[#252a31]">Choose Category</label>
          <Select
            disabled={isViewMode}
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Not Selected" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-[#252a31]">Name of Service</label>
          <div className="relative mt-1">
            <Input
              placeholder="e.g Netflix, Spotify, freepik etc"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isViewMode}
              className="pl-10"
            />
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4f5e71]" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#252a31]">Service URL (optional)</label>
          <div className="relative mt-1">
            <Input
              type="url"
              placeholder="https://"
              value={formData.serviceUrl || ""}
              onChange={(e) => setFormData({ ...formData, serviceUrl: e.target.value })}
              disabled={isViewMode}
              className="pl-10"
            />
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4f5e71]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-[#252a31]">Amount</label>
            <div className="relative mt-1">
              <Input
                type="number"
                placeholder="0.00"
                value={formData.amount?.toString() || ""}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value === "" ? 0 : Number.parseFloat(e.target.value) })
                }
                disabled={isViewMode}
                className="pl-10"
              />
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4f5e71]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[#252a31]">Currency</label>
            <Select
              disabled={isViewMode}
              value={formData.currency}
              onValueChange={(value) => setFormData({ ...formData, currency: value })}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#252a31]">Subscription Cycle</label>
          <Select
            disabled={isViewMode}
            value={formData.cycle}
            onValueChange={(value) => setFormData({ ...formData, cycle: value })}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Not Selected" />
            </SelectTrigger>
            <SelectContent>
              {billingCycles.map((cycle) => (
                <SelectItem key={cycle.id} value={cycle.id}>
                  {cycle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#252a31]">Auto Renewal</label>
            <p className="text-sm text-[#4f5e71]">Enable if auto-renewal is turned on</p>
          </div>
          <Switch
            disabled={isViewMode}
            checked={formData.autoRenewal}
            onCheckedChange={(checked) => setFormData({ ...formData, autoRenewal: checked })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#252a31]">Start Date</label>
          <div className="relative mt-1">
            <Input
              type="date"
              value={formData.startDate || ""}
              onChange={(e) => {
                const date = new Date(e.target.value)
                setFormData({ ...formData, startDate: isValid(date) ? e.target.value : undefined })
              }}
              disabled={isViewMode}
              className="pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4f5e71]" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#252a31]">End Date</label>
              <p className="text-sm text-[#4f5e71]">Enable to set an end date</p>
            </div>
            <Switch disabled={isViewMode} checked={showEndDate} onCheckedChange={setShowEndDate} />
          </div>

          {showEndDate && (
            <div className="relative">
              <Input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) => {
                  const date = new Date(e.target.value)
                  setFormData({ ...formData, endDate: isValid(date) ? e.target.value : undefined })
                }}
                disabled={isViewMode}
                className="pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4f5e71]" />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#252a31]">Share Subscription</label>
            <p className="text-sm text-[#4f5e71]">Enable subscription sharing</p>
          </div>
          <Switch
            disabled={isViewMode}
            checked={formData.isShared}
            onCheckedChange={(checked) => setFormData({ ...formData, isShared: checked })}
          />
        </div>

        {formData.isShared && (
          <div className="space-y-4">
            <div className="p-4 bg-[#ecf8f7] rounded-lg space-y-4">
              <p className="text-sm text-[#4f5e71]">Subscription cost per user: Custom split</p>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    disabled={isViewMode}
                    checked={splitEqually}
                    onCheckedChange={(checked) => {
                      setSplitEqually(checked)
                      setFormData((prev) => ({ ...prev, splitEqually: checked }))
                      if (checked) {
                        const equalShare = 100 / sharedUsers.length
                        const updatedUsers = sharedUsers.map((user) => ({
                          ...user,
                          percentage: equalShare,
                          amount: (formData.amount || 0) * (equalShare / 100),
                        }))
                        setSharedUsers(updatedUsers)
                      }
                    }}
                  />
                  <span className="text-sm text-[#252a31]">Split equally</span>
                </div>

                {!splitEqually && (
                  <div className="flex items-center gap-2">
                    <Switch disabled={isViewMode} checked={showAmount} onCheckedChange={setShowAmount} />
                    <span className="text-sm text-[#252a31]">Switch to {showAmount ? "Amount" : "Percentage"}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#252a31]">Shared Users</h3>
                {!isViewMode && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSharedUser}
                    className="text-[#00a58e] border-[#00a58e] hover:bg-[#ecf8f7]"
                  >
                    Add User
                  </Button>
                )}
              </div>

              {sharedUsers.map((user, index) => (
                <div key={index} className="space-y-4 p-4 bg-[#ecf8f7] rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-[#252a31]">Person {index + 1}</h4>
                    {!isViewMode && (
                      <button
                        type="button"
                        onClick={() => removeSharedUser(index)}
                        className="text-[#d21c1c] p-2 hover:bg-red-50 rounded-full"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid gap-4">
                    <div className="relative">
                      <Input
                        placeholder="Name"
                        value={user.name}
                        onChange={(e) => updateSharedUser(index, "name", e.target.value)}
                        disabled={isViewMode}
                        className="pl-10"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4f5e71]" />
                    </div>
                    <div className="relative">
                      <Input
                        placeholder="Email"
                        type="email"
                        value={user.email}
                        onChange={(e) => updateSharedUser(index, "email", e.target.value)}
                        disabled={isViewMode}
                        className="pl-10"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4f5e71]" />
                    </div>
                    {!splitEqually && (
                      <div className="relative">
                        <Input
                          placeholder={showAmount ? "Amount" : "Percentage"}
                          type="number"
                          value={showAmount ? user.amount : user.percentage}
                          onChange={(e) =>
                            updateSharedUser(
                              index,
                              showAmount ? "amount" : "percentage",
                              e.target.value ? Number(e.target.value) : 0,
                            )
                          }
                          disabled={isViewMode}
                          className="pl-10"
                        />
                        {showAmount ? (
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4f5e71]" />
                        ) : (
                          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4f5e71]" />
                        )}
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4f5e71]">
                          {showAmount ? formData.currency : "%"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="bg-[#ecf8f7] text-[#00a58e] hover:bg-[#ecf8f7]/80"
        >
          Cancel
        </Button>
        {!isViewMode && (
          <Button type="submit" className="bg-[#00a58e] text-white hover:bg-[#00a58e]/90">
            Save Subscription Details
          </Button>
        )}
      </div>
    </form>
  )
}

