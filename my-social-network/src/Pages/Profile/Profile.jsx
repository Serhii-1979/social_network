import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../store/slices/userSlice";
import styles from "./Profile.module.css";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    // Запрашиваем данные о текущем пользователе при каждом открытии профиля
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Ошибка загрузки профиля: {error}</div>;

  if (!currentUser) {
    return <div>Данные профиля не найдены.</div>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profileMain}>
        <div className={styles.profileHeader}>
          <div className={styles.profileLogo}>
            <button className={styles.profileBtn}>
              <img
                src={currentUser.profile_image || "path/to/default/avatar.jpg"}
                alt="logo"
              />
            </button>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.profileContent_it}>
              <p className={`${styles.profileLink_1} h3_20`}>
                {currentUser.username || "Username"}
              </p>
              <p className={`${styles.profileLinkMyProf} p_14Bold_black`}>
                Edit profile
              </p>
            </div>
            <div className={styles.profilePosts}>
              <p><span className="p_16Bold">{currentUser.posts_count || 0}</span> post</p>
              <p><span className="p_16Bold">{currentUser.followers_count || 0}</span> followers</p>
              <p><span className="p_16Bold">{currentUser.following_count || 0}</span> following</p>
            </div>
            <div className={styles.profilePosts_content}>
              <p className="p_14Small">{currentUser.bio || "No bio available."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
