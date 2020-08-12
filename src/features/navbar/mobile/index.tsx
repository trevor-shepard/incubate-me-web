import React, { FunctionComponent, useEffect } from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import { Chat, Experts, Home, Profile } from 'assets/icons'

const MobileNav: FunctionComponent = () => {
	const { pathname } = useLocation()

	useEffect(() => window.scrollTo(0, 0), [pathname])

	return (
		<Navbar>
			<Tab current={pathname === '/'} to="/">
				<TabIcon src={Home} alt=" " />
				Home
			</Tab>
			<Tab current={pathname === '/experts'} to="/experts">
				<TabIcon src={Experts} alt=" " />
				Experts
			</Tab>
			<Tab current={pathname === '/chat'} to="/chat">
				<TabIcon src={Chat} alt=" " />
				Chat
			</Tab>
			<Tab current={pathname === '/profile'} to="/profile">
				<TabIcon src={Profile} alt=" " />
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
	opacity: 1;
	background-color: #ffff;
`
interface TabIconProps {
	current: boolean
}

const Tab = styled(Link)<TabIconProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	font-size: 10px;
	${({ current }) => current && 'border: 2px solid #e4bf7a'};
	padding: 5px;
	border-radius: 30px;
	height: 36px;
	width: 36px;
`

const TabIcon = styled.img`
	height: 20px;
	width: 20px;
`
