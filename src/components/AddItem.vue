<template>
  <div class="add-item">
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" id="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>
      <button class="btn btn-primary" type="submit">Add Item</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '@/shared/stores'

const router = useRouter()
const itemStore = useItemStore()

const name = ref('')
const description = ref('')

const submit = async () => {
  try {
    const newItem = {
      name: name.value,
      description: description.value
    }
    await itemStore.addItem(newItem)
    router.push('/admin/items')
  } catch (error) {
    console.error('Error adding item:', error)
    // Handle error appropriately, e.g., display an error message
  }
}
</script>

<style scoped lang="scss">
.add-item {
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
  border-radius: 4px;
}
</style>
