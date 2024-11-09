import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./container.module.css";

function ListItem({ icon, textKey, path }) {
  const { t } = useTranslation();

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? `${styles.container_li} ${styles.active}`
          : styles.container_li
      }
    >
      <div className={styles.container_li_img}>
        {textKey === "profile" ? (
          <div className={styles.avaImg}>
            <img
              src={icon}
              alt="User Avatar"
              className={styles.profileAvatar} // Стили для аватара профиля
            />
          </div>
        ) : (
          <img src={icon} alt="icon" />
        )}
      </div>
      <div className={styles.container_li_text}>
        <p>{t(textKey)}</p>
      </div>
    </NavLink>
  );
}

export default ListItem;
