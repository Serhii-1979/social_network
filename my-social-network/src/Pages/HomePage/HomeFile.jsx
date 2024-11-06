import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { $api } from "../../utils/api.ts";
import styles from "./HomeFile.module.css";
import Ava from "../../images/png/ava.jpg";
import Heart from "../../images/svg/Heart.svg";
import RedHeartIcon from "../../images/svg/RedHeart.svg";
import MessageImg from "../../images/svg/message-img.svg";

const placeholderImage = "https://netsh.pp.ua/wp-content/uploads/2017/08/Placeholder-1.png";

function HomeFile({ user, post }) {
  const [liked, setLiked] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      await $api.post(`/post/${post._id}/like/${user._id}`);
      setLiked(true);
    } catch (error) {
      console.error("Ошибка при лайке поста:", error);
    }
  };

  const getTimeAgo = (date) => {
    if (!date) return "N/A"; // Если дата отсутствует, возвращаем "N/A"
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return "Invalid Date"; // Если дата некорректна, возвращаем сообщение
    
    const now = new Date();
    const diffMs = now - parsedDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30); // приближенно, для простоты
    const diffYears = Math.floor(diffDays / 365); // приближенно, для простоты
  
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""}`;
    } else if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? "s" : ""}`;
    } else {
      return `${diffYears} year${diffYears !== 1 ? "s" : ""}`;
    }
  };
  

  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/profuser/${user._id}`)}
    >
      <div className={styles.cont_up}>
        <button className={styles.cont_up_ava}>
          <img src={user.profile_image || Ava} alt="avatar" />
        </button>
        <div className={styles.cont_up_text}>
          <p className="p_12Bold">{user.username || "Username"}</p>
          <p className="p_punkt">•</p>
          <p className="p_12SmallGrey">{getTimeAgo(user.created_at)}</p>
          <p className="p_punkt">•</p>
          <button
            className="buttonAva"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            follow
          </button>
        </div>
      </div>

      <div className={styles.cont_medium}>
        <img src={post.image_url || placeholderImage} alt="post" />
      </div>

      <div className={styles.cont_down}>
        <div className={styles.down_button}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
          >
            <img src={liked ? RedHeartIcon : Heart} alt="like" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/create/createpost");
            }}
          >
            <img src={MessageImg} alt="message" />
          </button>
        </div>
        <div className={styles.down_like}>
          <p className="p_12Bold">{post.likes_count || 0} likes</p>
        </div>
        <div className={styles.down_description}>
          <p className="p_12Bold italic">
            <span className="p_12Bold">{user.username || "Username"}</span>{" "}
            {showFullBio ? post.caption : `${post.caption?.slice(0, 6)}...`}
          </p>
          {post.caption?.length > 6 && (
            <button
              className="p_12SmallGrey"
              onClick={(e) => {
                e.stopPropagation();
                setShowFullBio(!showFullBio);
              }}
            >
              {showFullBio ? "less" : "more"}
            </button>
          )}
        </div>
        <div>
          <p className="p_12SmallGrey">
            View all comments (<span>{post.comments_count || 0}</span>)
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeFile;
