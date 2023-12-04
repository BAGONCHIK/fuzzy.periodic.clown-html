import React from 'react';

import s from './FileInput.module.scss';
import { MediaPicture } from 'components/Picture';

const FileInput = ({ id, onUploadFile }) => {
  return (
    <label
      className={s.uploadWrapper}
      htmlFor={id}
    >
      <MediaPicture
        objSource="images/attach.svg"
        className={s.icon}
      />
      <input
        className={s.fileInput}
        id={id}
        type="file"
        accept=".png,.jpg,.jpeg, video/*"
        multiple={false}
        onChange={onUploadFile}
      />
    </label>
  );
};

export default FileInput;
