import React, { useEffect, useRef, useState } from "react"

import { IconContext } from "react-icons";
import { TiArrowLoop, TiArrowShuffle } from "react-icons/ti";
import { MdPlayArrow, MdPause, MdFastForward, MdFastRewind } from "react-icons/md";
import { MdVolumeOff, MdVolumeMute, MdVolumeDown, MdVolumeUp } from "react-icons/md";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi"

import { Album, Track } from "../../utils/Music/Album/Album";
import { formatTimeFromSeconds } from "../../utils/Maths/Time/Time";

import "./AudioVisualiser.css"
import "./ProgressBar.css"
import "./AudioPlayer.css"
import { fixBlurryCanvas } from "../../utils/Music/Visualiser/Visualiser";
import { map } from "../../utils/Maths/General/General";

const AudioPlayer = ({ album }) => {

    const [currentTrack, setCurrentTrack] = useState(album.tracks.at(0));
    const [albumWillLoop, setAlbumWillLoop] = useState(false);

    const audioRef = useRef(null);

    const [audioCtx, setAudioCtx] = useState(null);
    const [mediaElement, setMediaElement] = useState(null);
    const [analyser, setAnalyser] = useState(null);

    useEffect(() => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioCtx(audioCtx);
        return (() => {

            if (audioCtx.state !== "closed")
                audioCtx.close();
        })
    }, [])

    useEffect(() => {
        if (audioCtx) {

            const mediaElement = audioCtx.createMediaElementSource(audioRef.current);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = Math.pow(2, 11); //2048

            mediaElement.connect(analyser);
            analyser.connect(audioCtx.destination);

            setMediaElement(mediaElement);
            setAnalyser(analyser);

            const handleContextClosed = () => {
                if (audioCtx.state === "closed") {
                    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    setAudioCtx(audioCtx);
                }
            }

            audioCtx.onstatechange = handleContextClosed;

            return (() => {
                audioCtx.onstatechange = null;
            })
        }
    }, [audioCtx])

    useEffect(() => {
        if (audioRef) {

            const audioWasPlaying = (!audioRef.current.paused) || audioRef.current.ended;
            const currentTrackIsFirst = album.tracks.indexOf(currentTrack) === 0;

            audioRef.current.pause();
            audioRef.current.load();

            //If the audio was already playing and the current track isn't the first track
            //then play. However if the current track is the first one then only play
            //if the "loop" option is selected.
            if (audioWasPlaying && (!currentTrackIsFirst || albumWillLoop)) {
                audioRef.current.play();
            }

        }
    }, [currentTrack])

    const resumeContext = () => {
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }
    }

    const incrementTrack = (incrementAmmount) => {
        const currentTrackIndex = album.tracks.indexOf(currentTrack);
        const nextTrackIndex = (currentTrackIndex + incrementAmmount) % album.tracks.length;
        const nextTrack = album.tracks.at(nextTrackIndex);
        setCurrentTrack(nextTrack);
    }

    return (
        <div className="audio-player-container">
            <audio id="audio" preload="metadata" ref={audioRef} >
                <source name="audioSrc" src={currentTrack.src} />
                Browser does not support audio.
            </audio>
            <AlbumView album={album} currentTrack={currentTrack} onTrackSelect={setCurrentTrack} />
            {audioCtx &&
                <>
                    <AudioPlayerInterface audioRef={audioRef} onTrackIncrement={incrementTrack} onLoopChanged={setAlbumWillLoop} albumWillLoop={albumWillLoop} onPlay={resumeContext} />
                    <AudioVisualiser analyser={analyser} spec={currentTrack.visualiserSpec} />
                </>
            }
        </div>
    )

}

