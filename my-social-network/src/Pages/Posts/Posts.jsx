import React from "react";
import PostCont from './PostsCont'

import styles from './Posts.module.css'
import HomePage from "../HomePage/HomePage";

function Posts() {

  return (
    <div className={styles.container}>
      <div className={styles.postCon}>
        <PostCont />
      </div>
      <div className="back"></div>
      <HomePage />
    </div>
  );
}

export default Posts;
