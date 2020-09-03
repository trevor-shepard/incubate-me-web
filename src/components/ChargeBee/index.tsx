import React, { FunctionComponent, MouseEvent, useEffect } from 'react'

import styled from '@emotion/styled'

declare global {
	interface Window {
		Chargebee: any
	}
}

const ChargeBee: FunctionComponent<{ subscriptionPlan: string }> = ({
	subscriptionPlan
}) => {
	useEffect(() => {
		const el = document.createElement('script')
		el.onload = () => {
			window.Chargebee.init({
				site: 'incubate-me-test'
			})
		}
		el.setAttribute('src', 'https://js.chargebee.com/v2/chargebee.js')
		el.setAttribute('data-cb-site', 'incubate-me-test')
		document.body.appendChild(el)
		return () => {
			el.remove()
			window.Chargebee = undefined
		}
	}, [])

	const handleSubmit = (e: MouseEvent) => {
		e.preventDefault()
	}
	return (
		<Submit
			onClick={handleSubmit}
			data-cb-type="checkout"
			data-cb-plan-id={subscriptionPlan}
		>
			subscribe
		</Submit>
	)
}

const Submit = styled.div`
	font-family: Open Sans;
	background: #e4bf7a;
	border: 1px solid #dedede;
	box-sizing: border-box;
	width: 343px;
	height: 50px;
	font-style: normal;
	font-weight: bold;
	font-size: 17px;
	line-height: 22px;
	color: #ffffff;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	margin: 0 auto;
	margin-bottom: 22px;
	margin-top: 25px;
	&:hover{
		cursor: pointer;
	}
`

export default ChargeBee
