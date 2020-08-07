import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useLocation } from 'react-router-dom'

const DesktopService: FunctionComponent = () => {
	const { search } = useLocation()

	return <Container></Container>
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
`

export default DesktopService
