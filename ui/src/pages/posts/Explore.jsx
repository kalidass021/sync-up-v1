import { useState, useEffect, useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import {
  useGetInfinitePostsQuery,
  // useLazyGetInfinitePostsQuery,
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

  const [
    searchPosts,
    { data: searchedPosts = [], isLoading: isSearching, error: searchError },
  ] = useLazySearchPostsQuery();
  // const [
  //   getInfinitePosts,
  //   {
  //     data: infinitePostsData = {},
  //     isLoading: isFetchingInfinitePosts,
  //     error: infinitePostsError,
  //   },
  // ] = useLazyGetInfinitePostsQuery();

  const {
    data: infinitePostsData = {},
    isLoading: isFetchingInfinitePosts,
    error: infinitePostsError,
  } = useGetInfinitePostsQuery(
    { page, limit: 9 },
    { skip: !!debouncedSearchText }
  ); // Skip query when debouncedSearchText is not empty

  const {
    posts: infinitePosts = [],
    currentPage = 1,
    totalPages = 1,
  } = infinitePostsData;

  const containerRef = useRef(null); // ref to the scrollable container
  const observerRef = useRef(null); // ref to the intersection observer target

  useEffect(() => {
    if (debouncedSearchText) {
      searchPosts(debouncedSearchText);
      setAllPosts([]);
    } else {
      setAllPosts([]);
      setPage(1);
    }
  }, [debouncedSearchText, searchPosts]);

  // useEffect(() => {
  //   if (!debouncedSearchText || !searchText) {
  //     setPage(1);
  //     getInfinitePosts({page, limit: 9});
  //   }
  // }, [searchText, debouncedSearchText, getInfinitePosts, page]);

  // append new posts to the existing posts, when infinite posts are fetched
  useEffect(() => {
    if (infinitePosts?.length > 0) {
      setAllPosts((prevPosts) => [...prevPosts, ...infinitePosts]);
    }
  }, [infinitePosts]);

  const shouldShowSearchResults = !!debouncedSearchText; // check if there is a debounced search text
  const posts = shouldShowSearchResults ? searchedPosts : allPosts;

  useEffect(() => {
    const handleObserver = (entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isFetchingInfinitePosts &&
        page < totalPages
      ) {
        setPage((prevPage) => prevPage + 1); // increment the page number to fetch more posts
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [page, totalPages, isFetchingInfinitePosts]);

  const handleSearch = (e) => {
    setSearchText(e.target.value); // update search text state
    setPage(1); // reset to the first page when performing a new search
    setAllPosts([]); // reset all posts when performing new serach
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
            {searchError?.message ||
              infinitePostsError?.message ||
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
        <div ref={observerRef} className=''>
          Fetching...
        </div>
      </div>
    </div>
  );
};

export default Explore;
