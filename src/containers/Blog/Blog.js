import React, { useEffect, useState } from "react";
import { redirect, Route, Routes, useNavigate } from "react-router-dom";

import { fetchPosts } from "../../apis/BloggerApi"
import BlogList from "../../components/BlogList/BlogList";
import BlogView from "../../components/BlogView/BlogView"
import "./Blog.css"

const BLOGGER_API_KEY = process.env.REACT_APP_BLOGGER_API_KEY;
const BLOGGER_USER_ID = process.env.REACT_APP_BLOGGER_USER_ID;

const Blog = () => {

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const postNavigate = useNavigate();
    const [loadingPosts, setLoadingPosts] = useState(false);

    useEffect(() => {
        if (selectedPost) {
            postNavigate(`/blog/post/${selectedPost.id}`);
        }
    }, [selectedPost])

    useEffect(() => {
        getPosts(BLOGGER_USER_ID, BLOGGER_API_KEY);
    }, []);

    const getPosts = async () => {
        setLoadingPosts(true);
        const posts = await fetchPosts(BLOGGER_USER_ID, BLOGGER_API_KEY);
        setPosts(posts);
        setLoadingPosts(false);
    }

    return (
        <div>
            <h1>Halogens Blog</h1>
            <div className="blog-list-wrapper">
                {loadingPosts
                    ?
                    <h2>Loading...</h2>
                    :
                    posts && <BlogList posts={posts} onPostSelect={setSelectedPost} />
                }
            </div>

        </div>
    )
}

export default Blog;
