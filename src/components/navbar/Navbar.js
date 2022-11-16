import MenuIcon from '@mui/icons-material/Menu'
import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import JoinForm from '../joinForm/JoinForm'
import './navbar.scss'
import NavbarMenu from '../navbarMenu/NavbarMenu'
import { ClickAwayListener } from '@mui/material'

export default function Navbar({ page }) {
  const [openJoin, setOpenJoin] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const { currentUser, userAction } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  function toggleOpenMenu() {
    setOpenMenu((pre) => !pre)
  }

  function handleHost() {
    return currentUser ? navigate('/events/create') : navigate('/login')
  }

  function handleClickOpenJoin() {
    setOpenJoin(true)
  }

  function handleLogout() {
    localStorage.removeItem(process.env.REACT_APP_USER_TOKEN)
    if (location.pathname !== '/') {
      navigate('/login')
    } else {
      navigate('/')
    }
    userAction({ type: 'LOGOUT' })
  }

  return (
    <div className='navbar'>
      <div className='wrap'>
        <div className='top'>
          <div className='left'>
            <Link className='link' to='/'>
              <h1 className='logo'>WEVOT</h1>
            </Link>
          </div>

          <div className='right'>
            {page === 'init' && (
              <>
                <span className='dark-text clickable w_70' onClick={handleClickOpenJoin}>
                  JOIN
                </span>
                <span className='dark-text clickable w_70' onClick={handleHost}>
                  HOST
                </span>
                {currentUser ? (
                  <>
                    <Link to='/dashboard' className='link'>
                      <button className='dark-text bold-text dark-btn '>Dashboard</button>
                    </Link>

                    <button className='bold-text light-btn right-btn' onClick={handleLogout}>
                      Log Out
                    </button>

                    <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                      <div className='click-away-wrap'>
                        <div
                          className={openMenu ? 'menu-wrap menu-open' : 'menu-wrap'}
                          onClick={toggleOpenMenu}
                        >
                          <img src={currentUser.profileImgUrl} alt='avatar' className='avatar' />
                        </div>
                        <NavbarMenu
                          openMenu={openMenu}
                          setOpenMenu={setOpenMenu}
                          handleLogout={handleLogout}
                          handleClickOpenJoin={handleClickOpenJoin}
                          handleHost={handleHost}
                        />
                      </div>
                    </ClickAwayListener>
                  </>
                ) : (
                  <>
                    <Link to='/login' className='link'>
                      <button className='dark-text bold-text light-btn'>Log In</button>
                    </Link>

                    <Link to='/signup' className='link'>
                      <button className='bold-text dark-btn right-btn'>Sign Up</button>
                    </Link>

                    <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                      <div className='click-away-wrap'>
                        <div className={openMenu ? 'menu-wrap menu-open' : 'menu-wrap'}>
                          <MenuIcon
                            onClick={toggleOpenMenu}
                            fontSize='large'
                            style={{ color: '#16dcf4' }}
                          />
                        </div>

                        <NavbarMenu
                          openMenu={openMenu}
                          setOpenMenu={setOpenMenu}
                          handleLogout={handleLogout}
                          handleClickOpenJoin={handleClickOpenJoin}
                          handleHost={handleHost}
                        />
                      </div>
                    </ClickAwayListener>
                  </>
                )}
              </>
            )}
            {page === 'login' && (
              <div className='account-text-wrap'>
                <span className='grey-text default-cursor'>Not a member?</span>
                <Link to='/signup' className='dark-text bold-text signup-text'>
                  Sign Up For Free
                </Link>
              </div>
            )}
            {page === 'signup' && (
              <div className='account-text-wrap'>
                <span className='grey-text default-cursor'>Already have an account?</span>
                <Link to='/login' className='dark-text bold-text signup-text'>
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <JoinForm open={openJoin} setOpen={setOpenJoin} />
    </div>
  )
}
