import React, { useEffect, useState } from "react";
import "./leftSlide.css";
import { RiAddFill } from "react-icons/ri";
import { MdExplore } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Link, useParams } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingBottom: 0,
    borderRadius: 5,
    outline: "none",
  },
}));

export default function LeftSlide({ socket }) {
  const [srNames, setSrNames] = useState([]);
  const [chenger, setChenger] = useState("img");
  const [chenger2, setChenger2] = useState("img");
  const [servers, setServers] = useState([]);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [inputName, setInputName] = useState("");
  const [serverCount, setServerCount] = useState(0);
  const sid = useParams("serverid");

  useEffect(() => {
    axios.get("http://localhost:5000/api/servers").then((r) => {
      console.log(r.data);
      setServers(r.data);
    });
  }, [serverCount]);

  useEffect(() => {
    document.getElementById(chenger2).style.color = "white";
    document.getElementById(chenger2).style.backgroundColor = "#36393f";
    document.getElementById(chenger2).style.borderRadius = "50%";
    document.getElementById(chenger).style.backgroundColor = "white";
    document.getElementById(chenger).style.color = "gray";
    document.getElementById(chenger).style.borderRadius = "35%";
  }, [chenger, chenger2]);

  useEffect(() => {
    setSrNames(
      servers.map((it) => {
        let a = it.name.split("");
        let s = [];
        s.push(a.shift());
        s.push(a.pop());
        return { name: s.join(""), id: it._id };
      })
    );
  }, [servers]);

  const creatServer = () => {
    if (inputName !== "") {
      axios
        .post("http://localhost:5000/api/servers", {
          name: inputName,
        })
        .then((r) => {
          console.log(r);
          setServerCount(serverCount + 1);
          setOpen(false);
          setInputName("");
        });
    } else {
      alert("please Enter a name");
    }
  };

  return (
    <div className="leftslide">
      <Link to="/">
        {" "}
        <button
          id="img"
          className="leftslide_img"
          onClick={() => {
            setChenger("img");
            setChenger2(chenger);
          }}
        >
          <img
            src="https://icon-library.com/images/discord-icon-white/discord-icon-white-6.jpg"
            alt="discord"
          ></img>
        </button>
      </Link>

      <hr></hr>
      <div className="leftslide_servers">
        {srNames.map((it) => {
          return (
            <Link key={it.id} to={`/${it.id}`}>
              <button
                id={it.id}
                onClick={() => {
                  setChenger(it.id);
                  setChenger2(chenger);
                  if (sid.serverid) {
                    socket.emit("dis", sid.serverid);
                  }
                }}
                className="servers_div"
              >
                <p>{it.name}</p>
              </button>
            </Link>
          );
        })}
      </div>
      <button
        className="leftslide_buttons"
        onClick={() => {
          setOpen(true);
        }}
      >
        <RiAddFill className="leftslide_icons"></RiAddFill>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="model_div">
            <h1>Customize your server</h1>
            <h6>
              Give your new server a personality with a name and icon You can
              always change it later
            </h6>
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/discord-1693597-1442638.png"
              alt="icon img"
            ></img>
            <div className="model_serName">
              <p>SERVER NAME</p>
            </div>
            <input
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            ></input>
            <p>
              By creating a server , you agree to Discord's{" "}
              <a href="/#"> Community Guidelines</a>
            </p>
            <div className="model_button">
              <button
                className="model_back"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Back
              </button>
              <button className="model_create" onClick={creatServer}>
                {" "}
                Create
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <button className="leftslide_buttons">
        <MdExplore className="leftslide_icons"></MdExplore>
      </button>
      <hr></hr>
      <button className="leftslide_buttons">
        <AiOutlineDownload className="leftslide_icons"></AiOutlineDownload>
      </button>
    </div>
  );
}
