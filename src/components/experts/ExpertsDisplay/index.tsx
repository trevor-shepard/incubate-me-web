import React, { FunctionComponent } from 'react'

interface ExpertsDisplayProps {
	experts: string[]
}

const Feature: FunctionComponent<ExpertsDisplayProps> = ({ experts }) => {
	return <>{experts.length}</>
}

export default Feature
