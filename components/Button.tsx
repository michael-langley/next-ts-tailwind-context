import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
}

const Button = (props: Props) => {
  const { onClick, children, iconLeft, ...rest } = props;
  return (
    <button
      {...rest}
      onClick={onClick}
      className={`py-2 px-4 uppercase tracking-wide rounded-lg cursor-pointer shadow-md focus:outline-none focus:shadow-outline ${rest.className}`}
    >
      <div className='flex items-center'>
        {iconLeft && <div className='mr-3'>{iconLeft}</div>}
        {children}
      </div>
    </button>
  );
};

export default Button;
