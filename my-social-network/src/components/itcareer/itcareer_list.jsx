// src/components/itcareer/ItCareerList.jsx

import React from "react";
import styles from "./ItCareer.module.css";
import Nik from "../../images/png/empty.jpg";
import { getTimeAgo } from "../../utils/time";

function ItCareerList({ user, onSelectUser }) {
  return (
    <button className={styles.cont_button} onClick={() => onSelectUser(user)}>
      <div className={styles.cont_li}>
        <div className={styles.cont_li_img}>
          <img src={user.profile_image || Nik} alt="img" />
        </div>
        <div className={styles.cont_li_text}>
          <p className="p_14Small">{user.username || "User"}</p>
          <div className={styles.cont_li_p}>
            <p className="p_12SmallGrey">{user.username || "User"}</p>
            <p className="p_12SmallGrey">sent a message</p>
            <p className="p_12SmallGrey">·</p>
            <p className="p_12SmallGrey">{getTimeAgo(user.lastMessageDate)}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ItCareerList;
