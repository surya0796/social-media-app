import { useEffect, useState } from "react";
import "./AddPost.css";

const AddPost = ({ userId, handleCloseModal, editPost }) => {
  const [post, setPost] = useState({
    description: "",
    userId: userId,
  });

  const handlePostChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (editPost && Object.keys(editPost).length > 0) {
      const { description, userId } = editPost
      setPost({ description, userId })
    }
  }, [editPost])

  const handleAddPost = (e) => {
    //some validations
    e.preventDefault();
    fetch("https://social-media-node.onrender.com/social/post/create-post", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setPost({
            description: "",
            userId: userId,
          })
        }
      })
      .catch((err) => {
        console.err(err)
      })
  };
  return (
    <div className="add__post__container" style={{ position: handleCloseModal && "relative" }}>
      <img src="" className="logged__user__img" alt="Profile Pic" />
      {handleCloseModal && <span className="close__btn" onClick={handleCloseModal}>X</span>}
      <form onSubmit={handleAddPost} className="add__post">
        <textarea
          placeholder="Write something interesting..."
          className="post__data"
          name="description"
          value={post.description}
          onChange={handlePostChange}
          rows={6}
          cols="50"
        />
        <button className="submit__post">Post</button>
      </form>
    </div>
  );
};

export default AddPost;
