<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import type { SignUpForm } from '@/shared/interfaces'
import { createUser } from '@/shared/services/user.service'
import { useRouter } from 'vue-router'

const router = useRouter()

const validationSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'This field is required.' })
      .min(2, 'Name must be at least 3 characters long.'),
    email: z.string({ required_error: 'This field is required.' }).email('Incorrect email format.'),
    password: z
      .string({ required_error: 'This field is required.' })
      .min(5, 'Password must be at least 8 characters long.')
  })
)

const { handleSubmit, setErrors } = useForm({
  validationSchema
})

const submit = handleSubmit(async (formValue: SignUpForm) => {
  try {
    await createUser(formValue)
    router.push('/signin')
  } catch (e) {
    console.error(e)
  }
})

const { value: nameValue, errorMessage: nameError } = useField('name')
const { value: emailValue, errorMessage: emailError } = useField('email')
const { value: passwordValue, errorMessage: passwordError } = useField('password')
</script>

<template>
  <div class="container d-flex flex-row p-20 justify-content-center align-items-start">
    <form @submit="submit" class="card">
      <div class="d-flex flex-column mb-10">
        <label for="name" class="mb-5">Name*</label>
        <input v-model="nameValue" id="name" type="text" />
        <p v-if="nameError" class="form-error">{{ nameError }}</p>
      </div>
      <div class="d-flex flex-column mb-10">
        <label for="email" class="mb-5">Email*</label>
        <input v-model="emailValue" id="email" type="text" />
        <p v-if="emailError" class="form-error">{{ emailError }}</p>
      </div>
      <div class="d-flex flex-column mb-10">
        <label for="password" class="mb-5">Password</label>
        <input v-model="passwordValue" id="password" type="password" />
        <p v-if="passwordError" class="form-error">{{ passwordError }}</p>
      </div>
      <div>
        <button class="btn btn-primary">Sign up</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  width: 500px;
  padding: 20px;
}
</style>
