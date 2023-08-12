import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation()

  //states
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(location)
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const handleLoginInputs = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  //LOGIN
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    fetch("https://social-media-node.onrender.com/social/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.status === 200) {
          localStorage.setItem("user-token", JSON.stringify(data.body));
          navigate("/");
        } else {
          console.error(data.error)
        }
      });
  };

  //REGISTER
  return (
    <div className="login">
      <h2 className="login-header">Social App</h2>
      <form className="loginBox" onSubmit={handleLoginSubmit}>
        <input
          placeholder="Email"
          className="loginInput"
          required
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleLoginInputs}
        />
        <input
          placeholder="Password"
          className="loginInput"
          required
          type={showPassword ? "" : "password"}
          name="password"
          value={loginData.password}
          onChange={handleLoginInputs}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="passwordIcon"
        >
          &#128065;
        </span>
        <button className="loginButton" type="submit">
          Log In
        </button>
        <span className="loginForgot">Forgot Password?</span>
        <a href="/register" className="loginRegisterButton">
          Create a New Account
        </a>
      </form>
    </div>
  );
}
