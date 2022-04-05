import React, { useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Routes, Route, useSearchParams } from "react-router-dom"
import { useQuery } from "@apollo/client"

import CreateRepository from "./views/CreateRepository/CreateRepository"
import ErrorFallback from "./components/ErrorFallback/ErrorFallback"
import SearchRepository from "./views/SearchRepository/SearchRepository"

import errorHandler from "./functions/errorHandler"
import useApp from "./useApp"

import "@coreui/coreui/dist/css/coreui.min.css"
import "./App.css"


function App() {

	const {
		error,
        fetchMore,
        handleInput,
        loading,
        paginationSettings,
        repositories,
        showPagination,
        userId,
        username
	} = useApp()

	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onError={errorHandler}
			onReset={() => window.location.reload()}
		>
			<>
				<main>
					<Routes>
						<Route
							path="/search-repository"
							element={
								<SearchRepository
									error={error}
									fetchMore={fetchMore}
									handleInput={handleInput}
									loading={loading}
									paginationSettings={paginationSettings}
									repositories={repositories}
									showPagination={showPagination}
									username={username}
								/>
							}
						/>
						<Route path="/create-repository" element={
							<CreateRepository username={username} userId={userId}/>
						}/>
						<Route path="/" element={
							<SearchRepository
								error={error}
								fetchMore={fetchMore}
								handleInput={handleInput}
								loading={loading}
								paginationSettings={paginationSettings}
								repositories={repositories}
								showPagination={showPagination}
								username={username}
							/>
						} />
					</Routes>
				</main>
			</>
		</ErrorBoundary>
	);
}

export default App;
