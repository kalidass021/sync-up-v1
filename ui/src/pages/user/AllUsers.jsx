import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  useFetchAllUsersQuery,
  useLazySearchUsersQuery,
} from '../../redux/api/userApiSlice';
import useDebounce from '../../hooks/useDebounce';
import { Input } from '@/components/ui/input';
import UserCard from '../../components/user/UserCard';
import Loader from '../../components/shared/Loader';
import search from '../../assets/icons/search.svg';

const AllUsers = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);

  const {
    data: allUsers,
    isLoading,
    isError: creatorError,
  } = useFetchAllUsersQuery();

  const [searchUsers, { data: searchedUsers }] = useLazySearchUsersQuery();

  useEffect(() => {
    if (debouncedSearchText) {
      searchUsers(debouncedSearchText);
    }
  }, [debouncedSearchText, searchUsers]);

  const shouldShowSearchResults = !!debouncedSearchText;
  const creators = shouldShowSearchResults ? searchedUsers : allUsers;

  if (creatorError) {
    return toast.error('Something went wrong');
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    console.log({ searchText });
  };

  return (
    <div className='common-container'>
      <div className='explore-inner-container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Users</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img src={search} width={24} height={24} alt='search' />
          <Input
            placeholder='Search'
            className='explore-search'
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className='user-container'>
        <h2 className='body-bold md:h3-bold text-left w-full'>All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <>
            {(shouldShowSearchResults && !creators?.length) ? (
              <p className='text-light-4 mt-10 text-center w-full'>
                No creator found
              </p>
            ) : (
              <ul className='user-grid'>
                {creators?.map((creator) => (
                  <li key={creator._id} className='flex-1 min-w-[200px] w-full'>
                    <UserCard user={creator} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
