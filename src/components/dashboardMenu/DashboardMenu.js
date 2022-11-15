import './dashboardMenu.scss'

export default function DashboardMenu({
  openMenu,
  setOpenMenu,
  menuFilter,
  setMenuFilter,
  getFilterClassName,
}) {
  function closeMenu() {
    setOpenMenu(false)
  }

  return (
    <div className='dashboard-menu' style={{ display: openMenu ? 'block' : 'none' }}>
      <p
        className={getFilterClassName(menuFilter, '')}
        onClick={() => {
          setMenuFilter('')
          closeMenu()
        }}
      >
        All Events
      </p>
      <p
        className={getFilterClassName(menuFilter, 'hosted')}
        onClick={() => {
          setMenuFilter('hosted')
          closeMenu()
        }}
      >
        Hosted
      </p>
      <p
        className={getFilterClassName(menuFilter, 'joined')}
        onClick={() => {
          setMenuFilter('joined')
          closeMenu()
        }}
      >
        Joined
      </p>
    </div>
  )
}
