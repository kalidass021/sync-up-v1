import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';
import { CLOUDINARY_URL } from '../../config/constants';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';

const GridPostList = ({ posts, showUser = true, showStats = true }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <ul className='grid-container'>
      {posts.map((post) => (
        <li key={post._id} className='relative w-80 h-80'>
          <Link to={`/posts/${post._id}`} className='grid-post-link'>
            <img
              src={`${CLOUDINARY_URL}/${post.imgId}`}
              alt='post'
              className='h-full w-full object-cover'
            />
          </Link>
          <div className='grid-post-user'>
            {showUser && (
              <div className='flex items-center justify-start gap-2 flex-1'>
                <img
                  src={post.creator.profileImg || profilePlaceholder}
                  alt='creator'
                  className='h-8 w-8 rounded-full '
                />
                <p className='line-clamp-1'>{post.creator.fullName}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={userInfo._id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
