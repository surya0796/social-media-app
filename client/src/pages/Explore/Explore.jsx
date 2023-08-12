import { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList"
import Navbar from "../../components/Navbar/Navbar";
import "./Explore.css"

const ExploreFeeds = ({ userId }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`https://social-media-node.onrender.com/social/post/all`)
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
        <div>
            <Navbar />
            <div className="explore__feeds">
                <PostList posts={posts} userId={userId} />

            </div>
        </div>
    )
}
export default ExploreFeeds