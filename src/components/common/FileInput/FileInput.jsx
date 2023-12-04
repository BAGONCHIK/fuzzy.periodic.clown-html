import React from 'react';
import cn from 'classnames';
import { MediaPicture } from 'components/Picture';

import s from './FileInput.module.scss';

const FileInput = ({ className, id, onUploadFile }) => {
  return (
    <label
      className={cn(className, s.uploadWrapper)}
      htmlFor={id}
    >
      <div className={s.inputText}>Загрузить файл</div>
      <MediaPicture
        objSource="images/attach.svg"
        className={s.icon}
      />
      <input
        className={s.fileInput}
        id={id}
        type="file"
        accept=".png,.jpg,.jpeg, video/*, .webp"
        multiple={false}
        onChange={onUploadFile}
      />
    </label>
  );
};

export default FileInput;
