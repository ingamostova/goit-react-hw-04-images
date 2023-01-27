import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, Container } from 'components/Modal/Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onToggleModal, children }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onToggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleModal]);

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onToggleModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Container>{children}</Container>
    </Overlay>,
    modalRoot
  );
};
Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};
