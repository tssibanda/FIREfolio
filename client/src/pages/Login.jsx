import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Loading from '../components/Loading'

function Login() {
    const [formData, setFormData] = useState ({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    )

    useEffect (() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading){
        return (
          <div className='container'>
          <div className='row'>
            <div className='col-md-4 col-sm-12 m-auto'>
              <Loading />
            </div>
          </div>
          
        </div>
        )
      }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-7 col-sm-12 m-auto'>
                <div className='row'>
                    <div className='col-12 bg1 rounded-corners p-5'>
                        <p className='reg-heading '><FaSignInAlt/> Login</p>
                        <p className='reg-msg'>Welcome to firefolio, your one stop Portfolio Manager</p>
                        <form onSubmit={onSubmit}>
                            <div className='form-group my-3'>
                                <label htmlFor='email'>Email address</label>
                                <input type='email' className='form-control' id='email' aria-describedby='emailHelp' placeholder='Enter email' name='email' onChange={onChange} value={email}/>
                            </div>
                            <div className='form-group my-3'>
                                <label htmlFor='password'>Password</label>
                                <input type='password' className='form-control' id='password' placeholder='Enter your password' name='password' onChange={onChange} value={password}/>
                            </div>                           
                            <div className='form-group my-4'>
                                <button type='submit' className='btn btn-primary form-control'>Login</button>
                            </div>                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login

