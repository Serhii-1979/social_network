import React from "react";
import PostPage from "./PostPage";

import Ex from "../../images/png/explore.jpg";

import styles from "./Posts.module.css";

function PostsCont() {
  return (
    <div className={styles.poster}>
      <div className={styles.posterIMG}><img src={Ex} alt="img" /></div>
      <div className={styles.posterLeft}>
        <PostPage />
      </div>
    </div>
  );
}

export default PostsCont;
