import { useSelector, useDispatch } from "react-redux";
import { Model, ParamValue } from "../../types";
import { deleteModel } from "../../store/slice/modelsSlice";
import React, { useState } from "react";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import "../../styles.css";
import Modal from "../../components/modal";

const Main: React.FC = () => {
  const models = useSelector((state: RootState) => state.models.models);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isPopupVisible, setPopupVisible] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteModel(id));
  };

  const handleShowFullStructure = (model: Model) => {
    setSelectedModel(model);
    setPopupVisible(true);
  };

  return (
    <div>
      <h1>LIST OF MODELS</h1>
      {!models.length && <p className="no-models-text">NO MODELS</p>}
      <ul>
        {models.map((model: Model) => (
          <li key={model.id}>
            <p>Назначение:</p>
            <span>{model.name}</span>
            {model.paramValues.map((paramValue: ParamValue) => (
              <>
                <p>Длина:</p>
                <span key={paramValue.paramId}>{paramValue.value}</span>
              </>
            ))}
            <button onClick={() => handleDelete(model.id)}>Delete</button>
            <Link to={`/edit/${model.id}`}>
              <button>edit</button>
            </Link>
            <button onClick={() => handleShowFullStructure(model)}>
              get Model
            </button>
          </li>
        ))}
      </ul>
      <Link to={`/create`}>
        <button>add model</button>
      </Link>
      {isPopupVisible && selectedModel && (
        <Modal
          isOpen={isPopupVisible}
          onClose={() => setPopupVisible(false)}
          onConfirm={() => {
            if (selectedModel) {
              setSelectedModel(selectedModel);
            }
          }}
          model={selectedModel}
        />
      )}
    </div>
  );
};

export default Main;
