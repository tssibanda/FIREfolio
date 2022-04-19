import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
    const [formData, setFormData] = useState ({
        fullname: '',
        email: '',
        password: '',
        password2: '',
        dob: '',
        address: '',
    })

    const {fullname, email, password, password2, dob, address} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-7 col-sm-12 m-auto'>
                <div className='row'>
                    <div className='col-12 bg1 rounded-corners p-5'>
                        <p className='reg-heading '><FaUser/>Register</p>
                        <p className='reg-msg'>Welcome to firefolio, your one stop Portfolio Manager</p>
                        <form onSubmit={onSubmit}>
                            <small id='emailHelp' className='form-text text-info'>We'll never share your details with anyone else.</small>

                            <div className='form-group my-3'>
                                <label for='fullname'>Full Name</label>
                                <input type='text' className='form-control' id='fullname' placeholder='Enter full name' name='fullname' onChange={onChange} value={fullname} />
					  	    </div>
                            <div className='form-group my-3'>
                                <label for='email'>Email address</label>
                                <input type='email' className='form-control' id='email' aria-describedby='emailHelp' placeholder='Enter email' name='email' onChange={onChange} value={email}/>
                            </div>
                            <div className='form-group my-3'>
                                <label for='password'>Password</label>
                                <input type='password' className='form-control' id='password' placeholder='Enter your password' name='password' onChange={onChange} value={password}/>
                            </div>
                                <div className='form-group my-3'>
                                <label for='password2'>Confirm Password</label>
                                <input type='Password' className='form-control' id='Password2' placeholder='Confirm your password' name='password2' onChange={onChange} value={password2}/>
                            </div>
                            <div className='form-group my-3'>
                                <label for='dob'>D.O.B</label>
                                <input type='text' className='form-control' id='dob' placeholder='dd/mm/yyyy' name='dob' onChange={onChange} value={dob}/>
                            </div>
                            <div className='form-group my-3'>
                                <label for='address'>Address</label>
                                <input type='text' className='form-control' id='address' placeholder='Enter your address' name='address' onChange={onChange} value={address}/>
                            </div>
                            <div className='form-group my-4'>
                                <button type='submit' className='btn btn-primary form-control'>REGISTER</button>
                            </div>                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register

