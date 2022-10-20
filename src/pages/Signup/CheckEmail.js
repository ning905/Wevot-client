import './signup.scss'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom'
import client from '../../utils/client'
import { useState } from 'react'

const initAlert = { status: '', content: '' }

export default function CheckEmail() {
  const { username } = useParams()
  const [alert, setAlert] = useState(initAlert)

  function handleResend() {
    client
      .post(`/users/signup/resend-email/${username}`)
      .then((res) => {
        setAlert({ status: 'success', content: res.data.message })
        setTimeout(() => {
          setAlert(initAlert)
        }, 5000)
      })
      .catch((res) => {
        setAlert({ status: 'error', content: res.response.data.message })
        setTimeout(() => {
          setAlert(initAlert)
        }, 5000)
      })
  }

  return (
    <div className='signup'>
      <Navbar page='home' />

      <main className='submitted'>
        <div className='container'>
          <div className='titles'>
            <h2>Check Your Email</h2>
            <p>We have sent you an email with a link to active your account.</p>
            <p>Please check your email and spam folder.</p>

            {alert.status === 'success' && <p id='success-alert'>Success: {alert.content}</p>}
            {alert.status === 'error' && <p id='fail-alert'>Failed: {alert.content}</p>}

            <p className='reminder'>
              Can’t find the email?{' '}
              <span onClick={handleResend} className='clickable'>
                Click here to resend
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
