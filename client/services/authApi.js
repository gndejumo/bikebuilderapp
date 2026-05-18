import api from './api'

const registerUser = (data) => api.post('/auth/register', data);
const login = (data) => api.post('/auth/login', data);
const logout = () => api.post('/auth/logout')
const refresh = (data) => api.post('/auth/refresh', data)


export default {registerUser, login, logout, refresh}

