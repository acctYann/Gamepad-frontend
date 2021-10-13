import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalMenu from "./ModalMenu";
import ModalLibrary from "./ModalLibrary";

const Header = ({ userToken, setConnected, setSearch }) => {
  const [modalMenu, setModalMenu] = useState("");
  const [modalLibrary, setModalLibrary] = useState("");

  return (
    <header className="w-full bg-transparent absolute h-16 px-4 flex items-center text-white">
      <Link className="flex items-center" to="/">
        <img className="w-auto h-8" src={logo} alt="Logo Gamepad" />
        <div className="hidden sm:flex sm:pl-2 sm:text-base">Gamepad</div>
      </Link>
      <div className="relative w-full flex pl-4 text-sm sm:items-center sm:pl-10">
        <FontAwesomeIcon
          className="absolute top-2 left-8 text-gray-400 text-base sm:top-3 sm:left-14"
          icon="search"
        />
        <input
          className="w-full bg-trueGray-500 bg-opacity-50 text-gray-400 placeholder-gray-400 py-1.5 pl-10 rounded-3xl outline-none hover:bg-white transition delay-100 duration-100 ease-in-out sm:py-2.5"
          type="text"
          placeholder="Search for games"
          onChange={(event) => setSearch(event.target.value)}
        />
        <div
          className="cursor-pointer pl-4"
          onClick={() => setModalMenu(!modalMenu)}
        >
          <FontAwesomeIcon className="text-3xl sm:hidden" icon="bars" />
        </div>
        <ModalMenu
          modalMenu={modalMenu}
          setModalMenu={setModalMenu}
          userToken={userToken}
        />
        <div className="hidden sm:w-72 lg:w-56 md:w-64 sm:flex sm:justify-end sm:items-center sm:text-white sm:uppercase">
          {userToken ? (
            <div
              className="cursor-pointer sm:pr-4 hover:underline"
              onClick={() => setConnected(null)}
            >
              Log Out
            </div>
          ) : (
            <div className="hidden sm:flex">
              <Link to="/login" className="hover:underline">
                Log in
              </Link>
              <Link className="sm:px-4" to="/signup">
                <div className="hover:underline">Sign up</div>
              </Link>
            </div>
          )}
          <div
            className="cursor-pointer"
            onClick={() => setModalLibrary(!modalLibrary)}
          >
            <FontAwesomeIcon
              className="text-3xl hidden sm:flex"
              icon="ellipsis-h"
            />
          </div>
          <ModalLibrary
            modalLibrary={modalLibrary}
            setModalLibrary={setModalLibrary}
            userToken={userToken}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
