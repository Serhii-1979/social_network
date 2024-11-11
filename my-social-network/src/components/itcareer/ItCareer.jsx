// src/components/itcareer/ItCareer.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/slices/userSlice";
import ItCareerList from "./itcareer_list";

import styles from "./ItCareer.module.css";

function ItCareer({ onSelectUser }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchUsers()); // Загружаем список пользователей
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.cont_up}>
        <button className="h3">itcareerhub</button>
      </div>
      <div className={styles.cont_list}>
        {users.map((user) => (
          <ItCareerList key={user._id} user={user} onSelectUser={onSelectUser} />
        ))}
      </div>
    </div>
  );
}

export default ItCareer;
