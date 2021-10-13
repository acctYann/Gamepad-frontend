import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Home from "./containers/Home";
import Game from "./containers/Game";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Review from "./containers/Review";
import Collection from "./containers/Collection";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faTimes,
  faBars,
  faEllipsisH,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSearch,
  faTimes,
  faBars,
  faEllipsisH,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faTrash
);

const App = () => {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [search, setSearch] = useState("");

  const setConnected = (token) => {
    if (token) {
      setUserToken(token);
      Cookies.set("token", token);
      setUserId(userId);
      Cookies.set("userId", userId);
    } else {
      setUserToken(null);
      Cookies.remove("token");
      setUserId(null);
      Cookies.remove("userId");
    }
  };

  return (
    <div>
      <Router>
        <Header
          userToken={userToken}
          setConnected={setConnected}
          setSearch={setSearch}
        />
        <Switch>
          <Route path="/review">
            <Review userToken={userToken} />
          </Route>
          <Route path="/collection">
            <Collection userToken={userToken} />
          </Route>
          <Route path="/signup">
            <Signup setConnected={setConnected} />
          </Route>
          <Route path="/login">
            <Login setConnected={setConnected} />
          </Route>
          <Route path="/game/:slug">
            <Game userToken={userToken} userId={userId} />
          </Route>
          <Route path="/">
            <Home search={search} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
