import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Message } from 'store/slices/conversationsSlice'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import ExpertProfilePictures from 'assets/images/experts'

interface Props {
	message: Message
}

const MessageComponent: FunctionComponent<Props> = ({
	message: { text, senderID }
}) => {
	const { uid } = useSelector((state: RootState) => state.user)
	const { id } = useSelector((state: RootState) => state.experts[senderID])

	if (uid === senderID) return <UserMessage> {text} </UserMessage>

	const photo = ExpertProfilePictures[id]

	return (
		<ExpertMessageContainer>
			<ProfilePic src={photo} alt="" />
			<ExpertMessage> {text} </ExpertMessage>
		</ExpertMessageContainer>
	)
}

const ExpertMessageContainer = styled.div``
const UserMessage = styled.div``
const ExpertMessage = styled.div``
const ProfilePic = styled.img`
	border-radius: 40px;
	height: 60px;
	width: 60px;
`
export default MessageComponent
