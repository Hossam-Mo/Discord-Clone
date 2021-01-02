import React from "react";
import "./rightSlide.css";
import { GiThreeFriends } from "react-icons/gi";
import { GoInbox } from "react-icons/go";
import { MdTextsms } from "react-icons/md";
import { BsQuestionCircleFill } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";
import { RiCloseLine } from "react-icons/ri";
import Profile from "./Profile";

export default function RightSlide() {
  const messages = [
    {
      name: "user",
      img:
        "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
    },
    {
      name: "user",
      img:
        "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
    },
    {
      name: "user",
      img:
        "https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png",
    },
  ];

  return (
    <div className="rightslide">
      <div className="rightslide_left">
        <div className="left_nav">
          <input
            placeholder="Find or start a conversation"
            className="leftNav_input"
          ></input>
        </div>
        <div className="left_friends">
          <GiThreeFriends className="friends_friendIcon"></GiThreeFriends>
          <p className="friends_firends">Friends</p>
        </div>

        <div className="left_messages">
          <p>DIRECT MESSAGES</p>
          <RiAddFill className="left_add"></RiAddFill>
        </div>
        <div className="left_dMessages">
          {messages.map((it) => {
            return (
              <div className="messages">
                <img src={it.img} alt={it.name}></img>
                <h4>{it.name}</h4>
                <RiCloseLine className="messages_close"></RiCloseLine>
              </div>
            );
          })}
        </div>

        <Profile></Profile>
      </div>
      <div className="rightslide_right">
        <div className="right_nav">
          <div className="nav_left">
            <GiThreeFriends className="nav_friendIcon"></GiThreeFriends>
            <p className="nav_firends">Friends</p>
            <hr></hr>
            <p>Online</p>
            <p>All</p>
            <p>Pending</p>
            <p>Blocked</p>
            <h4 className="nav_addfirends">Add Friend</h4>
          </div>

          <div className="nav_right">
            <MdTextsms className="nav_leftIconMessage"></MdTextsms>

            <hr></hr>
            <GoInbox className="nav_leftIcon"></GoInbox>
            <BsQuestionCircleFill className="nav_leftIconQmark"></BsQuestionCircleFill>
          </div>
        </div>
        <div className="right_body">
          <div className="body_left">
            <img
              className="body_img"
              src="https://discord.com/assets/a12ff54c4c5c03b41006fd96a4709c29.svg"
              alt="image for discord"
            ></img>
            <p>No one`s around to play with Wumpus</p>
          </div>
          <div className="body_right">
            <h4>ACTIVE NOW</h4>
            <div className="body_qu">
              <h4>It`s quiet for now...</h4>
              <p>
                When a friend starts an activity-like playing a game or hanging
                out on voice-we`ll show it here!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
