import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@apollo/client"

import { createRepositoryQuery } from "./functions/requestPreparations"

import { HITS_PER_PAGE } from "./appSettings"

const useApp = () => {

	const [searchParams, setSearchParams] = useSearchParams();

	const [skipQuery, setSkipQuery] = useState(true)
	const [username, setUsername] = useState("")

	const REPOSITORIES_QUERY = createRepositoryQuery(username)
	const { loading, error, data, fetchMore } = useQuery(REPOSITORIES_QUERY, { variables: { first: HITS_PER_PAGE, after: null }, skip: skipQuery })
	
	let repositories = data?.user?.repositories?.nodes
	const showPagination = data?.user?.repositories?.totalCount > HITS_PER_PAGE
	const paginationSettings = data?.user?.repositories?.pageInfo
	const userId = data?.user?.id

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

	const setUsernameIntoUrlParam = username => setSearchParams({ user: encodeURI(username) })

	const handleInput = username => {
		if (!username) {
			setUsername("")
			setUsernameIntoUrlParam("")
			repositories = null
			return
		}
		setUsername(username)
		setUsernameIntoUrlParam(username)
	}

    return {
        error,
        fetchMore,
        handleInput,
        loading,
        paginationSettings,
        repositories,
        showPagination,
        userId,
        username
    }
}

export default useApp