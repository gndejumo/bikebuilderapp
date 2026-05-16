import api from './api'

const getMyOrders = () => api.get('/orders/me')
const getOrderById = (id) => api.get(`/orders/${id}`)
const createOrder = (data) => api.post('/orders/', data)
const updateOrderStatus = (id, data) => api.patch(`/orders/${id}/status`, data)
const cancelOrder = (id, data) => api.patch(`/orders/${id}/cancel`, data)


export default {getMyOrders, getOrderById, createOrder, updateOrderStatus, cancelOrder}