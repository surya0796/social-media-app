import React, { useEffect, useState } from 'react'
import './SinglePost.css'
import { BiCommentDetail, BiSolidCommentDetail } from 'react-icons/bi'
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs'
import { AiOutlineLike, AiFillLike, AiOutlineEdit } from 'react-icons/ai'
import { calculateTimeAgo } from '../../utils/mainUtils'
import EditPost from '../EditPost/EditPost'

const SinglePost = ({ post, userId }) => {
  const { _id: postId, img, createdAt, likes, description, user } = post
  const { _id: currPostUserId, username, firstname, lastname, profileImage, bookmarks } = user
  const [timeAgo] = useState(calculateTimeAgo(createdAt))
  const [likeCount, setLikeCount] = useState(likes.length)
  const [currUserLike, setCurrUserLike] = useState(likes.includes(userId))
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.includes(postId))
  const [showEditModal, setShowEditModal] = useState(false)
  console.log(bookmarks);
  const handleLike = async () => {
    if (!userId) return
    try {
      const res = await fetch(`https://social-media-node.onrender.com/social/post/like-dislike-post/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId })
      })
      const message = await res.json()
    } catch (error) {
      console.log(error);
    }
    if (currUserLike) {
      setCurrUserLike(false)
      setLikeCount(likeCount - 1)
    } else {
      setCurrUserLike(true)
      setLikeCount(likeCount + 1)
    }
  }
  const handleBookmark = async () => {
    if (!userId) return
    try {
      const res = await fetch(`https://social-media-node.onrender.com/social/user/bookmark-post`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, postId: postId })
      })
      const message = await res.json()
      console.log(message);
    } catch (error) {
      console.log(error);
    }
    if (isBookmarked) setIsBookmarked(false)
    else setIsBookmarked(true)
  }
  const openEditModal = () => {
    setShowEditModal(true)
  }
  const closeEditModal = () => {
    setShowEditModal(false)
  }
  return (
    <div className='single-post-container'>
      <div className="single-post-userimg">
        <img src={profileImage} alt='Profile Pic' />
      </div>
      <div className="single-post-user-top-flex">
        <div className="single-post-userInfo">
          <div className='single-fullname'>{firstname && firstname[0].toUpperCase()}{firstname && firstname.substr(1)}{" "}{lastname}</div>
          <div className="single-username">@{username}</div>
          <div className='time-ago'>{timeAgo.days && `${timeAgo.days} days`} {" "}{!timeAgo.days && timeAgo.hours && `${timeAgo.hours} hours`} {" "}{!timeAgo.days && !timeAgo.hours && timeAgo.minutes && `${timeAgo.minutes} minutes`}</div>
        </div>
        <div className="single-post-lower-container">
          <div className="single-post-desc">{description}</div>
          <div className="single-post-image">
            {
              img.length > 0 && img.map((image) => {
                <img src={image} alt='single-post' className="single-post-img" />
              })
            }
          </div>
        </div>
        <div className="single-post-like-comment">
          <div onClick={handleLike} className="like__btn">
            {
              currUserLike ?
                <AiFillLike className='icons' />
                :
                <AiOutlineLike className='icons' />
            }
            <div className='like__count'>
              {likeCount} Likes
            </div>
          </div>
          <BiCommentDetail className='icons' />
          <div onClick={handleBookmark} className="bookmark__btn">
            {
              isBookmarked ?
                <BsBookmarkPlusFill className='icons' />
                :
                <BsBookmarkPlus className='icons' />
            }
          </div>
          {userId === currPostUserId && <AiOutlineEdit onClick={openEditModal} className='icons' />}
          {showEditModal && <EditPost userId={userId} handleCloseModal={closeEditModal} editPost={post} />}
        </div>
      </div>
    </div>
  )
}

export default SinglePost;