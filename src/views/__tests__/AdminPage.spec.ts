import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AdminContainer from '@/components/AdminContainer.vue'

describe('AdminContainerWrapper Component', () => {
  it('renders AdminContainer component', () => {
    const wrapper = mount(AdminContainer)

    // Check if AdminContainer is rendered
    const adminContainer = wrapper.findComponent(AdminContainer)
    expect(adminContainer.exists()).toBe(true)
  })
})
