import React from "react";
import AudioPlayer from "../../components/AudioPlayer/NewAudioPlayer";
import "./Music.css"

import { album1 } from "../../content/Albums/Album1";
import useDocumentTitle from "../../utils/Hooks/useDocumentTitle";

const Music = () => {

    useDocumentTitle(album1.title)

    return (
        <div className="music-wrapper">
            <div className="music-title">
            </div>
            <div className="audio-player-visualiser-wrapper">
                <AudioPlayer album={album1} />
            </div>
        </div>
    )
}

export default Music;