import React from "react";
import "./styles.css";
import { Model } from "../../types";

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  model?: Model;
}> = ({ isOpen, onClose, model }) => {
  if (!model) return null;

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p className="modal-text">Назначение: "{model.name}"</p>
            <p className="modal-text">Id: {model.id}</p>
            <div className="modal-list">
              <p className="modal-text">Длина: </p>
              <ul>
                {model.paramValues.map((paramValue) => (
                  <li className="modal-text" key={paramValue.paramId}>
                    "{paramValue.value}"
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={onClose}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
