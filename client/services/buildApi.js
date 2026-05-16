import api from './api'

const getMyBuilds = () => api.get('/builds/')
const getBuildById = (id) => api.get(`/builds/${id}`)
const createBuild = (data) => api.post('/builds/', data)
const updateBuild = (id, data) => api.patch(`/builds/${id}`, data)
const deleteBuild = (id) => api.delete(`/builds/${id}`)


export default {getMyBuilds, getBuildById, createBuild, updateBuild, deleteBuild}