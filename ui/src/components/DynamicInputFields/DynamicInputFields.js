import { useState } from "react";

export default function DynamicInputFields({onDynamicInputsChange}) {
  const [inputs, setInputs] = useState([{ key: "", value: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { key: "", value: "" }]);
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];
    onChangeValue[index][name] = value;
    setInputs(onChangeValue);
    onDynamicInputsChange(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
    onDynamicInputsChange(newArray);
  };


  return (
    <div className="service-create__dynamic-inputs">
      {inputs.map((item, index) => (

        <div className="service-create__input-fields" key={index}>
            <div className="service-create__inputs">
                <input 
                    className="service-create__input service-create__input_s" 
                    placeholder="Key" 
                    value={item.key || ""} 
                    type="text" 
                    name="key" 
                    id="key-input" 
                    required
                    minLength={2}
                    maxLength={10}
                    onChange={(event) => handleChange(event, index)}
                />
                <input 
                    className="service-create__input service-create__input_s" 
                    placeholder="Value" 
                    value={item.value || ""} 
                    type="text" 
                    name="value" 
                    id="value-input" 
                    required
                    minLength={2}
                    maxLength={10}
                    onChange={(event) => handleChange(event, index)}
                />
            </div>
            {inputs.length > 1 && (
                <button className="service-create__delete-button" onClick={() => handleDeleteInput(index)}>Delete</button>
            )}
            {index === inputs.length - 1 && (
                <button className="service-create__add-button" type="button" onClick={() => handleAddInput()}></button>
            )}
        </div>
      ))}
    </div>
  );
}
