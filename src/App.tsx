import React from 'react'
import './styles/App.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import store from './store'
import SignUp from './features/signup'
import Login from './features/login'
import Landing from './features/landing'

import { AuthRoute, ProtectedRoute } from './utils/routeUtils'

let persistor = persistStore(store)

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router>
						<Switch>
							<AuthRoute path="/signup" component={SignUp} />
							<AuthRoute path="/login" component={Login} />
							<ProtectedRoute path="/" component={Landing} />
						</Switch>
					</Router>
				</PersistGate>
			</Provider>
		</div>
	)
}

export default App
