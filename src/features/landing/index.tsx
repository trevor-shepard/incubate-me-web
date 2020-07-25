import React, { FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { logout } from 'store/slices/userSlice'
const Landing: FunctionComponent = () => {
	const user = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()
	return (
		<>
			<div>{user.username}</div>
			<button onClick={()=> dispatch(logout())}>Logout</button>
		</>
	)
}

export default Landing
