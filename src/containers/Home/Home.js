import React from "react";
import useDocumentTitle from "../../utils/Hooks/useDocumentTitle";
import "./Home.css";

const Home = () => {

    useDocumentTitle("Halogens")

    const YoutubeVideo = ({ youtubeId }) => {
        return (
            <iframe id="yt-player-featured" src={`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="" title="Halogens - Motorbike(Official Visualiser)" width="560" height="315" frameBorder="0"></iframe>
        );
    };

    return (
        <div className="home-container">
            <div className="title">
                <h1>Debut Album Out Now!</h1>
            </div>
            <div className="video-container">
                <div className="embed-container">
                    <YoutubeVideo youtubeId={"EvOKDmhkvk8"} />
                </div>
            </div>

        </div>
    )
}

export default Home;
