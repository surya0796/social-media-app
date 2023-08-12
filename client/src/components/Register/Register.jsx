import { useEffect, useState } from "react";
import "../Login/Login.css"
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  //inputs
  const handleInputs = (e) => {
    e.preventDefault();
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(true);
    if (registerData.password !== registerData.confirmPassword) return;
    fetch("https://social-media-node.onrender.com/social/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          navigate("/login");
          console.log("final Data", data);
        } else {
          setDisableBtn(false);
        }
      });
  };

  useEffect(() => {
    console.log("useEffect", registerData);
  }, [registerData]);

  return (
    <div className="login">
      <h1 className="login-header">Signup for Social App</h1>

      <form className="loginBox" onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          className="loginInput"
          name="username"
          value={registerData.username}
          onChange={handleInputs}
          required
        />
        <input
          placeholder="First Name"
          className="loginInput"
          name="firstname"
          value={registerData.firstname}
          onChange={handleInputs}
          required
        />
        <input
          placeholder="Last Name"
          className="loginInput"
          name="lastname"
          value={registerData.lastname}
          onChange={handleInputs}
          required
        />
        <input
          placeholder="Email"
          className="loginInput"
          name="email"
          type="email"
          value={registerData.email}
          required
          onChange={handleInputs}
        />

        <input
          placeholder="Password"
          className="loginInput"
          type={showPassword ? "" : "password"}
          name="password"
          value={registerData.password}
          required
          onChange={handleInputs}
        />

        <input
          placeholder="Confirm Password"
          className="loginInput"
          type={showPassword ? "" : "password"}
          name="confirmPassword"
          value={registerData.confirmPassword}
          required
          onChange={handleInputs}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="passwordIcon"
        >
          &#128065;
        </span>

        <button type="submit" disabled={disableBtn} className="loginButton">
          Signup
        </button>
        <a href="/" className="loginRegisterButton">
          Already have an Account
        </a>
      </form>
    </div>
  );
}
