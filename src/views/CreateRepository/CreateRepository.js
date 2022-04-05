import React from 'react'
import {
	CFormCheck,
	CFormLabel,
	CFormInput,
	CFormSelect,
	CFormTextarea,
	CButton
} from '@coreui/react'
import PropTypes from 'prop-types'

//import { createRepository } from "../../hooks/useGetRepositories"
import "./CreateRepository.css"

const getFieldValue = id => document.querySelector(`#${id}`).value
const getCheckboxValue = id => document.querySelector(`#${id}`).checked

const handleSubmit = () => {
	const fieldValues = {
		description: getFieldValue("description-field"),
		hasWikiEnabled: getCheckboxValue("has-wiki-enabled-field"),
		homepageUrl: getFieldValue("homepage-url-field"),
		name: getFieldValue("name-field"),
		visibility: getFieldValue("visibility-field")
	}

	console.log('fieldValues', fieldValues)
	//createRepository(fieldValues)
}

const CreateRepository = props => {

	return (
		<div className='p-3 create-repository-container'>
			<div className="mb-3">
				<CFormLabel htmlFor="name-field">Name</CFormLabel>
				<CFormInput type="text" id="name-field" placeholder="e.g. My Repository" />
			</div>
			<div className="mb-3">
				<CFormLabel htmlFor="description-field">Description</CFormLabel>
				<CFormTextarea id="description-field" rows="5"></CFormTextarea>
			</div>
			<div className="mb-3">
				<CFormLabel htmlFor="homepage-url-field">Homepage url</CFormLabel>
				<CFormInput type="text" id="homepage-url-field" placeholder="e.g. https://mywebsite.com" />
			</div>
			<div className="mb-3">
				<CFormLabel htmlFor="visibility-field">Visibility</CFormLabel>
				<CFormSelect
					required
					aria-label="Select visibility"
					id="visibility-field"
					options={[
						{ label: "Public", value: "PUBLIC" },
						{ label: "Private", value: "PRIVATE" },
						{ label: "Internal", value: "INTERNAL" }
					]}
				/>
			</div>
			<div className="mb-5">
				<CFormCheck id="has-wiki-enabled-field" label="Is Wiki enabled" defaultChecked />
			</div>
			<CButton color="primary" onClick={handleSubmit} >Submit</CButton>
		</div>
	)
}

CreateRepository.propTypes = {}

export default CreateRepository