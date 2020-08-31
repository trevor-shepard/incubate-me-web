import React, { FunctionComponent } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Desktop from './desktop'
import Mobile from './mobile'
import ExpertUserChat from 'features/expertUserChat'
const Screen: FunctionComponent = () => {
	const { expert } = useSelector((state: RootState) => state.user)
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	})

	if (expert) return <ExpertUserChat />

	return isTabletOrMobileDevice ? <Mobile /> : <Desktop />
}

export default Screen
