import './navbarMenu.scss'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'

export default function NavbarMenu({ handleLogout, handleClickOpen, handleHost }) {
  const { currentUser } = useContext(UserContext)
  return (
    <div className='navbar-menu'>
      {currentUser ? (
        <>
          <Link to='/dashboard' className='link'>
            <div className='menu-item'>Dashboard</div>
          </Link>
          <div className='menu-item' onClick={handleLogout}>
            Log Out
          </div>
          <div className='menu-item sm-screen' onClick={handleClickOpen}>
            Join An Event
          </div>
          <div className='menu-item sm-screen' onClick={handleHost}>
            Host An Event
          </div>
        </>
      ) : (
        <>
          <Link to='/login' className='link'>
            <div className='menu-item'>Log In</div>
          </Link>
          <Link to='/signup' className='link'>
            <div className='menu-item'>Sign Up</div>
          </Link>
          <div className='menu-item sm-screen' onClick={handleClickOpen}>
            Join An Event
          </div>
          <div className='menu-item sm-screen' onClick={handleHost}>
            Host An Event
          </div>
        </>
      )}
    </div>
  )
}
