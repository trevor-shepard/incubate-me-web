import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ExpertProfilePictures from 'assets/images/experts'
import { Expert } from 'store/slices/expertsSlice'
interface Props {
	experts: Expert[]
	height?: string
	unseen?: number
}

const ChatIcon: FunctionComponent<Props> = ({ experts, height, unseen }) => {
	if (experts.length === 0) return null
	if (experts.length === 1)
		return (
			<Container>
				<ProfilePic
					height={height}
					src={experts[0].image}
					alt=""
				/>

				{unseen && unseen > 0 ? <Unseen>{unseen}</Unseen> : null}
			</Container>
		)
	return (
		<Container height={height}>
			<FrontPic src={experts[0].image} alt="" />
			<BackPic src={experts[1].image} alt="" />
			{unseen && unseen > 0 ? <Unseen>{unseen}</Unseen> : null}
		</Container>
	)
}

interface StyleProps {
	height?: string
}

const ProfilePic = styled.img<StyleProps>`
	border-radius: 50%;
	height: 100%;
	width: 100%; 
	height: ${({ height }) => (height ? height : '60px')};
	width: ${({ height }) => (height ? height : '60px')};
`

const Container = styled.div<StyleProps>`
	position: relative;
`
const Unseen = styled.div`
	position: absolute;
	top: -10px;
	right: -10px;
	font-size: 0.7em;
	background: green;
	color: white;
	width: 18px;
	height: 18px;
	text-align: center;
	line-height: 18px;
	border-radius: 50%;
	box-shadow: 0 0 1px #333;
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
