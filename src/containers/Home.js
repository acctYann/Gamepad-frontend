import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Pagination from "../components/Pagination";

function Home({ search }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(40);
  const [platforms, setPlatforms] = useState("");
  const [genres, setGenres] = useState("");
  const [ordering, setOrdering] = useState("");
  const [showOrdering, setShowOrdering] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [showGenres, setShowGenres] = useState(false);

  const [platformsData, setPlatformsData] = useState();
  const [genresData, setGenresData] = useState();

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://api.rawg.io/api/games?key=c8250ad893d64630b6c7f313faf7ac44&page=${page}&page_size=${pageSize}&ordering=${ordering}&search=${search}`;
      if (platforms) {
        url += `&platforms=${String(platforms.id)}`;
      }
      if (genres) {
        url += `&genres=${String(genres.id)}`;
      }
      try {
        const response = await axios.get(url);
        const responsePlatform = await axios.get(
          `https://api.rawg.io/api/platforms?key=c8250ad893d64630b6c7f313faf7ac44`
        );
        const responseGenre = await axios.get(
          `https://api.rawg.io/api/genres?key=c8250ad893d64630b6c7f313faf7ac44`
        );
        // console.log(response.data.results);
        // console.log(responsePlatform.data);
        // console.log(responseGenre.data);
        setData(response.data);
        setPlatformsData(responsePlatform.data);
        setGenresData(responseGenre.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, pageSize, platforms, genres, ordering, search]);

  const orderingTab = [
    "Name",
    "Released",
    "Added",
    "Created",
    "Updated",
    "Rating",
    "Metacritic",
  ];

  const handleGenreChange = (genre) => {
    if (genres.id === genre.id) {
      setGenres("");
    } else {
      setGenres(genre);
    }
    setShowGenres(false);
  };

  const handlePlatformChange = (platform) => {
    if (platforms.id === platform.id) {
      setPlatforms("");
    } else {
      setPlatforms(platform);
    }
    setShowPlatforms(false);
  };

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
      <div className="px-4 lg:px-32 xl:px-52">
        <div className="flex justify-center text-xl font-medium py-8 sm:text-3xl">
          Most Relevance Games
        </div>
        <div className="flex text-sm">Search {data.count} games</div>
        <div className="flex justify-start text-sm pt-4 pb-2 sm:hidden">
          <Pagination
            data={data}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
          />
        </div>
        <div className="flex items-start pb-12 mb-5 max-h-8">
          <div className="tab-container">
            {showOrdering ? (
              <>
                <div
                  className="cursor-pointer hover:text-black hover:bg-trueGray-300 rounded-md pl-2"
                  onClick={() => {
                    setOrdering("");
                    setShowOrdering(false);
                  }}
                >
                  All
                </div>
                {orderingTab.map((elem, index) => {
                  return (
                    <div
                      className="li"
                      key={index}
                      onClick={() => {
                        if (ordering === elem.toLowerCase()) {
                          setOrdering("");
                        } else {
                          setOrdering(elem.toLowerCase());
                        }
                        setShowOrdering(false);
                      }}
                    >
                      {elem}
                      {elem.toLowerCase() === ordering ? (
                        <FontAwesomeIcon
                          className="ml-2 text-sm text-green-500"
                          icon="check"
                        />
                      ) : null}
                    </div>
                  );
                })}
              </>
            ) : (
              <div
                className="tab-flex"
                onClick={() => {
                  setShowOrdering(true);
                }}
              >
                {ordering ? (
                  <div className="tab-flex">
                    <div>Order by :</div>
                    <div className="font-bold pl-2">{ordering}</div>
                  </div>
                ) : (
                  <div className="tab-flex">
                    <div>Order by :</div>
                    <div className="hidden font-bold pl-2 sm:flex">
                      Relevance
                    </div>
                  </div>
                )}
                <FontAwesomeIcon className="h-5 ml-2" icon="chevron-down" />
              </div>
            )}
          </div>
          <div className="tab-container">
            {showPlatforms ? (
              <div>
                <div
                  className="cursor-pointer hover:text-black hover:bg-trueGray-300 rounded-md pl-2"
                  onClick={() => {
                    setPlatforms("");
                    setShowPlatforms(false);
                  }}
                >
                  All
                </div>
                {platformsData.results.map((elem, index) => {
                  return (
                    <div
                      className="li"
                      key={index}
                      onClick={() => {
                        handlePlatformChange(elem);
                      }}
                    >
                      {elem.name}
                      {elem.id === platforms.id && (
                        <FontAwesomeIcon
                          className="ml-2 text-sm text-green-500"
                          icon="check"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="tab-flex"
                onClick={() => {
                  setShowPlatforms(true);
                }}
              >
                {platforms ? (
                  <div className="tab-flex">
                    <div className="">Platform :</div>
                    <div className="font-bold pl-2">{platforms.name}</div>
                  </div>
                ) : (
                  <div className="tab-flex">
                    <div>Platform :</div>
                    <div className="hidden font-bold pl-2 sm:flex">All</div>
                  </div>
                )}
                <FontAwesomeIcon className="h-5 ml-2" icon="chevron-down" />
              </div>
            )}
          </div>
          <div className="tab-container">
            {showGenres ? (
              <div>
                <div
                  className="cursor-pointer hover:text-black hover:bg-trueGray-300 rounded-md pl-2"
                  onClick={() => {
                    setGenres("");
                    setShowGenres(false);
                  }}
                >
                  All
                </div>
                {genresData.results.map((elem, index) => {
                  return (
                    <>
                      <div
                        className="li"
                        key={index}
                        onClick={() => {
                          handleGenreChange(elem);
                        }}
                      >
                        {elem.name}
                        {elem.id === genres.id && (
                          <FontAwesomeIcon
                            className="ml-2 text-sm text-green-500"
                            icon="check"
                          />
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
            ) : (
              <div
                className="tab-flex"
                onClick={() => {
                  setShowGenres(true);
                }}
              >
                {genres ? (
                  <div className="tab-flex">
                    <div>Genre :</div>
                    <div className="font-bold pl-2"> {genres.name}</div>
                  </div>
                ) : (
                  <div className="tab-flex">
                    <div>Genre :</div>
                    <div className="hidden font-bold pl-2 sm:flex">All</div>
                  </div>
                )}
                <FontAwesomeIcon className="h-5 ml-2" icon="chevron-down" />
              </div>
            )}
          </div>
        </div>

        <div className="sm:grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
          {data.results.map((elem, index) => {
            return (
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
            );
          })}
        </div>
        <div className="hidden sm:flex sm:justify-center">
          <Pagination
            data={data}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
