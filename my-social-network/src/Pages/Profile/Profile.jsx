import React from "react";
import { Link } from "react-router-dom";

import ProfIMG from "../../images/svg/LinkLogo.svg";
import A from "../../images/svg/Img-a.svg";
import BackIMG from "../../images/png/Background.png";

import styles from "./Profile.module.css";

const link =
  "https://itcareerhub.de/ru/?utm_medium=cpc&utm_source=google&utm_campaign=ICH_brand_search_ru_DE&utm_term=it%20career%20hub_{phrase_id}&utm_content=152789402780_{region_name}_668024583824&gad_source=1&gclid=Cj0KCQjwsoe5BhDiARIsAOXVoUv1l2rlck85cT4oKs6zQITnWliQ-WpyOn3TXc2pp6z1uPST-8sIwX8aAkFbEALw_wcB";

function Profile() {
  const items = Array(6).fill(BackIMG);

  return (
    <div className={styles.profile}>
      <div className={styles.profileMain}>
        <div className={styles.profileHeader}>
          <div className={styles.profileLogo}>
            <button className={styles.profileBtn}>
              <img src={ProfIMG} alt="logo" />
            </button>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.profileContent_it}>
              <Link className={`${styles.profileLink_1} h3_20`}>
                itcareerhub
              </Link>
              <Link
                to="/edit"
                className={`${styles.profileLink} p_14Bold_black`}
              >
                Edit profile
              </Link>
            </div>
            <div className={styles.profilePosts}>
              <p>
                <span className="p_16Bold">129</span> post
              </p>
              <p>
                <span className="p_16Bold">9 993</span> followers
              </p>
              <p>
                <span className="p_16Bold">59</span> following
              </p>
            </div>
            <div className={styles.profilePosts_content}>
              <p className="p_14Small">
                • Гарантия помощи с трудоустройством в ведущие IT-компании
              </p>
              <p className="p_14Small">
                • Выпускники зарабатывают от 45к евро БЕСПЛАТНАЯ
                <span className="p_14SmallGrey">... more</span>
              </p>
            </div>
            <div className={styles.profile_a}>
              <a href={link} className="p_14Blue_left">
                <img src={A} alt="" />. bit.ly/3rpiIbh
              </a>
            </div>
          </div>
        </div>
        <div className={styles.profileList}>
          {items.map((imgSrc, index) => (
            <div key={index} className={styles.profileList_cont}>
              <Link className={styles.profileList_cont_img}>
                <img src={imgSrc} alt={`img-${index}`} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
