import "./App.css";
import React from "react";
import RightSlide from "./Component/RightSlide";
import LeftSlide from "./Component/LeftSlide";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Servers from "./Component/Servers";
import Audio from "./Component/Audio";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Login from "./LoginPage/Login";

function App() {
  const socket = io.connect("http://localhost:5000/");
  const user = useSelector((state) => state.user);

  return (
    <Router>
      {user ? (
        <div className="App">
          <Switch>
            <Route path="/:serverid/VoiseChat">
              <LeftSlide socket={socket}></LeftSlide>
              <Servers socket={socket}></Servers>
              <Audio></Audio>
            </Route>
            <Route path="/:serverid">
              <LeftSlide socket={socket}></LeftSlide>
              <Servers socket={socket}></Servers>
            </Route>
            <Route exact path="/">
              <LeftSlide socket={socket}></LeftSlide>
              <RightSlide></RightSlide>
            </Route>
          </Switch>
        </div>
      ) : (
        <div className="login">
          <Login></Login>
        </div>
      )}
    </Router>
  );
}

export default App;
