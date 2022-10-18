import { Link } from 'react-router-dom'
import './navbar.scss'

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='wrap'>
        <div className='left'>
          <h1 className='logo'>WEVOT</h1>
        </div>

        <div className='right'>
          <Link className='link'>
            <span className='dark-text'>JOIN</span>
          </Link>
          <Link className='link'>
            <span className='dark-text'>HOST</span>
          </Link>
          <Link to='/login' className='link'>
            <button className='dark-text login-btn'>Log In</button>
          </Link>
          <Link to='/signup' className='link'>
            <button className='signup-btn'>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
