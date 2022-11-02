import './slotParInfo.scss'

export default function SlotParInfo({ par, getAvatar }) {
  return (
    <div className='par-info-wrap'>
      <img className='par-avatar' alt={par.email} src={getAvatar(par.name, par.email)} />
      <div className='text-wrap'>
        {par.name && <p className='par-name'>{par.name}</p>}
        <p className='par-email'>{par.email}</p>
      </div>
    </div>
  )
}
