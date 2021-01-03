import "./App.css";
import React from "react";
import RightSlide from "./Component/RightSlide";
import LeftSlide from "./Component/LeftSlide";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Servers from "./Component/Servers";
import Audio from "./Component/Audio";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

function App() {
  const socket = io.connect("http://localhost:5000/");
  const mute = useSelector((s) => s);

  /*
  useEffect(() => {
    let video = document.getElementById("video");
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: true,
        })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
          console.log(err0r);
        });
    }
  }, []);*/

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/:serverid/VoiseChat">
            <Audio></Audio>
            <LeftSlide socket={socket}></LeftSlide>
            <Servers socket={socket}></Servers>
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
    </Router>
  );
}

{
  /* <div className="App">
        <h1 className="floki">floki</h1>
        <h1> hello</h1>
        <img
          className="photo"
          src="https://i.pinimg.com/originals/f5/36/00/f53600e5bc1454b5bb0b21e7d45685db.jpg"
          alt="floki "
        ></img>
        <p> </p>
      </div>

  <h1> 3 h1 </h1>*/
}

{
  /* <div id="container">
        <video src="" autoPlay={true} id="video"></video>
  </div>*/
}

export default App;
