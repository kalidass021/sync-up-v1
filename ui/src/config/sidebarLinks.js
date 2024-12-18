import home from '../assets/icons/home.svg';
import wallpaper from '../assets/icons/wallpaper.svg';
import people from '../assets/icons/people.svg';
import bookmark from '../assets/icons/bookmark.svg';
import galleryAdd from '../assets/icons/gallery-add.svg';

const sidebarLinks = [
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
    imgURL: bookmark,
    route: '/posts/saved',
    label: 'Saved',
  },
  {
    imgURL: galleryAdd,
    route: '/posts/create',
    label: 'Create Post',
  },
];

export default sidebarLinks;
