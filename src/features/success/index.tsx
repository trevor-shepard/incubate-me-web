import React, { FunctionComponent, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { plans } from 'assets/data/servicesDetails'
import { subscribe } from 'store/slices/userSlice'

interface LocationSearch {
	sub_id: string
	plan: string
}

const Success: FunctionComponent = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const location = useLocation()

	const { plan } = location.search
		.slice(1)
		.split('&')
		.reduce((acc, curr) => {
			const [key, value] = curr.split('=')
			return {
				...acc,
				[key]:
					key === 'plan'
						? value
								.split('%20')
								.join('')
								.toLocaleLowerCase()
						: value
			}
		}, {}) as LocationSearch

	const { name } = plans[plan]

	debugger

	useEffect(() => {
		const handleSubscribe = async () => {
			await dispatch(subscribe(name))
			history.push('/')
		}
		handleSubscribe()
	}, [dispatch, history, name])

	return <> loading </>
}

export default Success
