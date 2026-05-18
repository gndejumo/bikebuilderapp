import {Navigate} from 'react-router-dom'
import useAuthStore from '../src/store/authStore'


function AdminRoute ({children}){
    const {token, user} = useAuthStore()

    if (!token) {
        return <Navigate to="/login"/>
    }
    if (user?.role !== 'admin') {
        return <Navigate to="/"/>
    }
    return children
}

export default AdminRoute