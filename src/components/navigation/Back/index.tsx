import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { backArrow } from 'assets/icons'

interface Props {
	text?: boolean
	absolute?: boolean
}

const Icon: FunctionComponent<Props> = ({ text = true, absolute = true }) => {
	const history = useHistory()
	return (
		<BackArrow absolute={absolute} onClick={history.goBack}>
			<Picture src={backArrow} alt="icon" />
			{text && <Back>Back</Back>}
		</BackArrow>
	)
}

interface StyleProps {
	absolute: boolean
}

const BackArrow = styled.div<StyleProps>`
	display: flex;
	flex-direction: row;
	position: ${props => (props.absolute ? 'absolute' : 'relative')};
	${props => (props.absolute ? 'left: 15px;' : null)}
	${props => (props.absolute ? 'top: 20px;' : null)}
	&:hover {
		cursor: pointer;
	}
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
