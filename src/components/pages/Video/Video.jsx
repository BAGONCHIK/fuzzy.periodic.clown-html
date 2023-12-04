import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import Header from 'components/Header';
import FileInput from 'components/FileInput';
import { MediaPicture } from 'components/Picture';
import VideoPlayer from 'components/VideoPlayer';
import { BASE_URL } from 'constants/vars';
import loadLottie from 'images/loadLottie.json';

import s from './Video.module.scss';
import Lottie from 'lottie-react-web';

const Video = ({ className }) => {
  const [file, setFile] = useState(null);
  const [outData, setOutData] = useState(null);
  const [outFile, setOutFile] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const handleUploadFile = useCallback(
    e => {
      if (e.target.files && e.target.files.length > 0) {
        setOutFile(null);
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

  const uploadDocumentsApi = payload => {
    const uploadConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken':
          'EUyKQU2Bga6wvbL0Adkvg15lSGJ2aambxCzxavPyP8nRsmfjX0jWWJVoIHjdIFsl',
        accept: 'application/json',
      },
      // onUploadProgress: progressEvent => payload.uploadFunc(progressEvent),
    };
    const formData = new FormData();
    formData.append('input_file', payload.file, payload.file.name);
    return axios.post(`${BASE_URL}/api/video/`, formData, uploadConfig);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await uploadDocumentsApi({ file });
      setOutFile(`${BASE_URL}${response.data.output_file}`);
      setOutData(response.data.additional_data);
      setIsLoad(false);
    };
    if (file) {
      setIsLoad(true);
      fetchData();
    }
  }, [file]);

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
        {outFile || getPreview(file) ? (
          <VideoPlayer
            className={s.image}
            url={outFile || getPreview(file)}
          />
        ) : (
          <MediaPicture
            className={s.image}
            objSource={'images/placeholder_image.png'}
          />
        )}
      </div>
      {isLoad && (
        <div className={s.loader}>
          <div className={s.loadText}>Processing</div>
          <div className={s.loadIcon}>
            <Lottie
              options={{
                animationData: loadLottie,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

Video.propTypes = {
  className: PropTypes.string,
};

Video.defaultProps = {};

export default React.memo(Video);
