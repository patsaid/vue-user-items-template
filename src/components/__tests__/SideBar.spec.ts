import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import Sidebar from '@/components/SideBar.vue'

describe('Sidebar Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Sidebar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub // Stub router-link to simplify testing
        }
      }
    })

    // Check if the sidebar contains two router-links
    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links.length).toBe(2)
  })

  it('contains a link to /admin/items', () => {
    const wrapper = mount(Sidebar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub // Stub router-link to simplify testing
        }
      }
    })

    // Check if there is a router-link to /admin/items
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props().to).toBe('/admin/items')
  })

  it('contains a link to /admin/profile', () => {
    const wrapper = mount(Sidebar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub // Stub router-link to simplify testing
        }
      }
    })

    // Check if there is a router-link to /admin/profile
    const link = wrapper.findAllComponents(RouterLinkStub).at(1) // Get the second router-link
    expect(link?.props().to).toBe('/admin/profile')
  })
})
