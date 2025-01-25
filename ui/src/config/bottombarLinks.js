import home from '../assets/icons/home.svg';
import wallpaper from '../assets/icons/wallpaper.svg';
import people from '../assets/icons/people.svg';
import galleryAdd from '../assets/icons/gallery-add.svg';

const bottombarLinks = [
  {
    imgURL: home,
    route: '/',
    label: 'Home',
  },
  {
    imgURL: wallpaper,
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: people,
    route: '/users',
    label: 'People',
  },
  {
    imgURL: galleryAdd,
    route: '/posts/create',
    label: 'Create',
  },
];

export default bottombarLinks;
