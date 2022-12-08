import React from "react";

const BlogCommentView = ({ comments }) => {

    const RenderedCommentView = comments.map(
        comment => {
            return (
                <div>
                    <h1>{comment.author}</h1>
                    <h2>{comment.published}</h2>
                    <p>{comment.content}</p>
                </div>
            )
        }
    )

    return (
        <div>
            {RenderedCommentView}
        </div>
    )
}

export class Comment {
    constructor(author, postId, content, published) {
        this.author = author;
        this.postId = postId;
        this.content = content;
        this.published = published;
    }
    toString() {
        return this.author + ', ' + this.postId + ', ' + this.content + ', ' + this.published;
    }
}

export default BlogCommentView;