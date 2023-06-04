import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const Modal = ({ onClose, children }) => {
  const modalRoot = document.getElementById('modal-root');

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
