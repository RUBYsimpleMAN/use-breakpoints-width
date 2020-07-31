import { useState, useEffect } from 'react';
import debounce from './utils/debounce';

const defaultSettings = { 
  breakpoints: {
    desktop: 992,
    tablet: 768,
    mobile: 0
  },
  debounceDelay: 250
 }

const getBreakpoint = function(width, breakpoints) {
  const sortedBreakpoints = Object.entries(breakpoints).sort((a, b) => a[1] - b[1]);
  let currentBreakpoint = sortedBreakpoints[0][0];
  
  sortedBreakpoints.forEach(breakpoint => {
    if(width >= breakpoint[1]) {
      currentBreakpoint = breakpoint[0];
    }
  })

  return currentBreakpoint;
};

const useBreakpoints = (
  settings = defaultSettings
) => {
  const [width, setWidth] = useState();

  console.log('render')

  const handleResize = () => {
    const newWidth = document.documentElement.clientWidth;
    setWidth(newWidth);
  };

  const handleResizeDebounce = debounce(handleResize, settings.debounceDelay ? settings.debounceDelay : 250);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResizeDebounce);

    return () => {
      window.removeEventListener('resize', handleResizeDebounce);
    }
  }, []);

  return {
    width,
    breakpoint: getBreakpoint(width, settings.breakpoints),
  };
};

export default useBreakpoints;
