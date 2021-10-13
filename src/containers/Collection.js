import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "react-loader-spinner";

const Collection = ({ userToken }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:4000/favorites",
          "https://api--gamepad.herokuapp.com/favorites",

          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [refresh, data, userToken]);

  const handleUnfav = async (game) => {
    const response = await axios.post(
      // "http://localhost:4000/favorite/delete",
      "https://api--gamepad.herokuapp.com/favorite/delete",
      {
        game: game,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log("deleted");
    setRefresh(refresh + 1);
  };

  return userToken ? (
    isLoading ? (
      <Loader
        className="loader"
        type="Puff"
        color="red"
        height={80}
        width={80}
        timeout={3000}
      />
    ) : (
      <div className="pt-16">
        <div className="px-4 lg:px-32 xl:px-52">
          <div className="flex justify-center text-xl font-medium py-8">
            My collection
          </div>
          <div className="pb-10 sm:grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
            {data.favorite.map((elem, index) => {
              return (
                <div className="pb-4 sm:pb-0" key={index}>
                  <img
                    className="w-full object-cover h-64 rounded-tl-xl rounded-tr-xl"
                    src={elem.gameData.background_image}
                    alt={elem.name}
                  />
                  <div
                    className="w-full h-20 p-4 text-white bg-trueGray-800 rounded-bl-xl rounded-br-xl cursor-pointer"
                    onClick={() => {
                      history.push(`/game/${elem.gameData.slug}`);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      {elem.gameData.name}
                      <FontAwesomeIcon
                        icon="trash"
                        onClick={() => {
                          handleUnfav(elem.gameData);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  ) : (
    <Redirect to="/" />
  );
};

export default Collection;
