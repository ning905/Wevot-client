import './signup.scss'
import Navbar from '../../components/navbar/Navbar'

export default function CheckEmail() {
  return (
    <div className='signup'>
      <Navbar page='home' />

      <main className='submitted'>
        <div className='container'>
          <div className='titles'>
            <h2>Check Your Email</h2>
            <p>We have sent you an email with a link to active your account.</p>
            <p>Please check your email and spam folder.</p>
            <p className='resend'>
              Can’t find the email? <span className='clickable'>Click here to resend</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
