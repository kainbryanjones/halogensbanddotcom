import React from "react";
import { SocialIcon } from 'react-social-icons';

import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-social">
                <SocialIcon className="footer-icon" network="youtube" bgColor="transparent" fgColor="white" url="https://www.youtube.com/@halogensband" />
                <SocialIcon className="footer-icon" network="instagram" bgColor="transparent" fgColor="white" url="https://instagram.com/halogensband" />
                <SocialIcon className="footer-icon" network="spotify" bgColor="transparent" fgColor="white" url="https://open.spotify.com/artist/3RAETi9Ml0yLpZmfRrnm0C" />
                <SocialIcon className="footer-icon" network="soundcloud" bgColor="transparent" fgColor="white" url="https://soundcloud.com/user-403925093" />
                <SocialIcon className="footer-icon" network="itunes" bgColor="transparent" fgColor="white" url="https://music.apple.com/gb/artist/halogens/1659241640"/>
            </div>
            <div className="footer-content">
            </div>
        </div>
    )
}

export default Footer;
