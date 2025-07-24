import { useGetRecentPostsQuery } from '../redux/api/postApiSlice';
import { useGetSuggestedUsersQuery } from '../redux/api/userApiSlice';
import { PostCardLoader } from '../components/skeleton/post';
import PostCard from '../components/posts/PostCard';
import UserCard from '../components/user/UserCard';
import Loader from '../components/shared/Loader';
import MemeCard from '../components/posts/MemeCard';

const Home = () => {
  const {
    data: recentPosts,
    isLoading: isPostLoading,
    error: postError,
  } = useGetRecentPostsQuery();

  console.log('recentPosts', recentPosts);

  const {
    data: creators,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetSuggestedUsersQuery();

  // console.log('creators', creators);

  if (postError || usersError) {
    return (
      <div className='flex flex-1'>
        <div className='home-container'>
          <p className='body-medium text-light-1'>Something went wrong</p>
        </div>
        <div className='home-creators'>
          <p className='body-medium text-light-1'>Something went wrong</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          {isPostLoading && !recentPosts ? (
            <PostCardLoader />
          ) : (
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {recentPosts?.map((post) => (
                <PostCard post={post} key={post._id} />
              ))}
            </ul>
          )}
        </div>
        {/* meme of the day */}
        <MemeCard />
      </div>
      {/* top creators */}
      <div className='home-creators'>
        <h3 className='h3-bold text-light-1'>Top Creators</h3>
        {isUsersLoading && !creators ? (
          <Loader />
        ) : (
          <ul className='grid 2xl:grid-cols-2 gap-6'>
            {creators.map((creator) => (
              <li key={creator._id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
