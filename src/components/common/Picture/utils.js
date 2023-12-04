import { MEDIA } from './constants';

export const getSrcExtinsion = url => {
  const ext = url
    .substring(url.lastIndexOf('.') + 1)
    .split('?')
    .shift();
  return ext ? `image/${ext}` : undefined;
};

export const getSrcList = object => {
  return Object.keys(object)
    .filter(key => object[key])
    .map(key => {
      return {
        src: object[key],
        media: MEDIA[key],
        mime: getSrcExtinsion(object[key]),
        viewport: key,
      };
    });
};

export const getDefSrc = (defaultSrc, source) => {
  if (defaultSrc) return defaultSrc;

  if (typeof source !== 'string') {
    return source
      ? source.find(({ viewport }) => viewport === 'desktop')?.src
      : '';
  }

  return source;
};

export const getMedia = media => {
  if (media !== undefined) {
    return typeof source !== 'string' ? `(min-width: ${media}px)` : media;
  }

  return undefined;
};
