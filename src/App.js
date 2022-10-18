import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import CheckEmail from './pages/Signup/CheckEmail'
import Signup from './pages/Signup/Signup'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />

            <Route path='login' element={<Login />} />

            <Route path='signup'>
              <Route index element={<Signup />} />
              <Route path='check-email' element={<CheckEmail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
