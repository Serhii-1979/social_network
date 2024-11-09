// PostsCont.jsx

import React from "react";
import PostPage from "./PostPage";
import styles from "./Posts.module.css";

function PostsCont({ post }) {
  console.log("Post in PostsCont:", post);
  return (
    <div className={styles.poster}>
      <div className={styles.posterIMG}>
        <img src={post.image_url} alt={post.caption || "Post image"} />
      </div>
      <div className={styles.posterLeft}>
        <PostPage user={post.user} post={post} /> {/* Передаем user и post в PostPage */}
      </div>
    </div>
  );
}

export default PostsCont;
