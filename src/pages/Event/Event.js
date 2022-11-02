import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import SlotItem from '../../components/slotItem/SlotItem'
import { UserContext } from '../../context/UserContext'
import client from '../../utils/client'
import './event.scss'
import { eventPageFormatTime } from '../../utils/formatTime'
import ClipboardCopy from '../../components/clipboardCopy/ClipboardCopy'
import { ArrowBackIosOutlined } from '@mui/icons-material'
import JoinForm from '../../components/joinForm/JoinForm'

export const initVoteAlert = { status: '', content: '' }

export default function Event() {
  const [event, setEvent] = useState()
  const [expired, setExpired] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false)
  const [isParticipant, setIsParticipant] = useState(false)
  const [votedSlots, setVotedSlots] = useState([])
  const [alert, setAlert] = useState(initVoteAlert)
  const { currentUser } = useContext(UserContext)
  const location = useLocation()
  const param = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let url = `/events/${param.id}`

    if (location.pathname.includes('/participate')) {
      url = `/events/participate/${param.code}`

      if (location.state) {
        setUserInfo({ ...location.state.userInfo })
      } else {
        setOpenUserInfoDialog(true)
      }
    } else if (currentUser) {
      setUserInfo({ email: currentUser.email, name: currentUser.username })
    }

    client
      .get(url)
      .then((res) => {
        const data = res.data.data
        setEvent(data.event)
        setExpired(data.expired)
      })
      .catch((res) => {
        setAlert({ status: 'pageError', content: `Failed: ${res.response.data.message}` })
      })
  }, [currentUser, location, param])

  useEffect(() => {
    if (event) {
      const foundParticipant = event.participants.find((p) => p.email === userInfo.email)
      if (foundParticipant) {
        setIsParticipant(true)
        setVotedSlots(foundParticipant.votedSlots)
      }
    }
  }, [event, userInfo])

  function handleVote() {
    if (!votedSlots.length) {
      setAlert({ status: 'error', content: "You haven't selected any slots" })
      setTimeout(() => {
        setAlert(initVoteAlert)
      }, '1500')
    } else if (!userInfo.email) {
      setAlert({ status: 'error', content: 'Click JOIN and provide you email before submitting' })
    } else {
      client
        .post(`/events/participate/${event.invitation.id}`, { ...userInfo, votedSlots })
        .then((res) => {
          setIsParticipant(true)
          setEvent(res.data.data.event)
          setAlert({ status: 'success', content: 'Votes submitted!' })
          setTimeout(() => {
            setAlert(initVoteAlert)
          }, '3000')
        })
        .catch((res) => {
          setAlert({ status: 'error', content: `Failed: ${res.response.data.message}` })
          setTimeout(() => {
            setAlert(initVoteAlert)
          }, '3000')
        })
    }
  }

  function handleWithdraw() {
    if (isParticipant) {
      setVotedSlots([])

      client
        .delete(`/events/participate/${event.invitation.id}/${userInfo.email}`)
        .then((res) => {
          setIsParticipant(false)
          setEvent(res.data.data.event)
          setAlert({ status: 'success', content: 'Votes withdrawn!' })
          setTimeout(() => {
            setAlert(initVoteAlert)
          }, '3000')
        })
        .catch((res) => {
          setAlert({ status: 'error', content: `Failed: ${res.response.data.message}` })
          setTimeout(() => {
            setAlert(initVoteAlert)
          }, '3000')
        })
    }
  }

  return (
    <div className='event'>
      <Navbar page='init' />

      {openUserInfoDialog && <JoinForm open={openUserInfoDialog} setOpen={setOpenUserInfoDialog} />}

      {event && (
        <main>
          <div className='container'>
            {currentUser && (
              <div className='go-back-wrap' onClick={() => navigate('/dashboard')}>
                <p className='go-back'>
                  <ArrowBackIosOutlined className='icon' />
                  Back to dashboard
                </p>
              </div>
            )}

            <div className='poster-wrap'>
              {event?.posterUrl && (
                <>
                  <div className='poster-cover'></div>
                  <img src={event?.posterUrl} alt='poster' />
                </>
              )}
            </div>

            <div className={event.posterUrl ? 'with-poster text-wrap' : 'text-wrap'}>
              <h2 className={event.posterUrl ? undefined : 'no-poster'}>{event?.title}</h2>
              {event?.description && (
                <p className={event.posterUrl ? undefined : 'no-poster'}>{event.description}</p>
              )}
            </div>

            <div className='deadline-wrap'>
              {expired ? (
                <p>CLOSED</p>
              ) : (
                <p>VOTE BEFORE: {eventPageFormatTime(event?.invitation.expiresAt)}</p>
              )}
            </div>

            {currentUser?.id === event?.hostId && (
              <>
                <button
                  className='edit-event-btn'
                  onClick={() =>
                    navigate(`/events/edit/${event.id}`, { state: { prePage: 'event' } })
                  }
                >
                  Edit Event
                </button>
                <div className='invitation-wrap'>
                  <p>
                    Share event code: <ClipboardCopy copyText={event.invitation.id} />
                  </p>
                  <p>
                    Share via link:{' '}
                    <ClipboardCopy
                      copyText={
                        process.env.REACT_APP_CLIENT_URL +
                        '/events/participate/' +
                        event.invitation.id
                      }
                    />
                  </p>
                </div>
              </>
            )}

            <div className='slots-wrap'>
              <div className='title-wrap'>
                {expired ? (
                  <p>THIS INVITATION HAS EXPIRED</p>
                ) : (
                  <p>PLEASE SELECT ALL YOUR AVAILABLE TIME</p>
                )}
              </div>

              <ul>
                {event?.slots.map((slot, index) => (
                  <SlotItem
                    key={index}
                    slot={slot}
                    votedSlots={votedSlots}
                    setVotedSlots={setVotedSlots}
                    setAlert={setAlert}
                    isParticipant={isParticipant}
                    expired={expired}
                  />
                ))}
              </ul>

              {!expired && (
                <div className='action-wrap'>
                  {alert.content ? (
                    <p className={alert.status}>{alert.content}</p>
                  ) : votedSlots.length > 0 ? (
                    <p>You have selected {votedSlots.length} slots</p>
                  ) : (
                    <p></p>
                  )}
                  {isParticipant ? (
                    <button onClick={handleWithdraw}>WITHDRAW</button>
                  ) : (
                    <button onClick={handleVote}>SUBMIT</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      )}
      {alert.status === 'pageError' && (
        <main>
          <div className='container'>
            <div className='text-wrap'>
              <h2>An Error Occurred</h2>
              <p>{alert.content}</p>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
