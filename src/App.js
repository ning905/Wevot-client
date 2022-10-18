import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './app.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />

            <Route path='login' component={<Login />} />
            <Route path='signup' component={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