const AlbumView = ({ album, currentTrack, onTrackSelect }) => {

    const TrackView = () => {

        const trackViewRef = useRef(null);

        return (
            <div
                ref={trackViewRef}
                className="at-top track-view-container"
                onScroll={(e) => {
                    const element = e.target;
                    //This will not return true if the content does not overflow
                    if ((element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth)) {
                        //If we scroll to the bottom
                        if (element.scrollTop > (element.scrollHeight - element.offsetHeight)) {
                            element.classList.add("at-bottom");
                        } else if (element.classList.contains("at-bottom")) {
                            element.classList.remove("at-bottom");
                        }

                        //If we scroll to the top
                        if (element.scrollTop === 0) {
                            element.classList.add("at-top");
                        } else if (element.classList.contains("at-top")) {
                            element.classList.remove("at-top");
                        }
                    }
                }}>
                <RenderedTracksList />
            </div>
        )
    }

    const TrackDetail = ({ track }) => {
        const index = album.tracks.indexOf(track);
        const indexDisplay = index + 1
        return (
            <li className={JSON.stringify(track) === JSON.stringify(currentTrack) ? "selected" : ""} key={track.title} onClick={() => {
                onTrackSelect(track)
            }}>
                {index < 10 ? "0" + indexDisplay : indexDisplay}: {track.title}
            </li>
        )
    }

    const RenderedTracksList = () => {

        return (
            <ul>
                {album.tracks.map(
                    (track) => {
                        return (
                            <div key={track.title} className="track-detail-wraper">
                                <div key={track.title} className="track-detail" >
                                    <TrackDetail className={track === currentTrack && "selected"} key={track.title} track={track} />
                                </div>
                            </div>
                        )
                    }
                )}
            </ul>
        )
    }

    return (
        <div className="album-view-container">
            <div className="album-view-artwork-wrapper">
                <img src={currentTrack.artworkUrl ? currentTrack.artworkUrl : album.artworkUrl} />
                <div className="album-view-title-container">
                    <h1>{album.artist}</h1>
                    <br />
                    <h2>{album.title}</h2>
                </div>
            </div>
            <TrackView />
        </div>
    )
}

/**
 * AudioPlayerInterface handles all audio functionality.
 * This component is only aware of an audio src
 * and all audio handling is encapsulated within this component.
 */
const AudioPlayerInterface = ({ audioRef, onTrackIncrement, onLoopChanged, onPlay, albumWillLoop }) => {

    const [currentTime, setCurrentTime] = useState(0);
    const [durationTime, setDurationTime] = useState(0);

    const [gain, setGain] = useState(1);

    const [isPlaying, setPlaying] = useState(false);
    /*
     */
    useEffect(() => {
        if (audioRef) {
            audioRef.current.onplay = handlePlay;
            audioRef.current.onpause = handlePause;
            audioRef.current.ontimeupdate = handleTimeUpdate;
            audioRef.current.onended = handleEnded;
            audioRef.current.onloadedmetadata = handleLoadedMetaData;
        }
        return (() => {
        })
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            //This method must be updated when the component rerenders because
            //otherwise it will not change track correctly
            audioRef.current.onended = handleEnded;
        }
    }, [onTrackIncrement])

    useEffect(() => {
        audioRef.current.volume = gain;
    }, [gain])

    const handlePlay = () => {
        setPlaying(true);
        onPlay();
    }

    const handlePause = () => {
        setPlaying(false);
    }

    const handleTimeUpdate = (e) => {
        setCurrentTime(e.target.currentTime);
    }

    const handleEnded = () => {
        setPlaying(false);
        onTrackIncrement(1);
    }

    const handleLoadedMetaData = (e) => {
        setDurationTime(e.target.duration);
    }

    const incrementCurrentTime = (seconds) => {
        if (audioRef.current.currentTime < 2 && seconds < 0) {
            onTrackIncrement(-1);
            return;
        }
        audioRef.current.currentTime += seconds;
    }

    const updateCurrentTime = (newCurrentTime) => {
        audioRef.current.currentTime = newCurrentTime
    }

    const VolumeIcon = ({ gain }) => {
        if (gain > 0.5) {
            return (<MdVolumeUp />);
        }
        if (gain > 0.1) {
            return (<MdVolumeDown />);
        }
        if (gain > 0) {
            return (<MdVolumeMute />);
        }
        return (<MdVolumeOff />);
    }


    return (
        <div className="audio-interface-wrapper">
            <div className="audio-interface-wrapper">
                <IconContext.Provider value={{ className: "clickable audio-interface-icon" }}>
                    <div className="play-pause icon-container">
                        {isPlaying ? <MdPause onClick={() => { audioRef.current.pause() }}>Pause</MdPause> : <MdPlayArrow onClick={() => { audioRef.current.play() }}>Play</MdPlayArrow>}
                    </div>
                    <div className="rewind-fastforward icon-container">
                        <MdFastRewind onClick={() => { incrementCurrentTime(-10) }}>- 10s</MdFastRewind>
                        10s
                        <MdFastForward onClick={() => { incrementCurrentTime(+10) }}>+ 10s</MdFastForward>
                    </div>
                    <div className="progress icon-container">
                        <input className="slider" value={currentTime} type="range" min={0} max={durationTime} onChange={(e) => { updateCurrentTime(e.target.value) }} />
                        {formatTimeFromSeconds(Math.round(currentTime))} / {formatTimeFromSeconds(Math.round(durationTime))}
                    </div>
                    <div className="prev-next-track icon-container">
                        <BiSkipPrevious onClick={() => { onTrackIncrement(-1) }}>Prev Track</BiSkipPrevious>
                        <BiSkipNext onClick={() => { onTrackIncrement(1) }}>Next Track</BiSkipNext>
                    </div>
                </IconContext.Provider>
                <div className="loop-shuffle icon-container">
                    <IconContext.Provider value={{ className: `${albumWillLoop && "toggled"} clickable audio-interface-icon` }}>
                        <TiArrowLoop onClick={(e) => { onLoopChanged(!albumWillLoop) }} />
                    </IconContext.Provider>
                </div>
                <div className="volume icon-container">
                    <IconContext.Provider value={{ className: "clickable audio-interface-icon" }}>
                        <VolumeIcon gain={audioRef.current ? audioRef.current.volume : 0} />
                        <input className="slider" type="range" defaultValue="100" min="0" max="100" step="1" onChange={(e) => {
                            setGain((e.target.value / 100).toFixed(2))
                        }} />
                    </IconContext.Provider>
                </div>
            </div>
        </div >
    )

}

