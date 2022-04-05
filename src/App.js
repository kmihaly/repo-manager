import React, { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Routes, Route, useNavigate, useSearchParams } from "react-router-dom"
import { useQuery } from "@apollo/client"

import CreateRepository from "./views/CreateRepository/CreateRepository"
import ErrorFallback from "./components/ErrorFallback/ErrorFallback"
import UserSearchNavBar from "./components/UserSearchNavBar/UserSearchNavBar"
import Repositories from "./views/Repositories/Repositories"

import { createRepositoryQuery } from "./functions/requestPreparations"
import errorHandler from "./functions/errorHandler"

import { HITS_PER_PAGE } from "./appSettings"

import "@coreui/coreui/dist/css/coreui.min.css"
import "./App.css"

function App() {

	const [searchParams, setSearchParams] = useSearchParams();
	const [skipQuery, setSkipQuery] = useState(true)
	const [username, setUsername] = useState("")
	const REPOSITORIES_QUERY = createRepositoryQuery(username)
	const { loading, error, data, fetchMore } = useQuery(REPOSITORIES_QUERY, { variables: { first: HITS_PER_PAGE, after: null }, skip: skipQuery })
	let repositories = data?.user?.repositories?.nodes
	const showPagination = data?.user?.repositories?.totalCount > HITS_PER_PAGE
	const paginationSettings = data?.user?.repositories?.pageInfo
	console.log('paginationSettings', paginationSettings)
	let navigate = useNavigate();

	useEffect(() => {
		const username = getUsernameFromUrl()
		if (username) {
			setUsername(username)
		}
		//eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (!username) {
			setSkipQuery(true)
		} else {
			setSkipQuery(false)
		}
	}, [username])

	const getUsernameFromUrl = () => {
		const usernameInUrl = searchParams.get("user")

		if (!usernameInUrl) {
			return "";
		}

		return usernameInUrl;
	}

	const setUsernameIntoUrlParam = username => setSearchParams({ user: username })

	const handleInput = username => {
		navigate("/search-repository", { replace: true });
		if (!username) {
			setUsername("")
			setUsernameIntoUrlParam("")
			repositories = null
			return
		}
		setUsername(username)
		setUsernameIntoUrlParam(username)
	}

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onError={errorHandler}
			onReset={() => window.location.reload()}
		>
			<>
				<UserSearchNavBar
					handleInput={handleInput}
					paginationSettings={paginationSettings}
					repositories={repositories}
					showPagination={showPagination}
					username={username}
					fetchMore={fetchMore}
				/>
				<main>
					<Routes>
						<Route
							path="/search-repository"
							element={
								<Repositories
									error={error}
									loading={loading}
									repositories={repositories}
								/>
							}
						/>
						<Route path="/create-repository" element={<CreateRepository />} />
						<Route path="/" element={
							<Repositories
								error={error}
								loading={loading}
								repositories={repositories}
							/>
						} />
					</Routes>
				</main>
			</>
		</ErrorBoundary>
	);
}

export default App;
