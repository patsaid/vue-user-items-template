export interface User {
  id: string
  name: string
  email: string
  password: string
  biography: string
  date_of_birth: string
}

export interface SignUpForm extends Partial<User> {}

export interface SignInForm {
  password: string
  email: string
}
