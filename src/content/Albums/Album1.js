import { Album, Track } from "../../utils/Music/Album/Album.js"
import { VisualiserSpec } from "../../utils/Music/Visualiser/Visualiser"

import audioSrc1 from "../../assets/audio/album1/01.wav"
import audioSrc2 from "../../assets/audio/album1/02.mp3"
import audioSrc3 from "../../assets/audio/album1/03.mp3"
import audioSrc4 from "../../assets/audio/album1/04.wav"
import audioSrc5 from "../../assets/audio/album1/05.mp3"
import audioSrc6 from "../../assets/audio/album1/06.mp3"
import audioSrc7 from "../../assets/audio/album1/07.mp3"
import audioSrc8 from "../../assets/audio/album1/08.mp3"
import audioSrc9 from "../../assets/audio/album1/09.mp3"

const visualiserSpec1 = new VisualiserSpec(2, "gray", "white");
const visualiserSpec2 = new VisualiserSpec(2, "yellow", "magenta");
const visualiserSpec3 = new VisualiserSpec(5, "blue", "cyan");
const visualiserSpec4 = new VisualiserSpec(4, "green", "yellow");
const visualiserSpec5 = new VisualiserSpec(2, "gold", "yellow");
const visualiserSpec6 = new VisualiserSpec(3, "blue", "gray");
const visualiserSpec7 = new VisualiserSpec(5, "brown", "green");
const visualiserSpec8 = new VisualiserSpec(4, "blue", "gray");
const visualiserSpec9 = new VisualiserSpec(2, "cyan", "white");

const albumArtworkUrl = "https://i.imgur.com/6HcsE6V.jpeg"

const album1Tracks = [
    new Track("Intro", audioSrc1, visualiserSpec1),
    new Track("Motorbike", audioSrc2, visualiserSpec2, "https://i.imgur.com/t3AoYGR.png"),
    new Track("DKH", audioSrc3, visualiserSpec3),
    new Track("Fake It 'til You Make It", audioSrc4, visualiserSpec4),
    new Track("Punchin' 'bove", audioSrc5, visualiserSpec5),
    new Track("Slide", audioSrc6, visualiserSpec6),
    new Track("Aberystwyth", audioSrc7, visualiserSpec7),
    new Track("Story Time", audioSrc8, visualiserSpec8),
    new Track("Hypochondria", audioSrc9, visualiserSpec9),
];

export const album1 = new Album(
    "Captain Mercy",
    "Halogens",
    albumArtworkUrl,
    album1Tracks);