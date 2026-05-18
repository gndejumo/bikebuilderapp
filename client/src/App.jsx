import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminRoute from '../components/AdminRoute'
import ProtectedRoute from '../components/ProtectedRoute'


// pages
import Home from '../pages/Home'
import Login    from '../pages/Login'
import Register from '../pages/Register'
import Parts    from '../pages/Parts'
import Build    from '../pages/Build'
import Orders   from '../pages/Orders'
import Profile  from '../pages/Profile'
import Admin from '../pages/Admin'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'         element={<Home />}     />
        <Route path='/login'    element={<Login />}    />
        <Route path='/register' element={<Register />} />
        <Route path='/parts'    element={<Parts />}    />
        <Route path='/build'    element=
        {<ProtectedRoute>
          <Build />
        </ProtectedRoute>
        }    />
        <Route path='/orders'   element=
        {<ProtectedRoute>
          <Orders />
        </ProtectedRoute>
        }   />
        <Route path='/profile'  element=
        {<ProtectedRoute>
          <Profile />
        </ProtectedRoute>
        }  />
        <Route path='/admin'    element=
        {<AdminRoute> 
          <Admin/>
        </AdminRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App