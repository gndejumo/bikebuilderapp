import { useForm } from 'react-hook-form'      // handles form state
import { z } from 'zod'                         // validation library
import { zodResolver } from '@hookform/resolvers/zod' // connects zod with react-hook-form
import { useState } from 'react'               // for error and loading state
import { useNavigate } from 'react-router-dom' // for redirecting after login
import useAuthStore from '../src/store/authStore'   // global auth state
import authApi from '../services/authApi'       // API calls
import './Login.css'                            // styles

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters')
})

function Login () {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {login} = useAuthStore()
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data) => {
    try {
        setLoading(true); // set loading to true
        setError(null); // clear previous errors
        const res = await authApi.login(data) // call authApi.login(data)
        console.log('User: ', res.data.user)
        console.log('Token: ', res.data.token)
        login(res.data?.user, res.data?.token) // save user and token to store
        navigate('/') // navigate to '/'
    } catch (err) {
        setError(err.response?.data?.message || 'Login Failed') // catch errors
    } finally {
        setLoading(false) // set loading to false in finally
    }
    
}
    return (
    <div className='login-container'>
        <div className='login-card'>
            <h2>Login</h2>
            {error && <div className='login-error'>{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                    {...register('email')}
                    type="email"
                    placeholder="example@gmail.com"
                    />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <input
                    {...register('password')}
                    type="password"
                    placeholder="••••••••"
                    />
                {errors.password && <p className="form-error">{errors.password.message}</p>}
                </div>
                <button type="submit" className="login-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            <p className="login-footer">Don't have an account? {''} 
                <a href="/register">Register</a>
            </p>
        </div>
    </div>
)
}





export default Login

    // 1. set loading to true
    
    
    
    
    
    