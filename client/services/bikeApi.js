import api from './api'

const getAllBikes = () => api.get('/bikes/')
const getBikeById = (id) => api.get(`/bikes/${id}`)
const addBike = (data) => api.post('/bikes/', data)
const updateBike = (id, data) => api.patch(`/bikes/${id}`, data)
const deleteBike = (id) => api.delete(`/bikes/${id}`)



export default {getAllBikes,getBikeById,addBike,updateBike,deleteBike}

