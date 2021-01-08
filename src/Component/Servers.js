import React, { useEffect, useRef, useState } from "react";
import "./servers.css";
import { FaUserFriends } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { VscPinned } from "react-icons/vsc";
import { BsQuestionCircleFill } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import { AiFillSound } from "react-icons/ai";
import Profile from "./Profile";
import { IconButton } from "@material-ui/core";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Servers({ socket }) {
  const [message, setMessage] = useState("");
  const sid = useParams("serverid");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const peers = useSelector((state) => state.peerDisc);
  const peerSocket = useSelector((state) => state.socketDisc);
  const user = useSelector((state) => state.user);
  const loading = useRef();
  const server = useRef();
  const messageList = useRef();

  useEffect(() => {
    if (loading.current && server.current) {
      if (loading.current.style.display === "none") {
        loading.current.style.display = "flex";
        server.current.style.display = "none";
        server.current.style.opacity = 0;
      }

      setTimeout(() => {
        if (loading.current) loading.current.style.display = "none";

        setTimeout(() => {
          if (server.current) server.current.style.opacity = 1;
        }, 100);
        if (server.current) {
          server.current.style.display = "flex";
          messageList.current.scrollTop = messageList.current.scrollHeight;
        }
      }, 1000);
    }
  }, [sid]);

  useEffect(() => {
    socket.emit("joinserver", sid.serverid);
  }, [sid]);

  const users = [
    {
      name: "user",
      img:
        "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
      online: true,
      id: 1,
    },
    {
      name: "user",
      img:
        "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
      online: false,
      id: 2,
    },
    {
      name: "user",
      img:
        "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
      online: false,
      id: 3,
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
        name: user,
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
        name: user,
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
    messageList.current.scrollTop = messageList.current.scrollHeight;
  }, [messages, sid]);

  return (
    <div className="main_server">
      <div className="servers" ref={server}>
        <div className="servers_left">
          <div className="left_nav">
            <h4>{name.toUpperCase()} SERVER</h4>
            <IoMdArrowDropdown className="leftNav_icon"></IoMdArrowDropdown>
          </div>

          <div className="left_messages">
            <p>TEXT CHANNELS</p>
            <button className="left_messButton" onClick={() => {}}>
              {" "}
              <RiAddFill className="left_add"></RiAddFill>
            </button>
          </div>
          <Link to={`/${sid.serverid}`}>
            <button
              className="left_generalChat"
              onClick={() => {
                if (peers !== [])
                  peers.forEach((peer) => {
                    peer.destroy();
                  });
                if (peerSocket) {
                  peerSocket.emit("userDisconnect");
                }
              }}
            >
              <h3>#</h3>
              <p>general</p>
            </button>
          </Link>

          <div className="left_dMessages1"></div>

          <div className="left_messages">
            <p>VOICE CHANNELS</p>{" "}
            <button className="left_messButton" onClick={() => {}}>
              <RiAddFill className="left_add"></RiAddFill>
            </button>
          </div>
          <Link to={`/${sid.serverid}/VoiseChat`}>
            <button className="left_generalChat">
              <AiFillSound className="left_generlIcon"></AiFillSound>
              <p>General</p>
            </button>
          </Link>

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
              <div ref={messageList} id="scrolling-div" className="left_up">
                <img
                  className="body_img"
                  src="https://discord.com/assets/b669713872b43ca42333264abf9c858e.svg"
                  alt="discord"
                ></img>
                <p>Welcome to {name} Server</p>
                {messages.map((mess) => {
                  return (
                    <div key={mess._id} className="body_messages">
                      <img src={mess.img} alt={mess.name}></img>
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
                    <div key={user.id} className="rightBody_users">
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
                    <div key={user.id} className="rightBody_users1">
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
      <div className="login1" ref={loading}>
        <h1>Discord</h1>
        <div className="cer"></div>
        <div className="cer"></div>
        <div className="cer"></div>
      </div>
    </div>
  );
}
