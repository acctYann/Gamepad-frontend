import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalMenu = ({ modalMenu, setModalMenu, setConnected, userToken }) => {
  return (
    <>
      {modalMenu ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-10 flex items-start justify-end bg-black bg-opacity-70 text-black"
          onClick={() => setModalMenu()}
        >
          <div
            className="relative bg-white w-60 h-auto py-10 px-4 mt-4 mr-4 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xl font-bold">My library</div>
            <div
              className="absolute top-1 right-4 text-lg font-bold"
              onClick={() => setModalMenu()}
            >
              <FontAwesomeIcon className="text-xl" icon="times" />
            </div>
            <div className="flex flex-col py-2 text-base">
              {/* <Link to={userToken ? "/profile" : "/login"}>My profile</Link> */}
              <Link to={userToken ? "/collection" : "/login"}>
                My collection
              </Link>
            </div>
            <div className="float-right text-base py-2 px-2 mt-4 bg-black text-white rounded-lg hover:bg-trueGray-800">
              {userToken ? (
                <div onClick={() => setConnected(null)}>Log Out</div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    className="pr-1"
                    onClick={() => setModalMenu()}
                  >
                    Log in |
                  </Link>
                  <Link to="/signup" onClick={() => setModalMenu()}>
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalMenu;
