import { defineStore } from 'pinia'
import type { Item, ItemForm } from '../interfaces'
import { fetchItems, fetchItem, createItem, updateItem, deleteItem } from '../services/item.service'

interface ItemState {
  items: Item[]
  currentItem: Item | null
  loaded: boolean
}

export const useItemStore = defineStore('item', {
  state: (): ItemState => ({
    items: [],
    currentItem: null,
    loaded: false
  }),
  actions: {
    async fetchItems() {
      this.items = await fetchItems()
      this.loaded = true
    },
    async fetchItem(id: number) {
      this.currentItem = await fetchItem(id)
    },
    async addItem(itemForm: ItemForm) {
      const newItem = await createItem(itemForm)
      this.items.push(newItem)
    },
    async updateItem(id: number, itemForm: ItemForm) {
      const updatedItem = await updateItem(id, itemForm)
      const index = this.items.findIndex((item) => item.id === updatedItem.id)
      if (index !== -1) {
        this.items[index] = updatedItem
      }
    },
    async deleteItem(id: number) {
      await deleteItem(id)
      this.items = this.items.filter((item) => item.id !== id)
    }
  }
})
