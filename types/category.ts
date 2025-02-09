export interface Category {
  id: string
  name: string
  icon: string
}

export type CategoryFormData = Omit<Category, "id">

