import React from "react"

import { CSpinner } from "@coreui/react"
import "./Loading.css"

const Loading = () => (<div className="spinner-container">
    <CSpinner className="d-block" color="info" />
</div>)

export default Loading
