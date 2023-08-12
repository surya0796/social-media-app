import React, { useEffect, useState } from "react";
import AddPost from "../../components/AddPost/AddPost";
import PostList from "../../components/PostList/PostList";
import "./HomePage.css";

const HomePage = ({ user }) => {
  const { _id: userId } = user
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch(`https://social-media-node.onrender.com/social/post/timeline/all/${userId}`)
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
    <div className="main-homePage">
      <div className="post-feed-container">
        <AddPost userId={userId} />
        <div className="feed-card">
          <PostList posts={posts} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
