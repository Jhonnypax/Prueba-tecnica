import React from "react";
import PropTypes from "prop-types";
import "../index.css" 

const Modal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-contentido">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onConfirm} className="btn">
          Confirmar
        </button>
        <button onClick={onCancel} className="btn btn-eliminar">
          Cancelar
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Modal;
