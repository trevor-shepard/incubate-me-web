import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '..'

import firebase, { auth, db } from 'utils/firebase'

export interface UserState {
	username: string | null
	email: string | null
	uid: string | null
	error: string | null
}

export interface User {
	username: string | null
	uid: string | null
	email: string | null
}

const initialState: UserState = {
	username: null,
	email: null,
	uid: null,
	error: null
}

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		recieveUser(state, action: PayloadAction<User>) {
			return (state = {
				...action.payload,
				error: null
			})
		},
		logout() {
			firebase.auth().signOut()
			return {
				username: null,
				email: null,
				uid: null,
				error: null
			}
		},
		userError(state, action: PayloadAction<string>) {
			state.error = action.payload
			return state
		}
	}
})

export const { recieveUser, userError, logout } = user.actions

export default user.reducer

export const login = (
	email: string,
	password: string
): AppThunk => async dispatch => {
	try {
		const uid = await auth
			.signInWithEmailAndPassword(email, password)
			.then(resp => {
				if (resp === null || resp.user === null) {
					throw new Error('user not found')
				} else {
					return resp.user.uid
				}
			})
		const user = (await db
			.collection('users')
			.doc(uid)
			.get()
			.then(doc => doc.data())) as User

		dispatch(recieveUser(user))
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const signup = (
	email: string,
	password: string,
	username: string
): AppThunk => async dispatch => {
	try {
		const uid = await auth
			.createUserWithEmailAndPassword(email, password)
			.then(resp => {
				if (resp === null || resp.user === null) {
					throw new Error('user not found')
				} else {
					return resp.user.uid
				}
			})
		await db
			.collection('users')
			.doc(uid)
			.set({
				email,
				username,
				uid
			})
		dispatch(
			recieveUser({
				email,
				username,
				uid
			})
		)
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const googleLogIn = (): AppThunk => async dispatch => {
	try {
		const provider = new firebase.auth.GoogleAuthProvider()
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(async result => {
				const googleUser = result.user
				if (!googleUser) throw Error('Google user not found')
				const { uid, email, displayName } = googleUser
				const user = (await db
					.collection('users')
					.doc(uid)
					.get()
					.then(doc => doc.data())) as User | null

				if (user) {
					dispatch(recieveUser(user))
				} else {
					await db
						.collection('users')
						.doc(uid)
						.set({
							email,
							username: displayName,
							uid
						})
					dispatch(
						recieveUser({
							email,
							username: displayName,
							uid
						})
					)
				}
			})
			.catch(error => {
				dispatch(userError(error.message))
			})
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const facebookLogIn = (): AppThunk => async dispatch => {
	try {
		const provider = new firebase.auth.FacebookAuthProvider()
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(async result => {
				const facebookUser = result.user
				if (!facebookUser) throw Error('Google user not found')
				const { uid, email, displayName } = facebookUser
				debugger
				const user = (await db
					.collection('users')
					.doc(uid)
					.get()
					.then(doc => doc.data())) as User | null

				if (user) {
					dispatch(recieveUser(user))
				} else {
					await db
						.collection('users')
						.doc(uid)
						.set({
							email,
							username: displayName,
							uid
						})
					dispatch(
						recieveUser({
							email,
							username: displayName,
							uid
						})
					)
				}
			})
			.catch(error => {
				dispatch(userError(error.message))
			})
	} catch (error) {
		dispatch(userError(error.message))
	}
}
