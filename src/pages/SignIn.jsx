import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const auth = getAuth()

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
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
          </div>
          <Link className='forgotPasswordLink' to='/forgot-password'>
            Forgot Password
          </Link>
          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='white' width='34px' height='34px' />
            </button>
          </div>
        </form>
        {/* Google OAuth */}
        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead!
        </Link>
      </div>
    </>
  )
}

export default SignIn
