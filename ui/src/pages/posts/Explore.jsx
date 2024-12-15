import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import {
  useGetInfinitePostsQuery,
  useSearchPostsQuery,
} from '../../redux/api/postApiSlice';
import Loader from '../../components/shared/Loader';
import GridPostList from '../../components/shared/GridPostList';
import { Input } from '@/components/ui/input';
import search from '../../assets/icons/search.svg';
import filter from '../../assets/icons/filter.svg';

const Explore = () => {
  const [searchText, setSearchText] = useState(''); // State to hold the search text
  const debouncedSearchText = useDebounce(searchText, 500); // Debounced search text
  const [page, setPage] = useState(1); // State to hold the current page number

  // Fetch posts based on debounced search text
  const {
    data: searchedPosts = [],
    isLoading: isSearching,
    error: searchError,
  } = useSearchPostsQuery(debouncedSearchText, { skip: !debouncedSearchText }); // Skip query when debouncedSearchText is empty

  // Fetch infinite posts if debouncedSearchText is empty
  const {
    data: { posts: infinitePosts = [], currentPage = 1, totalPages = 1 } = {},
    isLoading: isFetchingInfinitePosts,
    error: infinitePostsError,
  } = useGetInfinitePostsQuery(
    { page, limit: 10 },
    { skip: !!debouncedSearchText }
  ); // Skip query when debouncedSearchText is not empty

  // Determine whether to show search results or paginated posts
  const shouldShowSearchResults = !!debouncedSearchText; // Check if there is a debounced search text
  const posts = shouldShowSearchResults ? searchedPosts : infinitePosts; // Use searched posts or infinite posts based on search state

  // Infinite scroll logic using scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to the bottom of the page and not currently fetching
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2 &&
        !isFetchingInfinitePosts &&
        page < totalPages
      ) {
        setPage((prevPage) => prevPage + 1); // Increment the page number to fetch more posts
      }
    };

    window.addEventListener('scroll', handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the event listener on component unmount
    };
  }, [isFetchingInfinitePosts, page, totalPages]); // Re-run effect when isFetchingInfinitePosts, page, or totalPages changes

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Update search text state
    setPage(1); // Reset to the first page when performing a new search
  };

  return (
    <div className='explore-container'>
      <div className='explore-inner-container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img src={search} width={24} height={24} alt='search' />
          <Input
            placeholder='Search'
            className='explore-search'
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular Today</h3>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <img src={filter} width={20} height={20} alt='filter' />
        </div>
      </div>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {isSearching || isFetchingInfinitePosts ? (
          <Loader />
        ) : searchError || infinitePostsError ? (
          <p className=''>
            {searchError?.message || infinitePostsError?.message}
          </p>
        ) : (
          <>
            {posts.length > 0 ? (
              <GridPostList posts={posts} />
            ) : shouldShowSearchResults ? (
              <p className='text-light-4 mt-10 text-center w-full'>
                No results found.
              </p>
            ) : (
              <p className='text-light-4 mt-10 text-center w-full'>
                End of posts...
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Explore;