const AudioVisualiser = ({ analyser, spec }) => {

    const canvasRef = useRef(null);
    const [canvasCtx, setCanvasCtx] = useState(null);

    useEffect(() => {
        if (canvasRef) {
            fixBlurryCanvas(canvasRef.current);
            setCanvasCtx(canvasRef.current.getContext("2d"));
        }
    }, [])

    useEffect(() => {
        if (spec && canvasCtx) {
            const draw = () => {
                canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                canvasCtx.fillStyle = spec.fillStyle;
                canvasCtx.strokeStyle = spec.strokeStyle;
                canvasCtx.lineWidth = spec.lineWidth;
                canvasCtx.shadowColor = "white";
                canvasCtx.shadowBlur = 0;

                const bufferLength = analyser.frequencyBinCount;
                const freqData = new Uint8Array(bufferLength);
                const waveformData = new Uint8Array(bufferLength);

                const HEIGHT = canvasRef.current.height;
                const WIDTH = canvasRef.current.width;

                analyser.getByteFrequencyData(freqData);
                analyser.getByteTimeDomainData(waveformData);

                //Used to display only a section of the frequency spectrum on the audio visualiser
                //If the max frequency displayed is roughly 20kHz then the max frequency shown after
                //division should roughly be 20k / frequencyGraphDivision, which here would be 20k/4
                //So roughly 5kHz
                const frequencyGraphDivision = 4;

                const barWidth = (WIDTH / bufferLength) * frequencyGraphDivision;

                var x = 0;
                freqData.forEach(datum => {
                    if (datum <= freqData.length / frequencyGraphDivision) {
                        const barHeight = map(datum, 0, 255, 0, HEIGHT);
                        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                        x += barWidth;
                    } else {
                        return;
                    }
                });

                canvasCtx.shadowBlur = 30;
                const sliceWidth = WIDTH / bufferLength;

                var x = 0;
                canvasCtx.beginPath();
                waveformData.forEach((datum, index) => {
                    const y = map(datum, 0, 255, 0, HEIGHT);
                    if (index === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }
                    x += sliceWidth;
                })
                canvasCtx.lineTo(WIDTH, HEIGHT / 2);
                canvasCtx.stroke();


            }
            const intervalId = setInterval(() => {
                draw();
            }, 1000 / 24);
            return (() => {
                clearInterval(intervalId);
            })
        }
    }, [canvasCtx, spec])

    return (<div className="audio-visualiser">
        <canvas ref={canvasRef} id="canvas" style={{ backgroundColor: "black" }} />
    </div>)

}

export default AudioPlayer