import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import Header from 'components/Header';
import FileInput from 'components/FileInput';
import { MediaPicture } from 'components/Picture';
import { BASE_URL } from 'constants/vars';

import s from './Photo.module.scss';

const Photo = ({ className }) => {
  const [file, setFile] = useState(null);
  const [outFile, setOutFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUploadFile = useCallback(
    e => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
        setOutFile(null);
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
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken':
          'EUyKQU2Bga6wvbL0Adkvg15lSGJ2aambxCzxavPyP8nRsmfjX0jWWJVoIHjdIFsl',
        accept: 'application/json',
      },
      onUploadProgress: progressEvent => payload.uploadFunc(progressEvent),
    };
    const formData = new FormData();
    formData.append('input_file', payload.file, payload.file.name);
    return axios.post(`${BASE_URL}/api/photo/`, formData, uploadConfig);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await uploadDocumentsApi({ file, uploadFunc });
      setOutFile(`${BASE_URL}${response.data.output_file}`);
    };
    if (file) {
      fetchData();
    }
  }, [file]);

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
        <FileInput
          className={s.input}
          onUploadFile={handleUploadFile}
        />
        <MediaPicture
          className={s.image}
          objSource={
            outFile || getPreview(file) || 'images/placeholder_image.png'
          }
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
