import React from "react";
import styles from "./ItCareer.module.css";
import Nikita from "../../images/png/nikita.jpg";

function ItCareerList() {
  return (
    <button className={styles.cont_button}>
      <div className={styles.cont_li}>
        <div>
          <img src={Nikita} alt="img" />
        </div>
        <div className={styles.cont_li_text}>
          <p className="p_14Small">nikita</p>
          <div className={styles.cont_li_p}>
            <p className="p_12SmallGrey">Nikita</p>
            <p className="p_12SmallGrey">sent a message</p>
            <p className="p_12SmallGrey">·</p>
            <p className="p_12SmallGrey">2 wek</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ItCareerList;
