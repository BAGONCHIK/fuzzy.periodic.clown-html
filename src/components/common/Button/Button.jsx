import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Link from 'next/link';

import s from './Button.module.scss';
import modsClasses from 'utils/modsClasses';

const isExternalLink = link => /^https?:\/\//.test(link);

const Button = ({
  className,
  children,
  to,
  clickHandler,
  blank = false,
  styleType = 'button',
}) => {
  const isExternal = useMemo(() => (to ? isExternalLink(to) : false), [to]);
  const isTarget = useMemo(
    () => (to ? blank || isExternal : false),
    [to, isExternal, blank]
  );

  const btnProps = useMemo(() => {
    const attrs = {};
    let Tag = 'button';

    if (to) {
      attrs.href = to;
      if (isExternal) {
        Tag = 'a';
        attrs.rel = 'noopener noreferrer';
      } else {
        Tag = Link;
        attrs.scroll = false;
      }
    }

    if (isTarget) {
      attrs.target = '_blank';
    }

    return { Tag, attrs };
  }, [to, isExternal, isTarget]);

  const classNames = useMemo(() => {
    const classes = modsClasses(s, {
      styleType,
    });

    return cn(className, s.root, classes);
  }, [className]); // eslint-disable-line

  return (
    <btnProps.Tag
      className={classNames}
      onClick={clickHandler}
      {...btnProps.attrs}
    >
      {children}
    </btnProps.Tag>
  );
};

Button.propTypes = {
  className: PropTypes.string,
};
Button.defaultProps = {};

export default React.memo(Button);
