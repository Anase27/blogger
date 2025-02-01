import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup  from './pages/Signup'
import Signin from './pages/Signin'
// import { useState } from 'react'
import RTE from './components/RTE'
import AuthGaurd from './components/AuthGaurd'
import BlogById from './pages/BlogById'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
  <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div>hellooo hooman</div>} />
          {/* <Route path='/' element={<RTE />} /> */}
          <Route path='/blog' element={<div>helloo</div>} />
          <Route path='/blog/:id' element={<BlogById />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />


          {/* Protected routes */}
          
          <Route element={<AuthGaurd />}> 
            <Route path='/blog/post' element={<RTE />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
