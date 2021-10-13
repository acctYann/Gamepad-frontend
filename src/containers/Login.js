import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = ({ setConnected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post(
          // "http://localhost:4000/user/login",
          "https://api--gamepad.herokuapp.com/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data.token);
        if (response.data.token) {
          setConnected(response.data.token, response.data.usename);
          // alert("You are now connected.");
          history.push("/");
        }
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 400) {
          setErrorMessage("Wrong email or password.");
          console.log(error.message);
        }
        console.log(error.response.data.error.message);
      }
    } else {
      setErrorMessage("All fields are required.");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage();
    }, 5000);
  }, [errorMessage]);

  return (
    <div
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dssoozni5/image/upload/b_rgb:000000,o_20/v1632234064/gamepad/assets/gta-5_st9247.jpg)",
      }}
      className="w-full h-screen pt-16 bg-cover bg-center "
    >
      <section className="flex flex-col items-center">
        <div className="py-8 text-xl font-medium">Log in</div>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col w-screen px-4 sm:w-96">
            <input
              className="input"
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              className="py-4 mb-4 rounded-lg text-base text-trueGray-700 hover:bg-trueGray-300 transform hover:-translate-y-0.5"
              type="submit"
              value="Log in"
            />
          </div>
        </form>
        <div className="flex flex-col items-center py-4">
          <Link to="/signup">Don't have an account? Sign up.</Link>
          <div className="text-red-500 py-4">{errorMessage}</div>
        </div>
      </section>
    </div>
  );
};

export default Login;
