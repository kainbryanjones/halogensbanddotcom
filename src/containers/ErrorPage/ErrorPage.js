import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../utils/Hooks/useDocumentTitle";

const NotFound = () => {

    useDocumentTitle("Not Found");

    return (
        <div>
            Not Found
        </div>
    )
}

export default NotFound;