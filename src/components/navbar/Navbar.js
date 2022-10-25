import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import JoinForm from '../joinForm/JoinForm'
import './navbar.scss'

export default function Navbar({ page }) {
  const [open, setOpen] = useState(false)
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()

  function handleHost() {
    return currentUser ? navigate('/events/create') : navigate('/login')
  }

  function handleClickOpen() {
    setOpen(true)
  }

  return (
    <div className='navbar'>
      <div className='wrap'>
        <div className='left'>
          <Link className='link' to='/'>
            <h1 className='logo'>WEVOT</h1>
          </Link>
        </div>

        <div className='right'>
          {page === 'home' && (
            <>
              <span className='dark-text clickable' onClick={handleClickOpen}>
                JOIN
              </span>
              <span className='dark-text clickable' onClick={handleHost}>
                HOST
              </span>
              <Link to='/login' className='link'>
                <button className='dark-text bold-text login-btn'>Log In</button>
              </Link>
              <Link to='/signup' className='link'>
                <button className='bold-text signup-btn'>Sign Up</button>
              </Link>
            </>
          )}
          {page === 'login' && (
            <>
              <span className='grey-text default-cursor'>Not a member?</span>
              <Link to='/signup' className='dark-text bold-text signup-text'>
                Sign Up For Free
              </Link>
            </>
          )}
          {page === 'signup' && (
            <>
              <span className='grey-text default-cursor'>Already have an account?</span>
              <Link to='/login' className='dark-text bold-text signup-text'>
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
      <JoinForm open={open} setOpen={setOpen} />
    </div>
  )
}
