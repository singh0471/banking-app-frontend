import React from "react";
import "./Modal.css";

 const Modal = ({
  onSubmit,           
  onCancel,          
  closeModal,         
  title,              
  message,           
}) => {
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal(); 
      }}
    >
      <div className="modal">
        <div
          className="modal-header"
          onClick={() => closeModal()}   
        >
          <p className="close">&times;</p>
        </div>
        <div className="modal-content">
          {title && <h2>{title}</h2>}   
          {message && <p>{message}</p>}  
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-submit"
            onClick={() => {
              onSubmit();  
              closeModal();  
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => {
              onCancel();  
              closeModal();  
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};


export default Modal;