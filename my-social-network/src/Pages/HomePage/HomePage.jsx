import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../store/slices/userSlice";


import Ok from "../../images/svg/Ok.svg";

import styles from "./HomePage.module.css";
import HomeFile from "./HomeFile";

function HomePage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const status = useSelector((state) => state.user.status); 


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers()); // Загружаем пользователей при первом монтировании
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка при загрузке данных пользователей</div>;
  }

  return (
    <div className={`${styles.homepage} ${styles.fadeIn}`}>
      <div className={styles.homepage_up}>
        {users.map((user, index) => (
          <div key={user._id || index}>
            <HomeFile user={user} postId={user.postId} /> {/* Передаем данные пользователя */}
          </div>
        ))}
      </div>
      <div className={styles.homepage_down}>
        <div className={styles.down_img}>
          <img src={Ok} alt="" />
        </div>
        <p>You've seen all the updates</p>
        <p className="p_punkt">You have viewed all new publications</p>
      </div>
    </div>
  );
}

export default HomePage;
