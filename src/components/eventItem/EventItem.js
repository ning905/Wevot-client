import { FiberManualRecord, PersonOutlineOutlined } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import './eventItem.scss'
import { eventItemFormatTime } from '../../utils/formatTime'
import VertDotMenu from '../vertDotMenu/VertDotMenu'
import client from '../../utils/client'

export default function EventItem({ event, handleDeleteEvent }) {
  const initial = event.title[0].toUpperCase()
  const defaultPoster = `http://ui-avatars.com/api/?bold=true&background=CACACA&color=fff&name=${initial}`
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [voted, setVoted] = useState({ status: false })
  const [isHost, setIsHost] = useState(false)
  const { currentUser } = useContext(UserContext)
  const closed = new Date(event.invitation.expiresAt) < new Date()

  useEffect(() => {
    if (closed) {
      setStatus('Closed')
    } else {
      setStatus('Pending')
    }

    const findParticipant = event.participants.find(
      (participant) => participant.email === currentUser.email
    )
    if (findParticipant) {
      setVoted({ status: true, votedSlots: findParticipant.votedSlots })
    }
    if (currentUser.id === event.hostId) {
      setIsHost(true)
    }
  }, [event, currentUser, closed])

  function handleVisit() {
    navigate(`/events/${event.id}`)
  }

  function handleEdit() {
    navigate(`/events/edit/${event.id}`)
  }

  function handleDelete() {
    let url
    if (isHost) {
      url = `/events/${event.id}`
    } else {
      url = `/events/participate/${event.invitation.id}/${currentUser.email}`
    }

    client
      .delete(url)
      .then(() => {
        handleDeleteEvent(event.id)
      })
      .catch((res) => {
        console.error(res)
      })
  }

  return (
    <li className='event-item'>
      <div className='wrap' onClick={handleVisit}>
        <div className='title-wrap'>
          <img src={event.posterUrl ? event.posterUrl : defaultPoster} alt='poster' />
          <h3>{event.title}</h3>
        </div>

        <div className='status-wrap'>
          <FiberManualRecord className={`icon ${status}`} fontSize='9px' />
          <p>{status}</p>
        </div>

        <div className='slots-wrap'>
          <div className='participants-wrap'>
            <PersonOutlineOutlined sx={{ width: '20px', height: '20px' }} />
            <p>{event.participants.length} voted</p>
          </div>

          {voted.status ? (
            <p className='voted-slots'>{voted.votedSlots?.length} slots selected</p>
          ) : closed ? (
            <p className='voted-slots'>Closed</p>
          ) : (
            <p className='voted-slots'>
              Vote before <strong>{eventItemFormatTime(event.invitation.expiresAt)}</strong>
            </p>
          )}
        </div>
      </div>
      <VertDotMenu isHost={isHost} handleEdit={handleEdit} handleDelete={handleDelete} />
    </li>
  )
}
