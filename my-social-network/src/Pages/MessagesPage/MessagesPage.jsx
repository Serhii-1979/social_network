import React from "react";
import { Link } from "react-router-dom";
import ItCareer from "../../components/itcareer/ItCareer";
import Nik from "../../images/png/nik.jpg";
import MessageText from "./MessageText";

import styles from "./MessagePage.module.css";

function MessagesPage() {
  return (
    <div className={styles.container}>
      <ItCareer />
      <div className={styles.message}>
        <div className={styles.message_up}>
          <div className={styles.message_img}>
            <img src={Nik} alt="avatar" />
          </div>
          <div className={styles.message_content}>
            <p className="p_16Bold">nikita</p>
          </div>
        </div>
        <div className={styles.message_down}>
          <div className={styles.message_avatar}>
            <div className={styles.message_avatar_img}>
              <img src={Nik} alt="avatar" />
            </div>
            <div className={styles.message_avatar_name}>
              <h3 className="h3">nikita</h3>
              <p className="p_14SmallGrey">nikiita · ICHgram</p>
            </div>
            <div className={styles.message_avatar_btn}>
              <Link className={styles.message_avatar_Link}>
                <p>View profile</p>
              </Link>
            </div>
          </div>
          <div className={styles.message_down_time}>
            <p className="p_12SmallGrey">Jun 26, 2024, 08:49 PM.</p>
          </div>
          <div className={styles.message_mess}>
            <MessageText />
          </div>
          <div className={styles.message_write}>
            <input type="text" className="p_14Small" placeholder="Write message" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;
