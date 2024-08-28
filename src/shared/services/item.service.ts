import type { Item, ItemForm } from '../interfaces'
import Cookies from 'js-cookie'

const BASE_URL = 'http://localhost:8000/api/items'

export async function fetchItems(): Promise<Item[]> {
  const response = await fetch(`${BASE_URL}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')}`
    },
    credentials: 'include'
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export async function fetchItem(id: number): Promise<Item> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')}`
    },
    credentials: 'include'
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export async function createItem(itemForm: ItemForm): Promise<Item> {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify(itemForm),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')}`
    },
    credentials: 'include'
  })

  if (response.ok) {
    return await response.json()
  } else {
    throw await response.json()
  }
}

export async function updateItem(id: number, itemForm: ItemForm): Promise<Item> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemForm),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')}`
    },
    credentials: 'include'
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export async function deleteItem(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')}`
    },
    credentials: 'include'
  })

  if (!response.ok) {
    throw await response.json()
  }
}
