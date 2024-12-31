import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostStats from './PostStats';
import formatDate from '../../utils/formatDate';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';
import edit from '../../assets/icons/edit.svg';
import { CLOUDINARY_URL } from '../../config/constants';

const PostCard = ({ post }) => {
  const {
    _id: postId,
    creator,
    caption,
    imgId,
    location,
    tags,
    createdAt,
  } = post;

  const { userInfo: signedInUser } = useSelector((state) => state.auth);

  if (!creator) {
    return;
  }

  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <Link to={`/${creator?.username}/profile`}>
            <img
              src={creator.profileImgId ? `${CLOUDINARY_URL}/${creator.profileImgId}` : profilePlaceholder}
              alt='creator'
              className='rounded-full w-12 lg:h-12'
            />
          </Link>
          <div className='flex flex-col '>
            <p className='base-medium lg:body-bold text-light-1'>
              {creator.fullName}
            </p>
            <div className='flex-center gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular'>
                {formatDate(createdAt)}
              </p>
              -<p className='subtle-semibold lg:small-regular'>{location}</p>
            </div>
          </div>
        </div>
        <Link
          to={`/posts/${postId}/edit`}
          className={`${signedInUser._id !== creator._id && 'hidden'}`}
        >
          <img src={edit} alt='edit' width={20} height={20} />
        </Link>
      </div>
      <Link to={`/posts/${postId}`}>
        <div className='small-medium lg:base-medium py-5'>
          <p>{caption}</p>
          <ul className='flex gap-1 mt-2'>
            {tags?.map((tag) => (
              <li key={tag} className='text-light-3'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        {imgId && (
          <img
            src={`${CLOUDINARY_URL}/${imgId}`}
            className='post-card-img'
            alt='post-img'
          />
        )}
      </Link>
      <PostStats post={post} userId={signedInUser._id} />
    </div>
  );
};

export default PostCard;
