import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import Header from 'components/Header';
import FileInput from 'components/FileInput';
import { MediaPicture } from 'components/Picture';

import s from './Video.module.scss';
import VideoPlayer from 'components/VideoPlayer';

const Video = ({ className }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUploadFile = useCallback(
    e => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    },
    [file]
  );

  const getPreview = useCallback(file => {
    let url = null;
    if (file?.name) {
      url = URL.createObjectURL(file);
    }
    return url;
  }, []);

  const uploadFunc = useCallback(
    progressEvent => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentCompleted);
    },
    [setProgress]
  );

  const uploadDocumentsApi = payload => {
    const uploadConfig = {
      onUploadProgress: progressEvent => payload.uploadFunc(progressEvent),
    };
    const formData = new FormData();
    formData.append('file', file, file.name);
    return axios.post(``, formData, uploadConfig);
  };

  return (
    <div className={cx(s.root, className)}>
      <Header />
      <div className={s.content}>
        <div className={s.title}>Обработка видео</div>
        <div className={s.subContent}>
          В этом разделе Вам предоставляется возможность обработки видео файлов.
          После успешной загрузки, начнется обработка, а Вы увидете загруженное
          видео ниже. По окончанию работы, изначальное видео заменится на
          обработанное. Также под видео будет приведена статистика обнаруженных
          объектов.
        </div>
        <FileInput
          className={s.input}
          onUploadFile={handleUploadFile}
        />
        {getPreview(file) ? (
          <VideoPlayer
            className={s.image}
            url={getPreview(file)}
          />
        ) : (
          <MediaPicture
            className={s.image}
            objSource={'images/placeholder_image.png'}
          />
        )}
      </div>
    </div>
  );
};

Video.propTypes = {
  className: PropTypes.string,
};

Video.defaultProps = {};

export default React.memo(Video);
