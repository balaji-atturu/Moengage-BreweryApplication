

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSearchContext } from './SearchContext';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { state, dispatch } = useSearchContext();
  const [searchCity, setSearchCity] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const cameFromLoginPage = location.state && location.state.id;

  

  useEffect(() => {
    const handlePopstate = () => {
     
      window.location.reload();
    };

   
    window.addEventListener('popstate', handlePopstate);

    
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const handleSearch = async () => {
    if (!searchCity && !searchName && !searchType) {
      alert('Please enter at least one value for the search.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/search', {
        city: searchCity,
        name: searchName,
        type: searchType,
      });
  
      if (response.data.message === 'Your search did not match any results.') {
        alert('Your search did not match any results.');
        
        dispatch({ type: 'CLEAR_SEARCH_RESULTS' });
      } else {
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: response.data });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('you have entered wrong or there is no data available');
    }
  };

  const cardStyle = {
    width: '300px',
    margin: '50px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
  };

  const inputStyle = {
    padding: '10px',
    margin: '5px',
    borderRadius: '8px',
    border: '1px solid black',
    width: '200px',
    fontSize: '16px',
    outline: 'none',
  };

  const welcomeStyle = {
    color: 'red',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '20px 0',
    textAlign: 'center',
  };

  return (
    <div className="homepage">
      <h1 style={welcomeStyle}>
        Hello {cameFromLoginPage ? location.state.id : ''} and welcome to home
      </h1>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Enter brewery name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Enter brewery type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'red';
            e.target.style.color = 'black';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'blue';
            e.target.style.color = 'white';
          }}
        >
          Search
        </button>
      </div>
      {cameFromLoginPage && (
        <>
          <div style={{ marginTop: '45px' }}></div>

          {state.searchResults.length > 0 && (
            <div style={{ marginLeft: '30px', display: 'flex', flexWrap: 'wrap' }}>
              {state.searchResults.map((result, index) => (
                <div
                  key={index}
                  className="card"
                  style={{
                    flexBasis: '30%',
                    margin: '10px',
                    border: '3px solid grey',
                    borderRadius: '10px',
                    textAlign: 'center',
                    backgroundColor: 'ButtonShadow',
                  }}
                >
                  <div className="card-header">
                    <p
                      style={{
                        fontSize: '26px',
                        color: 'red',
                        fontStyle: 'italic',
                        marginBottom: '8px',
                        marginLeft: '8px',
                      }}
                    >
                      Brewery Result {index + 1}
                    </p>
                  </div>
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ fontWeight: 'bold', fontSize: '18px', color: 'blue' }}
                    >
                      Name: {result.name || 'Data not available'}
                    </h5>
                    <p className="card-text">
                      <strong>Address:</strong> {result.address_1 || 'Data not available'}
                    </p>
                    <p className="card-text">
                      <strong>Phone:</strong> {result.phone || 'Data not available'}
                    </p>
                    <p className="card-text">
                      <strong>Website:</strong> {result.website_url || 'Data not available'}
                    </p>
                    <p className="card-text">
                      <strong>State:</strong> {result.state || 'Data not available'}
                    </p>
                    <p className="card-text">
                      <strong>Rating:</strong> {result.rating || 'Data not available'}
                    </p>
                    <p className="card-text">
                      <strong>City:</strong> {result.city || 'Data not available'}
                    </p>
                    <Link
                      to={`/result/${index}`}
                      state={{ result }}
                      style={{
                        textDecoration: 'none',
                        backgroundColor: 'blue',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '5px',
                        display: 'inline-block',
                        margin: '8px 0',
                        transition: 'background-color 0.3s, color 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'red';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'blue';
                      }}
                    >
                      ClickMeForFullDetails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;

