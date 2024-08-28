import type { User, SignUpForm } from '../interfaces'
import Cookies from 'js-cookie'

const BASE_URL = 'http://localhost:8000/api/users'

export async function createUser(signUpForm: SignUpForm) {
  const response = await fetch(`${BASE_URL}/signup`, {
    // Adjusted path
    method: 'POST',
    body: JSON.stringify(signUpForm),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  const accessToken = Cookies.get('accessToken')

  const response = await fetch(`${BASE_URL}/me`, {
    // Adjusted path
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include'
  })

  if (response.ok) {
    return response.json()
  } else {
    return null
  }
}

export async function updateUser(signUpForm: SignUpForm): Promise<User> {
  // Remove password from the object if it's an empty string
  if (signUpForm.password === '') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...formWithoutPassword } = signUpForm
    signUpForm = formWithoutPassword as SignUpForm
  }

  const accessToken = Cookies.get('accessToken')
  const response = await fetch(`${BASE_URL}/me`, {
    // Adjusted path
    method: 'PUT',
    body: JSON.stringify(signUpForm),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include'
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}
