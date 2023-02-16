// IMPORTS
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../firebase.config'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

// COMPONENTS
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

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      // Connect to Firebase Auth
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // Create the user
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      // Set user data without its password and add timestamp
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      // Go home when logged in
      navigate('/')
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
