// ProfileUser.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchUserById } from "../../store/slices/userSlice";
import BackIMG from "../../images/png/Background.png";
import styles from "../Profile/Profile.module.css";

const link = "https://netsh.pp.ua/wp-content/uploads/2017/08/Placeholder-1.png";

function ProfileUser() {
  const { userId } = useParams(); // Получаем ID пользователя из URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Получаем данные из Redux
  const user = useSelector((state) => state.user.currentUser); // Добавим currentUser в userSlice
  const posts = user?.posts || []; // Предполагаем, что в данных пользователя есть поле posts

  useEffect(() => {
    dispatch(fetchUserById(userId)); // Загружаем данные пользователя при загрузке компонента
  }, [dispatch, userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.profile}>
      <div className={styles.profileMain}>
        <div className={styles.profileHeader}>
          <div className={styles.profileLogo}>
            <button className={styles.profileBtn}>
              <img src={user.profile_image || BackIMG} alt="logo" /> {/* Изображение профиля */}
            </button>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.profileContent_it}>
              <button className={`${styles.profileLink_1} h3_20`}>
                {user.username} {/* Имя пользователя */}
              </button>
              <div className={styles.profileBtnCont}>
                <button className={`${styles.profileLink} p_14Bold_black`}>
                  follow
                </button>
                <button 
                  className={`${styles.profileLink_2} p_14Bold_black`} 
                  onClick={() => navigate("/messages")} // Переход на страницу сообщений
                >
                  message
                </button>
              </div>
            </div>
            <div className={styles.profilePosts}>
              <p>
                <span className="p_16Bold">{posts.length}</span> posts {/* Количество постов */}
              </p>
              <p>
                <span className="p_16Bold">{user.followers_count}</span> followers {/* Количество подписчиков */}
              </p>
              <p>
                <span className="p_16Bold">{user.following_count}</span> following {/* Количество подписок */}
              </p>
            </div>
            <div className={styles.profilePosts_content}>
              <p className="p_14Small">
                • {user.bio || "User bio not provided."}
              </p>
              <p className={`${styles.name} p_14Small`}>
                {user.full_name}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.profileList}>
          {posts.map((post, index) => (
            <div key={index} className={styles.profileList_cont}>
              <Link to={`/post/${post._id}`} className={styles.profileList_cont_img}>
              <img src={post.image ? post.image : link} alt={`post-${index}`} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
