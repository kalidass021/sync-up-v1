import { Skeleton } from '@/components/ui/skeleton';

const PostCardLoader = () => {
  return (
    <div className='post-card space-y-4'>
      {/* Header: Profile avatar and username */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* Profile avatar circle */}
          <Skeleton className='rounded-full w-12 h-12 bg-dark-4' />

          {/* Username circle */}
          <Skeleton className='rounded-full w-32 h-6 bg-dark-4' />
        </div>
        <Skeleton className='w-5 h-5 rounded-md bg-dark-4' />
      </div>

      {/* Text content */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-[60%]' />
        <div className='flex gap-2 mt-2'>
          <Skeleton className='h-6 w-full rounded-xl bg-dark-4' />
          {/* <Skeleton className='h-4 w-[50px] rounded-full bg-dark-4' />
          <Skeleton className='h-4 w-[50px] rounded-full bg-dark-4' /> */}
        </div>
      </div>

      {/* Image area */}
      <Skeleton className='post-card-img w-full h-[300px] rounded-md bg-dark-4' />

      {/* Stats */}
      <div className='flex gap-4 justify-between pt-2'>
        <Skeleton className='h-4 w-[60px] bg-dark-4' />
        <Skeleton className='h-4 w-[60px] bg-dark-4' />
      </div>
    </div>
  );
};

export default PostCardLoader;
