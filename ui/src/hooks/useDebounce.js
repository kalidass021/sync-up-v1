import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  // state and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cancel the timeout if value changes (also on delay changes or unmount)
    // this is how we prevent the debounced value
    // from updating if value is changed within the delay period
    // timeout gets cleared and restarted
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // only re-call effect if value or delay changes

  return debouncedValue;
};

export default useDebounce;
