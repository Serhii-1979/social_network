// src/Pages/CreatePost/PostActions.jsx
import React from "react";
import styles from "./PostActions.module.css";

function PostActions() {
  return (
    <div className={styles.actionsContainer}>
      <button className={styles.actionButton} style={{ color: "red" }}>
        Delete
      </button>
      <button className={styles.actionButton}>Edit</button>
      <button className={styles.actionButton}>Go to post</button>
      <button className={styles.actionButton}>Copy link</button>
      <button className={styles.actionButton}>Cancel</button>
    </div>
  );
}

export default PostActions;
