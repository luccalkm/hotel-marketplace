import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAVbCFUt_1rHpLpaOXP_R2xQxSQcHyIiWo',
  authDomain: 'hotel-app-f3690.firebaseapp.com',
  projectId: 'hotel-app-f3690',
  storageBucket: 'hotel-app-f3690.appspot.com',
  messagingSenderId: '495379455367',
  appId: '1:495379455367:web:0fbd6686488706cc290722',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
