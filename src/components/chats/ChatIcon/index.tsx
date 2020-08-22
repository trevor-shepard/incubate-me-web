import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ExpertProfilePictures from 'assets/images/experts'

interface Props {
	expertIDs: string[]
}

const ChatIcon: FunctionComponent<Props> = ({ expertIDs }) => {
	if (expertIDs.length === 0) return null

	if (expertIDs.length === 1)
		return <ProfilePic src={ExpertProfilePictures[expertIDs[0]]} alt="" />

	return (
		<MultiplePicContainer>
			<FrontPic src={ExpertProfilePictures[expertIDs[0]]} alt="" />
			<BackPic src={ExpertProfilePictures[expertIDs[1]]} alt="" />
		</MultiplePicContainer>
	)
}
const ProfilePic = styled.img`
	border-radius: 40%;
	height: 60px;
	width: 60px;
`

const MultiplePicContainer = styled.div``
const FrontPic = styled.img`
	border-radius: 50%;
	height: 40px;
	width: 40px;
`
const BackPic = styled.img`
	border-radius: 50%;
	height: 40px;
	width: 40px;
`

export default ChatIcon
