import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = (props: Props) => {
  const { onClick, children, ...rest } = props;
  return (
    <div>
      <button {...rest} onClick={onClick} className={`text-teal-900 ${rest.className}`}>
        {children}
      </button>
    </div>
  );
};

export default Button;
