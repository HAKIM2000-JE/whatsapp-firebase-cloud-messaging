import React, { useState, useEffect } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase"; //So we can unified world timer
import { useStateValue } from "./StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessage] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    Math.floor(Math.random() * 5000);
  }, []);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timer", "asc")
        .onSnapshot((snapshot) =>
          setMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("My input is :", input);
    setInput("");
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName, //Coming from user authentification
      timer: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_header_info">
          <h3>{roomName}</h3>
          <p>
            Last seen {""}
            {new Date(
              messages[messages.length - 1]?.timer?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat_header_right">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>

          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message  ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(messages.timer?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon className="emoji" />
        <form action="">
          <input
            type="text"
            value={input}
            placeholder="Type message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>send Message</button>
        </form>
        <MicIcon className="mic" />
      </div>
    </div>
  );
}

export default Chat;
