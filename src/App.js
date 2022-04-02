import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route, Link, useNavigate, useSearchParams } from "react-router-dom"
import { useParams } from "react-router";

import CreateRepository from "./views/CreateRepository/CreateRepository"
import ErrorFallback from "./components/ErrorFallback/ErrorFallback"
import UserSearchNavBar from "./components/UserSearchNavBar/UserSearchNavBar"
import UserHits from "./views/UserHits/UserHits"
import { getUsersRepositories } from "./services/repositoryService"
import { errorHandler } from "./services/errorHandlingService"

import '@coreui/coreui/dist/css/coreui.min.css'
import './App.css';

function App() {
	const [username, setUsername] = useState("")
	const [searchParams, setSearchParams] = useSearchParams();
	
	useEffect(() => {
		setUsername(getUsernameFromUrl())
		getUsersRepositories(username)
	}, [])

	const getUsernameFromUrl = () => searchParams.get('user')
	const setUsernameIntoUrlParam = username => setSearchParams({ user: username })

	const handleInput = username => {
		setUsername(username)
		setUsernameIntoUrlParam(username)
	}

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			//onError={errorHandler}
			onReset={() => {
				// reset the state of your app so the error doesn't happen again
				TODO:
				console.info("RESETTING")
			}}
		>
			<>
				<UserSearchNavBar username={username} handleInput={handleInput} />
				<main>
					<Routes>
						<Route path="/search-repository" element={<UserHits hits={null} />} />
						<Route path="/create-repository" element={<CreateRepository />} />
						<Route path="/" element={<UserHits hits={null} />} />
					</Routes>
				</main>
			</>
		</ErrorBoundary>
	);
}

export default App;
