import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { backArrow } from 'assets/icons'

const Icon: FunctionComponent = () => {
	const history = useHistory()
	return (
		<BackArrow onClick={history.goBack}>
			<Picture src={backArrow} alt="icon" />
			<Back>Back</Back>
		</BackArrow>
	)
}

const BackArrow = styled.div`
	display: flex;
	flex-direction: row;
	position: absolute;
	left: 15px;
	top: 20px;
`

const Picture = styled.img`
	height: 22.45;
	width: 10.12;
	padding-right: 8px;
`

const Back = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: bold;
	font-size: 17px;
	line-height: 22px;

	letter-spacing: -0.408px;
	color: #e4bf7a;
`

export default Icon
