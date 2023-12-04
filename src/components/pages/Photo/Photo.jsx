import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import Header from 'components/Header';
import FileInput from 'components/FileInput';
import { MediaPicture } from 'components/Picture';

import s from './Photo.module.scss';

const Photo = ({ className }) => {
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
        <div className={s.title}>Обработка фотографий</div>
        <div className={s.subContent}>
          В этом разделе Вам предоставляется возможность обработки изображений.
          После успешной загрузки, начнется обработка, а Вы увидете загруженное
          изображение ниже. По окончанию работы, изначальное фото заменится на
          обработанное фото. Также под фото будет приведена статистика
          обнаруженных объектов.
        </div>
        <div className={s.input}>
          <div className={s.inputText}>Загрузить файл</div>
          <FileInput onUploadFile={handleUploadFile} />
        </div>
        <MediaPicture
          className={s.image}
          objSource={getPreview(file) || 'images/placeholder_image.png'}
        />
      </div>
    </div>
  );
};

Photo.propTypes = {
  className: PropTypes.string,
};

Photo.defaultProps = {};

export default React.memo(Photo);
