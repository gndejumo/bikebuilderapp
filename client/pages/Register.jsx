import {useForm} from 'react-hook-form'
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import authApi from '../services/authApi'
import './Register.css'


const registerSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Must be a valid email'),
    password: z.string().min(8, 'Password must be atleast 8 characters')
})

function Register() { 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(registerSchema)
    })

const onSubmit = async(data) => {
    try {
        setLoading(true)
        setError(null)
        const res = await authApi.registerUser(data)
        console.log('Registered user', res)
        navigate('/login')
    } catch (err) {
        setError(err.response?.data?.message || 'Registration failed')
    } finally {
        setLoading(false)
    }
}
    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                {error && <div className="register-error">{error}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                    {...register('firstName')}
                    type="text"
                    placeholder="Enter First Name"
                    />
                    {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                    {...register('lastName')}
                    type="text"
                    placeholder="Enter Last Name"
                    />
                    {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                    {...register('email')}
                    type="email"
                    placeholder="Enter your email"
                    />
                    {errors.email && <p className="form-error"> {errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                    {...register('password')}
                    type="password"
                    placeholder="••••••••"
                    />
                    {errors.password && <p className="form-error">{errors.password.message}</p>}
                </div>
                <button type="submit" className="register-btn" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
            </form>
            <p className='register-footer'>Already have an account? {''} <a href="/login">Login</a></p>
            </div>
        </div>
    )
}

export default Register