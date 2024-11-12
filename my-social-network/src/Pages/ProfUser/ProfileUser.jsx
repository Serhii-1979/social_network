// src/Pages/ProfileUser/ProfileUser.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { followUser, unfollowUser, fetchUserById, fetchCurrentUser  } from "../../store/slices/userSlice";
import Posts from "../Posts/Posts";
import styles from "../Profile/Profile.module.css";

const placeholderImage = "https://netsh.pp.ua/wp-content/uploads/2017/08/Placeholder-1.png";

function ProfileUser() {
  const userId = useParams().userId;
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState(null);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);
  const authUserId = useSelector((state) => state.auth.userId);
  console.log("authUserId:", authUserId);
  const status = useSelector((state) => state.user.status);


  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user && user.followers) {
      setIsFollowing(user.followers.some(follower => follower._id === authUserId));
    }
  }, [user, authUserId]);

  useEffect(() => {
    if (!authUserId) {
      console.warn("Не удалось загрузить authUserId. Загружаем текущего пользователя.");
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, authUserId]);

  if (status === "loading" || !user) return <div>Loading...</div>;

  const handlePostClick = (post) => {
    setSelectedPost({ ...post, user });
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleFollowToggle = async () => {
    if (!authUserId || !userId) {
      console.error("Отсутствует authUserId или userId");
      return;
    }
  
    try {
      if (isFollowing) {
        await dispatch(unfollowUser({ userId: authUserId, targetUserId: userId }));
        setIsFollowing(false);
      } else {
        await dispatch(followUser({ userId: authUserId, targetUserId: userId }));
        setIsFollowing(true);
      }
  
      // Перезагружаем данные профиля для обновления счетчиков подписок
      dispatch(fetchUserById(userId));
    } catch (error) {
      console.error("Ошибка при подписке/отписке:", error);
    }
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
            <div className={styles.profileContent_it}>
              <h3>{user?.username || "Username"}</h3>
              <div className={styles.profileBtnCont}>
              <button
                  className={`${styles.profileLink} p_14Bold_black`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
                <button
                  className={`${styles.profileLink_2} p_14Bold_black`}
                  onClick={() => navigate("/messages")}
                >
                  message
                </button>
              </div>
            </div>
            <div className={styles.profilePosts}>
              <p>
                <span className="p_16Bold">{user?.posts_count || 0}</span> posts
              </p>
              <p>
                <span className="p_16Bold">{user?.followers_count || 0}</span> followers
              </p>
              <p>
                <span className="p_16Bold">{user?.following_count || 0}</span> following
              </p>
            </div>
            <div className={styles.profilePosts_content}>
              <p className="p_14Small">• {user?.bio || "User bio not provided."}</p>
              <p className={`${styles.name} p_14Small`}>{user?.full_name}</p>
            </div>
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
                  <img src={post.image_url || placeholderImage} alt={`post-${index}`} />
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>

      {/* Модальное окно с постом */}
      {selectedPost && <Posts post={selectedPost} onClose={handleCloseModal} />}
    </div>
  );
}

export default ProfileUser;
