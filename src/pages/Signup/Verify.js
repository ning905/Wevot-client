import './signup.scss'
import Navbar from '../../components/navbar/Navbar'
import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import client from '../../utils/client'
import { UserContext } from '../../context/UserContext'

export default function Verify() {
  const [page, setPage] = useState({ status: '', title: '', message: '', username: '' })
  const { userId, uniqueString } = useParams()
  const { userAction } = useContext(UserContext)

  useEffect(() => {
    let isFetched = false

    client
      .get(`/users/verify/${userId}/${uniqueString}`)
      .then((res) => {
        if (isFetched) {
          const data = res.data.data
          setPage({
            status: res.data.status,
            title: 'Account verified successfully',
            username: data.user.username,
          })

          const token = data.token
          const tokenKey = process.env.REACT_APP_USER_TOKEN
          localStorage.setItem(tokenKey, token)
          userAction({ type: 'LOGIN', payload: data.user })
        }
      })
      .catch((res) => {
        if (isFetched) {
          const data = res.response.data
          setPage({ status: data.status, title: 'An Error Occurred', message: data.message })
        }
      })

    return () => {
      isFetched = true
    }
  }, [uniqueString, userAction, userId])

  return (
    <div className='signup'>
      <Navbar page='init' />

      <main className='submitted'>
        <div className='container'>
          <div className='titles'>
            <h2>{page.title}</h2>

            {page.status === 'fail' && <p>{page.message}</p>}

            {page.status === 'success' && (
              <Link to='/dashboard' replace={true}>
                <p>Click here to visit your personal page</p>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
