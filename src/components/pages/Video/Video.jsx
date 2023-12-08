import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import Header from 'components/Header';
import FileInput from 'components/FileInput';
import { MediaPicture } from 'components/Picture';
import VideoPlayer from 'components/VideoPlayer';
import { BASE_URL } from 'constants/vars';
import loadLottie from 'images/loadLottie.json';
import Lottie from 'lottie-react-web';
import Stats from 'components/Stats';

import s from './Video.module.scss';

const Video = ({ className }) => {
  const [file, setFile] = useState(null);
  const [outData, setOutData] = useState(false);
  const [outFile, setOutFile] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const stats = useMemo(() => {
    const data = [];
    if (outData) {
      Object.keys(outData).forEach(key =>
        data.push({ name: key, data: outData[key].length })
      );
    }
    return data;
  }, [outData]);

  const handleUploadFile = useCallback(
    e => {
      if (e.target.files && e.target.files.length > 0) {
        setOutFile(false);
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
      await fetch(`${BASE_URL}${response.data.output_file}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.blob();
        })
        .then(blob => {
          const viewUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = viewUrl;
          link.download = 'result.mp4';
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(viewUrl);
        });
      setOutData(response.data.additional_data);
      setOutFile(true);
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
        {getPreview(file) ? (
          <VideoPlayer
            className={s.image}
            url={getPreview(file)}
            type="video/mp4"
          />
        ) : (
          <MediaPicture
            className={s.image}
            objSource={'images/placeholder_image.png'}
          />
        )}
        {outFile && <div className={s.subContent}>Файл скачен</div>}
        {stats && stats.length > 0 && (
          <Stats
            data={stats}
            className={s.stats}
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
