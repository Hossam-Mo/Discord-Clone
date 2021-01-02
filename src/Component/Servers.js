import React, { useEffect, useState } from "react";
import "./servers.css";
import { FaUserFriends } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { VscPinned } from "react-icons/vsc";
import { BsQuestionCircleFill } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";

import Profile from "./Profile";
import { IconButton } from "@material-ui/core";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

import Audio from "./Audio";

export default function Servers({ socket }) {
  const [message, setMessage] = useState("");
  const sid = useParams("serverid");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [audio, setAudio] = useState(false);

  useEffect(() => {
    socket.emit("joinserver", sid.serverid);

    console.log(sid);
  }, [sid]);

  const users = [
    {
      name: "user",
      img:
        "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
      online: true,
    },
    {
      name: "user",
      img:
        "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
      online: false,
    },
    {
      name: "user",
      img:
        "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
      online: false,
    },
  ];
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/servers/${sid.serverid}`)
      .then((r) => {
        setName(r.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sid]);

  useEffect(() => {
    if (sid)
      Axios.get(`http://localhost:5000/api/servers/messages/${sid.serverid}`)
        .then((r) => {
          setMessages(r.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [sid]);

  const send = (e) => {
    e.preventDefault();
    if (message !== "") {
      Axios.post("http://localhost:5000/api/servers/messages", {
        name: "Username",
        img:
          "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
        message: message,
        sid: sid.serverid,
      })
        .then((r) => {
          console.log(r);
        })
        .catch((err) => {
          console.log(err);
        });

      socket.emit("mess", {
        name: "Username",
        img:
          "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
        message: message,
        sid: sid.serverid,
      });
    }

    setMessage("");
  };

  useEffect(() => {
    if (messages !== [])
      socket.on("mess", (mess) => {
        setMessages((messages) => {
          return [
            ...messages,
            { name: mess.name, img: mess.img, message: mess.message },
          ];
        });
      });
  }, []);
  useEffect(() => {
    let list = document.getElementById("scrolling-div");
    list.scrollTop = list.scrollHeight;
  }, [messages]);

  return (
    <div className="servers">
      <div className="servers_left">
        <div className="left_nav">
          <h4>{name.toUpperCase()} SERVER</h4>
          <IoMdArrowDropdown className="leftNav_icon"></IoMdArrowDropdown>
        </div>

        <div className="left_messages">
          <p>TEXT CHANNELS</p>
          <button
            className="left_messButton"
            onClick={() => {
              setAudio(false);
            }}
          >
            {" "}
            <RiAddFill className="left_add"></RiAddFill>
          </button>
        </div>
        <div className="left_dMessages1"></div>

        <div className="left_messages">
          <p>VOICE CHANNELS</p>
          <Link to={`/${sid.serverid}/VoiseChat`}>
            {" "}
            <button
              className="left_messButton"
              onClick={() => {
                setAudio(true);
              }}
            >
              <RiAddFill className="left_add"></RiAddFill>
            </button>
          </Link>
        </div>
        <div className="left_dMessages1"></div>
        <Profile></Profile>
      </div>
      <div className="servers_right">
        <div className="right_nav">
          <div className="nav_left">
            <h1>#</h1>
            <h4>general</h4>
          </div>

          <div className="nav_right">
            <IoNotificationsSharp className="nav_leftIcons"></IoNotificationsSharp>
            <VscPinned className="nav_leftIcons"></VscPinned>
            <FaUserFriends className="nav_leftIcons"></FaUserFriends>
            <hr></hr>
            <GoInbox className="nav_leftIcon"></GoInbox>
            <BsQuestionCircleFill className="nav_leftIconQmark"></BsQuestionCircleFill>
          </div>
        </div>
        <div className="right_body">
          <div className="body_left">
            <div id="scrolling-div" className="left_up">
              <img
                className="body_img"
                src="https://discord.com/assets/b669713872b43ca42333264abf9c858e.svg"
                alt="image for discord"
              ></img>
              <p>Welcome to {name} Server</p>
              {messages.map((mess) => {
                return (
                  <div className="body_messages">
                    <img src={mess.img}></img>
                    <div>
                      <h4>{mess.name}</h4>
                      <p>{mess.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="left_down">
              <form className="down_input">
                <input
                  placeholder="Enter a Message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                ></input>

                <IconButton type="submit" onClick={send}>
                  <AiOutlineSend></AiOutlineSend>
                </IconButton>
              </form>
            </div>
          </div>
          <div className="body_right">
            <h4>ONLINE-1</h4>
            {users.map((user) => {
              if (user.online === true) {
                return (
                  <div className="rightBody_users">
                    <img src={user.img} alt={user.name}></img>
                    <h5>{user.name}</h5>
                  </div>
                );
              }
            })}
            <h4>OFFLINE-1</h4>

            {users.map((user) => {
              if (user.online === false) {
                return (
                  <div className="rightBody_users1">
                    <img src={user.img} alt={user.name}></img>
                    <h5>{user.name}</h5>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
