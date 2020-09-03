import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ExpertIcon from '../ExpertIcon'
import { Expert } from 'store/slices/expertsSlice'

interface ExpertsDisplayProps {
	experts: Expert[]
}

const Feature: FunctionComponent<ExpertsDisplayProps> = ({ experts }) => {

	if (experts.length === 0) return <EmptyMessage>You haven’t added any experts to your business yet.</EmptyMessage>

	return (
		<ExpertsContainer>
			{experts.slice(0, 3).map((expert, i) => (
				<ExpertIcon key={`expert-icon-${i}`} expert={expert} />
			))}
		</ExpertsContainer>
	)
}

const ExpertsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 100%;
`
const EmptyMessage = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 22px;
	/* or 137% */

	letter-spacing: -0.408px;

	color: #696868;
`

export default Feature
