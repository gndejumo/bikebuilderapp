import {create} from 'zustand'

const useAuthStore = create((set) => ({
    // state
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,

    // actions
    login: (user, token) => {
        localStorage.setItem('token', token)
        set({user, token, isAuthenticated: true})
    },

    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        set({user: null, token: null, isAuthenticated: false})
    },
    setUser: (user => set({user}))
}))

export default useAuthStore