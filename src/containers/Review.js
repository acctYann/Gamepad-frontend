import React, { useState } from "react";
import axios from "axios";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Review = ({ userToken }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();
  const location = useLocation();
  let gameData = 0;
  if (location.state) {
    gameData = location.state.gameData;
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        // "http://localhost:4000/review/create",
        "https://api--gamepad.herokuapp.com/review/create",
        {
          text,
          title,
          gameData,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response) {
        history.goBack();
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage("You have already cerated a review for this game.");
      }
      console.log(error.response);
    }
  };

  return userToken ? (
    <div
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dssoozni5/image/upload/b_rgb:000000,o_20/v1632233495/gamepad/assets/spider-man_ykmygm.jpg)",
      }}
      className="w-full h-screen pt-16 bg-cover bg-center"
    >
      <div className="px-4 sm:px-20 lg:px-32 xl:px-52">
        <div className="flex justify-end items-end">
          <FontAwesomeIcon
            className="text-xl"
            icon="times"
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
        <form
          className="sm:flex sm:flex-col sm:items-center"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex justify-center text-xl font-medium pt-2 pb-8">
              Write a review
            </div>
          </div>
          <div className="w-full">
            <div>
              <div className="py-4">Title</div>
              <input
                className="input bg-opacity-70"
                type="text"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div>
              <div className="py-4">Review text</div>
              <textarea
                className="w-full h-40 resize-none py-4 px-4 mb-4 rounded-lg text-base align-text-top text-justify bg-black bg-opacity-70 text-white placeholder-trueGray-500 outline-none"
                cols="num"
                rows="num"
                placeholder="Write here."
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            </div>
            <div>
              <input
                className="w-full py-4 mb-4 rounded-lg text-base text-trueGray-700 hover:bg-trueGray-300 transform hover:-translate-y-0.5 sm:w-max sm:py-3 sm:px-10 sm:float-right"
                type="submit"
                value="Publish"
              />
            </div>
          </div>
          <div className="text-red-500 py-4">{errorMessage}</div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Review;
