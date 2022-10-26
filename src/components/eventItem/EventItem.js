import { FiberManualRecord, PersonOutlineOutlined } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import dayjs from 'dayjs'
import './eventItem.scss'

export default function EventItem({ event }) {
  const initial = event.title[0].toUpperCase()
  const defaultPoster = `http://ui-avatars.com/api/?bold=true&background=CACACA&color=fff&name=${initial}`
  const navigate = useNavigate()
  const [status, setStatus] = useState('Pending')
  const [voted, setVoted] = useState({ status: false })
  const { currentUser } = useContext(UserContext)
  const formattedTime = dayjs(new Date(event.invitation.expiresAt)).format('DD MMM YYYY')
  const findParticipant = event.participants.find(
    (participant) => participant.email === currentUser.email
  )
  console.log('findParticipant', findParticipant)

  useEffect(() => {
    if (event.invitation.expired) {
      setStatus('Closed')
    }

    if (findParticipant) {
      setVoted({ status: true, votedSlots: findParticipant.votedSlots })
    }
  }, [event, findParticipant])

  function handleVisit() {
    navigate(`/events/${event.id}`)
  }

  return (
    <li className='event-item' onClick={handleVisit}>
      <div className='wrap'>
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
          ) : (
            <p className='voted-slots'>Vote before {formattedTime}</p>
          )}
        </div>
      </div>
    </li>
  )
}