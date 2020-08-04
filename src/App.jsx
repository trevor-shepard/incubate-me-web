import React from 'react'
import './styles/App.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Global, css } from '@emotion/core'

import store from './store'
import SignUp from './features/signup'
import Login from './features/login'
import Landing from './features/landing'

import { AuthRoute, ProtectedRoute } from './utils/routeUtils'
import LinkedInPopUp from 'components/LinkedIn/LinkedInPopUp'

import MobileNav from 'features/navbar/mobile'

let persistor = persistStore(store)

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router>
						<Switch>
							<Route path="/linkedin" component={LinkedInPopUp} />
							<AuthRoute path="/signup" component={SignUp} />
							<AuthRoute path="/login" component={Login} />
							<ProtectedRoute path="/" component={Landing} />
						</Switch>
						<ProtectedRoute component={MobileNav} />
					</Router>
				</PersistGate>
			</Provider>
			<Global
				styles={css`
					.some-class {
					color: hotpink !important;
					}
				`}
				/>
		</div>
	)
}

export default App
