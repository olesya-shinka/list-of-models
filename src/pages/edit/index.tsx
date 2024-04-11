import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateModel } from "../../store/slice/modelsSlice";
import { Model, ParamValue } from "../../types";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles.css";

const Edit: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id?: string }>();
  const id: string | undefined = params.id;
  const modelId = id ? parseFloat(id) : NaN;
  const model = useSelector((state: RootState) =>
    state.models.models.find((model) => model.id === modelId)
  );
  const [name, setName] = useState("");
  const [value, setValue] = useState<ParamValue[]>([]);

  useEffect(() => {
    if (model) {
      setName(model.name);
      setValue(model.paramValues);
    }
  }, [model]);

  const handleSubmit = () => {
    if (!model) return;
    const updatedParamValues = value.map((paramValue) => {
      const inputValue = document.getElementById(
        `paramInput_${paramValue.paramId}`
      ) as HTMLInputElement;
      return {
        ...paramValue,
        value: inputValue.value,
      };
    });
    const updatedModel: Model = {
      ...model,
      name: name,
      paramValues: updatedParamValues,
    };
    dispatch(updateModel(updatedModel));
  };

  return (
    <div>
      <h1>Edit Model</h1>
      <div className="create-content">
        <p>Назначение:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {value.map((paramValue) => (
          <div key={paramValue.paramId}>
            <input
              id={`paramInput_${paramValue.paramId}`}
              type="text"
              defaultValue={paramValue.value}
            />
          </div>
        ))}
      </div>
      <Link to={`/`}>
        <button
          type="button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </button>
      </Link>
      <Link to={`/`}>
        <button type="button">Cancel</button>
      </Link>
    </div>
  );
};

export default Edit;
