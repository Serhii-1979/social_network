import React from "react";
import styles from "./Edit.module.css";
import UserPhoto from "../../images/png/ava1.png"; // Замените на свой путь к изображению профиля

function Edit() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Edit profile</h3>
      <div className={styles.profileHeader}>
        <img src={UserPhoto} alt="Profile" className={styles.profileImage} />
        <div className={styles.profileInfo}>
          <p className={styles.username}>ichschool</p>
          <p className={styles.description}>
            • Гарантия помощи с трудоустройством в ведущие IT-компании
          </p>
        </div>
        <button className={styles.newPhotoButton}>New photo</button>
      </div>
      <form className={styles.form}>
        <div className={styles.formInp}>
          <label className={styles.label}>Username</label>
          <input type="text" className={styles.input} placeholder="new text" />
        </div>

        <div className={styles.formInp}>
        <label className={styles.label}>Website</label>
        <input type="text" className={styles.input} placeholder="new text" />
        </div>

        <div className={styles.formInp}>
        <label className={styles.label}>About</label>
        <textarea
          className={styles.textarea}
          placeholder="new text"
          maxLength="150"
        />
        </div>
        <p className={styles.charCount}>136 / 150</p>

        <button type="submit" className={styles.saveButton}>
          Save
        </button>
      </form>
    </div>
  );
}

export default Edit;
