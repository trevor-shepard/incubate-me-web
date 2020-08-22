import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ExpertProfilePictures from 'assets/images/experts'

interface Props {
	expertIDs: string[]
	height?: string
}

const ChatIcon: FunctionComponent<Props> = ({ expertIDs, height }) => {
	if (expertIDs.length === 0) return null

	if (expertIDs.length === 1)
		return (
			<ProfilePic
				height={height}
				src={ExpertProfilePictures[expertIDs[0]]}
				alt=""
			/>
		)

	return (
		<MultiplePicContainer>
			<FrontPic src={ExpertProfilePictures[expertIDs[0]]} alt="" />
			<BackPic src={ExpertProfilePictures[expertIDs[1]]} alt="" />
		</MultiplePicContainer>
	)
}

interface HeightProp {
	height?: string
}

const ProfilePic = styled.img<HeightProp>`
	border-radius: 50%;
	height: ${({ height }) => (height ? height : '60px')};
	width: ${({ height }) => (height ? height : '60px')};
`

const MultiplePicContainer = styled.div<HeightProp>`
	height: ${({ height }) => (height ? height : '60px')};
	width: ${({ height }) => (height ? height : '60px')};
`
const FrontPic = styled.img`
	border-radius: 50%;
	height: 66%;
	width: 66%;
`
const BackPic = styled.img`
	border-radius: 50%;
	height: 66%;
	width: 66%;
`

export default ChatIcon
