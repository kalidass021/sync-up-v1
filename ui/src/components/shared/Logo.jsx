import logo from '../../assets/images/logo.svg';

const Logo = () => {
  return (
    <div className='flex items-center'>
      <img src={logo} alt='logo' className='mr-2' />
      <h1 className='font-mono font-semibold text-4xl text-light-3 mb-1'>Sync up</h1>
    </div>
  );
};

export default Logo;
