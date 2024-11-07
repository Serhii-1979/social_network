import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import smileIcon from "../../images/svg/smile.svg";
import heartIcon from "../../images/svg/heart-like.svg";
import { $api } from "../../utils/api.ts";
import styles from "./PostPage.module.css";

const popularEmojis = ["😂", "😍", "😢", "👏", "🔥", "🥳", "❤️"];

function PostPage({ user, post }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    // Загружаем комментарии при монтировании компонента
    const fetchComments = async () => {
      try {
        const response = await $api.get(`/comments/${post._id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Ошибка загрузки комментариев:", error);
      }
    };

    fetchComments();
  }, [post._id]);

  const handleEmojiClick = (emoji) => {
    setCommentText(commentText + emoji);
    setShowEmojis(false);
  };

  const onSendComment = async () => {
    if (!commentText.trim()) return;
  
    try {
      await $api.post(`/comments/${post._id}`, {
        comment_text: commentText,
      });
      setCommentText("");
      // Повторно загружаем комментарии после успешной отправки
      const response = await $api.get(`/comments/${post._id}`);
      setComments(response.data);
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
    }
  };
  

  const toggleLikeComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              liked: !comment.liked,
              likes_count: comment.liked
                ? comment.likes_count - 1
                : comment.likes_count + 1,
            }
          : comment
      )
    );
  };

  return (
    <div className={styles.postPage}>
      {/* Верхняя часть поста с аватаром и именем профиля */}
      <div className={styles.header}>
        <Link to={`/profuser/${user._id}`} className={styles.headerBtn}>
          <img
            src={user?.profile_image || "default-image-url"}
            alt="Profile"
            className={styles.avatar}
          />
          <p className={styles.username}>{user?.username || "Unknown User"}</p>
        </Link>
        <button className={styles.followButton}>Follow</button>
      </div>

      {/* Описание поста */}
      <div>
        <div className={styles.description}>{post.caption}</div>

        {/* Список комментариев */}
        <div className={styles.comments}>
          {comments.map((comment) => (
            <div key={comment._id} className={styles.comment}>
              <div className={styles.text}>
                <img
                  src={
                    comment.user_id?.profile_image ||
                    "default-profile-image-url"
                  }
                  alt="Profile"
                  className={styles.commentAvatar}
                />
                <div>
                  <span className={styles.commentUsername}>
                    {comment.user_id?.username || "Anonymous"}
                  </span>{" "}
                  {comment.comment_text}
                  <div className={styles.like_5}>
                    <span>{new Date(comment.created_at).toLocaleString()}</span>
                    <span>Likes: {comment.likes_count || 0}</span>
                  </div>
                </div>
              </div>
              <button
                className={styles.like}
                onClick={() => toggleLikeComment(comment._id)}
              >
                <img
                  src={heartIcon}
                  alt="Like"
                  style={{ fill: comment.liked ? "red" : "none" }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Лайки и поле для комментариев */}
      <div className={styles.footer}>
        <div className={styles.likesSection}>
          <p className="p_10_600">{post.likes_count} likes</p>
          <p className="p_10_400">1 day ago</p>
        </div>
        <div className={styles.commentInput}>
          <button className={styles.commentInputBtn} onClick={() => setShowEmojis(!showEmojis)}>
            <img src={smileIcon} alt="Emoji" />
          </button>
          <input
            type="text"
            placeholder="Add comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className={styles.commentInputBtn2} onClick={onSendComment}>Send</button>
        </div>
      </div>
      {showEmojis && (
        <div className={styles.emojiPicker}>
          {popularEmojis.map((emoji) => (
            <span
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              className={styles.emoji}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostPage;
