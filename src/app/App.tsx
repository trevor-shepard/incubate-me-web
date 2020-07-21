import React from 'react';
import '../styles/App.css';
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'
import fbConfig from "../config/firebase";
import store from '../store'
import { createFirestoreInstance } from 'redux-firestore' // <- needed if using firestore

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

firebase.initializeApp(fbConfig)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <div>
            hello
          </div>
        </ReactReduxFirebaseProvider>
      </Provider>
    </div>
  );
}

export default App;
