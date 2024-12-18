import { useGetCurrentUserProfileQuery } from '../../redux/api/authApiSlice';
import GridPostList from '../../components/shared/GridPostList';
import Loader from '../../components/shared/Loader';
import save from '../../assets/icons/save.svg';

const SavedPosts = () => {
  const { data: currentUser, isLoading: userLoading } =
    useGetCurrentUserProfileQuery();

  if (!currentUser && !userLoading) {
    return <Loader />;
  }
  console.log('currentUser', currentUser);
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
        {!currentUser?.savedPosts?.length ? (
          <p className='text-light-4'>No posts available</p>
        ) : (
          <GridPostList posts={currentUser?.savedPosts} showUser={false} showStats={false} />
        )}
      </ul>
    </div>
  );
};

export default SavedPosts;
