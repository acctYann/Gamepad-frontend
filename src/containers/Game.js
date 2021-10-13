import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";

const Game = ({ userToken, userId }) => {
  const [data, setData] = useState();
  const [gameSeriesData, setGameSeriesData] = useState();
  const [reviewsData, setReviewsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteData, setFavoriteData] = useState();
  const [refresh, setRefresh] = useState(0);

  const params = useParams();
  const { slug } = params;
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${slug}?key=c8250ad893d64630b6c7f313faf7ac44`
        );
        const responseGameSeries = await axios.get(
          `https://api.rawg.io/api/games/${slug}/game-series?key=c8250ad893d64630b6c7f313faf7ac44`
        );
        const responseReviews = await axios.post(
          // "http://localhost:4000/reviews",
          "https://api--gamepad.herokuapp.com/reviews",
          { slug }
        );
        if (userToken) {
          const responseFavorites = await axios.get(
            // "http://localhost:4000/favorites",
            "https://api--gamepad.herokuapp.com/favorites",
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          // console.log(responseFavorites.data);
          setFavoriteData(responseFavorites.data);
        }
        // console.log(response.data);
        console.log(responseGameSeries.data);
        // console.log(responseReviews.data);
        setData(response.data);
        setGameSeriesData(responseGameSeries.data);
        setReviewsData(responseReviews.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [slug, refresh, userToken]);

  const checkIfFavorite = () => {
    if (favoriteData) {
      for (let i = 0; i < favoriteData.favorite.length; i++) {
        if (favoriteData.favorite[i].gameData.slug === slug) {
          return true;
        }
      }
    }
  };

  const handleFavorite = async () => {
    if (userToken) {
      if (!checkIfFavorite()) {
        const response = await axios.post(
          // "http://localhost:4000/favorite/create",
          "https://api--gamepad.herokuapp.com/favorite/create",
          { game: data },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response) {
          console.log("created");
        }
      } else {
        const response = await axios.post(
          // "http://localhost:4000/favorite/delete",
          "https://api--gamepad.herokuapp.com/favorite/delete",
          { game: data },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response) {
          console.log("deleted");
        }
      }
      setRefresh(refresh + 1);
    } else {
      history.push("/login");
    }
  };

  const checkIfReview = () => {
    if (reviewsData) {
      if (userId) {
        for (let i = 0; i < reviewsData.length; i++) {
          if (reviewsData[i].user.id === userId) {
            return true;
          }
        }
      } else {
        return false;
      }
    }
  };

  const handleReview = () => {
    if (userToken) {
      history.push("/review", { gameData: data });
    } else {
      history.push("/login");
    }
  };

  let platforms = "";
  let genres = "";
  let developers = "";
  let publishers = "";
  if (data) {
    for (let i = 0; i < data.platforms.length; i++) {
      if (platforms) {
        platforms += ", " + data.platforms[i].platform.name;
      } else {
        platforms += data.platforms[i].platform.name;
      }
    }
    for (let i = 0; i < data.genres.length; i++) {
      if (genres) {
        genres += ", " + data.genres[i].name;
      } else {
        genres += data.genres[i].name;
      }
    }
    for (let i = 0; i < data.developers.length; i++) {
      if (developers) {
        developers += ", " + data.developers[i].name;
      } else {
        developers += data.developers[i].name;
      }
    }
    for (let i = 0; i < data.publishers.length; i++) {
      if (publishers) {
        publishers += ", " + data.publishers[i].name;
      } else {
        publishers += data.publishers[i].name;
      }
    }
  }

  return isLoading ? (
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
      <div className="px-4 sm:px-24 md:px-4 lg:px-32 xl:px-52">
        <div className="flex justify-center text-xl font-medium py-8">
          {data.name}
        </div>
        <article>
          <div>
            <div className="md:grid md:grid-cols-2 md:gap-10">
              <div>
                <img
                  className="w-full object-cover h-64 rounded-xl"
                  src={data.background_image}
                  alt={data.name}
                />
              </div>
              <div>
                <div
                  className={checkIfFavorite() ? "fav-button" : "button"}
                  onClick={() => {
                    handleFavorite();
                  }}
                >
                  {checkIfFavorite()
                    ? "Saved to collection"
                    : "Save to collection"}
                </div>
                <div
                  className={checkIfReview() ? "fav-button" : "button"}
                  onClick={() => {
                    handleReview();
                  }}
                >
                  {checkIfReview() ? "Review done" : "Add a review"}
                </div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-10 md:pt-10">
              <div className="py-10 md:py-0">
                <div className="text-lg font-bold">About</div>
                <div className="pt-2 text-justify">
                  {data.description.replace(/<[^>]+>/gi, "")}
                </div>
                {/* RegExp */}
                {/* [^>] means tag (<p>) */}
                {/* <[^>]+> means open and close tag */}
                {/* "g" for "global" means that all "tag" will be replaced */}
                {/* "i" for "insensitive" */}
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className=" text-trueGray-700 font-bold">Platforms</div>
                  <div className="pt-2 underline">{platforms}</div>
                </div>
                <div>
                  <div className=" text-trueGray-700 font-bold">Genre</div>
                  <div className="pt-2 underline">{genres}</div>
                </div>
                <div>
                  <div className=" text-trueGray-700 font-bold">
                    Released date
                  </div>
                  <div className="pt-2 underline">{data.released}</div>
                </div>
                <div>
                  <div className=" text-trueGray-700 font-bold">Developer</div>
                  <div className="pt-2 underline">{developers}</div>
                </div>
                <div>
                  <div className=" text-trueGray-700 font-bold">Publisher</div>
                  <div className="pt-2 underline">{publishers}</div>
                </div>
                <div>
                  <div className=" text-trueGray-700 font-bold">Age rating</div>
                  <div className="pt-2 underline">
                    {data.esrb_rating ? data.esrb_rating.name : "None"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <section>
          <div className="flex justify-center pt-10 pb-6 text-lg underline">
            <div>Games like {data.name}</div>
          </div>
          <div className="games sm:grid sm:grid-cols-2 sm:gap-4 md:grid md:grid-cols-3 md:gap-4 lg:grid lg:grid-cols-4 lg:gap-4">
            {gameSeriesData.results.map((elem, index) => {
              return (
                index < 8 && ( // Number of images we want to select
                  <div
                    className="w-full flex flex-col pb-4 cursor-pointer items-center transform sm:hover:scale-105 sm:flex-none sm:px-0 sm:pb-0"
                    key={index}
                    onClick={() => {
                      history.push(`/game/${elem.slug}`);
                    }}
                  >
                    <img
                      className="w-full object-cover h-52 rounded-tl-xl rounded-tr-xl"
                      src={elem.background_image}
                      alt={elem.name}
                    />
                    <div className="w-full h-20 p-4 text-white bg-trueGray-800 rounded-bl-xl rounded-br-xl">
                      <div>{elem.name}</div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </section>
        <section className="py-6 md:flex md:flex-col md:items-center">
          <div>
            <div className="flex justify-center pt-4 pb-6 text-lg underline">
              Reviews
            </div>
          </div>
          <div className="sm:flex sm:flex-col sm:justify-center md:w-96">
            <div className="pb-6">Most relevant reviews :</div>
            {reviewsData.map((elem, index) => {
              return (
                <div className="relative mb-4 p-4 pt-2 pb-20 bg-trueGray-800 rounded-xl">
                  <div className="text-lg underline break-words">
                    {elem.title}
                  </div>
                  <div className="text-sm break-words">{elem.text}</div>
                  <div className="absolute bottom-2 left-4">
                    {elem.user.username}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Game;
