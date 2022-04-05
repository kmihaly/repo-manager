import React from 'react'
import {
    CAlert,
    CTable,
    CTableBody,
    CTableHead,
    CTableRow,
    CTableHeaderCell
} from "@coreui/react"
import PropTypes from 'prop-types'

import Repository from "./Repository.js"

const RepositoryTable = ({repositories}) => {

    return (
        <>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Is it a fork?</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Last commit date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Issue count</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Pull-request count</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {repositories.map((repository, index) => <Repository key={`repo-${index}`} data={repository} />)}
                </CTableBody>
            </CTable>
            {
                repositories.length === 0
                &&
                <CAlert color="warning">
                    This user has no repositories
                </CAlert>
            }
        </>
    )
}

RepositoryTable.propTypes = {
    repositories: PropTypes.array
}

export default RepositoryTable