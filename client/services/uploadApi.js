import api from './api'

const uploadImage = (data) => api.post('/upload/', data)

export default { uploadImage }