import api from './api'

const getMe = () => api.get('/users/me')
const getProfile = (id) => api.get(`/users/${id}`)
const setAsAdmin = (id) => api.patch(`/users/${id}/setAdmin`)
const updateAvatar = (data) => api.patch('/users/avatar', data)


export default {getMe,getProfile,setAsAdmin,updateAvatar}