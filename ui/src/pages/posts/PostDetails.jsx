import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  useGetSpecificPostQuery,
  useDeletePostMutation,
} from '../../redux/api/postApiSlice';
import PostStats from '../../components/shared/PostStats';
import Loader from '../../components/shared/Loader';
import { Button } from '@/components/ui/button';
import formatDate from '../../utils/formatDate';
import { CLOUDINARY_URL } from '../../config/constants';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';

const PostDetails = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: post,
    isLoading: isPostLoading,
    // error: postError,
  } = useGetSpecificPostQuery(postId);

  const [deletePost, { isLoading: deletingPost, error: deletePostError }] =
    useDeletePostMutation();

  if (isPostLoading) {
    return <Loader />;
  }

  const { creator, caption, imgId, location, tags, createdAt } = post || {};

  const handleDeletePost = async () => {
    try {
      const res = await deletePost(postId);
      if (res.data.message === 'Post removed successfully') {
        toast.success('Post removed');
        navigate('/');
      }
    } catch (err) {
      console.error(
        `Error while deleting the post: ${
          deletePostError?.message || err.message
        }`
      );
      toast.error('Failed to delete post');
    }
  };

  return (
    <div className='post-details-container'>
      <div className='post-details-card'>
        {imgId && (
          <img
            src={`${CLOUDINARY_URL}/${imgId}`}
            alt='post'
            className='post-details-img'
          />
        )}

        <div className='post-details-info'>
          <div className='flex-between w-full'>
            <Link
              to={`/${creator?.username}/profile`}
              className='flex items-center gap-3'
            >
              <img
                src={creator.profileImgId && `${CLOUDINARY_URL}/${creator.profileImgId}` || profilePlaceholder}
                alt='creator'
                className='rounded-full  w-9 h-9 lg:w-11 lg:h-11'
              />

              <div className='flex flex-col '>
                <p className='base-medium lg:body-bold text-light-1'>
                  {creator?.fullName}
                </p>
                <div className='flex-center gap-2 text-light-3'>
                  <p className='subtle-semibold lg:small-regular'>
                    {formatDate(createdAt)}
                  </p>
                  -
                  <p className='subtle-semibold lg:small-regular'>{location}</p>
                </div>
              </div>
            </Link>
            <div className='flex-center gap-4'>
              <Link
                to={`/posts/${postId}/edit`}
                className={creator?._id !== userInfo._id && 'hidden'}
              >
                <img src={editIcon} width={24} height={24} alt='edit' />
              </Link>
              <Button
                onClick={handleDeletePost}
                variant='ghost'
                className={`ghost-details-delete-btn ${
                  creator?._id !== userInfo?._id && 'hidden'
                }`}
                disabled={deletingPost}
              >
                {deletingPost ? (
                  <Loader />
                ) : (
                  <img src={deleteIcon} alt='delete' width={24} height={24} />
                )}
              </Button>
            </div>
          </div>
          <hr className='border w-full border-dark-4/80' />
          <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
            <p>{caption}</p>
            <ul className='flex gap-1 mt-2'>
              {tags?.map((tag) => (
                <li key={tag} className='text-light-3'>
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <div className='w-full'>
            <PostStats post={post} userId={userInfo?._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
