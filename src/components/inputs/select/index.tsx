import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface Option {
	value: string
	display: string
}

interface SelectInputProps {
	handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
	value: string
	options: Option[]
	label?: string
	height?: string
	width?: string
}

const SelectInput: FunctionComponent<SelectInputProps> = ({
	handleSelect,
	value,
	height,
	width,
	label,
	options
}) => {
	const optionElements = options.map(({ value, display }: Option) => (
		<option value={value}>{display}</option>
	))
	return (
		<Container width={width ? width : '90%'}>
			{label && <Label>{label}</Label>}
			<Select onChange={handleSelect} value={value}>
				{optionElements}
			</Select>
		</Container>
	)
}

type ContainerProps = {
	width: string
}

const Container = styled.div<ContainerProps>`
	width: ${props => props.width};
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`

const Select = styled.select`
	font-family: Poppins;
	font-weight: 400;
	font-style: normal;
	letter-spacing: 0em;
	text-transform: none;
	line-height: 1.9em;
`

const Label = styled.label`
	font-family: Poppins;
	font-weight: 400;
	font-style: normal;
	letter-spacing: 0em;
	text-transform: none;
	line-height: 1.9em;
`

export default SelectInput
