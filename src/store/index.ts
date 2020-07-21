import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import {  } from "firebase";
import rootReducer, { RootState } from './rootReducer'
import { getFirebase,  } from 'react-redux-firebase'
import { getFirestore } from 'redux-firestore'

const store = configureStore({
  middleware: getDefaultMiddleware({
      thunk: {
        extraArgument: {getFirebase, getFirestore},
      },
    }),
  reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
