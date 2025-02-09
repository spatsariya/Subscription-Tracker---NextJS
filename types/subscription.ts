export type SubscriptionCycle = "monthly" | "quarterly" | "annually" | "one-time"

export type SubscriptionCategory = "entertainment" | "streaming" | "productivity" | "other"

export interface SharedUser {
  name: string
  email: string
  amount?: number
  percentage?: number
}

export interface Subscription {
  id: string
  category: SubscriptionCategory
  name: string
  serviceUrl?: string
  amount: number
  currency: string
  cycle: SubscriptionCycle
  autoRenewal: boolean
  startDate: Date
  endDate?: Date
  isShared: boolean
  sharedUsers: SharedUser[]
  subscribedDate: Date
  totalSpent: number
}

export type SubscriptionFormData = Omit<Subscription, "id" | "totalSpent">

