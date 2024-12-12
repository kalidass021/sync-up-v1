import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetSpecificPostQuery } from '../../redux/api/postApiSlice';
import PostStats from '../../components/shared/PostStats';
import Loader from '../../components/shared/Loader';
import formatDate from '../../utils/formatDate';
import { CLOUDINARY_URL } from '../../config/constants';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import { Button } from '@/components/ui/button';

const PostDetails = () => {
  const { id: postId } = useParams();
  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
  } = useGetSpecificPostQuery(postId);

  const { creator, caption, imgId, location, tags, createdAt } = post || {};
  const { userInfo } = useSelector((state) => state.auth);

  const handleDeletePost = () => {};

  if (isPostLoading) {
    return <Loader />;
  }

  return (
    <div className='post-details-container'>
      <div className='post-details-card'>
        <img
          src={`${CLOUDINARY_URL}/${imgId}`}
          alt='post'
          className='post-details-img'
        />
        <div className='post-details-info'>
          <div className='flex-between w-full'>
            <Link
              to={`/profile/${creator?._id}`}
              className='flex items-center gap-3'
            >
              <img
                src={creator?.profileImg || profilePlaceholder}
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
              >
                <img src={deleteIcon} alt='delete' width={24} height={24} />
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
              <PostStats post={post} userId={userInfo?._id}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
