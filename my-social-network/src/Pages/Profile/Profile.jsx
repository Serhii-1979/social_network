import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../store/slices/userSlice";
import styles from "./Profile.module.css";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Ошибка загрузки профиля: {error}</div>;

  // Проверка на наличие currentUser перед рендерингом данных
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
              <Link className={`${styles.profileLink_1} h3_20`}>
                {currentUser.username || "Username"}
              </Link>
              <Link
                to="/edit"
                className={`${styles.profileLinkMyProf} p_14Bold_black`}
              >
                Edit profile
              </Link>
            </div>
            <div className={styles.profilePosts}>
              <p>
                <span className="p_16Bold">
                  {currentUser.posts_count || 0}
                </span>{" "}
                post
              </p>
              <p>
                <span className="p_16Bold">{currentUser.followers_count || 0}</span>{" "}
                followers
              </p>
              <p>
                <span className="p_16Bold">{currentUser.following_count || 0}</span>{" "}
                following
              </p>
            </div>
            <div className={styles.profilePosts_content}>
              <p className="p_14Small">
                {currentUser.bio || "No bio available."}
              </p>
            </div>
            <div className={styles.profile_a}>
              <p className="p_14Small">
                • {currentUser.bio || "User bio not provided."}
              </p>
              <p className={`${styles.name} p_14Small`}>{currentUser.full_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
