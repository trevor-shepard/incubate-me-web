import React, { FunctionComponent } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

interface LocationState {
	state: {
		service: string
	}
}

const Success: FunctionComponent = () => {
	const history = useHistory()
	const location = useLocation() as LocationState

	return <> loading </>
}

export default Success
