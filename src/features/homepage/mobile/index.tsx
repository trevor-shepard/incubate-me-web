import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Logo from 'components/Logo'
import Logout from 'components/Logout'
const MobileHomepage: FunctionComponent = () => {
	const user = useSelector((state: RootState) => state.user)
	return (
		<>
			<Logo />
			<Logout />
			<Header>
				Hi {user.username}, select the service&#40;s&#41; you would like to have
			</Header>
		</>
	)
}

const Header = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #696868;
	width: 90%;
	padding: 16px;
	text-align: left;
	margin-top: 20px;
`

export default MobileHomepage
