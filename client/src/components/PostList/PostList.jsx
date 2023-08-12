import SinglePost from "../SinglePost/SinglePost.jsx";
import "./PostList.css"

const PostList = ({ userId, posts, handleLikeOfPost }) => {
  return (
    <div className='single-post-main-container'>
      {posts.map((singlePost) => (
        <SinglePost key={singlePost._id} post={singlePost} handleLikeOfPost={handleLikeOfPost} userId={userId} />
      ))}
    </div>
  );
};

export default PostList;
