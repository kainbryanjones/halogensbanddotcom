import React, { useEffect, useRef, useState } from "react"

import { IconContext } from "react-icons";
import { TiArrowLoop, TiArrowShuffle } from "react-icons/ti";
import { MdPlayArrow, MdPause, MdFastForward, MdFastRewind } from "react-icons/md";
import { MdVolumeOff, MdVolumeMute, MdVolumeDown, MdVolumeUp } from "react-icons/md";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi"

import { Album, Track } from "../../utils/Music/Album/Album";
import { formatTimeFromSeconds } from "../../utils/Maths/Time/Time";
import { useOutsideKeypressAlerter } from "../../utils/Hooks/useOutsideKeypressAlerter";

import "./AudioVisualiser.css"
import "./ProgressBar.css"
import "./AudioPlayer.css"
import { fixBlurryCanvas } from "../../utils/Music/Visualiser/Visualiser";
import { map } from "../../utils/Maths/General/General";
import { useNavigate } from "react-router-dom";

const AudioPlayer = ({ album }) => {

    //Stores Track object of currently selected track
    const [currentTrack, setCurrentTrack] = useState(album.tracks.at(0));
    //When album reaches track 0 this boolean determines whether the album will play
    const [albumWillLoop, setAlbumWillLoop] = useState(false);

    //Reference to the audio tag which stores the audio of the current Track's source
    const audioRef = useRef(null);

    //Web Audio API context and nodes
    const [audioCtx, setAudioCtx] = useState(null);
    const [mediaElement, setMediaElement] = useState(null);
    const [analyser, setAnalyser] = useState(null);

    const [audioIsLoading, setAudioLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        //Cross browser compatibility audio context setting
        // const AudioContext = window.webkitAudioContext || window.AudioContext || false;

        // if (AudioContext) {
        //     const audioCtx = new AudioContext;
        //     setAudioCtx(audioCtx);
        // } else {
        //     alert("Web audio is not supported on this browser.");
        //     navigate("/#/home");
        // }

        return (() => {
            if (audioCtx && audioCtx.state !== "closed") {
                audioCtx.close();
            }
        })

    }, [])

    useEffect(() => {
        if (audioCtx) {

            //Media element stores audio for current track
            const mediaElement = audioCtx.createMediaElementSource(audioRef.current);
            //Analyser provides frequency and waveform data to audio visualiser
            const analyser = audioCtx.createAnalyser();

            analyser.fftSize = Math.pow(2, 11); //2048

            //Audio graph connects(this can be updated later for further functionality)
            //mediaelement -> analyser -> destination
            mediaElement.connect(analyser);
            analyser.connect(audioCtx.destination);

            setMediaElement(mediaElement);
            setAnalyser(analyser);

            //Method to handle when the state of the 
            //audio context changes
            const handleAudioContextChanged = (e) => {
                //TODO
            }

            //"addEventListener"
            audioCtx.onstatechange = handleAudioContextChanged;

            return (() => {
                //"removeEventListener"
                audioCtx.onstatechange = null;
            })

        }
    }, [audioCtx])

    useEffect(() => {
        if (audioRef) {

            //Audio was playing if the audio wasn't paused or the audio reached the end of the track
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
        //Resumes the audio ctx time progression
        //i.e. it plays the audio
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }
    }

    const incrementTrack = (incrementAmmount) => {
        //Get index of current track
        const currentTrackIndex = album.tracks.indexOf(currentTrack);
        //increment the index by incrementAmmount
        //use "% album.tracks.length" to make sure index doesn't exceed length of array 
        const nextTrackIndex = (currentTrackIndex + incrementAmmount) % album.tracks.length;
        //Find the next track based on the new index and set the current track.
        const nextTrack = album.tracks.at(nextTrackIndex);
        setCurrentTrack(nextTrack);
    }

    const createAudioContext = () => {
        const AudioContext = window.webkitAudioContext || window.AudioContext || false;

        if (AudioContext) {
            const audioCtx = new AudioContext;
            setAudioCtx(audioCtx);
        } else {
            alert("Web audio is not supported on this browser.");
            navigate("/#/home");
        }
    }

    return (
        <div className="audio-player-container">
            <audio id="audio" preload="auto" ref={audioRef}
                onLoadStart={() => {
                    setAudioLoading(true);
                }}
                onCanPlay={() => {
                    setAudioLoading(false);
                }}>
                <source name="audioSrc" src={currentTrack.src} type="audio/mpeg" />
                Browser does not support audio.
            </audio>
            {audioCtx ?
                <>
                    <AlbumView album={album} currentTrack={currentTrack} onTrackSelect={setCurrentTrack} />
                    {audioIsLoading && <div style={{
                        width: "98%",
                        backgroundColor: "#60495A",
                        borderBottom: "1px red solid",
                        borderTop: "1px red solid",
                    }}>Loading...</div>}
                    <AudioPlayerInterface audioRef={audioRef} onTrackIncrement={incrementTrack} onLoopChanged={setAlbumWillLoop} albumWillLoop={albumWillLoop} onPlay={resumeContext} />
                    <AudioVisualiser analyser={analyser} spec={currentTrack.visualiserSpec} />
                </> :
                <>
                    <AlbumView album={album} currentTrack={currentTrack} onTrackSelect={() => { }} />
                    <button className="audioctx-init-button" onClick={createAudioContext} onTouchEnd={createAudioContext}>Click Here To Load Music Player</button>
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

    //Current time and duration time state are stored purely for display purposes in the audio interface.
    //They are stored here so that there is no unnecessary rerenders of other components. 
    const [currentTime, setCurrentTime] = useState(0);
    const [durationTime, setDurationTime] = useState(0);

    //Ref refers to the audio interface component
    //This is used to detect when a user presses a key outside of it.
    //Certain keys, such as space and arrow keys, provide playback functionality.
    const audioInterfaceRef = useRef(null);

    //Method that pauses/plays audio when space is pressed
    const onSpacebarPress = () => {
        if (audioRef.current) {
            if (!audioRef.current.paused)
                audioRef.current.pause();
            else
                audioRef.current.play();
        }
    }

    //Method that increments current time by 5 seconds when arrow keys(left and right) are pressed.
    const onArrowKeyPress = (arrowKey) => {
        if (audioRef.current) {
            switch (arrowKey) {
                case "l":
                    incrementCurrentTime(-5);
                    break;
                case "r":
                    incrementCurrentTime(5);
                    break;
            }
        }
    }

    /**
     * Custom hook used to detect keypresses outside of a certain ref.
     * Thank you Ben Bud of stackoverflow https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
     */
    const outsideKeypressAlerter = useOutsideKeypressAlerter(audioInterfaceRef, onSpacebarPress, onArrowKeyPress);

    //Gain of audio node. As of this version of the web player this state actually represents the volume and not the "gain", however
    //if I add more nodes to the audio graph then "gain" will be appropriate.
    const [gain, setGain] = useState(1);

    const [isPlaying, setPlaying] = useState(false);

    /*
     */
    useEffect(() => {
        if (audioRef.current) {
            //Equivalent to addEventListener
            audioRef.current.onplay = handlePlay;
            audioRef.current.onpause = handlePause;
            audioRef.current.ontimeupdate = handleTimeUpdate;
            audioRef.current.onloadedmetadata = handleLoadedMetaData;
        }
        return (() => {
            if (audioRef.current) {
                //Equivalent to removeEventListener
                audioRef.current.onplay = null;
                audioRef.current.onpause = null;
                audioRef.current.ontimeupdate = null;
                audioRef.current.onloadedmetadata = null;
            }
        })
    }, [])

    useEffect(() => {
        if (audioRef.current) {
            //This method must be updated when the component rerenders because
            //otherwise it will not change track correctly
            audioRef.current.onended = handleEnded;
        }
        return (() => {
            if (audioRef.current)
                audioRef.current.onended = null;
        })
    }, [onTrackIncrement])


    useEffect(() => {
        //Change volume when gain changes.
        //Gain varies from 0 to 1 where 0 is muted and 1 is 100% of the original volume.
        //When I later incorporate more nodes in to the audio graph then this will probably be a gain node.
        audioRef.current.volume = gain;
    }, [gain])

    const handlePlay = () => {
        setPlaying(true);
        audioRef.current.muted = false;
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
        //If the current time is less than 2 seconds into the track then the track will change
        //to the one before it.
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
        //Volume icon returns a different icon representing the current gain value
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
        <div ref={audioInterfaceRef} className="audio-interface-wrapper">
            <IconContext.Provider value={{ className: "clickable audio-interface-icon" }}>
                <div className="play-pause icon-container">
                    {isPlaying ? <MdPause onTouchEnd={() => { audioRef.current.pause() }} onClick={() => { audioRef.current.pause() }}>Pause</MdPause> : <MdPlayArrow onTouchEnd={() => { audioRef.current.play() }} onClick={() => { audioRef.current.play() }}>Play</MdPlayArrow>}
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