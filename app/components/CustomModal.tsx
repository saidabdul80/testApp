
import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import SuccessIcon from './succesIcon';
//@ts-ignore
const CustomModal = ({ children, showModal, setShowModal, onConfirm=()=>{}, icon='none' }) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef();
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
    }, 300); // Adjust this timeout according to your transition duration
  };
  useEffect(() => {
    const handleCloseModal = (event:Event) => {
        //@ts-ignore
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose()
      }
    };

    document.addEventListener('mousedown', handleCloseModal);

    return () => {
      document.removeEventListener('mousedown', handleCloseModal);
    };
  }, [handleClose]);



  const handleConfirm = () => {
    onConfirm(true);
    handleClose();
  };

  const handleCancel = () => {    
    handleClose();
  };

  return (
    <>
      {showModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            {/* @ts-ignore */}
          <div ref={modalRef} className="bg-white rounded-md p-6 w-96">
            <div className="flex justify-center mx-auto">
            {
              icon == 'success'?
                <SuccessIcon />
              :icon == 'error'?
              ''
              :''
            }        
            </div>    
            <div className='mt-3 mx-auto text-center'>{children}</div>
            <div className="flex justify-center mx-auto mt-4">
                <Button onClick={handleCancel} children='Cancel' color='red' />
                <Button onClick={handleConfirm} children='Ok' color='green' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;

