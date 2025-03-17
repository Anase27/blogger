import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup  from './pages/Signup'
import Signin from './pages/Signin'
// import { useState } from 'react'
import RTE from './components/RTE'
import AuthGaurd from './components/AuthGaurd'
import BlogById from './pages/BlogById'
import BlogList from './pages/BlogList'
import './App.css'
import HomePage from './pages/HomePage'
import Nav from './components/Nav'

function App() {
  // const [count, setCount] = useState(0)

  return (
  <div className='relative overscroll-none'>
      <BrowserRouter>
       
        <Routes>
          
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/' element={<RTE />} /> */}
          <Route path='/blog' element={<BlogList />} />
          <Route path='/blog/:id' element={<BlogById />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          {/* <Route path='/blog/post' element={<RTE />} /> */}


          {/* Protected routes */}
          
          <Route element={<AuthGaurd />}> 
            <Route path='/blog/post' element={<RTE />} />
          </Route>
        </Routes>
        <div className=''>
          <Nav></Nav>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
