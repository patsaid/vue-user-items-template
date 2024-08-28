import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '@/components/MainFooter.vue'

describe('Footer Component', () => {
  it('renders the footer text correctly', () => {
    const wrapper = mount(Footer)

    // Check if the footer contains the correct text
    expect(wrapper.text()).toContain('© 2024 Your Company. All rights reserved.')
  })

  it('applies the correct styles', () => {
    const wrapper = mount(Footer)

    // Check if the footer has the correct classes
    const footerContainer = wrapper.find('.footer-container')
    expect(footerContainer.exists()).toBe(true)
    expect(footerContainer.classes()).toContain('d-flex')
    expect(footerContainer.classes()).toContain('justify-content-center')
  })
})
