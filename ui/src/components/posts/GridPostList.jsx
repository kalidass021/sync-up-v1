import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';
import { CLOUDINARY_URL } from '../../config/constants';
import postPlaceholder from '../../assets/images/post-placeholder.jpg';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';

const GridPostList = ({ posts, showUser, showStats }) => {
  const location = useLocation();
  // receiving props sent via link and navigate
  const {
    posts: statePosts,
    showUser: stateShowUser,
    showStats: stateShowStats,
  } = location.state || {};
  const { userInfo } = useSelector((state) => state.auth);

  posts = posts ?? statePosts;
  showUser = showUser ?? stateShowUser ?? true;
  showStats = showStats ?? stateShowStats ?? true;

  console.log('grid page posts', posts);

  if (!posts || !posts.length) {
    return <div>No posts available</div>;
  }

  return (
    <ul className='grid-container'>
      {posts.map((post) => (
        <li key={post._id} className='relative w-80 h-80'>
          <Link to={`/posts/${post._id}`} className='grid-post-link'>
            <img
              src={
                post.imgId ? `${CLOUDINARY_URL}/${post.imgId}` : postPlaceholder
              }
              alt='post'
              className='h-full w-full object-cover'
            />
          </Link>
          <div className='grid-post-user'>
            {showUser && (
              <div className='flex items-center justify-start gap-2 flex-1'>
                <img
                  src={
                    post.creator.profileImgId
                      ? `${CLOUDINARY_URL}/${post.creator.profileImgId}`
                      : profilePlaceholder
                  }
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
