import { memo, forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import Picture from './Picture';
import { getSrcList } from './utils';

const MediaPicture = forwardRef(({ objSource, ...otherProps }, ref) => {
  const source = useMemo(
    () => (objSource.src ? getSrcList(objSource.src) : objSource),
    [objSource]
  );

  return (
    <Picture
      source={source}
      alt={objSource.alt}
      ref={ref}
      {...otherProps}
    />
  );
});

MediaPicture.propTypes = {
  objSource: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      url: PropTypes.string,
      src: PropTypes.shape({
        desktop: PropTypes.string,
        mobile: PropTypes.string,
        tablet: PropTypes.string,
      }),
      alt: PropTypes.string,
    }),
  ]).isRequired,
};

export default memo(MediaPicture);
