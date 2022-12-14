import { Album, Track } from "../../utils/Music/Album/Album.js"
import { VisualiserSpec } from "../../utils/Music/Visualiser/Visualiser"

import audioSrc1 from "../../assets/audio/album1/01.mp3"
import audioSrc2 from "../../assets/audio/album1/02.mp3"
import audioSrc3 from "../../assets/audio/album1/03.mp3"
import audioSrc4 from "../../assets/audio/album1/04.mp3"
import audioSrc5 from "../../assets/audio/album1/05.mp3"
import audioSrc6 from "../../assets/audio/album1/06.mp3"
import audioSrc7 from "../../assets/audio/album1/07.mp3"
import audioSrc8 from "../../assets/audio/album1/08.mp3"
import audioSrc9 from "../../assets/audio/album1/09.mp3"

const visualiserSpec1 = new VisualiserSpec(10, "lightgray", "white");
const visualiserSpec2 = new VisualiserSpec(10, "yellow", "magenta");
const visualiserSpec3 = new VisualiserSpec(10, "cyan", "teal");
const visualiserSpec4 = new VisualiserSpec(10, "lightgreen", "lightyellow");
const visualiserSpec5 = new VisualiserSpec(10, "lime", "orange");
const visualiserSpec6 = new VisualiserSpec(10, "cyan", "lightgray");
const visualiserSpec7 = new VisualiserSpec(10, "lime", "green");
const visualiserSpec8 = new VisualiserSpec(10, "lightblue", "lightgray");
const visualiserSpec9 = new VisualiserSpec(10, "white", "cyan");

const ALBUM_ARTWORK = "https://i.imgur.com/6HcsE6V.jpeg"
const TRACK2_ARTWORK = "https://i.imgur.com/t3AoYGR.png"
const TRACK7_ARTWORK = "https://i.imgur.com/iVji4Vg.jpeg";
const TRACK9_ARTWORK = "https://i.imgur.com/TPVQiGq.jpeg"

const album1Tracks = [
    new Track("Intro", audioSrc1, visualiserSpec1),
    new Track("Motorbike", audioSrc2, visualiserSpec2, TRACK2_ARTWORK),
    new Track("DKH", audioSrc3, visualiserSpec3),
    new Track("Fake It 'til You Make It", audioSrc4, visualiserSpec4),
    new Track("Punchin' 'bove", audioSrc5, visualiserSpec5),
    new Track("Slide", audioSrc6, visualiserSpec6),
    new Track("Aberystwyth", audioSrc7, visualiserSpec7, TRACK7_ARTWORK),
    new Track("Story Time", audioSrc8, visualiserSpec8),
    new Track("Hypochondria", audioSrc9, visualiserSpec9, TRACK9_ARTWORK),
];

export const album1 = new Album(
    "Captain Mercy",
    "Halogens",
    ALBUM_ARTWORK,
    album1Tracks);