import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from 'config/firebaseConfig'

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const db = firebase.firestore()
export default firebase
