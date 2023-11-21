// Button.jsx

const Button = ({ onClick = () => {}, color = 'red', children = '' }) => {
  const handleClick = () => {    
      onClick();    
  };

  return (
   
    <button
      onClick={handleClick}
      
      className={`bg-${color}-500 text-white  px-4 py-2 mr-2 rounded-md  outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform`}
    >
      {children}
    </button> 
  );
};

export default Button;
