import React from "react";
import { Parallax } from 'react-parallax';

import "./HeroImage.css"

const HeroImage = ({ imgSrc, children }) => {
    return (
        <Parallax blur={1} bgImage={imgSrc} bgImageAlt="background img" strength={-400} >
            <div className="parallax-img">{children}</div>
        </Parallax>
    );
}

export default HeroImage;