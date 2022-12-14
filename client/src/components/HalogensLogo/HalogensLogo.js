import React from "react";

import Image from 'react-bootstrap/Image'
import halogensLogo from "../../assets/img/logo.png"

import "./HalogensLogo.css"

const HalogensLogo = () => {
    return (
        <div className="logo">
            <img src={halogensLogo} />
        </div>
    )
}

export default HalogensLogo;