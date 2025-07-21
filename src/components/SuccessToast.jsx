'use client';

import { useEffect } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';


const SuccessToast = ({ message = "Patient saved successfully!", onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // auto-close after 3 seconds

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className="toast show position-fixed top-0 end-0 m-4 bg-white border border-success shadow-lg rounded-3"
      style={{ zIndex: 1055, minWidth: '300px' }}
    >
      <div className="d-flex align-items-start p-3">
<BsCheckCircleFill size={24} className="text-success me-3 mt-1" />
        <div className="flex-grow-1">
          <strong className="text-success d-block">{message}</strong>
          <small className="text-muted">You can now view it in the list.</small>
        </div>
        <button
          type="button"
          className="btn-close ms-3 mt-1"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default SuccessToast;
