import React from 'react'
import {
    CPagination,
    CPaginationItem
} from '@coreui/react'
import PropTypes from 'prop-types'

import { HITS_PER_PAGE } from '../../../appSettings'

import "./Pagination.css"

const Pagination = ({ fetchMore, paginationSettings }) => {

    const {
        endCursor,
        startCursor,
        hasNextPage,
        hasPreviousPage
    } = paginationSettings

    const handlePreviousButtonClick = () => {
        fetchMore({
            variables: { before: startCursor, after: null, first: null, last: HITS_PER_PAGE },
            updateQuery: (prevResult, { fetchMoreResult }) => fetchMoreResult
        })
    }

    const handleNextButtonClick = () => {
        fetchMore({
            variables: { after: endCursor, before: null, first: HITS_PER_PAGE, last: null },
            updateQuery: (prevResult, { fetchMoreResult }) => fetchMoreResult
        })
    }

    return (
        <CPagination aria-label="Page navigation example">
            <CPaginationItem disabled={!Boolean(hasPreviousPage)} onClick={handlePreviousButtonClick}>Previous</CPaginationItem>
            <CPaginationItem disabled={!Boolean(hasNextPage)} onClick={handleNextButtonClick}>Next</CPaginationItem>
        </CPagination>
    )
}

Pagination.propTypes = {
    paginationSettings: PropTypes.shape({
        endCursor: PropTypes.string,
        totalCount: PropTypes.number,
        startCursor: PropTypes.string,
        hasNextPage: PropTypes.bool,
        hasPreviousPage: PropTypes.bool
    })
}

export default Pagination