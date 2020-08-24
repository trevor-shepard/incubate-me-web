import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { useHistory } from 'react-router-dom'

import ChatListItem from 'components/chats/ChatListItem'

import Logo from 'components/Logo'
import { GroupChat } from 'assets/icons'
const ChatList: FunctionComponent = () => {
	const history = useHistory()
	const chats = Object.values(
		useSelector((state: RootState) => state.chats)
	).map((chat, i) => <ChatListItem key={`${i}-key`} chat={chat} />)

	return (
		<Container>
			<Logo />
			<Header>
				<HeaderTitle>Your experts</HeaderTitle>
				<ChatLogo
					src={GroupChat}
					alt=""
					onClick={() => history.push('/chats/create')}
				/>
			</Header>
			<List>{chats}</List>
		</Container>
	)
}
const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
`
const Header = styled.div`
	height: 10%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding: 5%;
	border-bottom: 1px solid #c4c4c4;
`

const HeaderTitle = styled.div`
	font-family: Arimo;
	font-style: normal;
	font-weight: normal;
	font-size: 1.2rem;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #000000;
`

const List = styled.div`
	display: flex;
	flex-direction: column;
`

const ChatLogo = styled.img`
	height: 26px;
	width: 26px;
`

export default ChatList
