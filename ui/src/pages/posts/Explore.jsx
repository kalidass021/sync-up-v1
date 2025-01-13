import { useState, useEffect, useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import {
  useLazyGetInfinitePostsQuery,
  useLazySearchPostsQuery,
} from '../../redux/api/postApiSlice';
import Loader from '../../components/shared/Loader';
import GridPostList from '../../components/shared/GridPostList';
import { Input } from '@/components/ui/input';
import search from '../../assets/icons/search.svg';
import filter from '../../assets/icons/filter.svg';

const Explore = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [isObserverInitialized, setIsObserverInitialized] = useState(false);
  const [isFetchingNewPosts, setIsFetchingNewPosts] = useState(false);

  const [
    searchPosts,
    { data: searchedPosts = [], isLoading: isSearching, error: searchError },
  ] = useLazySearchPostsQuery();

  const [
    fetchInfinitePosts,
    {
      data: infinitePostsData = {},
      isLoading: isFetchingInfinitePosts,
      error: infinitePostsError,
    },
  ] = useLazyGetInfinitePostsQuery();

  console.log('fetchingInfinitePosts', isFetchingInfinitePosts);

  const { posts: infinitePosts = [], totalPages = 1 } = infinitePostsData;

  const containerRef = useRef(null); // ref to the scrollable container
  const observerRef = useRef(null); // ref to the intersection observer target

  // Handle search text debouncing and initial fetching
  useEffect(() => {
    if (debouncedSearchText) {
      searchPosts(debouncedSearchText);
      setAllPosts([]); // Clear existing posts
      setPage(1); // Reset to first page
      setIsObserverInitialized(false); // Reset observer initialization
    } else {
      setAllPosts([]); // clear existing posts
      setPage(1); // reset to the first page
      setIsObserverInitialized(false); // reset observer
      fetchInfinitePosts({ page: 1, limit: 9 }); // fetch the first page
    }
  }, [debouncedSearchText, searchPosts, fetchInfinitePosts]);

  // Append new posts to the existing posts, when infinite posts are fetched
  useEffect(() => {
    if (infinitePosts?.length > 0) {
      setAllPosts((prevPosts) => {
        const newPosts = infinitePosts.filter(
          (post) =>
            !prevPosts.some((existingPost) => existingPost._id === post._id)
        );
        return [...prevPosts, ...newPosts];
      });
      if (!isObserverInitialized) {
        setIsObserverInitialized(true); // Set observer initialized once posts are appended
      }
    }
    // set is fetching posts to false once posts are appended
    setIsFetchingNewPosts(false);
  }, [infinitePosts, isObserverInitialized]);

  const shouldShowSearchResults = !!debouncedSearchText; // Check if there is a debounced search text
  const posts = shouldShowSearchResults ? searchedPosts : allPosts;

  // Set up IntersectionObserver to load more posts when scrolled to the bottom
  useEffect(() => {
    if (!isObserverInitialized || debouncedSearchText) {
      return;
    }
    const handleObserver = (entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isFetchingNewPosts &&
        !isFetchingInfinitePosts &&
        page < totalPages
      ) {
        setIsFetchingNewPosts(true); // set fetching posts true when starting to fetch new posts
        setPage((prevPage) => {
          const nextPage = prevPage + 1; // increment the page number to fetch more posts
          fetchInfinitePosts({page: nextPage, limit: 9}); // make api call to fetch next page
          return nextPage; // set the nextPage as page
        })
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [
    isObserverInitialized,
    page,
    totalPages,
    debouncedSearchText,
    isFetchingInfinitePosts,
    isFetchingNewPosts,
    fetchInfinitePosts,
  ]);

  // Handle search input change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value); // Update search text state
    if (!value.trim()) {
      // if search text is empty fetch initial posts
      console.log('value trim block executed');
      setPage(1);
      setAllPosts([]);
      setIsObserverInitialized(false); //
    }
  };

  return (
    <div ref={containerRef} className='explore-container'>
      <div className='explore-inner-container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img src={search} width={24} height={24} alt='search' />
          <Input
            placeholder='search'
            className='explore-search'
            value={searchText}
            onChange={handleSearch}
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
          <p>
            {searchError?.data?.message ||
              infinitePostsError?.data?.message ||
              'Something went wrong'}
          </p>
        ) : (
          <>
            {posts?.length > 0 ? (
              <GridPostList posts={posts} />
            ) : (
              shouldShowSearchResults && (
                <p className='text-light-4 mt-10 text-center w-full'>
                  No results found.
                </p>
              )
            )}
          </>
        )}
        <div ref={observerRef} className='mx-auto mt-4'>
          {isFetchingNewPosts && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Explore;
