
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function ResultDetail() {
  const location = useLocation();
  const result = location.state.result || {}; 
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const submitRatingAndReview = async () => {
    try {
      const data = {
        id: result.id, 
        rating,
        review,
      };

      const response = await axios.post("http://localhost:8000/addRatingAndReview", data);

      if (response.status === 200) {
        alert("Rating and Review added successfully");
      } else {
        alert("Failed to add Rating and Review");
      }
    } catch (error) {
      alert("An error occurred");
      console.error(error);
    }
  };


  return (
    <div style={{marginLeft:'20px'}}className="result-detail">
      <h1 style={{color:'Highlight'}}>Brewery Result Detail</h1>
      <h4>To add rating and review Scroll Down</h4>
      <p>Id: {result.id || 'Data not available'}</p>
      <p>Name: {result.name || 'Data not available'}</p>
      <p>brewey_type: {result.brewery_type || 'Data not available'}</p>
      <p>Address_1: {result.address_1 || 'Data not available'}</p>
      <p>Address_2: {result.address_2 || 'Data not available'}</p>
      <p>Address_3: {result.address_3 || 'Data not available'}</p>
      <p>City: {result.city || 'Data not available'}</p>
      <p>State_Province: {result.state_province || 'Data not available'}</p>
      <p>Postal_code: {result.postal_code || 'Data not available'}</p>
      <p>Country: {result.country || 'Data not available'}</p>
      <p>Longitude: {result.longitude || 'Data not available'}</p>
      <p>Latitude: {result.latitude || 'Data not available'}</p>
      <p>Phone: {result.phone || 'Data not available'}</p>
      <p>Website: {result.website_url || 'Data not available'}</p>
      <p>State: {result.state || 'Data not available'}</p>
      <p>Street: {result.street || 'Data not available'}</p>
      {result.rating === null || result.rating === undefined ? (
        <input
        type="number"
          placeholder=" Rating"
          min="1" 
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      ) : (
        <p>Rating: {result.rating}</p>
      )}

      {result.review === null || result.review === undefined ? (
        <input
          type="text"
          placeholder="Enter Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      ) : (
        <p>Review: {result.review}</p>
      )}

      {((result.rating === null || result.rating === undefined) ||
        (result.review === null || result.review === undefined)) && (
          <button
          onClick={submitRatingAndReview}
          style={{
            backgroundColor: 'blue', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            marginTop: '10px', 
            transition: 'background-color 0.3s, color 0.3s', 
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'green'; 
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'blue'; 
          }}
        >
          Submit Rating and Review
        </button>
      )}
      <h4>If user enters the rating and review first time it will be saved in my database to see next time user have come from searching page, then user can see rating and review</h4>
      <h4> Complete Problem is done</h4>
    </div>
  );
}

export default ResultDetail;

