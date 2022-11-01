import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './app.scss'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import CheckEmail from './pages/Signup/CheckEmail'
import Signup from './pages/Signup/Signup'
import Verify from './pages/Signup/Verify'
import Dashboard from './pages/Dashboard/Dashboard'
import CreateEvent from './pages/CreateEvent/CreateEvent'
import Event from './pages/Event/Event'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

function App() {
  const { currentUser } = useContext(UserContext)

  function RequireAuth({ children }) {
    return currentUser ? children : <Navigate to='/login' />
  }

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
              <Route
                index
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path='events'>
              <Route
                path='create'
                element={
                  <RequireAuth>
                    <CreateEvent />
                  </RequireAuth>
                }
              />
              <Route
                path='edit/:id'
                element={
                  <RequireAuth>
                    <CreateEvent />
                  </RequireAuth>
                }
              />
              <Route
                path=':id'
                element={
                  <RequireAuth>
                    <Event />
                  </RequireAuth>
                }
              />
              <Route path='participate/:code' element={<Event />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
