// src/Pages/MessagesPage/MessagesPage.jsx

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import socket from "../../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../../store/slices/userSlice";
import ItCareer from "../../components/itcareer/ItCareer";
import Nik from "../../images/png/empty.jpg";
import MessageText from "./MessageText";

import styles from "./MessagePage.module.css";

function MessagesPage() {
  const { userId: paramUserId } = useParams(); // Получаем ID собеседника из URL, если есть
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.user.currentUser); // Авторизованный пользователь
  const [targetUser, setTargetUser] = useState(null); // Собеседник
  const [messages, setMessages] = useState([]); // Хранение всех сообщений
  const [messageText, setMessageText] = useState("");

  // Функция для установки собеседника
  const handleSelectUser = (user) => {
    setTargetUser(user);
    socket.emit("joinRoom", { targetUserId: user._id }); // Подключаемся к комнате
    setMessages([]); // Очищаем предыдущие сообщения при смене собеседника
  };

  useEffect(() => {
    // Если собеседник выбран (либо через параметр, либо через `ItCareer`)
    if (targetUser) {
      // Загружаем сообщения
      socket.on("loadMessages", (loadedMessages) => {
        setMessages(loadedMessages);
      });

      // Обрабатываем получение новых сообщений
      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("receiveMessage");
        socket.off("loadMessages");
      };
    }
  }, [targetUser]);

  const handleInputChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = () => {
    if (messageText.trim() && targetUser) {
      const messageData = {
        targetUserId: targetUser._id,
        messageText,
      };

      // Отправляем сообщение через WebSocket
      socket.emit("sendMessage", messageData);
      setMessageText(""); // Очищаем поле ввода
    }
  };

  return (
    <div className={styles.container}>
      <ItCareer onSelectUser={handleSelectUser} /> {/* Передаем функцию выбора пользователя */}
      <div className={styles.message}>
        {targetUser ? (
          <>
            <div className={styles.message_up}>
              <div className={styles.message_img}>
                <img src={targetUser.profile_image || Nik} alt="avatar" />
              </div>
              <div className={styles.message_content}>
                <p className="p_16Bold">{targetUser.username || "Username"}</p>
              </div>
            </div>
            <div className={styles.message_down}>
              <div className={styles.message_avatar}>
                <div className={styles.message_avatar_img}>
                  <img src={targetUser.profile_image || Nik} alt="avatar" />
                </div>
                <div className={styles.message_avatar_name}>
                  <h3 className="h3">{targetUser.username || "Username"}</h3>
                  <p className="p_14SmallGrey"> · {targetUser.bio || "User bio not provided"}</p>
                </div>
                <div className={styles.message_avatar_btn}>
                  <Link className={styles.message_avatar_Link}>
                    <p>View profile</p>
                  </Link>
                </div>
              </div>
              <div className={styles.message_mess}>
                <MessageText messages={messages} authUserId={authUser?._id} />
              </div>
              <div className={styles.message_write}>
                <input
                  type="text"
                  className="p_14Small"
                  placeholder="Write message"
                  value={messageText}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
              </div>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
