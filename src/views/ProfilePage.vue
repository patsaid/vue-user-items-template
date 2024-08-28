<script setup lang="ts">
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { useUser } from '@/shared/stores'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const userStore = useUser()

// Check if the user is authorized before allowing interaction with the form
onMounted(async () => {
  try {
    await userStore.fetchCurrentUser() // Fetch the current user to ensure the session is still valid
  } catch (error) {
    console.error('User session is not valid or has expired:', error)
    router.push('/signin') // Redirect to sign-in if the session is invalid or expired
  }
})

const validationSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: 'This field is required.' })
      .min(2, 'Name must be at least 2 characters long.'),
    email: z.string({ required_error: 'This field is required.' }).email('Incorrect email format.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .optional()
      .or(z.literal('')),
    biography: z.string().optional().or(z.literal('')),
    date_of_birth: z.string().optional().or(z.literal(''))
  })
)

const { handleSubmit, setErrors } = useForm({
  validationSchema,
  initialValues: {
    name: userStore.currentUser?.name || '',
    email: userStore.currentUser?.email || '',
    password: '',
    biography: userStore.currentUser?.biography || '',
    date_of_birth: userStore.currentUser?.date_of_birth || ''
  }
})

const submit = handleSubmit(async (formValue) => {
  try {
    await userStore.updateUser(formValue)
    router.push('/admin')
  } catch (e) {
    console.error(e)
    // Handle error
    router.push('/signin')
  }
})

const { value: nameValue, errorMessage: nameError } = useField('name')
const { value: emailValue, errorMessage: emailError } = useField('email')
const { value: passwordValue, errorMessage: passwordError } = useField('password')
const { value: biographyValue, errorMessage: biographyError } = useField('biography')
const { value: date_of_birthValue, errorMessage: dateOfBirthError } = useField('date_of_birth')
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
      <div class="d-flex flex-column mb-10">
        <label for="biography" class="mb-5">Biography</label>
        <textarea v-model="biographyValue" id="biography"></textarea>
        <p v-if="biographyError" class="form-error">{{ biographyError }}</p>
      </div>
      <div class="d-flex flex-column mb-10">
        <label for="dateOfBirth" class="mb-5">Date of Birth</label>
        <input v-model="date_of_birthValue" id="dateOfBirth" type="date" />
        <p v-if="dateOfBirthError" class="form-error">{{ dateOfBirthError }}</p>
      </div>

      <button class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
