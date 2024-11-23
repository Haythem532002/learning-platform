import { useEffect, useRef, useState } from "react";
import styles from "./ChatBot.module.css";
import { messageObject } from "../../../types/types";
import { get } from "../../../services/api";
import chaticon from "../../../assets/bot.png";
import usericon from "../../../assets/aaaa.jpg";
import LoadingPanel from "../LoadingPanel/LoadingPanel";
import ChoicesPanel from "../CoicesPanel/ChoicesPanel";
import InputTime from "react-datepicker/dist/input_time";

export function ChatBot() {
  const [input, setInput] = useState<string>("");
  const [dropMenuStatus, setDropMenuStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<messageObject[]>([]);
  const [chatStatus, setChatStatus] = useState(false);
  const chatButton = useRef<HTMLButtonElement | null>(null);
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const chatFiller = useRef<HTMLDivElement | null>(null);
  const dropMenu = useRef<HTMLDivElement | null>(null);
  function handleMenu() {
    setDropMenuStatus((prev) => !prev);
  }
  function handleInput(e: any) {
    setInput(e.target.value);
  }
  function handleChat() {
    if (chatButton) {
      setChatStatus((prev) => !prev);
    }
  }
  async function sendMessage(message: string) {
    setMessages((prev: messageObject[]) => {
      return [...prev, { message: message, type: "user" }];
    });
    setInput("");
    setLoading(true);
    const res: any = await get(
      `http://localhost:8060/chatbot?message=${message}`
    );
    console.log(res);
    setLoading(false);
    await setMessages((prev: messageObject[]) => {
      return [
        ...prev,
        {
          message: res.data.queryResult
            ? res.data.queryResult.fulfillmentText
            : "Bot is down",
          type: "bot",
        },
      ];
    });
  }
  function clearChat() {
    setMessages([]);
  }

  function popMenu() {
    if (dropMenu.current) {
      dropMenu.current.style.display = "block";
      setTimeout(() => {
        if (dropMenu.current) dropMenu.current.style.opacity = "100%";
      }, 200);
    }
  }
  function hideMenu() {
    if (dropMenu.current) {
      dropMenu.current.style.opacity = "0%";
      setTimeout(() => {
        if (dropMenu.current) dropMenu.current.style.display = "none";
      }, 200);
    }
  }
  useEffect(() => {
    if (dropMenuStatus) {
      popMenu();
    } else {
      hideMenu();
    }
  }, [dropMenuStatus]);

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

  function getMessage(m: messageObject, index: Number) {
    const lastMessage = index == messages.length - 1;
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
      <>
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
        {lastMessage && (
          <ChoicesPanel setInput={setInput} sendMessage={sendMessage} />
        )}
      </>
    );
  }

  return (
    <>
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
          <button onClick={handleMenu} id={styles.chatFeatures}>
            ...
          </button>
          <div id={styles.menu} ref={dropMenu}>
            <button onClick={clearChat} className={styles.menuItem}>
              Clear Chat
            </button>
          </div>
          <div id={styles.chatImage}></div>
          <h5>ChatBot</h5>
        </div>
        <div id={styles.messageContainer}>
          {messages.map((m: messageObject, index: Number) => {
            return getMessage(m, index);
          })}
          {loading && <LoadingPanel />}
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
            <button
              onClick={() => sendMessage(input)}
              id={styles.sendButton}
            ></button>
          </div>
        </div>
        <div ref={chatFiller} id={styles.filler}></div>
      </div>
    </>
  );
}
