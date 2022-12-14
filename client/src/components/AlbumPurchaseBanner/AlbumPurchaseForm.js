import React from "react";

import coverart from "../../assets/img/album1/coverart.jpg"
import motorbike from "../../assets/img/album1/motorbikeart.jpeg"
import meshgrid from "../../assets/img/meshgrid.png"

import "./AlbumPurchaseBanner.css"

const AlbumPurchaseBanner = () => {
    return (
        <div>
            <div className="center-shadow image-wrapper" style={{
                backgroundImage: `url(${motorbike})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 65%",
            }} >
                <h1>Debut Album</h1>
                <img className="center-shadow album-artwork" src={coverart} />
                <h1>"Captain Mercy"</h1>
            </div>
        </div >
    )
}

export default AlbumPurchaseBanner;