import React from 'react'

import {
    CAlert,
    CSpinner
} from '@coreui/react'
import PropTypes from 'prop-types'

import RepositoryTable from './RepositoryTable.js'

import "./Repositories.css"

const Repositories = props => {

    const {
        error,
        loading,
        repositories,
    } = props

    if (error?.message) {
        return (
            <CAlert color="danger">
                {error.message}
            </CAlert>
        )
    }

    if (loading) {
        return (
            <div className='spinner-container'>
                <CSpinner className='d-block' color="info" />
            </div>
        )
    }

    if (!repositories) {
        return (<CAlert color="primary">Please search for a username</CAlert>)
    }

    return (<RepositoryTable repositories={repositories} />)
}

Repositories.propTypes = {
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    repositories: PropTypes.array
}

export default Repositories