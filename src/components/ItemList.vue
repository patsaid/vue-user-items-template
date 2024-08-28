<template>
  <div class="item-list">
    <button class="btn btn-primary" @click="addItem">Add Item</button>
    <div v-for="item in items" :key="item.id" class="item">
      <p>{{ item.name }}</p>
      <div>
        <button class="btn btn-primary mr-20" @click="updateItem(item)">Update</button>
        <button class="btn btn-danger" @click="deleteItem(item.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '@/shared/stores'
import type { ItemForm } from '@/shared/interfaces'

const router = useRouter()
const itemStore = useItemStore()

const items = computed(() => itemStore.items)

const loadItems = async () => {
  try {
    await itemStore.fetchItems()
  } catch (error) {
    console.error('Error fetching items:', error)
    await router.push('/signin')
  }
}

const addItem = () => {
  router.push('/admin/items/add')
}

const updateItem = (item: ItemForm) => {
  router.push(`/admin/items/update/${item.id}`)
}

const deleteItem = async (id: number) => {
  try {
    await itemStore.deleteItem(id)
  } catch (error) {
    console.error('Error deleting item:', error)
  }
}

onMounted(loadItems)
</script>

<style scoped lang="scss">
.item-list {
  margin-top: 1rem;
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  margin-top: 0.5rem;
  border-bottom: 1px solid #ccc;
}
.item p {
  margin: 0;
}
</style>
