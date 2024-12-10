import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  useLikeOrUnlikePostMutation,
  useSaveOrUnsavePostMutation,
} from '../../redux/api/postApiSlice';
import like from '../../assets/icons/like.svg';
import liked from '../../assets/icons/liked.svg';
import save from '../../assets/icons/save.svg';
import saved from '../../assets/icons/saved.svg';

const PostStats = ({ post, userId }) => {
  const { _id: postId, likes: likesBefore, saves: savesBefore } = post;
  
  const [likes, setLikes] = useState(likesBefore);
  const [saves, setSaves] = useState(savesBefore);

  const [likeOrUnlikePost, { error: likeError }] =
    useLikeOrUnlikePostMutation();
  const [saveOrUnsavePost, { error: saveError }] =
    useSaveOrUnsavePostMutation();

  // check is the post is liked by user or not
  const isLiked = likes.includes(userId);
  // check the post is saved by user or not
  const isSaved = saves.includes(userId);

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
      toast.error(`Error while like or unlike ${likeError.message || err}`);
    }
  };

  const handleSavePost = async (e) => {
    e.stopPropagation();
    // optimistic update
    const updatedSaves = isSaved
      ? saves.filter((id) => id !== userId)
      : [...saves, userId];
      setSaves(updatedSaves);

      try {
        // update the saves in the server
        const res = await saveOrUnsavePost(postId);
        setSaves(res.data); // sync state with server response
      } catch (err) {
        // revert optimistic update if server request fails
        setSaves(savesBefore);
        console.error(`Error while save or unsave post ${saveError.message || err}`);
        toast.error(`Error while save or unsave ${saveError.message || err}`);
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
          src={isSaved ? saved : save}
          alt='save'
          width={20}
          height={20}
          onClick={handleSavePost}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
};

export default PostStats;
