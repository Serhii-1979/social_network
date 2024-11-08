import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTimeAgo } from "../../utils/time.js"
import { likePost } from "../../store/slices/postSlice";
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
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likePost({ postId: post._id, userId: user._id }));
    setLiked(true);
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
