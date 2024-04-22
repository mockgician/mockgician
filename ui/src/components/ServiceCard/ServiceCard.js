import React, { useState, useEffect } from 'react';

function ServiceCard({card, checked, onCheckboxChange, size}) {
  const [checkedCard, setCheckedCard] = useState(checked);

  // Update the state if the parent `checked` prop changes
  useEffect(() => {
    setCheckedCard(checked);
  }, [checked]);

  const handleChange = () => {
    // Toggle the local state
    const newCheckedState = !checkedCard;
    setCheckedCard(newCheckedState);

    // Call the callback function passed from the parent
    onCheckboxChange(newCheckedState);
  };

  return (
    !size ?
    <li className="services-list__card" key={card.id}>
      <label className="services-list__checkbox-container">
        <input 
        type="checkbox" 
        className="services-list__checkbox" 
        checked={checkedCard}
        onChange={handleChange}
        />
        <span className="services-list__checkbox-visible"></span> 
        <p className={card.type === "REST" ? "services-list__card-type-rest" : "services-list__card-type-soap"}>{card.type}</p>
      </label>
      <p className="services-list__card-text">{card.name}</p>
      <p className="services-list__card-text">{card.address}</p>
      <p className="services-list__card-text">{card.description}</p>
    </li>
    :
    <li className="services-list__card" key={card.id}>
      <label className="services-list__checkbox-container">
        <input 
        type="checkbox" 
        className="services-list__checkbox" 
        checked={checkedCard}
        onChange={handleChange}
        />
        <span className="services-list__checkbox-visible"></span> 
      </label>
      
      <div className="services-list__grid-container">
          <p className="services-list__card-text">{card.name}</p>
          <p className={card.type === "REST" ? "services-list__card-type-rest" : "services-list__card-type-soap"}>{card.type}</p>
          <p className="services-list__card-text">{card.address}</p>
      </div>
    </li>
  );
}

export default ServiceCard;