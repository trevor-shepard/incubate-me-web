import React, { FunctionComponent, useEffect, useState } from 'react'

interface OnSuccessProps {
	code: string
}

interface LinkedInProps {
	className?: string
	onFailure: (e: MessageEvent) => void
	onSuccess: (props: OnSuccessProps) => void
	onClick?: () => void
	disabled?: boolean
	clientId: string
	redirectUri: string
	renderElement?: () => void
	supportIE?: boolean
	state?: string
}

const LinkedIn: FunctionComponent<LinkedInProps> = (props: LinkedInProps) => {
	const {
		className,
		onFailure,
		onSuccess,
		onClick,
		disabled,
		clientId,
		redirectUri,
		state = 'fdsf78fyds7fm'
	} = props

	const [popup, setPopup] = useState<Window | null>(null)

	// replace component will unmount
	useEffect(() => {
		return () => {
			window.removeEventListener('message', receiveMessage, false)
			if (popup && !popup.closed) popup.close()
		}
	})

	const getUrl = (): string => {
		return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&scope=${encodeURI(
			'r_emailaddress w_share'
		)}&redirect_uri=${redirectUri}&state=${state}`
	}

	const receiveMessage = (event: MessageEvent) => {
		if (event.origin === window.location.origin) {
			if (event.data.errorMessage && event.data.from === 'Linked In') {
				// Prevent CSRF attack by testing state
				if (event.data.state !== state) {
					popup && popup.close()
					return
				}
				onFailure(event.data)
				popup && popup.close()
			} else if (event.data.code && event.data.from === 'Linked In') {
				// Prevent CSRF attack by testing state
				if (event.data.state !== state) {
					popup && popup.close()
					return
				}
				onSuccess({ code: event.data.code })
				popup && popup.close()
			}
		}
	}

	const handleConnectLinkedInClick = (event: React.MouseEvent) => {
		if (event) {
			event.preventDefault()
		}
		onClick && onClick()
		setPopup(window.open(getUrl(), '_blank', 'width=600,height=600'))
		window.removeEventListener('message', receiveMessage, false)
		window.addEventListener('message', receiveMessage, false)
	}

	return (
		<button
			type="button"
			onClick={handleConnectLinkedInClick}
			className={className}
			disabled={disabled}
		>
			<img
				src={require('./linkedin.png')}
				alt="Log in with Linked In"
				style={{ maxWidth: '180px' }}
			/>
		</button>
	)
}

export default LinkedIn
