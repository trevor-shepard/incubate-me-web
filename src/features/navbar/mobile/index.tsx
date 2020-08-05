import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import { Chat, Experts } from 'assets/icons'

const MobileNav: FunctionComponent = () => {

	const location = useLocation()

	debugger

	return (
		<Navbar>
			<Tab to="/">
				<TabIcon src={Chat} alt=" " />
				Home
			</Tab>
			<Tab to="/experts">
				<TabIcon src={Experts} alt=" " />
				Experts
			</Tab>
			<Tab to="/chat">
				<TabIcon src={Chat} alt=" " />
				Chat
			</Tab>
			<Tab to="/">
				<TabIcon src={Chat} alt=" " />
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

const Tab = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	font-size: 10px;
`

const TabIcon = styled.img`
	height: 20px;
	width: 20px;
`
