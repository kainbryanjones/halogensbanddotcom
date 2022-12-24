import React from "react";
import HalogensLogo from "../../components/HalogensLogo/HalogensLogo";
import about from "../../assets/img/about.jpg"

import "./About.css"
import useDocumentTitle from "../../utils/Hooks/useDocumentTitle";

const About = () => {

    useDocumentTitle("About");

    return (
        <div>
            <meta name="description" content="Halogens is a music duo founded in 2022 in Aberystywth, Wales. We make electronic dance music with rock infused!"/>
            <div className="about-container">
                <div className="about-content">
                    <HalogensLogo />
                    <h1>About Us</h1>
                    <p>Halogens is a music duo founded in 2022 in Aberystywth, Wales. The project currently consists of
                        <br />
                        Kain Bryan-Jones on guitar/synth and Gwi Jones on vocals.
                    </p>
                    <p>
                        Halogens' debut album "Captain Mercy" is out now and available everywhere.<br />
                        It's a fusion of psychedelic indie rock and synth pop
                        and it's a fucking banger so check it out.
                    </p>
                    <p>
                        There's more music and more content to come, so be sure to follow our social media.
                        If you'd like to support us we have a <a href="https://www.paypal.me/halogensband" target="_blank">donation link</a> available.
                        We can't wait to release more content so stay tuned! &#128151;
                    </p>
                </div>
                <div className="about-image">
                    <img src={about} />
                </div>
            </div>
        </div>
    )
}

export default About;
