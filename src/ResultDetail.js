import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "./components/SearchContext";

function ResultDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useSearchContext();
  const result = location.state?.result || {};
  const [rating, setRating] = useState();
  const [va,setVa]=useState({value1:" "});
  const [ra,setRa]=useState({value2:" "});
  const [review, setReview] = useState("");

  useEffect(() => {
    if (location.state && location.state.searchResults) {
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: location.state.searchResults,
      });
    }
  }, [dispatch, location.state]);

  const submitRating = async () => {
    try {
      const data = {
        id: result.id,
        rating,
      };

      const response = await axios.post(
        "http://localhost:8000/addRating",
        data
      );
      if (response.status === 200) {
       
        dispatch({
          type: "UPDATE_SEARCH_RESULT",
          payload: response.data.updatedBrewery,
        });

       
        setRating(null);
      } else {
        alert("Failed to add Rating");
      }
    } catch (error) {
      alert("An error occurred");
      console.error(error);
    }
  };

  const submitReview = async () => {
    try {
      const data = {
        id: result.id,
        review,
      };

      const response = await axios.post(
        "http://localhost:8000/addReview",
        data
      );
      if (response.status === 200) {
        dispatch({
          type: "UPDATE_SEARCH_RESULT",
          payload: response.data.updatedBrewery,
        });
        setReview(null);
      } else {
        alert("Failed to add Review");
      }
    } catch (error) {
      alert("An error occurred");
      console.error(error);
    }
  };

const paragraphStyle = {
  fontSize: '16px',
  marginBottom: '8px',
  color:'red'
};

const strongStyle = {
  fontWeight: 'bold',
  marginRight: '8px',
  color:'black'

};
  return (
    <div style={{ marginLeft: "20px" }} className="result-detail">
      <h1 style={{ color: "Highlight" }}>Brewery Result Detail</h1>
    
      {result && (
        
        <>
           <p style={paragraphStyle}>
    <strong style={strongStyle}>Id:</strong> {result.id || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>Name:</strong> {result.name || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>Brewery Type:</strong> {result.brewery_type || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>State/Province:</strong> {result.state_province || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>Postal Code:</strong> {result.postal_code || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>Country:</strong> {result.country || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>Longitude:</strong> {result.longitude || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>Latitude:</strong> {result.latitude || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>Phone:</strong> {result.phone || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>Website:</strong> {result.website_url || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>State:</strong> {result.state || 'Data not available'}
  </p>
  <p style={paragraphStyle}>
    <strong style={strongStyle}>Street:</strong> {result.street || 'Data not available'}
  </p>
          {result.rating === null || result.rating === undefined ? (
        <>
          {rating !== null ? (
            <>
              <input
                type="number"
                placeholder=" Rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => {setRating(e.target.value)
                setVa({value1:e.target.value})}}
              />
              <button
                onClick={submitRating}
                style={buttonStyle}
              >
                Submit Rating
              </button>
            </>
          ) : (
            <p style={paragraphStyle}><strong style={strongStyle}>Rating:</strong> {va.value1}</p>
          )}
        </>
      ) : (
        <p style={paragraphStyle}><strong style={strongStyle}>Rating:</strong> {result.rating}</p>
      )}
      <br />
      <br />

      {result.review === null || result.review === undefined ? (
        <>
          {review !== null ? (
            <>
              <textarea
                type="text"
                rows="5"
                cols="40"
                placeholder="Enter Review"
                value={review}
                onChange={(e) => {{{setReview(e.target.value)}}
                setRa({value2:e.target.value})}}
              />
              <button
                onClick={submitReview}
                style={buttonStyle}
              >
                Submit Review
              </button>
            </>
          ) : (
            <p style={paragraphStyle}><strong style={strongStyle}>Review:</strong> {ra.value2}</p>
          )}
        </>
      ) : (
        <p style={paragraphStyle}><strong style={strongStyle}>Review:</strong> {result.review}</p>
      )}
        
          
        </>
      )}
    </div>
  );
}

const buttonStyle = {
  backgroundColor: "blue",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
  transition: "background-color 0.3s, color 0.3s",
};

export default ResultDetail;
