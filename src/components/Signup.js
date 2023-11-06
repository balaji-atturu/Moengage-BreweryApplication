
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            if (!email || !password) {
                alert("Please provide both email and password.");
                return;
            }

            const response = await axios.post("http://localhost:8000/signup", {
                email,
                password
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
        <div style={{ textAlign: 'center' }} className="signup">
            <h1 style={{
                fontSize: '24px',
                color: 'blue',
                width: '80px',
                backgroundColor: 'lightgray',
                padding: '10px',
                marginLeft: '570px',
                textAlign: 'center'
            }}>Signup</h1>

            <form onSubmit={submit}>
                <label htmlFor="name">Enter your Name: </label>
                <input type="text" placeholder="Name" required />
                <br />

                <label htmlFor="email">Enter your email: </label>
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" required />
                <br />

                <label htmlFor="password">Enter password: </label>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required />
                <br />

                <input
                    type="submit"
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginLeft: '20px',
                        marginTop: '20px',
                    }}
                />
            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/login" style={{
                textDecoration: 'underline',
                color: 'blue',
                transition: 'color 0.3s',
                fontSize: '20px',
            }}>
                Go to login Page
            </Link>
        </div>
    );
}

export default Signup;
