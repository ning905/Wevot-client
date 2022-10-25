import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import './home.scss'
import top from '../../assets/imgs/home-top.png'
import bottom from '../../assets/imgs/home-bottom.png'
import { UserContext } from '../../context/UserContext'
import JoinForm from '../../components/joinForm/JoinForm'

export default function Home() {
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
    <div className='home'>
      <Navbar page='home' handleClickOpen={handleClickOpen} />

      <main>
        <div className='container'>
          <div className='top'>
            <div className='text-wrap'>
              <h2>Get Friends Together</h2>
              <p>
                Want to meet your friends but don't know when people are free? WEVOT could arrange
                you a best time to meet.
              </p>

              <button onClick={handleHost}>HOST AN EVENT</button>
            </div>
            <div className='img-wrap'>
              <div className='pic'>
                <img src={top} alt='top' />
              </div>
            </div>
          </div>
          <div className='bottom'>
            <div className='img-wrap'>
              <div className='pic'>
                <img src={bottom} alt='bottom' />
              </div>
            </div>
            <div className='text-wrap'>
              <h2>Your Choices Matter</h2>
              <p>
                Don't wanna miss any event again? WEVOT can help you manage all the events here.
              </p>

              <button onClick={handleClickOpen}>JOIN AN EVENT</button>
            </div>
          </div>

          <JoinForm open={open} setOpen={setOpen} />
        </div>
      </main>

      <footer>
        <hr />
      </footer>
    </div>
  )
}
