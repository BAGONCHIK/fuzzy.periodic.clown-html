import React from 'react';
import cn from 'classnames';

import s from './Stats.module.scss';

const Stats = ({ className, data }) => {
  return (
    <div className={cn(className, s.root)}>
      {data &&
        data.map(item => (
          <div className={s.row}>
            <div className={s.colName}>{item.name}</div>
            <div className={s.colData}>{item.data}</div>
          </div>
        ))}
    </div>
  );
};

export default Stats;
