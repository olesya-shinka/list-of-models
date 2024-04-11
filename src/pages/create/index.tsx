import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addModel } from "../../store/slice/modelsSlice";
import { Model, ParamValue } from "../../types";
import { Link } from "react-router-dom";
import "../../styles.css";

const Create: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [paramValues, setParamValues] = useState<ParamValue[]>([]);

  const handleSubmit = () => {
    const newParamValue: ParamValue = {
      paramId: Math.random(),
      value: value,
    };
    const newModel: Model = {
      id: Math.random(),
      name: name,
      paramValues: [...paramValues, newParamValue],
      colors: [],
    };
    dispatch(addModel(newModel));
    setName("");
    setValue("");
    setParamValues([]);
  };

  return (
    <div>
      <h1>Create a Model</h1>
      <div className="create-content">
        <p>Назначение:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Длина:</p>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="buttons">
        <Link to={`/`}>
          <button
            onClick={() => {
              handleSubmit();
            }}
          >
            Create
          </button>
        </Link>

        <Link to={`/`}>
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default Create;
