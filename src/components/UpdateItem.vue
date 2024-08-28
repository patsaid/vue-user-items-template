<template>
  <div class="update-item">
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <div>
        <label for="image_url">Image URL</label>
        <input v-model="image_url" id="image_url" type="text" required />
      </div>
      <div>
        <label for="quantity">Quantity</label>
        <input v-model="quantity" id="quantity" type="number" required />
      </div>
      <button class="btn btn-primary mt-20" type="submit">Update Item</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useItemStore } from '@/shared/stores'

const router = useRouter()
const route = useRoute()
const itemStore = useItemStore()

const name = ref('')
const description = ref('')
const image_url = ref('')
const quantity = ref(0)
const itemId = Number(route.params.id)

const loadItem = async () => {
  try {
    await itemStore.fetchItem(itemId)
    const item = itemStore.currentItem
    if (item) {
      name.value = item.name
      description.value = item.description
      image_url.value = item.image_url
      quantity.value = item.quantity
    }
  } catch (error) {
    console.error('Error fetching item:', error)
    // Handle error appropriately, e.g., display an error message
  }
}

onMounted(loadItem)

const submit = async () => {
  try {
    const updatedItem = {
      name: name.value,
      description: description.value,
      image_url: image_url.value,
      quantity: quantity.value
    }
    await itemStore.updateItem(itemId, updatedItem)
    router.push('/admin/items')
  } catch (error) {
    console.error('Error updating item:', error)
    // Handle error appropriately, e.g., display an error message
  }
}
</script>

<style scoped lang="scss">
.update-item {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
}
</style>
