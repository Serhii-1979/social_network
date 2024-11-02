import React from "react";
import Avatar from "../../images/png/ava1.png";
import Like from "../../images/svg/heart-like.svg";
import smile from '../../images/svg/smile.svg'

import { Link } from "react-router-dom";

import styles from "./PostPage.module.css";


function PostPage() {
  return (
    <div className={styles.postPage}>
      {/* Верхняя часть поста с аватаром и именем профиля */}
      <div className={styles.header}>
        <img src={Avatar} alt="Profile" className={styles.avatar} />
        <div>
          <p className={styles.username}>itcareerhub</p>
          <p>•</p>
          <button className={styles.followButton}>Подписаться</button>
        </div>
      </div>

      {/* Описание поста */}
      {/* <div className={styles.description}>
        <p className={styles.username}>itcareerhub</p>
        <p>
          Потрясающие новости пришли к нам из Черногории! Проект по поддержке...
        </p>
      </div> */}

      {/* Комментарии */}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <img src={Avatar} alt="Profile" className={styles.avatar} />
          <p>
            <span className={styles.commentUsername}>coach.tonia</span>{" "}
            Потрясающие новости пришли к нам из Черногории! Проект по поддержке.
            Lorem. <br />{" "}
            <br />
            Totam provident, illum a nisi dolores, asperiores harum est ratione
            <br />
            Lorem ipsum dolor sit amet.
            <div className={styles.like_5}>
                <p className="p_10_600">5 h</p>
                <p className="p_10_600">likes: 5</p>
            </div>
          </p>
          <div className={styles.like}>
            <img src={Like} alt="" />
          </div>
        </div>
        <div className={styles.comment}>
          <img src={Avatar} alt="Profile" className={styles.avatar} />
          <p>
            <span className={styles.commentUsername}>coach.tonia</span>{" "}
            Потрясающие новости пришли к нам из Черногории! 👏 👏 👏 <br />{" "}
            <div className={styles.like_5}>
                <p className="p_10_600">5 h</p>
                <p className="p_10_600">likes: 5</p>
            </div>
          </p>
          <div className={styles.like}>
            <img src={Like} alt="" />
          </div>
        </div>
        <div className={styles.comment}>
          <img src={Avatar} alt="Profile" className={styles.avatar} />
          <p>
            <span className={styles.commentUsername}>coach.tonia</span>{" "}
            Потрясающие новости пришли к нам из Черногории! Спасибо!!! 👏
             <br />{" "}
            <div className={styles.like_5}>
                <p className="p_10_600">5 h</p>
                <p className="p_10_600">likes: 5</p>
            </div>
          </p>
          <div className={styles.like}>
            <img src={Like} alt="" />
          </div>
        </div>

        
      </div>

      {/* Лайки и поле для комментариев    Спасибо!!! 👏 */}
      <div className={styles.footer}>
        <div className={styles.likesSection}>
          <p className="p_10_600">25 likes</p>
          <p className="p_10_400">1 day</p>
        </div>
        <div className={styles.commentInput}>
            <img src={smile} alt="" />
          <input type="text" placeholder="Add comment" />
          <Link to="createpost"><button>Send</button></Link>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
