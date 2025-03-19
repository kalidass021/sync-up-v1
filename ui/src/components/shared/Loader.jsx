import { loaderImg } from '../../assets/icons';

const Loader = () => {
  return (
    <div className='flex-center w-full'>
      <img src={loaderImg} alt='loader' width={24} height={24} />
    </div>
  );
};

export default Loader;
