import React from 'react'
import {
    CAlert,
    CButton,
    CTable,
    CTableBody,
    CTableHead,
    CTableRow,
    CTableHeaderCell
} from '@coreui/react'

import UserHit from "./UserHit.js"
import Pagination from "./Pagination/Pagination"

import PropTypes from 'prop-types'

import "./UserHits.css"

const UserHits = props => {

    const { hits } = props

    return (
        <>
            {
                hits
                    ?
                    <>
                        <div className="hits-navigation">
                            <Pagination />
                            <CButton color="dark">Create New Repository</CButton>
                        </div>
                        <CTable>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Is it a fork?</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Last commit date</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Issue count</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Pull-request count</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {hits.map((hit, index) => <UserHit data={hit} rowNumber={index + 1} />)}
                            </CTableBody>
                        </CTable>
                        {
                            hits.length === 0
                            &&
                            <CAlert color="warning">
                                There is no user with the given name
                            </CAlert>
                        }
                    </>
                    :
                    <CAlert color="primary">Please search for a username in the navbar</CAlert>
            }
        </>
    )
}

UserHits.propTypes = {}

export default UserHits