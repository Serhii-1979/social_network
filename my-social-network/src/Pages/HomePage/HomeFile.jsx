// HomeFile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { $api } from "../../utils/api.ts";

import styles from "./HomeFile.module.css";
import Ava from "../../images/png/ava.jpg";
import Heart from "../../images/svg/Heart.svg";
import RedHeartIcon from "../../images/svg/RedHeart.svg";
import MessageImg from "../../images/svg/message-img.svg";

const link = "https://netsh.pp.ua/wp-content/uploads/2017/08/Placeholder-1.png";

function HomeFile({ user = {}, postId }) {
  console.log("User data:", user);
  console.log("User profile image:", user?.profile_image);

  const [liked, setLiked] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      await $api.post(`/post/${postId}/like/${user._id}`);
      setLiked(true);
    } catch (error) {
      console.error("Ошибка при лайке поста:", error);
    }
  };

  const getWeeksAgo = (date) => {
    if (!date) return "N/A";
    const weeks = Math.floor(
      (new Date() - new Date(date)) / (1000 * 60 * 60 * 24 * 7)
    );
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  };

  const handleBioToggle = () => {
    setShowFullBio(!showFullBio);
  };

  return (
    <div className={styles.container} onClick={() => navigate(`/profuser/${user._id}`)}>
      <div className={styles.cont_up}>
        <button className={styles.cont_up_ava}>
          <img src={user?.profile_image || Ava} alt="avatar" />
        </button>
        <div className={styles.cont_up_text}>
          <p className="p_12Bold">{user?.username || "Username"}</p>
          <p className="p_punkt">•</p>
          <p className="p_12SmallGrey">{getWeeksAgo(user?.created_at)}</p>
          <p className="p_punkt">•</p>
          <button
            className="buttonAva"
            onClick={(e) => {
              e.stopPropagation(); // Чтобы клик на "follow" не перенаправлял на страницу профиля
              // Здесь можно добавить логику подписки
            }}
          >
            follow
          </button>
        </div>
      </div>

      <div className={styles.cont_medium}>
        <img src={link} alt="img" />
      </div>

      <div className={styles.cont_down}>
        <div className={styles.down_button}>
          <button onClick={(e) => { e.stopPropagation(); handleLike(); }}>
            <img src={liked ? RedHeartIcon : Heart} alt="like" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigate("/create/createpost"); }}>
            <img src={MessageImg} alt="message" />
          </button>
        </div>
        <div className={styles.down_like}>
          <p className="p_12Bold">{user?.likes_count || 0} likes</p>
        </div>
        <div className={styles.down_description}>
          <p className="p_12Bold italic">
            <span className="p_12Bold">{user?.username || "Username"}</span>
            {" "}{showFullBio ? user?.bio : `${user?.bio?.slice(0, 6)}...`} {/* Показ сокращенного или полного bio */}
          </p>
          {user?.bio?.length > 6 && (
            <button
              className="p_12SmallGrey"
              onClick={(e) => { e.stopPropagation(); handleBioToggle(); }} // Остановить всплытие
            >
              {showFullBio ? "less" : "more"}
            </button>
          )}
        </div>
        <div>
          <p className="p_12SmallGrey">View all comments (<span>{user?.likes_count}</span>)</p> {/* Выводим количество лайков */}
        </div>
      </div>
    </div>
  );
}

export default HomeFile;
