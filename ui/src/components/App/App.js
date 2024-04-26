import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import authApi from '../../utils/AuthApi';
import mainApi from '../../utils/MainApi';
import Header from '../Header/Header';
import Signin from '../SignIn/SignIn';
import Main from '../Main/Main';
import Popup from '../Popup/Popup';
import ServiceCreateForm from '../ServiceCreateForm/ServiceCreateForm';
import ServiceUpdateForm from '../ServiceUpdateForm/ServiceUpdateForm';
import Footer from '../Footer/Footer';


function App() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: '', password: '' });
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAmountOfCards, setTotalAmountOfCards] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cardsDeleted, setCardsDeleted] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  // Login
  function signInUser({ username, password }) {
    authApi.signin(username, password)
      .then((data) => {
        localStorage.setItem('access_token', data.access_token);
        setCurrentUser({ username: username, password: password });
        setIsLoggedIn(true);
        localStorage.removeItem('currentPage');
        localStorage.removeItem('cardsPerPage');
        setCurrentPage(1);
        setCardsPerPage(10);
        mainApi.getCards(1, 10)
        .then((data) => {
          setCards(data.services);
          setTotalAmountOfCards(data.total);
          setTotalPages(data.pages);
        });
        navigate('/services/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Stay loggen in after refreshing the page
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      setIsLoggedIn(true); 
    }
  }, []);
  
  // Get Cards
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if(isLoggedIn && access_token) {
      if (searchQuery) {
        handleSearch(searchQuery);
      } else if (searchQuery === '') {
        mainApi
          .getCards(currentPage, cardsPerPage)
          .then((data) => {
            setCards(data.services);
            setTotalAmountOfCards(data.total);
            setTotalPages(data.pages);
            setCardsPerPage(cardsPerPage);
          })
          .catch((err) => {
            console.log(err)
            navigate('/token/', { replace: true });
          });
      }
    }
  }, [isLoggedIn, currentPage, cardsDeleted, cardsPerPage, searchQuery]);
  
  // Delete Card
  function handleCardDelete(selectedCardIds) {
    mainApi
      .deleteCard(selectedCardIds)
      .then(() => {
        setCards((prevCards) =>
          prevCards.filter((card) => !selectedCardIds.includes(card.id))
        );
        setCardsDeleted(true);

        // Check if there are still cards left after deletion
        if (cards.length - selectedCardIds.length === 0) {
          // Find the last non-empty page
          const lastNonEmptyPage = Math.max(1, currentPage - 1);
          setCurrentPage(lastNonEmptyPage);
          localStorage.setItem('currentPage', lastNonEmptyPage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCardsDeleted(false);
    localStorage.setItem('currentPage', pageNumber);
  };

  // Stay on the same page after refreshing
  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage !== null) {
      setCurrentPage(parseInt(storedPage, 10));
    }
  }, []);

  // Handle change of shown nubmer of cards
  const handleCardsPerPageChange = (chosenNumber) => {
    setCardsPerPage(chosenNumber);
    localStorage.setItem('cardsPerPage', chosenNumber); 
  };

  // Stay with the same amount cards per page after refreshing
  useEffect(() => {
    const storedCardsPerPage = localStorage.getItem('cardsPerPage');
    if (storedCardsPerPage) {
      setCardsPerPage(parseInt(storedCardsPerPage, 10));
    }
  }, []);

  // Popup
  const handleCreateClick = () => {
    setIsPopupOpen(true);
  }

  const closePopup = () => {
    setIsPopupOpen(false);
  }

  function redirectToCreateService() {
    navigate('/create-service/', { replace: true });
    setIsPopupOpen(false);
  }

  // Handle type selection from Popup
  const handleTypeSelect = (type) => {
    setSelectedType(type);
  }

  // Search
  const handleSearch = (query) => {
      setSearchQuery(query);

      mainApi.searchCards(currentPage, cardsPerPage, query)
        .then((data) => {
          setCards(data.services);
          setTotalAmountOfCards(data.total);
          setTotalPages(data.pages);
          setCurrentPage(currentPage);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  //Create card
  const createNewCard = (newCardData) => {
    mainApi
      .createCard(newCardData)
      .then((createdCard) => {
        setCards((prevCards) => [...prevCards, createdCard]);
        navigate('/services/', { replace: true });
      })
      .catch((error) => {
        console.error('Error creating card:', error);
      });
  };

  //Update card
  const handleCardClick = (card) => {
    console.log('Card clicked:', card);
    setSelectedCard(card);
  };

  const updateCard = (updatedCardData) => {
    mainApi
      .updateCard(updatedCardData)
      .then((updatedCard) => {
        setCards((prevCards) => [...prevCards, updatedCard]);
        navigate('/services/', { replace: true });
      })
      .catch((error) => {
        console.error('Error updating card:', error);
      });
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Routes>
          <Route path="*" element={isLoggedIn ? <Navigate to="/services/" /> : <Navigate to="/token/" />} />
          <Route path="/token/" element={ <Signin signInUser={signInUser}/>}/>
          <Route path="/services/" 
            element={ <ProtectedRoute 
              element={Main}
              cards={cards}
              loggedIn={isLoggedIn}
              onCardDelete={handleCardDelete}
              onCardClick={handleCardClick}
              onPageChange={handlePageChange}
              totalAmountOfCards={totalAmountOfCards}
              currentPage={currentPage}
              totalPages={totalPages}
              onCreateClick={handleCreateClick}
              cardsPerPage={cardsPerPage}
              onCardsPerPageCange={handleCardsPerPageChange}
              onSearch={handleSearch} 
            />}
          />
          <Route path="/create-service/" element={ <ServiceCreateForm createNewCard={createNewCard} type={selectedType}/>}/>
          <Route path="/update-service/" element={ <ServiceUpdateForm updateCard={updateCard} service={selectedCard}/>}/>
        </Routes>
        <Footer/>
        <Popup isOpen={isPopupOpen} onClose={closePopup} redirectToCreateService={redirectToCreateService} onTypeSelect={handleTypeSelect}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;