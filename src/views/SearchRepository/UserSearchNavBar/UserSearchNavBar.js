import React, { useState } from "react"
import {
    CButton,
    CCollapse,
    CContainer,
    CFormInput,
    CNavbarToggler,
    CNavItem,
    CNavbar,
    CNavbarBrand,
    CNavbarNav
} from "@coreui/react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Pagination from "./Pagination/Pagination"

import "./UserSearchNavBar.css"

const UserSearchNavBar = props => {

    const {
        fetchMore,
        handleInput,
        paginationSettings,
        repositories,
        showPagination,
        username
    } = props

    const [visible, setVisible] = useState(false)

    return (
        <>
            <CNavbar expand="md" colorScheme="light" className="bg-light pt-0">
                <CContainer fluid>
                    <CNavbarBrand href="#">Repo Manager</CNavbarBrand>
                    <CNavbarToggler onClick={() => setVisible(!visible)} />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav className="navigation-bar">
                            <CNavItem>
                                <CFormInput
                                    type="search"
                                    className="me-2"
                                    placeholder="Search"
                                    value={username}
                                    onChange={e => handleInput(e.target.value)}
                                />
                            </CNavItem>
                            {
                                showPagination &&
                                <CNavItem>
                                    <Pagination fetchMore={fetchMore} paginationSettings={paginationSettings} />
                                </CNavItem>
                            }
                            {
                                repositories &&
                                <CNavItem>
                                    <CButton color="primary"><Link to="/create-repository">Create New Repository</Link></CButton>
                                </CNavItem>
                            }
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
        </>
    )
}

UserSearchNavBar.propTypes = {
    fetchMore: PropTypes.func.isRequired,
    handleInput: PropTypes.func.isRequired,
    paginationSettings: PropTypes.shape({
        endCursor: PropTypes.string,
        startCursor: PropTypes.string,
        hasNextPage: PropTypes.bool,
        hasPreviousPage: PropTypes.bool
    }),
    repositories: PropTypes.array,
    showPagination: PropTypes.bool,
    username: PropTypes.string
}

export default UserSearchNavBar