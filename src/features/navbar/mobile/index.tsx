import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import { Chat, Experts } from 'assets/icons'

const MobileNav: FunctionComponent = () => {

	const {pathname} = useLocation()

	return (
		<Navbar>
			<Tab to="/">
				<TabIcon  current={pathname === '/'} src={Chat} alt=" " />
				Home
			</Tab>
			<Tab to="/experts">
				<TabIcon src={Experts} current={pathname === '/experts'}  alt=" " />
				Experts
			</Tab>
			<Tab  to="/chat">
				<TabIcon current={pathname === '/chat'} src={Chat} alt=" " />
				Chat
			</Tab>
			<Tab to="/profile">
				<TabIcon current={pathname === '/profile'} src={Chat} alt=" " />
				Profile
			</Tab>
		</Navbar>
	)
}

export default MobileNav

const Navbar = styled.div`
	height: 60px;
	width: 100%;
	border-top: 1px solid #c4c4c4;
	display: flex;
	justify-content: space-around;
	align-items: center;
	position: fixed;
	bottom: 10px;
`
interface TabIconProps {
	current: boolean
}

const Tab = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	font-size: 10px;
	
`

const TabIcon = styled.img<TabIconProps>`
	height: 20px;
	width: 20px;
	background-color: ${({current}) => current ? '#e4bf7a' : 'transparent'};
`
