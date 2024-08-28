export interface Category {
  id: number
  name: string
}

export interface CategoryForm extends Partial<Category> {}
