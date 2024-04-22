import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import ServicesList from '../ServicesList/ServicesList';

function Main({cards, onCardDelete, onPageChange, totalAmountOfCards, currentPage, totalPages, onCreateClick, cardsPerPage, onCardsPerPageCange, onSearch, onCurrentPageReset}) {
    

    return (
        <main className="main">
            <SearchForm onSearch={onSearch} onCurrentPageReset={onCurrentPageReset}/>
            <ServicesList 
                cards={cards} 
                onCardDelete={onCardDelete} 
                onPageChange={onPageChange}
                totalAmountOfCards={totalAmountOfCards}
                currentPage={currentPage}
                totalPages={totalPages}
                onCreateClick={onCreateClick}
                cardsPerPage={cardsPerPage}
                onCardsPerPageCange={onCardsPerPageCange}
            />
        </main>
    );
}

export default Main;