import { formatDistanceToNow } from 'date-fns';

const formatDate = (createdAt) => {
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  }).replace(/^about /, ''); // remove about if it's present

  return formattedDate;
};


export default formatDate;
