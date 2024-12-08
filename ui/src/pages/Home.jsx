import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetRecentPostsQuery } from '../redux/api/postApiSlice';
import PostCard from '../components/shared/PostCard';
import Loader from '../components/shared/Loader';

const Home = () => {
  const navigate = useNavigate();
  const { userInfo, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo && !loading) {
      navigate('/signin');
    }
  }, [loading, userInfo, navigate]);
  const {
    data: recentPosts,
    isLoading: isPostLoading,
    // error: postError,
  } = useGetRecentPostsQuery();

  console.log('recentPosts', recentPosts);
  // const isPostLoading = true;
  // const posts = null;
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          {isPostLoading && !recentPosts ? (
            <Loader />
          ) : (
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {recentPosts?.map((post) => (
                <PostCard post={post} key={post._id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
