import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const homePath = '/'
  const offerPath = '/offers'
  const profilePath = '/profile'

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate(homePath)}>
            <ExploreIcon
              fill={pathMatchRoute(homePath) ? '#1565C0' : '#8f8f8f'}
              width='36px'
              height='36px'
              onClick={() => navigate(homePath)}
            />
            <p
              className={
                pathMatchRoute(homePath)
                  ? 'navbarListItemNameActive'
                  : 'navbarListName'
              }
            >
              Explore
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate(offerPath)}>
            <OfferIcon
              fill={pathMatchRoute(offerPath) ? '#1565C0' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute(offerPath)
                  ? 'navbarListItemNameActive'
                  : 'navbarListName'
              }
            >
              Offers
            </p>
          </li>
          <li className='navbarListItem' onClick={() => navigate(profilePath)}>
            <PersonOutlineIcon
              fill={pathMatchRoute(profilePath) ? '#1565C0' : '#8f8f8f'}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatchRoute(profilePath)
                  ? 'navbarListItemNameActive'
                  : 'navbarListName'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
