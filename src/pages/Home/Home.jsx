import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import './home.scss'

export default function Home() {
  return (
    <div className='home'>
      <Navbar page='home' />

      <main>
        <div className='container'>
          <div className='top'>
            <div className='text-wrap'>
              <h2>Get Friends Together</h2>
              <p>
                Want to meet your friends but don’t know when people are free? WEVOT could arrange
                you a best time to meet.
              </p>
              <Link className='link'>
                <button>HOST AN EVENT</button>
              </Link>
            </div>
            <div className='img-wrap'>
              <div className='pic'></div>
            </div>
          </div>
          <div className='bottom'>
            <div className='img-wrap'>
              <div className='pic'></div>
            </div>
            <div className='text-wrap'>
              <h2>Your Choices Matter</h2>
              <p>
                Don’t wanna miss any event again? WEVOT can help you manage all the events here.
              </p>
              <Link className='link'>
                <button>JOIN AN EVENT</button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <hr />
      </footer>
    </div>
  )
}
