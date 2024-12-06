import home from '../assets/icons/home.svg';
import wallpaper from '../assets/icons/wallpaper.svg';
import bookmark from '../assets/icons/bookmark.svg';
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
    imgURL: bookmark,
    route: '/posts/saved',
    label: 'Saved',
  },
  {
    imgURL: galleryAdd,
    route: '/posts/create',
    label: 'Create',
  },
];

export default bottombarLinks;
