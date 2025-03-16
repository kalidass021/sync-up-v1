import { useGetCurrentUserProfileQuery } from '../../redux/api/authApiSlice';
import { useGetPostsByIdsQuery } from '../../redux/api/postApiSlice';
import GridPostList from '../../components/posts/GridPostList';
import Loader from '../../components/shared/Loader';
import save from '../../assets/icons/save.svg';

const SavedPosts = () => {
  const { data: currentUser, isLoading: userLoading } =
    useGetCurrentUserProfileQuery();

  const { data: savedPosts, isLoading: postsLoading } = useGetPostsByIdsQuery(
    currentUser?.savedPosts,
    {
      skip: !currentUser || userLoading || !currentUser.savedPosts.length,
    }
  );

  if (userLoading || postsLoading) {
    return <Loader />;
  }

  // console.log('savedPosts', savedPosts);

  return (
    <div className='saved-container'>
      <div className='flex gap-2 w-full max-w-5xl'>
        <img
          src={save}
          width={36}
          height={36}
          alt='save'
          className='invert-white'
        />
        <h2 className='h3-bold md:h2-bold text-left w-full'>Saved Posts</h2>
      </div>
      <ul className='w-full flex justify-center max-w-5xl gap-9'>
        {!savedPosts && !postsLoading ? (
          <p className='text-light-4'>No saved posts</p>
        ) : (
          <GridPostList posts={savedPosts} showStats={false} />
        )}
      </ul>
    </div>
  );
};

export default SavedPosts;
