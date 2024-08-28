
import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import Header from '@/components/MainHeader.vue'

describe('Header Component', () => {
  it('renders correctly when authenticated', () => {
    const wrapper = mount(Header, {
      props: {
        isAuthenticated: true,
      },
    })

    expect(wrapper.find('h1').text()).toBe('TEMPLATE')
    expect(wrapper.find('li:nth-child(1)').text()).toBe('Admin')
    expect(wrapper.find('li:nth-child(2)').text()).toBe('Sign out')
  })
    
    it('renders correctly when not authenticated', () => {
        const wrapper = mount(Header, {
            stubs: {
                RouterLink: RouterLinkStub
            },
            props: {
                isAuthenticated: false,
            },
        })

        expect(wrapper.find('h1').text()).toBe('TEMPLATE')
        expect(wrapper.find('li:nth-child(1)').text()).toBe('Sign in')
        expect(wrapper.find('li:nth-child(2)').text()).toBe('Sign up')
    })

  it('emits logout event when sign out is clicked', async () => {
    const wrapper = mount(Header, {
      props: {
        isAuthenticated: true,
      },
    })

    const signOutButton = wrapper.find('li:last-child')

    await signOutButton.trigger('click')
    expect(wrapper.emitted('logout')).toBeTruthy()
  })
})
