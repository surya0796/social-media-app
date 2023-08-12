import React from 'react'
import "./Modal.css"

const Modal = ({ children }) => {
    return (
        <div className="add__modal">
            <div className="modal__overlay"></div>
            {children}
        </div>
    )
}

export default Modal