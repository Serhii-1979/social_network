import React from "react";
import PostCont from './PostsCont';
import styles from './Posts.module.css';

function Posts({ post, onClose }) { // Принимаем post и onClose как пропсы
  return (
    <div className={styles.modalOverlay} onClick={onClose}> {/* Закрытие модального окна при клике на фон */}
      <div className={styles.container} onClick={(e) => e.stopPropagation()}> {/* Остановка всплытия */}
        <div className={styles.postCon}>
          <PostCont post={post} /> {/* Передаем post в PostCont */}
        </div>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Posts;
