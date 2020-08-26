import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ExpertProfilePictures from 'assets/images/experts'

interface Props {
	expertIDs: string[]
	height?: string
	unseen?: number
}

const ChatIcon: FunctionComponent<Props> = ({ expertIDs, height, unseen }) => {
	if (expertIDs.length === 0) return null

	if (expertIDs.length === 1)
		return (
			<ProfilePic
				height={height}
				unseen={unseen ? unseen : 0}
				src={ExpertProfilePictures[expertIDs[0]]}
				alt=""
			/>
		)
	return (
		<MultiplePicContainer height={height} unseen={unseen ? unseen : 0}>
			<FrontPic src={ExpertProfilePictures[expertIDs[0]]} alt="" />
			<BackPic src={ExpertProfilePictures[expertIDs[1]]} alt="" />
		</MultiplePicContainer>
	)

	
}

interface StyleProps {
	height?: string
	unseen?: number
}

const ProfilePic = styled.img<StyleProps>`
	border-radius: 50%;
	height: ${({ height }) => (height ? height : '60px')};
	width: ${({ height }) => (height ? height : '60px')};
	&::after {
		${({ unseen }) =>
			unseen !== 0
				? `
		content:attr(${unseen});
		position:absolute;
		top:-10px;
		right:-10px;
		font-size:.7em;
		background:green;
		color:white;
		width:18px;height:18px;
		text-align:center;
		line-height:18px;
		border-radius:50%;
		box-shadow:0 0 1px #333;`
				: null}
	}
`

const MultiplePicContainer = styled.div<StyleProps>`
	position: relative;
	height: ${({ height }) => (height ? height : '60px')};
	width: ${({ height }) => (height ? height : '60px')};
	&::after {
		${({ unseen }) =>
			unseen !== 0
				? `
		content:attr(${unseen});
		position:absolute;
		top:-10px;
		right:-10px;
		font-size:.7em;
		background:green;
		color:white;
		width:10px;
		height:10px;
		text-align:center;
		line-height:18px;
		border-radius:50%;
		box-shadow:0 0 1px #333;`
				: null}
	}
`
const FrontPic = styled.img`
	position: absolute;
	z-index: 20;
	left: 10px;
	border-radius: 50%;
	height: 66%;
	width: 66%;
`
const BackPic = styled.img`
	z-index: 10;
	top: 10px;
	position: absolute;
	border-radius: 50%;
	height: 66%;
	width: 66%;
`

export default ChatIcon
