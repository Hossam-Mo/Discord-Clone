import React, { useState } from "react";
import "./profile.css";
import { BsFillMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";
import { IconButton } from "@material-ui/core";
import { MdHeadset } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { muting, unMuting } from "../redux";

export default function Profile() {
  const mute = useSelector((state) => state.mute);
  const dispatch = useDispatch();

  return (
    <div className="profile">
      <div className="profile_info">
        <img
          className="profile_img"
          src="https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png"
          alt="User Icon"
        ></img>
        <div className="profile_user">
          <h4>username </h4> <p>#8803</p>
        </div>
      </div>
      <div className="profile_icons">
        {mute === true ? (
          <IconButton
            onClick={() => {
              dispatch({
                type: muting.type,
              });
            }}
          >
            <BsFillMicFill className="micIcon"></BsFillMicFill>
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              dispatch({
                type: unMuting.type,
              });
            }}
          >
            <BsFillMicMuteFill className="micIcon"></BsFillMicMuteFill>
          </IconButton>
        )}
        <IconButton>
          <MdHeadset className="icons"></MdHeadset>
        </IconButton>
        <IconButton>
          <IoMdSettings className="icons"></IoMdSettings>
        </IconButton>
      </div>
    </div>
  );
}
