import React from "react";
import Ava1 from "../../images/png/ava1.png";
import Ava2 from "../../images/png/ava2.png";
import styles from "./MessageText.module.css";

function MessageText() {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatContainerCont}>
        <img src={Ava1} alt="User Avatar" className={styles.avatar} />
        <div className={`${styles.message} ${styles.messageLeft}`}>
          <div className={styles.messageText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          </div>
        </div>
      </div>

      <div className={styles.chatContainerCont}>
        <div className={`${styles.message} ${styles.messageRight}`}>
          <div className={styles.messageText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do Lorem ipsum dolor sit amet,
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do Lorem ipsum dolor sit amet,
            
          </div>
        </div>
        <img src={Ava2} alt="User Avatar" className={styles.avatar} />
      </div>
      
    </div>
  );
}

export default MessageText;
