import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import ExpertIconMobile from 'components/experts/ExpertListItemMobile'
import ExpertIconDesktop from 'components/experts/ExpertListItemDesktop'
import { Expert } from 'store/slices/expertsSlice'
import { useMediaQuery } from 'react-responsive'

interface ExpertsDisplayProps {
	experts: Expert[]
	handleSelect?: (id: string) => () => void
}

const Feature: FunctionComponent<ExpertsDisplayProps> = ({ experts, handleSelect }) => {
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	})
	return (
		<ExpertsContainer>
			{experts
				.slice(0, 3)
				.map((expert, i) =>
					isTabletOrMobileDevice ? (
						<ExpertIconMobile key={`${i}-expert-icon`} expert={expert} />
					) : (
						<ExpertIconDesktop handleSelect={handleSelect ? (handleSelect(expert.id)) : () => console.log('not gunna happen')} key={`${i}-expert-icon`} expert={expert}  />
					)
				)}
		</ExpertsContainer>
	)
}

const ExpertsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	border-top: 1px solid #dadada;
`

export default Feature
