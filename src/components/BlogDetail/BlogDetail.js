import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";

import "./BlogDetail.css"

import blurryLogo from "../../assets/img/blurryLogo.png"

const BlogDetail = ({ post, onSelect, isLarge, isLatestPost }) => {

    const containerRef = useRef(null);

    const bgImageSrc = post.images ? post.images[0].url : blurryLogo;
    const published = post ? (new Date(post.published).toLocaleDateString()) : null;
    const labelsCommaSeperated = (post.labels) && post.labels.map((label, index) => {
        if (index === post.labels.length-1)
            return label;
        return label + ", "
    });

    useEffect(
        () => {
            if (isLarge) {
                containerRef.current.classList.add("large-card");
            }
        }
        , [])

    return (
        <div ref={containerRef} className="blog-container hvr-bounce-to-bottom" onClick={() => {
            onSelect(post);
        }}>
            {isLatestPost && <span className="latest-post"/>}
            <div className="card-image" style={{ backgroundImage: `url(${bgImageSrc})` }} />
            <h1 className="title">{post.title}</h1>
            <p className="labels">{labelsCommaSeperated}</p>
            <p className="published">{published}</p>
        </div>
    );
}

export default BlogDetail;