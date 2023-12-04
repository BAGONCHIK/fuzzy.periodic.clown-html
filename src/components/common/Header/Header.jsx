import React from 'react';
import Button from 'components/Button';

import s from './Header.module.scss';
import { MediaPicture } from 'components/Picture';

const Header = () => {
  return (
    <div className={s.root}>
      <Button
        to="/"
        styleType="none"
        className={s.logo}
      >
        <MediaPicture objSource="images/logo.svg" />
      </Button>
      <div className={s.nav}>
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
  );
};

export default Header;
