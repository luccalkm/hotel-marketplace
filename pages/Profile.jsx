import { getAuth, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../firebase.config'
import { updateDoc, doc} from 'firebase/firestore'

const Profile = () => {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  
  const {name, email} = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async() => {
    // Atualizar firebase
    try{
      if(auth.currentUser.displayName !== name){
        // Update display name in Firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // Update in Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }  
    }
    catch (error){
      toast.error('Could not update profile details.')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">{name}</p>
      <button className="logOut" type='Button' onClick={onLogout}>Logout</button>
    </header>
    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText" >
          Personal Details
        </p>
        <p className="changePersonalDetails" onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !prevState)
        }}>
        { changeDetails ? 'done' : 'change' }
        </p>
      </div>
      <div className="profileCard">
        <form>
          <label className='profileLabels' htmlFor="name">Name</label>
          <input 
          type="text" 
          id="name" 
          className={!changeDetails ? 'profileName' : 'profileInputActive' } 
          disabled={!changeDetails} 
          value={name} 
          onChange={onChange}
          />
          <label className='profileLabels' htmlFor="email">Email</label>
          <input 
          type="text" 
          id="email" 
          className={!changeDetails ? 'profileEmail' : 'profileInputActive' } 
          disabled={!changeDetails} 
          value={email} 
          onChange={onChange}
          />
        </form>
      </div>
    </main>
  </div>
}

export default Profile
