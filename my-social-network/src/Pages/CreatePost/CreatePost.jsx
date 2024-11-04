import React, { useState } from "react";
import HomePage from "../HomePage/HomePage";
import CreatePosts from "./CreatePosts";
import PostActions from "./PostActions";
import { $api } from "../../utils/api.ts"; // Убедитесь, что $api настроен для работы с Axios

import styles from "./CreatePost.module.css";

function CreatePost() {
  const [isPostShared, setIsPostShared] = useState(false);

  const handleShare = async ({ text, image }) => {
    const formData = new FormData();
    formData.append("caption", text);
    formData.append("image", image);

    try {
      await $api.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsPostShared(true);
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
    }
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
      <HomePage />
    </div>
  );
}

export default CreatePost;
