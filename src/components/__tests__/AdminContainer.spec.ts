import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import AdminContainer from '@/components/AdminContainer.vue'
import Sidebar from '@/components/SideBar.vue'

describe('AdminContainer Component', () => {
  it('renders Sidebar component', () => {
    const wrapper = mount(AdminContainer, {
      global: {
        stubs: {
          Sidebar: true, // Stub Sidebar component
          RouterView: RouterLinkStub // Stub router-view to simplify testing
        }
      }
    })

    // Check if the Sidebar component is rendered
    expect(wrapper.findComponent(Sidebar).exists()).toBe(true)
  })

  it('renders router-view in admin-content', () => {
    const wrapper = mount(AdminContainer, {
      global: {
        stubs: {
          Sidebar: true, // Stub Sidebar component
          RouterView: RouterLinkStub // Stub router-view to simplify testing
        }
      }
    })

    // Check if router-view is rendered inside the admin-content div
    const adminContent = wrapper.find('.admin-content')
    expect(adminContent.findComponent(RouterLinkStub).exists()).toBe(true)
  })
})
