import React, { useState, useEffect, useLayoutEffect } from 'react';
import Pagination from "react-js-pagination";
import ServiceCard from '../ServiceCard/ServiceCard';
import arrow_prev from '../../images/arrow-prev.svg';
import arrow_next from '../../images/arrow-next.svg';
import dots from '../../images/dots.svg';

function ServicesList({ cards, onCardDelete, onCardClick, onPageChange, totalAmountOfCards, currentPage, totalPages, onCreateClick, cardsPerPage, onCardsPerPageCange }) {
  const [checkedAll, setCheckedAll] = useState(false);
  const [cardCheckedStates, setCardCheckedStates] = useState(cards.map(() => false));
  const [isMobile, setIsMobile] = useState(0);
  const [selectedAmountOfCards, setSelectedAmountOfCards] = useState(cardsPerPage);

  const handleCheckedAll = () => {
    setCheckedAll(!checkedAll);
    setCardCheckedStates(cards.map(() => !checkedAll));
  };

  function checkIfCheckedOne() {
    return cardCheckedStates.some((state) => state);
  }

  const handleCheckboxChange = (cardIndex, isChecked) => {
    // Update the individual card's checked state
    const updatedCardCheckedStates = [...cardCheckedStates];
    updatedCardCheckedStates[cardIndex] = isChecked;
  
    // Update the state
    setCardCheckedStates(updatedCardCheckedStates);
  
    // Update the "All" checkbox state
    setCheckedAll(updatedCardCheckedStates.every((state) => state));
  };

  function handleDeleteClick() {
    const selectedCardIds = cards
    .filter((_card, index) => cardCheckedStates[index])
    .map((card) => card.id);

    console.log("Selected Card IDs:", selectedCardIds);
    onCardDelete(selectedCardIds);
  }

  // Update the state of checkboxex after deleting cards
  useEffect(() => {
    setCardCheckedStates(cards.map(() => false));
    setCheckedAll(false);
  }, [cards]);

  // Resize
  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handleNextButtonClick = () => {
    const nextPage = currentPage + 1;

    if(nextPage === totalPages+1) {
      handlePageChange(currentPage);
    } else {
      handlePageChange(nextPage);
    }
  };

  const handlePrevButtonClick = () => {
    const nextPage = currentPage - 1;
    if(nextPage === 0) {
      handlePageChange(currentPage);
    } else {
      handlePageChange(nextPage);
    }
  };

  // Handle change of shown nubmer of cards
  const handleCardsPerPageChange = (e) => {
    const selectedAmountOfCards = parseInt(e.target.value, 10);
    onCardsPerPageCange(selectedAmountOfCards);
    setSelectedAmountOfCards(selectedAmountOfCards);
    onPageChange(1);
  };

  // Pass info for update service
  const handleCardClick = (card) => {
    if (onCardClick) {
      onCardClick(card);
    }
  };

  return (
    <section className="services-list">
      <div className="services-list__info">
        <p className="services-list__result">
          Found: <span className="services-list__result services-list__result_num">{totalAmountOfCards}</span>
        </p>

        <div className="services-list__buttons">
          <button
            className={
              checkedAll || checkIfCheckedOne() === true
                ? 'services-list__delete-button'
                : 'services-list__delete-button services-list__delete-button_disabled'
            }
            type="button"
            disabled={checkedAll || checkIfCheckedOne() ? false : true}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
          <button className="services-list__create-button" type="button" onClick={onCreateClick}>
            Create
          </button>
        </div>
      </div>
      { 
      isMobile ?
      <select className="services-list__more-button" name="more-button" onChange={handleCardsPerPageChange} value={selectedAmountOfCards}>
        <option value="10">Show 10</option>
        <option value="20">Show 20</option>
        <option value="50">Show 50</option>
      </select>
      :
      <></>
      }

      <ul className="services-list__container">
        {
        !isMobile ? 
        <li className="services-list__headers">
          <label className="services-list__headers-text">
            <input
              type="checkbox"
              className="services-list__checkbox"
              checked={checkedAll}
              onChange={handleCheckedAll}
            />
            <span className="services-list__checkbox-visible"></span>
            TYPE
          </label>
          <p className="services-list__headers-text">NAME</p>
          <p className="services-list__headers-text">ENDPOINT</p>
          <p className="services-list__headers-text">DESCRIPTION</p>
        </li>
        :
        <li className="services-list__headers-mobile">
          <label className="services-list__headers-text">
            <input
              type="checkbox"
              className="services-list__checkbox"
              checked={checkedAll}
              onChange={handleCheckedAll}
            />
            <span className="services-list__checkbox-visible"></span>
            SELECT ALL
          </label>
        </li>
        }
        {cards.map((card, index) => (
          <ServiceCard
            size={isMobile}
            key={card.id}
            card={card}
            onCardClick={() => handleCardClick(card)}
            checked={cardCheckedStates[index] || false}
            onCheckboxChange={(isChecked) => handleCheckboxChange(index, isChecked)}
          />
        ))}
      </ul>
      {!isMobile ? 
      <div className="services-list__pagination">
        <select className="services-list__more-button" name="more-button" onChange={handleCardsPerPageChange} value={selectedAmountOfCards}>
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
          <option value="50">Show 50</option>
        </select>

        <div className="services-list__pagination-container">
          <button 
            className="services-list__navigation-button" 
            type="button" 
            onClick={handlePrevButtonClick}
          >
            <img className="services-list__prev-arrow" alt="Prev arrow" src={arrow_prev} />
          </button>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={cardsPerPage}
            totalItemsCount={totalAmountOfCards}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            prevPageText={currentPage > 3 ? <img src={dots} alt="Hidden previous pages"/> : null}
            nextPageText={totalPages > 2 && currentPage !== totalPages - 1 && currentPage !== totalPages - 2 ? <img src={dots} alt="Hidden next pages"/> : null}
            firstPageText={currentPage > 2 ? "1" : null}
            lastPageText={totalPages > 3 && currentPage !== totalPages - 1 ? `${totalPages}` : null} 
            itemClassNext={currentPage === totalPages - 1 || currentPage === totalPages - 2 || totalPages === 4 ? "disabled" : ""}
            itemClassLast={currentPage === totalPages - 1 || totalPages === 3 ? "disabled" : ""}
            itemClassPrev={currentPage <= 3 || totalPages === 4 ? "disabled" : ""}
            itemClassFirst={currentPage <= 2 || totalPages === 3 ? "disabled" : ""}
          />
          <button 
            className="services-list__navigation-button" 
            type="button" 
            onClick={handleNextButtonClick}
          >
            <img className="services-list__next-arrow" alt="Next arrow" src={arrow_next} />
          </button>
        </div>
      </div>
      :
      <div className="services-list__pagination-container">
          <button 
            className="services-list__navigation-button" 
            type="button" 
            onClick={handlePrevButtonClick}
          >
            <img className="services-list__prev-arrow" alt="Prev arrow" src={arrow_prev} />
          </button>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={cardsPerPage}
            totalItemsCount={totalAmountOfCards}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            prevPageText={currentPage > 3 ? <img src={dots} alt="Hidden previous pages"/> : null}
            nextPageText={totalPages > 2 && currentPage !== totalPages - 1 && currentPage !== totalPages - 2 ? <img src={dots} alt="Hidden next pages"/> : null}
            firstPageText={currentPage > 2 ? "1" : null}
            lastPageText={totalPages > 3 && currentPage !== totalPages - 1 ? `${totalPages}` : null} 
            itemClassNext={currentPage === totalPages - 1 || currentPage === totalPages - 2 || totalPages === 4 ? "disabled" : ""}
            itemClassLast={currentPage === totalPages - 1 || totalPages === 3 ? "disabled" : ""}
            itemClassPrev={currentPage <= 3 || totalPages === 4 ? "disabled" : ""}
            itemClassFirst={currentPage <= 2 || totalPages === 3 ? "disabled" : ""}
          />
          <button 
            className="services-list__navigation-button" 
            type="button" 
            onClick={handleNextButtonClick}
          >
            <img className="services-list__next-arrow" alt="Next arrow" src={arrow_next} />
          </button>
        </div>
      }
    </section>
  );
}

export default ServicesList;