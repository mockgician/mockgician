import React, { useEffect, useState, useRef } from 'react';
import mainApi from '../../utils/MainApi';

function Popup({ isOpen, onClose, redirectToCreateService, onTypeSelect }) {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('REST');
    const popupRef = useRef();

    useEffect(() => {
        mainApi.getServiceTypes()
          .then((data) => {
            setOptions(data);
          })
          .catch((err) => {
            console.log(err);
          });
    }, [isOpen]); 

    useEffect(() => {
        const handleOutsideClick = (e) => {
          if (isOpen && !popupRef.current.contains(e.target)) {
            onClose();
          }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    function handleSubmit(e) {
      e.preventDefault();
      onTypeSelect(selectedOption);
      redirectToCreateService();
  }

    return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container" ref={popupRef}>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <form className="popup__form" name="popup-form" noValidate onSubmit={handleSubmit}>
                    <h2 className="popup__title">Choose type of service</h2>
                    <label className="popup__input-label">Type</label>
                    <select className="popup__input" name="popup-input" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button className="popup__submit-button" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}

export default Popup;