import React, { useState } from 'react'
import {
    CButton,
    CCollapse,
    CContainer,
    CForm,
    CFormInput,
    CNavbarToggler,
    CNavItem,
    CNavLink,
    CNavbar,
    CNavbarBrand,
    CNavbarNav
} from '@coreui/react'
import PropTypes from 'prop-types'

import './UserSearchNavBar.css'

const UserSearchNavBar = props => {

    const { handleInput, username } = props
    const [visible, setVisible] = useState(false)

    return (
        <>
            <CNavbar expand="sm" colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CNavbarBrand href="#">Repo Manager</CNavbarBrand>
                    <CNavbarToggler onClick={() => setVisible(!visible)} />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        {/* <CNavbarNav>
                            <CNavItem>
                                <CNavLink href="#" active>
                                    Home
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav> */}
                        <CNavbarNav>
                            <CNavItem>
                                <CForm className="d-flex">
                                    <CFormInput type="search" className="me-2" placeholder="Search" value={username} onChange={e => handleInput(e.target.value)}/>
                                    <CButton type="submit" color="success" variant="outline">
                                        Search
                                    </CButton>
                                </CForm>
                            </CNavItem>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
        </>
    )
}

UserSearchNavBar.propTypes = {}

export default UserSearchNavBar