import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import ChatListItem from 'components/ExpertUserComponents/ChatListItem'
import ChatDisplay from 'components/ExpertUserComponents/ChatDisplay'
const ExpertUserChat: FunctionComponent = () => {
	const [chatID, setChatID] = useState('')

	const selectChat = (chatID: string) => {
		return () => {
			setChatID(chatID)
		}
	}
	const chats = useSelector((state: RootState) => state.chats)

	const ChatListItems = Object.values(chats).map((chat, i) => (
		<ChatListItem
			selected={chatID === chat.id}
			handleSelect={selectChat(chat.id)}
			key={`${i}-key`}
			chat={chat}
		/>
	))

	return (
		<Container>
			<Sidebar>
				<Header>
					<HeaderTitle>Your Chats</HeaderTitle>
				</Header>
				<List>{ChatListItems}</List>
			</Sidebar>
			<ChatContainer>
				{chats[chatID] !== undefined && <ChatDisplay id={chatID} />}
			</ChatContainer>
		</Container>
	)
}
const Container = styled.div`
	overflow: none;
	display: flex;
	justify-content: row;
	height: 100%;
`

const Sidebar = styled.div`
	width: 20%;
	border-right: 1px solid #c4c4c4;
`

const ChatContainer = styled.div`
	height: 100%;
	width: 80%;
	height: calc(100% - 100px);
	position: relative;
`

const Header = styled.div`
	height: 10%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding: 10px;
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

export default ExpertUserChat
