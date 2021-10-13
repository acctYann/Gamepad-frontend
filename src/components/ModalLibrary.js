import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalLibrary = ({ modalLibrary, setModalLibrary, userToken }) => {
  return (
    <>
      {modalLibrary ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-20 flex items-start justify-end bg-black bg-opacity-70 text-black"
          onClick={() => setModalLibrary()}
        >
          <div
            className="relative bg-white w-60 h-auto py-10 px-4 mt-4 mr-4 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xl font-bold">My library</div>
            <div
              className="absolute top-1 right-4 text-lg font-bold"
              onClick={() => setModalLibrary()}
            >
              <FontAwesomeIcon className="text-xl" icon="times" />
            </div>
            <div className="flex flex-col py-2 text-base">
              {/* <Link to={userToken ? "/profile" : "/login"}>My profile</Link> */}
              <Link to={userToken ? "/collection" : "/login"}>
                My collection
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalLibrary;
