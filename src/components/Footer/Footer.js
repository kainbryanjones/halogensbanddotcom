import React from "react";
import { SocialIcon } from 'react-social-icons';

import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-social">
                <SocialIcon  className="footer-icon" network="youtube" bgColor="transparent" fgColor="white" url="https://www.youtube.com/channel/UCfLUr7PepvV6_b08CV6MYNA" />
                <SocialIcon className="footer-icon" network="instagram" bgColor="transparent" fgColor="white" url="https://instagram.com/halogensband"/>
                <SocialIcon className="footer-icon" network="spotify" bgColor="transparent" fgColor="white" />
                <SocialIcon className="footer-icon" network="soundcloud" bgColor="transparent" fgColor="white" url="https://soundcloud.com/user-403925093"/>
                <SocialIcon className="footer-icon" network="itunes" bgColor="transparent" fgColor="white" />
            </div>
            <div className="footer-content">
            </div>
        </div>
    )
}

export default Footer;