import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSearchContext } from './SearchContext';

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
};

const cardStyle = {
  width: '300px',
  margin: '50px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  textAlign: 'center',
};

const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
  transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
  fontSize: '16px',
};
const hoverButtonStyle = {
  backgroundColor: 'red',
  color: 'black',
  transform: 'scale(1.05)',
};

function Login() {
  const history = useNavigate();
  const { dispatch } = useSearchContext(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/', {
        email,
        password,
      });

      if (res.data === 'exist') {
        setLoggedInUser(email);
        history('/home', { state: { id: email } });
      } else if (res.data === 'notexist') {
        alert('User has not signed up or wrong details');
      }
    } catch (error) {
      alert('Wrong details');
      console.error(error);
    }
  }

  const handleLogout = () => {
   
    dispatch({ type: 'CLEAR_SEARCH_RESULTS' });

 
    history('/login');
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle} className="login">
        <h1 style={{ fontSize: '24px', color: 'blue' }}>Login</h1>
        <form method="post" onSubmit={submit}>
          <label htmlFor="email">Enter your email: </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <br />
          <br />
          <label htmlFor="password">Enter  password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <br />
          <br />
          <button
            style={{ ...buttonStyle, ...(isHovered && hoverButtonStyle) }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Login
          </button>
        </form>
        {loggedInUser && (
          <div style={{ marginTop: '20px' }}>
            <p>Welcome, {loggedInUser}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        <p>OR</p>
        <br />
        <Link
          to="/signup"
          style={{
            textDecoration: "underline",
            color: "blue",
            transition: "color 0.3s",
            fontSize: "20px",
          }}
          onMouseEnter={(e) => (e.target.style.color = "red")}
          onMouseLeave={(e) => (e.target.style.color = "blue")}
        >
          Signup Page
        </Link>
      </div>
    </div>
  );
}

export default Login;


