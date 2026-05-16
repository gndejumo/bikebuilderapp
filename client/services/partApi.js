import api from './api'


const getPart = () => api.get('/parts/')
const getPartById = (id) => api.get(`/parts/${id}`)
const addPart = (data) => api.post('/parts/addPart', data)
const updatePart = (id, data) => api.patch(`/parts/${id}`, data)
const deletePart = (id) => api.delete(`/parts/${id}`)


export default {getPart, getPartById, addPart, updatePart, deletePart}