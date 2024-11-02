import React, { useState } from "react";
import Profile from "../Profile/Profile";

import CreatePosts from "./CreatePosts";
import PostActions from "./PostActions";

import styles from "./CreatePost.module.css";

function CreatePost() {
  const [isPostShared, setIsPostShared] = useState(false);

  const handleShare = () => {
    setIsPostShared(true);
  };

  return (
    <div className={styles.createPost}>
      <div>
        {!isPostShared ? (
          <CreatePosts onShare={handleShare} />
        ) : (
          <div className={styles.createPostCenter}>
            <PostActions />
          </div>
        )}
      </div>
      <div className="back"></div>
      <Profile />
    </div>
  );
}

export default CreatePost;
