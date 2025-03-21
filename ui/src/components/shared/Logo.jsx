import { logo } from "../../assets/images";

const Logo = () => {
  return (
    <div className='flex items-center'>
      <img src={logo} alt='logo' className='mr-2' />
      <h1 className='font-dancing_script h2-bold mb-1'>Sync up</h1>
    </div>
  );
};

export default Logo;
