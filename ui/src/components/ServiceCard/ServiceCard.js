import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ServiceCard({card, checked, onCheckboxChange, size, onCardClick}) {
  const [checkedCard, setCheckedCard] = useState(checked);

  // Update the state if the parent `checked` prop changes
  useEffect(() => {
    setCheckedCard(checked);
  }, [checked]);

  const handleChange = (e) => {
    // Avoid redirect to update form
    e.stopPropagation();

    // Toggle the local state
    const newCheckedState = !checkedCard;
    setCheckedCard(newCheckedState);

    // Call the callback function passed from the parent
    onCheckboxChange(newCheckedState);
  };

  // Pass info for update service
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(card);
    }
  };

  return (
    !size ?
    <Link to='/update-service/' className="services-list__link" onClick={handleCardClick}>
      <li className="services-list__card" key={card.id}>
        <label className="services-list__checkbox-container" onClick={(e) => e.stopPropagation()}>
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
    </Link>
    :
    <Link to='/update-service/' className="services-list__link" onClick={handleCardClick}>
      <li className="services-list__card" key={card.id}>
        <label className="services-list__checkbox-container" onClick={(e) => e.stopPropagation()}>
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
    </Link>
  );
}

export default ServiceCard;