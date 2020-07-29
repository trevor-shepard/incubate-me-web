import React, { FunctionComponent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, googleLogIn, facebookLogIn } from 'store/slices/userSlice'
import LinkedInButton from 'components/LinkedIn/LinkedInButton'
import { Link } from 'react-router-dom'
const SignUp: FunctionComponent = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const handleSignUp = () => {
		dispatch(login(email, password))
	}
	const handleProviderLogin = (providerLogin: () => void) => () =>
		dispatch(providerLogin())



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
			<div onClick={handleProviderLogin(googleLogIn)}>Login with google</div>
			<div onClick={handleProviderLogin(facebookLogIn)}>
				Login with facebook
			</div>
			<LinkedInButton
				clientId="81lx5we2omq9xh"
				onFailure={() => setError('error')}
				onSuccess={() => setError('')}
				redirectUri="http://localhost:3000/linkedin"
			 />
			<div>{error}</div>
			<div>
				New to incubate-me? <Link to="/signup">signup</Link>{' '}
			</div>
		</>
	)
}

export default SignUp
