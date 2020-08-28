import React from 'react'
import './styles/App.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { useMediaQuery } from 'react-responsive'

import store from 'store'
import SignUp from 'features/signup'
import Homepage from 'features/homepage'
import Service from 'features/service'
import Success from 'features/success'
import Experts from 'features/experts'
import Expert from 'features/expert'
import Profile from 'features/profile'
import Chats from 'features/chats'
import Chat from 'features/chat'
import ChatsCreate from 'features/chats/create'

import { AuthRoute, ProtectedRoute } from './utils/routeUtils'
// import LinkedInPopUp from 'components/LinkedIn/LinkedInPopUp'

import MobileNav from 'features/navbar/mobile'
import DesktopNav from 'features/navbar/desktop'

export const persistor = persistStore(store)

function App() {
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	})
	return (
		<div className="App">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router>
						{!isTabletOrMobileDevice && (
							<ProtectedRoute component={DesktopNav} />
						)}
						<Switch>
							{/* <Route path="/linkedin" component={LinkedInPopUp} /> */}
							<AuthRoute path="/signup" component={SignUp} />
							<ProtectedRoute path="/service" exact component={Service} />
							<ProtectedRoute path="/success" exact component={Success} />
							<ProtectedRoute path="/expert" exact component={Expert} />
							<ProtectedRoute path="/experts" exact component={Experts} />
							<ProtectedRoute path="/profile" exact component={Profile} />
							<ProtectedRoute
								path="/chats/create"
								exact
								component={ChatsCreate}
							/>
							<ProtectedRoute path="/chats" exact component={Chats} />
							<ProtectedRoute path="/chat" exact component={Chat} />
							<ProtectedRoute path="/" component={Homepage} />
						</Switch>
						{isTabletOrMobileDevice && <ProtectedRoute component={MobileNav} />}
					</Router>
				</PersistGate>
			</Provider>
		</div>
	)
}

export default App
