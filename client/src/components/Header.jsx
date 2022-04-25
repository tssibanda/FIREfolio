import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }


  return (
    <header className='header top-rounded-corners my-4'>
        <div className="navbar navbar-expand-lg navbar-dark bg-dark top-rounded-corners">
            <div className="container-fluid">
                <Link to="/" className='navbar-brand'>
                    <h1>
                        <span className="orange-font">fire</span>folio<span className="green-font">.</span>
                    </h1>
                </Link>
                <div className='navbar-toggler' typeof='button' data-bs-toggle='collapse' data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className='navbar-toggler-icon'></span>
                </div>
                <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                    <div className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <NavLink to='/' className='nav-link'>dashboard</NavLink>
                        <NavLink to='/portfolio' className='nav-link'>portfolio</NavLink>
                        <NavLink to='/dividends' className='nav-link'>dividends</NavLink>
                        <NavLink to='/stockanalyser' className='nav-link'>stock analyser</NavLink>
                    </div>
                    <div className='navbar-text login'>
                        {user ? (
                                    <button className='btn awsfont' onClick={onLogout}>
                                        <FaSignOutAlt /> logout
                                    </button>
                            ) : (
                                    <>
                                        <Link to='/login' className='awsfont'><FaSignInAlt /> login</Link>
                                        <Link to='/register' className='awsfont'><FaUser /> register</Link>
                                    </>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header