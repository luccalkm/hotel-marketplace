// IMPORTS
import OAuth from '../components/OAuth'
import { useState } from 'react'
import {toast} from 'react-toastify'
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

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordAvailable, setPasswordAvailable] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    if(e.target.id === 'password'){
      if(e.target.value.length > 0  && e.target.value.length < 7){
        setPasswordAvailable(true)
      }else{
        setPasswordAvailable(false)
      }
    }
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
      toast.error('Sign up went wrong!')
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
            <input style={{marginBottom: passwordAvailable ? '0px' : '32px'}}
              className={!passwordAvailable ? 'passwordInput' : 'passwordInput invalidPasswordInput'}
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
            {passwordAvailable &&
            <p style={{margin: '20px', color: 'red', textAlign: 'center'}}>
              Password must be more than 6 characters.
            </p>}
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
        <OAuth></OAuth>
        <Link to='/sign-in' className='registerLink'>
          Sign In Instead!
        </Link>
      </div>
    </>
  )
}

export default SignUp
