<template>
  <div class="item-list">
    <h1>Items</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">Error: {{ error }}</div>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.id" class="item">
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <img v-if="item.image_url" :src="item.image_url" :alt="item.name" class="item-image" />
        <p>Quantity: {{ item.quantity }}</p>
      </li>
    </ul>
    <p v-if="!loading && !items.length">No items found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useItemStore } from '@/shared/stores'

const itemStore = useItemStore()

const items = ref(itemStore.items)
const loading = ref(!itemStore.loaded)
const error = ref<string | null>(null)

const fetchItems = async () => {
  try {
    await itemStore.fetchItems()
    items.value = itemStore.items
  } catch (err) {
    error.value = 'Failed to fetch items. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchItems)
</script>

<style scoped>
.item-list {
  padding: 20px;
}

.item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.item h2 {
  margin: 0;
}

.item-image {
  max-width: 100px;
  max-height: 100px;
}

.loading {
  font-size: 1.2em;
  color: #333;
}

.error {
  color: red;
}
</style>
