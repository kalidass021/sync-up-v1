import { home, wallpaper, people, galleryAdd } from '../assets/icons';

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
