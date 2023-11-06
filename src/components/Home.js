import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [searchCity, setSearchCity] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/search', {
        city: searchCity,
        name: searchName, 
        type: searchType, 
      });

      if (response.status === 200) {
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="homepage">
      <h1>Hello and welcome to the home</h1>
      <h4>Enter anyone of city or brewery name or brewery type and click search</h4>
      <h4>User have to add either city name correctly or brewey type correctly or brewery name correctly, Otherwise nothing will be displayed</h4>
      <input
        type="text"
        placeholder="Enter city name"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter brewery name" ld
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter brewery type" 
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
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
      {searchResults.length > 0 && (
        <div style={{marginLeft:'30px'}}>
          {searchResults.map((result, index) => (
            <div key={index}>
                       <p style={{
  fontSize: '26px', 
  color: 'red',  
  fontStyle: 'italic', 
  marginBottom: '8px', 
  marginLeft: '8px',
}}>
  Brewery Result {index + 1}
</p>
<p style={{
  fontWeight: 'bold', 
  fontSize: '18px', 
  color: 'blue', 
  marginBottom: '8px', 
}}>
  Name: {result.name || 'Data not available'}
</p>
              <p>Address: {result.address_1 || 'Data not available'}</p>
              <p>Phone: {result.phone || 'Data not available'}</p>
              <p>Website: {result.website_url || 'Data not available'}</p>
              <p>State: {result.state || 'Data not available'}</p>
              <p>Rating: {result.rating || 'Data not available'}</p>
              <p>City: {result.city || 'Data not available'}</p>
     
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;