import { Link } from 'react-router-dom'
import './navbar.scss'

export default function Navbar({ page }) {
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
              <Link className='link'>
                <span className='dark-text'>JOIN</span>
              </Link>
              <Link className='link'>
                <span className='dark-text'>HOST</span>
              </Link>
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
    </div>
  )
}
