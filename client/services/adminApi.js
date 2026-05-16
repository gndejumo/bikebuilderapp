import api from './api'


const getAllUsers = () => api.get('/admin/allUsers')
const getAllBuilds = () => api.get('/admin/allBuilds')
const getAllOrders = () => api.get('/admin/allOrders')
const getDashBoardStatus = () => api.get('/admin/dashboard')
const deleteUser = (id) => api.delete(`/admin/${id}`)

export default {getAllUsers, getAllBuilds,getAllOrders,getDashBoardStatus,deleteUser}