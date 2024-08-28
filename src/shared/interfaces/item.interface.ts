export interface Item {
  id: number
  name: string
  description: string
  image_url: string
  quantity: number
}

export interface ItemForm {
  id?: number
  name: string
  description: string
  image_url?: string
  quantity?: number
}
