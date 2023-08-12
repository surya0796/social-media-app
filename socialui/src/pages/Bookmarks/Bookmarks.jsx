import { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList"

const BookmarkFeeds = ({ user }) => {
    const [posts, setPosts] = useState([])
    const { _id: userId } = user
    useEffect(() => {
        fetch(`https://social-media-node.onrender.com/social/post/get-bookmarked-post/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setPosts(data.data)
                } else {
                    console.error(data.error)
                }
            });
    }, [])

    return (
        <PostList posts={posts} userId={userId} />
    )
}
export default BookmarkFeeds