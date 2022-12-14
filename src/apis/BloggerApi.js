import axios from "axios";

const BASE_URL = process.env.REACT_APP_BLOGGER_BASE_URL;

const BloggerAPIv3 = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 5000,
})

export const fetchPostById = async (userId, apiKey, postId) => {
    try {
        const { data } = await BloggerAPIv3.get(
            `${userId}/posts/${postId}?key=${apiKey}`,
            {
                params: {
                    fetchImages: true
                }
            }
        )
        return data;
    } catch (err) {
        alert(err);
        return null;
    }
}

export const fetchPosts = async (userId, apiKey) => {
    try {
        const { data } = await BloggerAPIv3.get(
            `${userId}/posts/?key=${apiKey}`,
            {
                params: {
                    fetchImages: true
                }
            })
        return data.items;
    } catch (err) {
        alert(err);
        return null;
    }
}