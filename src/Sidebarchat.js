import React, { useState, useEffect } from "react";
import "./Sidebatchat.css";
import { Avatar, IconButton } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";

function Sidebarchat({ id, addNewChat, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timer", "desc")
        .onSnapshot((snapshot) =>
          setMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  });

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [id]);

  const createChat = () => {
    const roomName = prompt("please enter name for chat");

    if (roomName) {
      //do some hakim database stuff

      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarchat">
      <h2>Add New chat </h2>
    </div>
  );
}

export default Sidebarchat;
