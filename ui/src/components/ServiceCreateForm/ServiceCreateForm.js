import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import mainApi from '../../utils/MainApi';
import DynamicInputFields from '../DynamicInputFields/DynamicInputFields';
import Editor from '../Editor/Editor';


function ServiceCreateForm({createNewCard, type}) {
    const navigate = useNavigate();

    const [optionsMethods, setOptionsMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState('POST');
    const [optionsStatuses, setOptionsStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('200 OK');
    const { enteredValues, handleChangeInput } = useForm();
    const [selectedLang, setSelectedLang] = useState('json');
    const [dynamicInputsData, setDynamicInputsData] = useState([]);
    const [responseBody, setResponseBody] = useState(""); 

    useEffect(() => {
        mainApi.getHttpMethods()
          .then((data) => {
            setOptionsMethods(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }, []); 

    useEffect(() => {
        mainApi.getStatuses()
          .then((data) => {
            setOptionsStatuses(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);

    const handleLangChange = (e) => {
        setSelectedLang(e.target.value);
    };

    const handleDynamicInputsChange = (dynamicInputsData) => {
        
        setDynamicInputsData(dynamicInputsData);
    };

    const handleEditorContentChange = (content) => {
        setResponseBody(content); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCardData = {
            type: type,
            name: enteredValues.name,
            description: enteredValues.description,
            address: enteredValues.endpoint,
            method: selectedMethod,
            headers: JSON.stringify(dynamicInputsData),
            response_code: selectedStatus,
            response_format: selectedLang.toUpperCase(),
            response_body: responseBody,
        };
        createNewCard(newCardData);
    };

    return (
        <section className="service-create">
            <form className="service-create__form" onSubmit={handleSubmit}>
            <button className="service-create__back-button" type="button" onClick={() => navigate('/services/', { replace: true })}></button>
                <h2 className="service-create__title">Create new restfull mock-service</h2>
                <div className="service-create__inputs-container">
                    <input 
                        className="service-create__input" 
                        placeholder="Service name" 
                        value={enteredValues.name || ""} 
                        type="text" 
                        name="name" 
                        id="name-input" 
                        required
                        onChange={handleChangeInput}
                    />
                    <input 
                        className="service-create__input" 
                        placeholder="Description" 
                        value={enteredValues.description || ""} 
                        type="text" 
                        name="description" 
                        id="description-input" 
                        required
                        minLength={5}
                        maxLength={50}
                        onChange={handleChangeInput}
                    />
                    <input 
                        className="service-create__input" 
                        placeholder="Endpoint" 
                        value={enteredValues.endpoint || ""} 
                        type="text" 
                        name="endpoint" 
                        id="endpoint-input" 
                        required
                        minLength={3}
                        maxLength={30}
                        onChange={handleChangeInput}
                    />
                    
                    <div className="service-create__input-select">
                        <label className="service-create__input-label">HTTP-method</label>
                        <select className="service-create__input service-create__input_arrow service-create__input_s" name="HTTP-method" onChange={(e) => setSelectedMethod(e.target.value)} value={selectedMethod}>
                            {optionsMethods.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <label className="service-create__input-label">Response code</label>
                        <select className="service-create__input service-create__input_arrow service-create__input_s" name="response-code" onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
                            {optionsStatuses.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label className="service-create__input-label">Headers</label>
                    <DynamicInputFields onDynamicInputsChange={handleDynamicInputsChange} />
                </div>
                <div className="service-create__response-field-container">
                    <label className="service-create__input-label">Response body</label>
                    <select className="service-create__response-choice" onChange={handleLangChange} value={selectedLang}>
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                        <option value="text">TEXT</option>
                    </select>
                </div>
                <Editor language={selectedLang.toLowerCase()}  onContentChange={handleEditorContentChange} initialContent={responseBody}/>
                <div className="service-create__buttons-container">
                    <button className={
                        enteredValues.name 
                        && enteredValues.description 
                        && enteredValues.endpoint 
                        && dynamicInputsData.length > 0 
                        && responseBody.trim().length > 0
                            ? "service-create__submit-button"
                            : "service-create__submit-button service-create__submit-button_inactive"
                    }
                    type="submit" 
                    disabled={
                        !enteredValues.name 
                        || !enteredValues.description 
                        || !enteredValues.endpoint 
                        || dynamicInputsData.length === 0 
                        || responseBody.trim().length === 0
                    }>
                        Save
                    </button>
                    <button className="service-create__cancel-button" type="button" onClick={() => navigate('/services/', { replace: true })}>Cancel</button>
                </div>
            </form>
        </section>
    );
}

export default ServiceCreateForm;