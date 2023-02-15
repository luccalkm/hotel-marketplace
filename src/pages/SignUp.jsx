import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form>
          <input
            type='text'
            placeholder='Name'
            className='nameInput'
            id='name'
            value={name}
            onChange={onChange}
          />
          <input
            type='email'
            placeholder='Email'
            className='emailInput'
            id='email'
            value={email}
            onChange={onChange}
          />
          <div className='passwordInputDiv'>
            <input
              className='passwordInput'
              id='password'
              placeholder='Password...'
              value={password}
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
            />
            <img
              src={visibilityIcon}
              alt='showPassword'
              className='showPassword'
              onClick={() => {
                setShowPassword((prev) => !prev)
              }}
            />
            <input
              className='passwordInput'
              id='password'
              placeholder='Confirm password...'
              value={password}
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
            />
          </div>
          <Link className='forgotPasswordLink' to='/forgot-password'>
            Forgot Password
          </Link>
          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='white' width='34px' height='34px' />
            </button>
          </div>
        </form>
        {/* Google OAuth */}
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead!
        </Link>
      </div>
    </>
  )
}

export default SignUp
