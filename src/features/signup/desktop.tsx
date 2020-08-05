import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { login } from 'store/slices/userSlice'

// import LinkedInButton from 'components/LinkedIn/LinkedInButton'
import { Link } from 'react-router-dom'
const SignUp: FunctionComponent = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleSignUp = () => {
		dispatch(login(email, password))
	}
	// const handleProviderLogin = (providerLogin: () => void) => () =>
	// 	dispatch(providerLogin())

	return (
		<>
			<Header>
				Sign up to get help on optimizing your business bottomline.
			</Header>
			<SubHeader>
				Solve all your finance and HR needs at your fingertip, with a flexible
				and connected team of accounting, HR, and finance experts accessible
				on-demand. Try it for FREE.
			</SubHeader>
			<label>
				Email:
				<input value={email} onChange={e => setEmail(e.target.value)} />
			</label>
			<label>
				Password:
				<input value={password} onChange={e => setPassword(e.target.value)} />
			</label>
			<button onClick={handleSignUp}>Submit</button>

			{/* <LinkedInButton
				clientId="81lx5we2omq9xh"
				onFailure={() => setError('error')}
				onSuccess={() => setError('')}
				redirectUri="http://localhost:3000/linkedin"
			 /> */}
			
			<div>
				New to incubate-me? <Link to="/signup">signup</Link>{' '}
			</div>
		</>
	)
}

const Header = styled.div`
	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #696868;
	width: 100%;
	padding: 16px;
	text-align: left;
	margin-top: 20px;
`

const SubHeader = styled.div`
	font-family: Poppins;
	font-style: normal;
	font-weight: 600;
	font-size: 15px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #696868;
	width: 100%;
	padding: 16px;
	text-align: left;
	margin-top: 20px;
`

export default SignUp
