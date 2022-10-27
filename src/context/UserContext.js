import { createContext, useEffect, useReducer } from 'react'
import jwt_decode from 'jwt-decode'
import client from '../utils/client'
import UserReducer from './userReducer'
import { Navigate, useNavigate } from 'react-router-dom'

const tokenKey = process.env.REACT_APP_USER_TOKEN
const token = localStorage.getItem(tokenKey) || null

const INITIAL_USER = null
export const UserContext = createContext(INITIAL_USER)

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, { user: INITIAL_USER })

  useEffect(() => {
    if (token) {
      const username = jwt_decode(token).username
      client
        .get(`/users/${username}`)
        .then((res) => {
          dispatch({ type: 'LOGIN', payload: res.data.data })
        })
        .catch((err) => {
          console.log('remove token')
          localStorage.removeItem(tokenKey)
          console.error(err)
        })
    }
  }, [])

  console.log('token', token)
  console.log('currentUser', state.user)

  return (
    (!token || state.user) && (
      <UserContext.Provider value={{ currentUser: state.user, userAction: dispatch }}>
        {children}
      </UserContext.Provider>
    )
  )
}
