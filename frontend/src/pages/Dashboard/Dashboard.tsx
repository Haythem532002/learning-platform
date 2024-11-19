import Sidebar from "../../components/specific/Sidebar/Sidebar";
import ViewClassroom from "../../components/specific/ViewClassroom/ViewClassroom";
import { Classroom } from "../../types/props";
import { useEffect, useRef, useState } from "react";
import { get } from "../../services/api";
import ClassroomAdder from "../../components/specific/ClassroomAdder/ClassroomAdder";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styles from "./dahsboard.module.css";
import { useAuth } from "../../services/auth/AuthContext";
import ClassroomDetails from "../../components/specific/ClassroomDetails";
import chaticon from "../../assets/bot.png";
import usericon from "../../assets/aaaa.jpg";
import Stream from "../../components/specific/stream/stream";
interface messageObject {
  message: string;
  type: string;
}

export default function Dashboard() {
  const { authToken } = useAuth();
  const [chatStatus, setChatStatus] = useState(false);
  const chatButton = useRef<HTMLButtonElement | null>(null);
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const chatFiller = useRef<HTMLDivElement | null>(null);

  console.log(authToken);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<messageObject[]>([]);
  const fetchData = async () => {
    const res = await get("http://localhost:8060/classroom");
    console.log(res);
    if (res.data && res.data.length) setClassrooms(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  function handleInput(e: any) {
    setInput(e.target.value);
  }
  function handleChat() {
    if (chatButton) {
      setChatStatus((prev) => !prev);
    }
  }
  async function sendMessage() {
    setMessages((prev: messageObject[]) => {
      return [...prev, { message: input, type: "user" }];
    });

    const res: any = await get(
      `http://localhost:8090/chatbot?message=${input}`
    );
    console.log(res);
    setInput("");
    await setMessages((prev: messageObject[]) => {
      return [
        ...prev,
        {
          message: res.data.queryResult.fulfillmentText,
          type: "bot",
        },
      ];
    });
  }

  useEffect(() => {
    if (chatStatus) {
      //handle the chat
      if (chatButton.current) chatButton.current.style.opacity = "0%";
      if (chatContainer.current) {
        chatContainer.current.style.width = "15em";
        chatContainer.current.style.height = "35em";
      }

      setTimeout(() => {
        if (chatButton.current) chatButton.current.style.display = "none";
      }, 200);

      setTimeout(() => {
        if (chatFiller.current) chatFiller.current.style.display = "none";
      }, 600);
      setTimeout(() => {
        if (chatFiller.current) chatFiller.current.style.opacity = "0%";
      }, 400);
    } else {
      if (chatContainer.current) {
        chatContainer.current.style.width = "0em";
        chatContainer.current.style.height = "0em";
      }

      setTimeout(() => {
        if (chatFiller.current) chatFiller.current.style.display = "block";
      }, 400);
      setTimeout(() => {
        if (chatFiller.current) chatFiller.current.style.opacity = "100%";
      }, 200);

      if (chatButton.current) {
        chatButton.current.style.display = "block";
        setTimeout(() => {
          if (chatButton.current) chatButton.current.style.opacity = "100%";
        }, 200);
      }
    }
  }, [chatStatus]);

  function getMessage(m: messageObject) {
    return m.type == "user" ? (
      <div className={styles.userMessage} style={{ alignSelf: "flex-end" }}>
        <div
          className={styles.userIcon}
          style={{ alignSelf: "flex-end", backgroundImage: `url(${usericon})` }}
        ></div>
        <p className={styles.messageBody} style={{ backgroundColor: "gray" }}>
          {m.message}
        </p>
      </div>
    ) : (
      <div className={styles.userMessage} style={{ alignSelf: "flex-start" }}>
        <div
          className={styles.userIcon}
          style={{
            alignSelf: "flex-start",
            backgroundImage: `url(${chaticon})`,
          }}
        ></div>
        <p
          className={styles.messageBody}
          style={{ backgroundColor: "rgb(0, 110, 255)" }}
        >
          {m.message}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxHeight: "100vh",
        maxWidth: "100vw",
        display: "flex",
      }}
    >
      <Sidebar />
      <div className={styles.content}>
        <Stream />
        {
          <Routes>
            <Route
              path="/view_classroom"
              element={<ViewClassroom classrooms={classrooms} />}
            />
            <Route path="/add_classroom" element={<ClassroomAdder />} />
            <Route path="/*" element={<Navigate to="" replace />} />
          </Routes>
        }
      </div>
      <button
        ref={chatButton}
        onClick={handleChat}
        id={styles.chatButton}
      ></button>
      <div ref={chatContainer} id={styles.chatBotContainer}>
        <div id={styles.header}>
          <button onClick={() => setChatStatus(false)} id={styles.chatClose}>
            X
          </button>
          <button id={styles.chatFeatures}>...</button>
          <div id={styles.chatImage}></div>
          <h5>ChatBot</h5>
        </div>
        <div id={styles.messageContainer}>
          {messages.map((m: messageObject) => {
            return getMessage(m);
          })}
        </div>
        <div id={styles.sender}>
          <div id={styles.inputContainer}>
            <input
              onChange={handleInput}
              value={input}
              id={styles.input}
              type="text"
              placeholder="Write a message"
            />
            <button onClick={sendMessage} id={styles.sendButton}></button>
          </div>
        </div>
        <div ref={chatFiller} id={styles.filler}></div>
      </div>
    </div>
  );
}
