import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({
  className,
  url,
  controls = true,
  loop = false,
  autoPlay = false,
  muted = false,
  type = 'video/mp4',
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      className={className}
      width="100px"
      height="100px"
      preload="auto"
      playsInline
      controls={controls}
      controlsList="nodownload noremoteplayback noplaybackrate"
      loop={loop}
      autoPlay={autoPlay}
      muted={muted}
    >
      <source
        src={url}
        type={type}
      />
    </video>
  );
};

VideoPlayer.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default VideoPlayer;
