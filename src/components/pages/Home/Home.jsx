import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import VideoPlayer from 'components/VideoPlayer';

import s from './Home.module.scss';
import Header from 'components/Header';
import Lottie from 'lottie-react-web';
import arrowLottie from 'images/arrowLottie.json';
import Button from 'components/Button';

const Home = ({ className }) => {
  return (
    <div className={cx(s.root, className)}>
      <Header />
      <div className={s.firstBlock}>
        <VideoPlayer
          url="images/video.mp4"
          autoPlay
          controls={false}
          loop
          muted
          className={s.video}
        />
        <div className={s.content}>
          <div className={s.title}>Распознавание объектов на фото и видео</div>
          <div className={s.subContent}>Попробовать наши услуги</div>
          <div className={s.arrow}>
            <Lottie
              options={{
                animationData: arrowLottie,
              }}
            />
          </div>
          <div className={s.btns}>
            <Button
              to="/photo"
              className={s.btn}
            >
              Фото
            </Button>
            <Button
              to="/video"
              className={s.btn}
            >
              Видео
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  className: PropTypes.string,
};

Home.defaultProps = {};

export default React.memo(Home);
