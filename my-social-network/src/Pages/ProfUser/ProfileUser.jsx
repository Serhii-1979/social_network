// ProfileUser.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../store/slices/userSlice";
import Posts from "../Posts/Posts"; // Компонент для модального окна с постом
import styles from "../Profile/Profile.module.css";

const placeholderImage = "https://netsh.pp.ua/wp-content/uploads/2017/08/Placeholder-1.png";

function ProfileUser() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState(null);

  // Получаем пользователя из состояния Redux
  const user = useSelector((state) => state.user.currentUser);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId)); // Загружаем данные пользователя по ID
    }
  }, [dispatch, userId]);

  if (status === 'loading') return <div>Loading...</div>;

  const handlePostClick = (post) => {
    // Передаем как `selectedPost` весь объект поста и пользователя
    setSelectedPost({ ...post, user });
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileMain}>
        <div className={styles.profileHeader}>
          <div className={styles.profileLogo}>
            <button className={styles.profileBtn}>
              <img src={user?.profile_image || placeholderImage} alt="Profile" />
            </button>
          </div>
          <div className={styles.profileContent}>
            <h3>{user?.username || "Username"}</h3>
            <p>{user?.bio || "User bio not available"}</p>
          </div>
        </div>

        {/* Список постов */}
        <div className={styles.profileList}>
          {user?.posts?.length > 0 ? (
            user.posts.map((post, index) => (
              <div key={post._id} className={styles.profileList_cont}>
                <div
                  className={styles.profileList_cont_img}
                  onClick={() => handlePostClick(post)}
                >
                  <img
                    src={post.image_url || placeholderImage}
                    alt={`post-${index}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>

      {/* Модальное окно с постом */}
      {selectedPost && (
        <Posts post={selectedPost} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default ProfileUser;
