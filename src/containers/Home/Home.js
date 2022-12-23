import React from "react"
import Ratio from 'react-bootstrap/Ratio';
import useDocumentTitle from "../../utils/Hooks/useDocumentTitle";
import "./Home.css"

const Home = () => {

    useDocumentTitle("Halogens")

    /**
     * 
     *             <Ratio aspectRatio="16x9">
                <iframe width="1120" height="630" src={`https://www.youtube.com/embed/${youtubeId}?controls=0`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Ratio>
     */

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
                    <YoutubeVideo youtubeId={"5rdvEqnMQYQ"} />
                </div>
            </div>
        </div>
    )
}

export default Home;
