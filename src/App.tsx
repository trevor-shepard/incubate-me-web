import React from 'react'
import './styles/App.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './store'

import SignUp from './features/signup'
import Landing from './features/landing'

import { AuthRoute, ProtectedRoute } from './utils/routeUtils'

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Switch>
						<AuthRoute path="/signup" component={SignUp} />
						<ProtectedRoute path="/" component={Landing} />
					</Switch>
				</Router>
			</Provider>
		</div>
	)
}

export default App
