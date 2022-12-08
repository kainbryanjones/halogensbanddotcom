import React from "react";

import BlogDetail from "../BlogDetail/BlogDetail";

import "./BlogList.css"

const BlogList = ({ posts, onPostSelect }) => {

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

    const RenderedBlogDetails = posts.map((post, index) => {
        return (
            <BlogDetail post={post} key={post.id} onSelect={onPostSelect} isLarge={ index % randomIntFromInterval(3,4) === 0} isLatestPost={index === 0} />
        )
    })

    return (
        <div className="post-flex">
            {RenderedBlogDetails}
        </div>
    )
}

export default BlogList;

