// Button.jsx
import React from 'react';

const Button = ({ onClick=()=>{}, color='red', children ='' }) => {
  return (
    <button onClick={onClick}  className={`bg-${color}-500 text-white mbtn px-4 py-2 mr-2 rounded-md`} >
      {children}
    </button>
  );
};

export default Button;
