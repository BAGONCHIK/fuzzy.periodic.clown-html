import React from 'react';
import debounce from 'lodash/debounce';

// eslint-disable-next-line
export default () => {
  const handleCalcRealVh = React.useCallback(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.dispatchEvent(new Event('resizeVh'));
  }, []);

  React.useEffect(() => {
    handleCalcRealVh();

    window.addEventListener('resize', handleCalcRealVh);
    window.addEventListener('orientationchange', handleCalcRealVh);

    return () => {
      window.removeEventListener('resize', handleCalcRealVh);
      window.removeEventListener('orientationchange', handleCalcRealVh);
    };
    // eslint-disable-next-line
  }, []);
};
