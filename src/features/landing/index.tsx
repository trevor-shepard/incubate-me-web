import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
const Landing: FunctionComponent = () => {
	const user = useSelector((state: RootState) => state.user)
	return (
		<>
			<div>{user.username}</div>
		</>
	)
}

export default Landing
