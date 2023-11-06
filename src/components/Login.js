
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/", {
                email,
                password,
            })
                .then((res) => {
                    if (res.data === "exist") {
                        history("/home", { state: { id: email } });
                    } else if (res.data === "notexist") {
                        alert("User has not signed up");
                    }
                })
                .catch((error) => {
                    alert("Wrong details");
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ textAlign: "center" }} className="login">
            <h1 style={{
                fontSize: "24px",
                color: "blue",
                width: "80px",
                backgroundColor: "lightgray",
                padding: "10px",
                marginLeft: "570px",
                textAlign: "center",
            }}>
                Login
            </h1>
            <form method="post" onSubmit={submit}>
                <label htmlFor="email">Enter your email: </label>
                <input type="email" id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" required />
                <br />
                <label htmlFor="password">Enter password: </label>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required />
                <br />
                <input
                    type="submit"
                    style={{
                        backgroundColor: "blue",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "20px",
                        marginTop: "20px",
                    }}
                />
            </form>
            <br />
            <p>OR</p>
            <br />
            <Link to="/signup" style={{
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
    );
}

export default Login;
