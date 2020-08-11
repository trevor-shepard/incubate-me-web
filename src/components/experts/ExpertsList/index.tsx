import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ExpertIcon from 'components/experts/ExpertListItem'
import { Expert } from 'store/slices/expertsSlice'

interface ExpertsDisplayProps {
	experts: Expert[]
}

const Feature: FunctionComponent<ExpertsDisplayProps> = ({ experts }) => {
	return (
		<ExpertsContainer>
			{experts.slice(0, 3).map(expert => (
				<ExpertIcon expert={expert} />
			))}
		</ExpertsContainer>
	)
}

const ExpertsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
    width: 100%;
	border-top: 1px solid #DADADA;
`

export default Feature