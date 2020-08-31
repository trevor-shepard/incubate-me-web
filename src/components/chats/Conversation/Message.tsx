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
	const expert = useSelector((state: RootState) => state.experts[senderID])

	if (uid === senderID)
		return (
			<UserMessageContainer>
				<UserMessage> {text} </UserMessage>
			</UserMessageContainer>
		)

	if (!expert) return null

	const photo = ExpertProfilePictures[expert.id]
	return (
		<ExpertMessageContainer>
			{photo && <ProfilePic src={photo} alt="" />}
			<ExpertMessage> {text} </ExpertMessage>
		</ExpertMessageContainer>
	)
}

const ExpertMessageContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 4%;
`
const UserMessageContainer = styled.div`
	display: flex;
	flex-direction: row-reverse;
	padding: 4%;
`
const UserMessage = styled.div`
	background: #dedede;
	border: 1px solid #dadada;
	box-sizing: border-box;
	border-radius: 6px;
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 0.8rem;
	color: #000000;
	padding-left: 2%;
	padding-right: 2%;
	display: flex;
	align-items: center;
	height: 40px;
	margin-left: 4%;
	min-width: 35px;
	text-align: center;
	vertical-align: middle;
`
const ExpertMessage = styled.div`
	background: #ffffff;
	border: 1px solid #dadada;
	box-sizing: border-box;
	border-radius: 6px;
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 0.8rem;
	color: #000000;
	padding-left: 2%;
	padding-right: 2%;
	display: flex;
	align-items: center;
	margin-left: 4%;
	min-height: 40px;
`
const ProfilePic = styled.img`
	border-radius: 50%;
	height: 40px;
	width: 40px;
`
export default MessageComponent
