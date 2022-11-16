import './navbarMenu.scss'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'

export default function NavbarMenu({
  openMenu,
  setOpenMenu,
  handleLogout,
  handleClickOpenJoin,
  handleHost,
}) {
  const { currentUser } = useContext(UserContext)

  function closeMenu() {
    setOpenMenu(false)
  }

  return (
    <div className='navbar-menu' style={{ display: openMenu ? 'block' : 'none' }}>
      {currentUser ? (
        <>
          <Link to='/dashboard' className='link' onClick={closeMenu}>
            <div className='menu-item'>Dashboard</div>
          </Link>

          <div
            className='menu-item'
            onClick={() => {
              handleLogout()
              closeMenu()
            }}
          >
            Log Out
          </div>

          <div
            className='menu-item sm-screen'
            onClick={() => {
              handleClickOpenJoin()
              closeMenu()
            }}
          >
            Join An Event
          </div>

          <div
            className='menu-item sm-screen'
            onClick={() => {
              handleHost()
              closeMenu()
            }}
          >
            Host An Event
          </div>
        </>
      ) : (
        <>
          <Link to='/login' className='link' onClick={closeMenu}>
            <div className='menu-item'>Log In</div>
          </Link>

          <Link to='/signup' className='link' onClick={closeMenu}>
            <div className='menu-item'>Sign Up</div>
          </Link>

          <div
            className='menu-item sm-screen'
            onClick={() => {
              handleClickOpenJoin()
              closeMenu()
            }}
          >
            Join An Event
          </div>

          <div
            className='menu-item sm-screen'
            onClick={() => {
              handleHost()
              closeMenu()
            }}
          >
            Host An Event
          </div>
        </>
      )}
    </div>
  )
}
