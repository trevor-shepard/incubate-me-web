import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, googleLogIn } from 'store/slices/userSlice'
import { Link } from 'react-router-dom'

const SignUp: FunctionComponent = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleSignUp = () => {
		dispatch(login(email, password))
	}
	const handleGoogleSignIn = () => {
		dispatch(googleLogIn())
	}

	return (
		<>
			<label>
				Email:
				<input value={email} onChange={e => setEmail(e.target.value)} />
			</label>
			<label>
				Password:
				<input value={password} onChange={e => setPassword(e.target.value)} />
			</label>
			<button onClick={handleSignUp}>Submit</button>
			<div onClick={handleGoogleSignIn}>
				Login with google
			</div>
			<div>
				New to incubate-me? <Link to="/signup">signup</Link>{' '}
			</div>
		</>
	)
}

export default SignUp
