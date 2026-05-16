import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from '../pages/Home'
import Login    from '../pages/Login'
import Register from '../pages/Register'
import Parts    from '../pages/Parts'
import Build    from '../pages/Build'
import Orders   from '../pages/Orders'
import Profile  from '../pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'         element={<Home />}     />
        <Route path='/login'    element={<Login />}    />
        <Route path='/register' element={<Register />} />
        <Route path='/parts'    element={<Parts />}    />
        <Route path='/build'    element={<Build />}    />
        <Route path='/orders'   element={<Orders />}   />
        <Route path='/profile'  element={<Profile />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App