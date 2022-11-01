import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AvatarForm from '../../components/avatarForm/AvatarForm'
import EventItem from '../../components/eventItem/EventItem'
import Navbar from '../../components/navbar/Navbar'
import SearchBar from '../../components/searchBar/SearchBar'
import {
  LinkOutlined,
  MailOutline,
  HomeOutlined,
  NearMeOutlined,
  DriveFileRenameOutline,
} from '@mui/icons-material'
import { UserContext } from '../../context/UserContext'
import client from '../../utils/client'
import './dashboard.scss'

export default function Dashboard() {
  const [events, setEvents] = useState([])
  const [query, setQuery] = useState('')
  const [menuFilter, setMenuFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    client
      .get('/events')
      .then((res) => {
        setEvents(res.data.data)
      })
      .catch((res) => {
        console.error(res)
      })
  }, [currentUser])

  function handleClickOpenDialog() {
    setOpenDialog(true)
  }

  function getFilterClassName(selected, option) {
    if (selected === option) {
      return 'selected'
    }
    return undefined
  }

  function handleDeleteEvent(id) {
    const newArr = events.filter((e) => e.id !== id)
    setEvents(newArr)
  }

  let filteredEvents = events

  if (statusFilter === 'closed') {
    filteredEvents = filteredEvents.filter(
      (event) => new Date(event.invitation.expiresAt) < new Date()
    )
  } else if (statusFilter === 'pending') {
    filteredEvents = filteredEvents.filter(
      (event) => new Date(event.invitation.expiresAt) > new Date()
    )
  }

  if (menuFilter === 'hosted') {
    filteredEvents = filteredEvents.filter((event) => event.hostId === currentUser.id)
  } else if (menuFilter === 'joined') {
    filteredEvents = filteredEvents.filter((event) => event.hostId !== currentUser.id)
  }

  if (query) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <div className='dashboard'>
      <Navbar page='init' />

      <main>
        <div className='container'>
          <div className='left'>
            <div className='profile-wrap'>
              <div className='avatar-wrap' onClick={handleClickOpenDialog}>
                <img src={currentUser.profileImgUrl} alt='avatar' />
                <div className='change-avatar-icon'>
                  <DriveFileRenameOutline
                    sx={{ width: '2rem', height: '2rem', color: '#16DCF4' }}
                  />
                </div>
              </div>

              <h2>{currentUser.username}</h2>
              <p>
                <MailOutline fontSize='1rem' />
                {currentUser.email}
              </p>
            </div>
            <AvatarForm open={openDialog} setOpen={setOpenDialog} />

            <div className='action-wrap'>
              <Link to='/events/create'>
                <button>HOST AN EVENT</button>
              </Link>
            </div>

            <div className='menu-wrap'>
              <h3>Menu</h3>

              <div className='option-wrap'>
                <p className={getFilterClassName(menuFilter, '')} onClick={() => setMenuFilter('')}>
                  <HomeOutlined sx={{ width: '35px', height: '35px' }} />
                  All Events
                </p>
                <p
                  className={getFilterClassName(menuFilter, 'hosted')}
                  onClick={() => setMenuFilter('hosted')}
                >
                  <NearMeOutlined sx={{ width: '35px', height: '35px' }} />
                  Hosted
                </p>
                <p
                  className={getFilterClassName(menuFilter, 'joined')}
                  onClick={() => setMenuFilter('joined')}
                >
                  <LinkOutlined sx={{ width: '35px', height: '35px' }} />
                  Joined
                </p>
              </div>
            </div>
          </div>

          <div className='right'>
            <SearchBar query={query} setQuery={setQuery} />
            <section className='event-list-section'>
              <h2>My Events</h2>
              <div className='filters'>
                <p
                  className={getFilterClassName(statusFilter, '')}
                  onClick={() => setStatusFilter('')}
                >
                  All
                </p>
                <p
                  className={getFilterClassName(statusFilter, 'pending')}
                  onClick={() => setStatusFilter('pending')}
                >
                  Pending
                </p>
                <p
                  className={getFilterClassName(statusFilter, 'closed')}
                  onClick={() => setStatusFilter('closed')}
                >
                  Closed
                </p>
              </div>

              <div className='event-list-wrap'>
                <ul className='event-list'>
                  {filteredEvents.map((event, index) => (
                    <EventItem key={index} event={event} handleDeleteEvent={handleDeleteEvent} />
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
