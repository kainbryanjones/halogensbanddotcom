import React from "react";
import AudioPlayer from "../../components/AudioPlayer/NewAudioPlayer";
import "./Music.css"

import { album1 } from "../../content/Albums/Album1";

const Music = () => {

    return (
        <div className="music-wrapper">
            <div className="music-title">
                <h1>Listen To The Whole Album Below!</h1>
            </div>
            <div className="audio-player-visualiser-wrapper">
                <AudioPlayer album={album1} />
            </div>
        </div>
    )
}

export default Music;