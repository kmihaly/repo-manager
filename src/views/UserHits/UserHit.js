import React from 'react'
import {
    CTableDataCell,
    CTableRow,
    CTableHeaderCell
} from '@coreui/react'
import PropTypes from 'prop-types'

const UserHit = props => {

    const { data, rowNumber } = props

    return (
        <CTableRow>
            <CTableHeaderCell scope="row">{rowNumber}</CTableHeaderCell>
            <CTableDataCell>Mark1</CTableDataCell>
            <CTableDataCell>Otto1</CTableDataCell>
            <CTableDataCell>@mdo1</CTableDataCell>
            <CTableDataCell>Mark2</CTableDataCell>
            <CTableDataCell>Otto2</CTableDataCell>
            <CTableDataCell>@mdo2</CTableDataCell>
        </CTableRow>
    )
}

UserHit.propTypes = {}

export default UserHit