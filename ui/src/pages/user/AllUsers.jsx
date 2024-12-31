import { toast } from 'sonner';
import UserCard from '../../components/shared/UserCard';
import Loader from '../../components/shared/Loader';
import { useFetchAllUsersQuery } from '../../redux/api/userApiSlice';

const AllUsers = () => {
  // todo: add search user functionality

  const {
    data: creators,
    isLoading,
    isError: creatorError,
  } = useFetchAllUsersQuery();

  if (creatorError) {
    return toast.error('Something went wrong');
  }
  return (
    <div className='common-container'>
      <div className='user-container'>
        <h2 className='h3-bold md:h2-bold text-left w-full'>All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className='user-grid'>
            {creators?.map((creator) => (
              <li key={creator._id} className='flex-1 min-w-[200px] w-full'>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
