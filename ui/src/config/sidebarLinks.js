import { home, wallpaper, people, bookmark, galleryAdd } from '../assets/icons';

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
