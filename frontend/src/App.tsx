import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup  from './pages/Signup'
// import { useState } from 'react'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
  <div className='p-2 bg-black relative'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div>helloo</div>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<div>helloo</div>} />
          <Route path='/blog' element={<div>helloo</div>} />
          <Route path='/blog/:id' element={<div>helloo</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
