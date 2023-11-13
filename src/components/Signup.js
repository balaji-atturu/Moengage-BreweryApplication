import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const cardStyle = {
  width: "300px",
  margin: "50px auto",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  textAlign: "center",
};

const buttonStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px 20px",
    border: "1px solid gray",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s, color 0.3s, transform 0.2s",
    fontSize: "16px",
  };
  const hoverButtonStyle = {
    backgroundColor: "red",
    color: "black",
    transform: "scale(1.05)", 
  };

function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  async function submit(e) {
    e.preventDefault();

    try {
      if (!email || !password) {
        alert("Please provide both email and password.");
        return;
      }

      const response = await axios.post("http://localhost:8000/signup", {
        email,
        password,
      });

      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data === "notexist") {
        history("/login", { state: { id: email } });
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error(error);
    }
  }

  return (
    <div style={cardStyle} className="signup">
      <h1 style={{ fontSize: "24px", color: "blue" }}>Signup</h1>
      <form onSubmit={submit}>
        <label htmlFor="name">Enter your Name: </label>
        <input type="text" placeholder="Name" required />
        <br />
        <br />
        <label htmlFor="email">Enter your email: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <br />
        <label htmlFor="password">Enter password: </label>
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
        SignUp
      </button>
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link
        to="/login"
        style={{
          textDecoration: "underline",
          color: "blue",
          transition: "color 0.3s",
          fontSize: "20px",
        }}
        onMouseEnter={(e) => (e.target.style.color = "red")}
        onMouseLeave={(e) => (e.target.style.color = "blue")}
      >
        Go to login Page
      </Link>
    </div>
  );
}

export default Signup;
