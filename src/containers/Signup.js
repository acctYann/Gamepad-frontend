import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import unknown from "../assets/img/unknown.jpeg";

const Signup = ({ setConnected }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      if (email && username && password && confirmPassword && avatar) {
        try {
          const formData = new FormData();

          formData.append("email", email);
          formData.append("username", username);
          formData.append("password", password);
          formData.append("confirmPassword", confirmPassword);
          formData.append("avatar", avatar);

          const response = await axios.post(
            // "http://localhost:4000/user/signup",
            "https://api--gamepad.herokuapp.com/user/signup",
            formData
          );
          console.log(response.data.token);
          if (response.data.token) {
            setConnected(response.data.token, response.data.usename);
            // alert("You are now connected.");
            history.push("/");
          }
        } catch (error) {
          if (error.response.status === 409 || error.response.status === 400) {
            setErrorMessage("This email is already used.");
            console.log(error.message);
          }
          console.log(error.response.data.error.message);
        }
      } else {
        setErrorMessage("All fields are required.");
      }
    } else {
      setErrorMessage("Passwords should match.");
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
          "url(https://res.cloudinary.com/dssoozni5/image/upload/b_rgb:000000,o_20/v1632228686/gamepad/assets/skyrim-bg_jchaah.jpg)",
      }}
      className="w-full h-screen pt-16 bg-cover bg-center sm:h-full"
    >
      <section className="flex flex-col items-center">
        <div className="py-8 text-xl font-medium">Sign up</div>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          {preview ? (
            <div className="flex flex-col items-end pb-8">
              <div
                onClick={() => {
                  setPreview();
                }}
              >
                <FontAwesomeIcon className="flex text-xl" icon="times" />
              </div>
              <img
                className="w-32 rounded-full bg-cover border-2"
                src={preview}
                alt="Preview"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center pb-8">
              <label htmlFor="file">
                <img
                  className="w-32 rounded-full border-2 "
                  src={unknown}
                  alt="Unknown Avatar"
                />
              </label>
              <input
                className="hidden"
                id="file"
                type="file"
                onChange={(event) => {
                  // console.log(event.target.files);
                  setAvatar(event.target.files[0]);
                  setPreview(URL.createObjectURL(event.target.files[0]));
                }}
              />
            </div>
          )}
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
              type="text"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              className="input"
              type="password"
              placeholder="Create a password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              className="input"
              type="password"
              placeholder="Confirm password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <input
              className="py-4 mb-4 rounded-lg text-base text-trueGray-700 hover:bg-trueGray-300 transform hover:-translate-y-0.5"
              type="submit"
              value="Sign up"
            />
          </div>
        </form>
        <div className="flex flex-col items-center py-4">
          <Link to="/login">Already have an account? Log in.</Link>
          <div className="text-red-500 py-4">{errorMessage}</div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
