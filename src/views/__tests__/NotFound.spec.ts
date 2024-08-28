import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import NotFound from '@/views/NotFound.vue' // Update the path as needed

describe('NotFound Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(NotFound, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    // Check for heading
    const heading = wrapper.find('h1')
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toBe('404 - Page Not Found')

    // Check for paragraph
    const paragraph = wrapper.find('p')
    expect(paragraph.exists()).toBe(true)
    expect(paragraph.text()).toBe('Sorry, the page you are looking for does not exist.')

    // Check for link
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
    expect(link.props().to).toBe('/')
    expect(link.text()).toBe('Go to Home')
  })
})
