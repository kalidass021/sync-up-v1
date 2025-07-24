import { Skeleton } from '@/components/ui/skeleton';

const UserCardLoader = ({
  containerWidth = 'w-full',
  buttonWidth = 'w-[100px]',
}) => {
  return (
    <div
      className={`user-card flex items-center justify-between ${containerWidth} h-auto`}
    >
      {/* Profile Image + User Info */}
      <div className='flex flex-col items-center gap-3 mt-[5px]'>
        <Skeleton className='w-14 h-14 rounded-full bg-dark-4' />
        <Skeleton className='h-4 w-[120px] rounded-full bg-dark-4' />
        <Skeleton className='h-4 w-[100px] rounded-full bg-dark-4' />
      </div>

      {/* Follow Button Placeholder */}
      <Skeleton className={`h-8 ${buttonWidth} rounded-md bg-dark-4 mb-[5px]`} />
    </div>
  );
};

export default UserCardLoader;
