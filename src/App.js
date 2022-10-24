import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Personal from './pages/Personal/Personal'
import CheckEmail from './pages/Signup/CheckEmail'
import Signup from './pages/Signup/Signup'
import Verify from './pages/Signup/Verify'

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
              <Route path='check-email/:username' element={<CheckEmail />} />
              <Route path='verify/:userId/:uniqueString' element={<Verify />} />
            </Route>

            <Route path='dashboard'>
              <Route index element={<Personal />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
