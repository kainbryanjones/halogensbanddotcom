import firebase from "firebase/app";
import "firebase/firestore";

import { Comment } from "../components/BlogCommentView/BlogCommentView";

const firebaseConfig = {
    apiKey: "AIzaSyAf_HXsmQ6vLlcd-B71h2toKQykxot4zO4",
    authDomain: "halogens-website-1666896999173.firebaseapp.com",
    projectId: "halogens-website-1666896999173",
    storageBucket: "halogens-website-1666896999173.appspot.com",
    messagingSenderId: "765225335783",
    appId: "1:765225335783:web:87e21a5cab55cc020e9b42",
    measurementId: "G-G0R2K5W7V0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
