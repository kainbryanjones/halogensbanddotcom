import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser';

import { fetchPostById } from "../../apis/BloggerApi";
import BlogCommentView from "../BlogCommentView/BlogCommentView"

import "./BlogView.css"

import motorbike from "../../assets/img/album1/motorbikeart.jpeg"
import { useLocation } from "react-router-dom";

const BLOGGER_API_KEY = process.env.REACT_APP_BLOGGER_API_KEY;
const BLOGGER_USER_ID = process.env.REACT_APP_BLOGGER_USER_ID;

const BlogView = () => {

    const { postId } = useParams(null);

    const [post, setPost] = useState(null);
    const [postComments, setPostComments] = useState(null);

    const [publishedFormatted, setPublishedFormatted] = useState(null);
    const [labelsCommaSeperated, setLabelsCommaSeperated] = useState(null);
    const [parsedContentHTML, setParsedContentHTML] = useState(null);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    //This function needs to be moved to another class because
    //it is out of scope for what blogview is trying to do. And
    //this function will likely be called multiple times. Find 
    //a way to do it.
    const navigateToErrorPage = (errorCode) => {
        if (errorCode === 404) {
            navigate("/404", { replace: true });
        } else {
            navigate("/error", { replace: true });
        }
    }

    useEffect(() => {
        if (post) {
            setPublishedFormatted(new Date(post.published).toLocaleDateString());
            setLabelsCommaSeperated((post.labels) && post.labels.map((label, index) => {
                if (index === post.labels.length - 1)
                    return label;
                return label + ", "
            }));
            setParsedContentHTML(parse(post.content));
        }
    }, [post])

    useEffect(() => {
        if (postId) {
            getPostById(postId);
        }
    }, [postId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const getPostById = async (postId) => {
        const post = await fetchPostById(BLOGGER_USER_ID, BLOGGER_API_KEY, postId);
        setPost(post);
    }

    if (post) {
        return (
            <div className="blog-view-wrapper">
                <div className="blog-view-card">
                    <div className="blog-view-details" style={{
                        backgroundImage: `url(${motorbike})`,
                        backgroundPosition: "50% 105%",
                        backgroundAttachment: "fixed"
                    }}>
                        <h1>
                            {post.title}
                        </h1>
                        <h2>
                            {labelsCommaSeperated}
                        </h2>
                        <h3>
                            {publishedFormatted}
                        </h3>
                    </div>
                    <div className="blog-view-content">
                        {parsedContentHTML}
                    </div>
                </div>
                <div style={{ marginTop: "2.5%", minWidth: "100%" }}>
                    <a href={post && post.url} target="_blank" rel="noreferrer">Click here</a> to leave a comment
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>
                    Loading...
                </h1>
            </div>
        )
    }

}

export default BlogView;