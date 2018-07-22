import React from 'react';
import classNames from 'classnames';
import Icon from 'react-fontawesome';

const Button = ({className, primary, danger, type, children, icon, ...restProps}) => {
  return (
    <button className={classNames('btn', {
      ['btn-primary']: primary,
      ['btn-danger']: danger
    }, className)}
            type={type || 'button'}
            {...restProps}>
      {icon && <Icon className="icon" name={icon}/>}
      {children}
    </button>
  );
};

export default Button;