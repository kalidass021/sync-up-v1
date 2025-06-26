const formatDate = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  if (isNaN(createdDate.getTime())) {
    return 'Invalid Date';
  }

  const diffInSeconds = Math.floor((now - createdDate) / 1000);

  const units = [
    {label: 'year', seconds: 365 * 24 * 60 * 60},
    {label: 'month', seconds: 30 * 24 * 60 * 60},
    {label: 'day', seconds: 24 * 60 * 60},
    {label: 'hour', seconds: 60 * 60},
    {label: 'minute', seconds: 60},
    {label: 'second', seconds: 1},
  ]

  for (let unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);

    if (value >= 1) {
      return `${value} ${unit.label}${value > 1 && 's'} ago`;
    }
  }

  return 'just now';
}

export default formatDate;