import React from 'react'
import {
    CPagination,
    CPaginationItem
} from '@coreui/react'
import PropTypes from 'prop-types'

import "./Pagination.css"

const Pagination = props => {
    return (
        <div className='pagination-container'>
            <CPagination aria-label="Page navigation example">
                <CPaginationItem>Previous</CPaginationItem>
                <CPaginationItem>1</CPaginationItem>
                <CPaginationItem>2</CPaginationItem>
                <CPaginationItem>3</CPaginationItem>
                <CPaginationItem>Next</CPaginationItem>
            </CPagination>
        </div>
    )
}

Pagination.propTypes = {}

export default Pagination