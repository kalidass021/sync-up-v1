import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLikeOrUnlikePostMutation } from '../../redux/api/postApiSlice';
import like from '../../assets/icons/like.svg';
import liked from '../../assets/icons/liked.svg';
import save from '../../assets/icons/save.svg';
import saved from '../../assets/icons/saved.svg';

const PostStats = ({ post, userId }) => {
  const { _id: postId, likes: likesBefore } = post;
  const [likes, setLikes] = useState(likesBefore);

  const [likeOrUnlikePost, { error: likeError }] =
    useLikeOrUnlikePostMutation();

  // check is the post is liked by user or not
  const isLiked = likes.includes(userId);

  const handleLikePost = async (e) => {
    e.stopPropagation();
    // optimistic update for better ux
    // in updated likes code we're only updating the ui state not
    // without this code also like functionality will work
    // but it make interactions feel faster
    const updatedLikes = isLiked
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];
    setLikes(updatedLikes);
    try {
      // update the likes in the server
      const res = await likeOrUnlikePost(postId);
      setLikes(res.data); // sync state with server response
    } catch (err) {
      // revert optimistic update if server request fails
      setLikes(likesBefore);
      console.error(
        `Error while like or unlike the post ${likeError.message || err}`
      );
      toast.error(likeError.message || err);
    }
  };
  return (
    <div className='flex justify-between items-center z-20'>
      {/* like */}
      <div className='flex gap-2 mr-5'>
        <img
          src={isLiked ? liked : like}
          alt='like'
          width={20}
          height={20}
          onClick={handleLikePost}
          className='cursor-pointer'
        />
        <p className='small-medium lg:base-medium'>{likes.length}</p>
      </div>
      {/* save */}
      <div className='flex gap-2'>
        <img
          src={save}
          alt='save'
          width={20}
          height={20}
          onClick={() => {}}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
};

export default PostStats;
