import React from "react"

import PropTypes from "prop-types"

import UserSearchNavBar from "./UserSearchNavBar/UserSearchNavBar"
import Repositories from "./Repositories/Repositories"


const SearchRepository = props => {

    const {
        error,
        fetchMore,
        handleInput,
        loading,
        paginationSettings,
        repositories,
        showPagination,
        username
    } = props

    return (
        <>
            <UserSearchNavBar
                handleInput={handleInput}
                paginationSettings={paginationSettings}
                repositories={repositories}
                showPagination={showPagination}
                username={username}
                fetchMore={fetchMore}
            />
            <Repositories
                error={error}
                loading={loading}
                repositories={repositories}
            />
        </>
    )
}

SearchRepository.propTypes = {

}

export default SearchRepository
