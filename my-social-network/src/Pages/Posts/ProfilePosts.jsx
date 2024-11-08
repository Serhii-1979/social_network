// src/Pages/Posts/Posts.jsx
import React from "react";
import ProfilePostCont from './ProfilePostCont';
import styles from './Posts.module.css';

function ProfilePosts({ post, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.postCon}>
          <ProfilePostCont post={post} /> {/* Передаем post в PostCont */}
        </div>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProfilePosts;
