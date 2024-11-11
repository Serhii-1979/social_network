// src/Pages/MessagesPage/MessageText.jsx

import React from "react";
import Nik from "../../images/png/empty.jpg";
import styles from "./MessageText.module.css";

function MessageText({ messages, authUserId }) {
  return (
    <div className={styles.chatContainer}>
      {messages.map((message, index) => (
        <div key={index} className={styles.chatContainerCont}>
          {message.sender_id === authUserId ? (
            // Сообщение отправителя
            <>
              <div className={`${styles.message} ${styles.messageRight}`}>
                <div className={styles.messageText}>{message.message_text}</div>
              </div>
              <img
                src={(authUserId.profile_image || Nik)} // Здесь следует загрузить изображение авторизованного пользователя
                alt="Avat"
                className={styles.avatar}
              />
            </>
          ) : (
            // Сообщение получателя
            <>
              <img
                src={message.receiver?.profile_image || Nik}
                alt="Avat"
                className={styles.avatar}
              />
              <div className={`${styles.message} ${styles.messageLeft}`}>
                <div className={styles.messageText}>{message.message_text}</div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default MessageText;
