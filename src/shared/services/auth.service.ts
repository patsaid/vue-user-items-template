import type { SignInForm } from '../interfaces'
import Cookies from 'js-cookie'

const BASE_URL = 'http://localhost:8000/api/users'

export async function signin(signInForm: SignInForm): Promise<any> {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify(signInForm),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  if (response.ok) {
    const data = await response.json()
    const { access_token, refresh_token, ...userDetails } = data

    // Store tokens in cookies
    Cookies.set('accessToken', access_token, { expires: 1 }) // Expires in 1 day
    Cookies.set('refreshToken', refresh_token, { expires: 7 }) // Expires in 7 days

    return userDetails
  } else {
    throw await response.json()
  }
}

export function logout() {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}
