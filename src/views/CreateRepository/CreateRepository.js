import React from "react"
import {
	CAlert,
	CFormCheck,
	CFormLabel,
	CFormInput,
	CFormSelect,
	CFormTextarea,
	CButton
} from "@coreui/react"
import { useMutation } from "@apollo/client"
import PropTypes from "prop-types"

import Loading from "../../components/Loading/Loading"

import { createRepositoryMutation } from "../../functions/requestPreparations"

import "./CreateRepository.css"

const getFieldValue = id => document.querySelector(`#${id}`).value
const getCheckboxValue = id => document.querySelector(`#${id}`).checked

const collectData = () => {
	const fieldValues = {
		description: getFieldValue("description-field"),
		hasWikiEnabled: getCheckboxValue("has-wiki-enabled-field"),
		homepageUrl: encodeURI(getFieldValue("homepage-url-field")),
		name: getFieldValue("name-field"),
		visibility: getFieldValue("visibility-field")
	}

	return fieldValues
}

const CreateRepository = props => {
	const { userId, username } = props

	const REPOSITORY_MUTATION = createRepositoryMutation()

	const [createRepository, { data, loading, error }] = useMutation(REPOSITORY_MUTATION)

	const handleSubmit = () => {
		const dataToSend = collectData()
		createRepository({
			variables: { input: { ...dataToSend, ownerId: userId } }
		})
	}

	if (data?.createRepository?.repository?.name) {
		return (<CAlert color="success">
			{data.createRepository.repository.name} repository successfully created <br />
			<CButton color="primary"><a href="/search-repository">Return to repositories</a></CButton>
		</CAlert>)
	}

	if (error?.message) {
		return (
			<CAlert color="danger">
				{error.message}
			</CAlert>
		)
	}

	if (loading) {
		return (<Loading />)
	}

	if (!userId) {
		return (<CAlert color="danger">
			First find a user, than you can create a repository<br />
			<CButton color="primary"><a href="/search-repository">Find user</a></CButton>
		</CAlert>)
	}

	return (
		<div className="p-3 create-repository-container">
			<h1>Create Repository</h1>
			<h2>for {username}</h2>
			<div className="my-3">
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

CreateRepository.propTypes = {
	userId: PropTypes.string,
	username: PropTypes.string
}

export default CreateRepository