// src/Pages/CreatePost/CreatePosts.jsx
import React, { useState } from "react";
import styles from "./CreatePost.module.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import Ava from "../../images/png/ava1.png";

function CreatePosts({ onShare }) {
  const [text, setText] = useState("");

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Create new post</p>
          <button className={styles.shareButton} onClick={onShare}>
            Share
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.uploadSection}>
            <FaCloudUploadAlt className={styles.uploadIcon} />
            <p>Upload Image</p>
          </div>
          <div className={styles.detailsSection}>
            <div className={styles.userInfo}>
              <img src={Ava} alt="avatar" className={styles.avatar} />
              <span className={styles.username}>skai_laba</span>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Write a caption..."
              maxLength="200"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className={styles.footer}>
              <button className={styles.emojiButton}>😊</button>
              <span>{text.length}/200</span>
            </div>
            <div className={styles.footerEnd}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePosts;
