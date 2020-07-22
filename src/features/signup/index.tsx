import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signup } from '../../store/slices/userSlice'
const SignUp: FunctionComponent = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const handleSignUp = () => {
		dispatch(signup(email, password, username))
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
			<label>
				Username:
				<input value={username} onChange={e => setUsername(e.target.value)} />
			</label>
			<button onClick={handleSignUp}>Submit</button>
		</>
	)
}

export default SignUp
