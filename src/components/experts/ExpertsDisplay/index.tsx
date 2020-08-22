import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ExpertIcon from '../ExpertIcon'
import { Expert } from 'store/slices/expertsSlice'

interface ExpertsDisplayProps {
	experts: Expert[]
}

const Feature: FunctionComponent<ExpertsDisplayProps> = ({ experts }) => {
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
`

export default Feature
