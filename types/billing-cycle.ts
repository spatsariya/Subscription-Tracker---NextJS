export interface BillingCycle {
  id: string
  name: string
  days: number
}

export type BillingCycleFormData = Omit<BillingCycle, "id">

