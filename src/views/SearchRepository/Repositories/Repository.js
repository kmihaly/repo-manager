import React from 'react'
import {
    CTableDataCell,
    CTableRow,
    CTableHeaderCell
} from '@coreui/react'
import PropTypes from 'prop-types'

const forkConversion = {
    true: "Yes",
    false: "No"
}

const prepareRepositoryData = data => {
    const lastCommitDate = data.commitComments?.nodes[0]?.createdAt ?? null
    let createdAtDate = "-"
    if (lastCommitDate) {
        createdAtDate = new Date(lastCommitDate).toISOString().substring(0, 10)
    }

    const issueCount = data.issues?.totalCount ?? "0"
    const pullRequestsCount = data.pullRequests?.totalCount ?? "0"

    return [createdAtDate, issueCount, pullRequestsCount]
}

const navigateToRepo = url => window.open(url)

const Repository = props => {

    const { data } = props

    const [createdAtDate, issueCount, pullRequestsCount] = prepareRepositoryData(data)

    return (
        <CTableRow className="table-row" onClick={() => navigateToRepo(data.url)}>
            <CTableDataCell>{data.name}</CTableDataCell>
            <CTableDataCell>{data.description}</CTableDataCell>
            <CTableDataCell>{forkConversion[data.isFork]}</CTableDataCell>
            <CTableDataCell>{createdAtDate}</CTableDataCell>
            <CTableDataCell>{issueCount}</CTableDataCell>
            <CTableDataCell>{pullRequestsCount}</CTableDataCell>
        </CTableRow>
    )
}

Repository.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Repository