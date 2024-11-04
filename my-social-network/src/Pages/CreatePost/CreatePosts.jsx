import React, { useState } from "react";
import { useSelector } from "react-redux"; // Импортируем useSelector для доступа к состоянию
import styles from "./CreatePost.module.css";
import Cloud from "../../images/svg/Cloud.svg";
import Ava from "../../images/png/ava1.png";

function CreatePosts({ onShare }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // Предварительный просмотр изображения

  // Получаем данные текущего пользователя из Redux
  const currentUser = useSelector((state) => state.user.currentUser);
  const profileImage = currentUser?.profile_image || Ava; // Используем фото профиля или дефолтное изображение
  const username = currentUser?.username || "Username"; // Используем username или дефолтное значение

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Устанавливаем предварительный просмотр
    }
  };

  const handleShareClick = () => {
    if (!image) {
      alert("Пожалуйста, загрузите изображение.");
      return;
    }

    onShare({ text, image });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Create new post</p>
          <button className={styles.shareButton} onClick={handleShareClick}>
            Share
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.uploadSection}>
            {preview ? (
              <img src={preview} alt="Preview" className={styles.previewImage} />
            ) : (
              <>
                <img src={Cloud} alt="Upload" className={styles.uploadIcon} />
                <p>Upload Image</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.uploadInput}
              style={{ opacity: 0, position: "absolute", cursor: "pointer", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          </div>
          <div className={styles.detailsSection}>
            <div className={styles.userInfo}>
              <img src={profileImage} alt="avatar" className={styles.avatar} /> {/* Выводим фото профиля */}
              <span className={styles.username}>{username}</span> {/* Выводим username */}
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
