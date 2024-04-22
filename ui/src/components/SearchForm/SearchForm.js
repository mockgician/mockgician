import React, { useState, useRef, useEffect } from 'react';


function SearchForm({onSearch, onCurrentPageReset}) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query.trim());
        onCurrentPageReset();
    };

    //return to all the services
    const handleBlur = () => {
        if (query.trim() === '') {
          onSearch('');
        }
    };

    useEffect(() => {
        if (query.trim() === '' && document.activeElement === inputRef.current) {
          inputRef.current.blur();
        }
    }, [query]);

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__input-container">
                    <input 
                        name="query" 
                        className="search__input" 
                        id="search-input" 
                        type="text" 
                        placeholder="Searching for"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onBlur={handleBlur}
                        autoFocus={!query.trim()}
                        ref={inputRef}
                    />
                    <button className="search__button" type="submit"></button>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;