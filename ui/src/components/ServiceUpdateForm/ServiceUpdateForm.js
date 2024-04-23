import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import mainApi from '../../utils/MainApi';
import DynamicInputFields from '../DynamicInputFields/DynamicInputFields';
import Editor from '../Editor/Editor';


function ServiceUpdateForm({service}) {
    const navigate = useNavigate();

    const [name, setName] = useState(service.name);
    const [description, setDescription] = useState(service.description);
    const [endpoint, setEndpoint] = useState(service.address);
    const [optionsMethods, setOptionsMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(service.method);
    const [optionsStatuses, setOptionsStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(service.response_code);
    const [optionsTypes, setOptionsTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(service.type);
    const { enteredValues } = useForm();
    const [selectedLang, setSelectedLang] = useState(service.response_format.toLowerCase());
    const [dynamicInputsData, setDynamicInputsData] = useState(JSON.parse(service.headers));
    const [responseBody, setResponseBody] = useState(service.response_body); 

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

    useEffect(() => {
        mainApi.getServiceTypes()
          .then((data) => {
            setOptionsTypes(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }, []); 

    const handleDynamicInputsChange = (dynamicInputsData) => {
        setDynamicInputsData(dynamicInputsData);
    };

    const handleEditorContentChange = (content) => {
        setResponseBody(content); 
    };

    // const handleUpdate = (e) => {
    //     e.preventDefault();
    //     const newCardData = {
    //         type: type,
    //         name: enteredValues.name,
    //         description: enteredValues.description,
    //         address: enteredValues.endpoint,
    //         method: selectedMethod,
    //         headers: JSON.stringify(dynamicInputsData),
    //         response_code: selectedStatus,
    //         response_format: selectedLang.toUpperCase(),
    //         response_body: responseBody,
    //     };
    //     createNewCard(newCardData);
    // };

    return (
        <section className="service-update">
            <form className="service-update__form" /*onSubmit={handleUpdate}*/>
            <button className="service-update__back-button" type="button" onClick={() => navigate('/services/', { replace: true })}></button>
                <h2 className="service-update__title">Update {service.name} mock-service</h2>
                <div className="service-update__inputs-container">
                    <label className="service-update__input-label">Type</label>
                    <select className="service-update__input service-update__input_arrow" name="type" onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
                        {optionsTypes.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <label className="service-update__input-label">Name</label>
                    <input 
                        className="service-update__input" 
                        value={name} 
                        type="text" 
                        name="name" 
                        id="name-input" 
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="service-update__input-label">Description</label>
                    <input 
                        className="service-update__input" 
                        value={description} 
                        type="text" 
                        name="description" 
                        id="description-input" 
                        required
                        minLength={5}
                        maxLength={50}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className="service-update__input-label">Endpoint</label>
                    <input 
                        className="service-create__input" 
                        value={endpoint} 
                        type="text" 
                        name="endpoint" 
                        id="endpoint-input" 
                        required
                        minLength={3}
                        maxLength={30}
                        onChange={(e) => setEndpoint(e.target.value)}
                    />
                    
                    <div className="service-update__input-select">
                        <label className="service-update__input-label">HTTP-method</label>
                        <select className="service-update__input service-update__input_arrow service-update__input_s" name="HTTP-method" onChange={(e) => setSelectedMethod(e.target.value)} value={selectedMethod}>
                            {optionsMethods.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                        <label className="service-update__input-label">Response code</label>
                        <select className="service-update__input service-update__input_arrow service-update__input_s" name="response-code" onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
                            {optionsStatuses.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label className="service-update__input-label">Headers</label>
                    <DynamicInputFields onDynamicInputsChange={handleDynamicInputsChange} initialInputs={dynamicInputsData}/>
                </div>
                <div className="service-update__response-field-container">
                    <label className="service-update__input-label">Response body</label>
                    <select className="service-update__response-choice" onChange={(e) => setSelectedLang(e.target.value)} value={selectedLang}>
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                        <option value="text">TEXT</option>
                    </select>
                </div>
                <Editor language={selectedLang.toLowerCase()}  onContentChange={handleEditorContentChange} initialContent={responseBody}/>
                <div className="service-update__buttons-container">
                    <button className={
                        enteredValues.name 
                        && enteredValues.description 
                        && enteredValues.endpoint 
                        && dynamicInputsData.length > 0 
                        && responseBody.trim().length > 0
                            ? "service-update__submit-button"
                            : "service-update__submit-button service-update__submit-button_inactive"
                    }
                    type="submit" 
                    disabled={
                        !enteredValues.name 
                        || !enteredValues.description 
                        || !enteredValues.endpoint 
                        || dynamicInputsData.length === 0 
                        || responseBody.trim().length === 0
                    }>
                        Update
                    </button>
                    <button className="service-update__cancel-button" type="button" onClick={() => navigate('/services/', { replace: true })}>Cancel</button>
                </div>
            </form>
        </section>
    );
}

export default ServiceUpdateForm;