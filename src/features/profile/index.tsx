import React, { FunctionComponent } from 'react'
import { useMediaQuery } from 'react-responsive'
import Desktop from './Desktop'
import Mobile from './Mobile'
const Screen: FunctionComponent = () => {
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	})
	return isTabletOrMobileDevice ? <Mobile /> : <Desktop />
}

export default Screen
