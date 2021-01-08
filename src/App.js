import "./App.css";
import React, { useEffect, useRef } from "react";
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
  const loading = useRef();
  const log = useRef();
  const main = useRef();
  useEffect(() => {
    setTimeout(() => {
      loading.current.style.opacity = 0;
      loading.current.style.display = "none";

      setTimeout(() => {
        log.current.style.opacity = 1;
      }, 200);
      log.current.style.display = "block";
    }, 3000);
  }, []);
  useEffect(() => {
    if (main.current) {
      console.log(main);
      setTimeout(() => {
        main.current.style.display = "flex";
        setTimeout(() => {
          main.current.style.opacity = 1;
        }, 100);
      }, 50);
    }
  }, [user]);

  return (
    <Router>
      {user ? (
        <div className="App" ref={main}>
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
        <div>
          <div className="log" ref={log}>
            <Login></Login>
          </div>

          <div className="login1" ref={loading}>
            <h1>Discord</h1>
            <div className="cer"></div>
            <div className="cer"></div>
            <div className="cer"></div>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
