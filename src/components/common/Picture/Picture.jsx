import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import useCombinedRefs from 'hooks/useCombinedRefs';
import modsClasses from 'utils/modsClasses';
import { getDefSrc, getMedia } from './utils';

import s from './Picture.module.scss';

const Picture = forwardRef(
  (
    {
      source,
      className,
      defaultSrc,
      innerRef,
      pictureRef,
      alt,
      fit,
      ...otherProps
    },
    ref
  ) => {
    const cRef = useCombinedRefs(pictureRef, ref);

    const renderSource = el => {
      const { src, media, mime } = el;

      return (
        <source
          key={`media-${media}`}
          srcSet={src}
          type={mime}
          media={getMedia(media)}
        />
      );
    };

    const sourceList =
      typeof source !== 'string' && source && source.map(renderSource);
    const defaultImageSrc = getDefSrc(defaultSrc, source);

    const mods = modsClasses(s, {
      fit,
    });

    return (
      <picture
        ref={cRef}
        className={cn(s.root, className, mods)}
        {...otherProps}
      >
        {sourceList}
        <img
          ref={innerRef}
          className={s.image}
          src={defaultImageSrc}
          alt={alt}
          width={100}
          height={100}
          loading="eager"
          crossOrigin="anonymous"
        />
      </picture>
    );
  }
);

Picture.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  defaultSrc: PropTypes.string,
  innerRef: PropTypes.func,
  pictureRef: PropTypes.func,
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string,
        media: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        retina: PropTypes.string,
      })
    ),
    PropTypes.string,
  ]),
  fit: PropTypes.oneOf(['cover', 'contain']),
};

Picture.defaultProps = {
  fit: 'cover',
};

export default memo(Picture);
