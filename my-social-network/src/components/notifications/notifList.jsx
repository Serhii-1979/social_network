import styles from "./notifications.module.css";

import Avatar from "../../images/png/notific_btn.jpg.png";
import img2 from "../../images/png/notific_img_right.jpg.jpg";

function NotifList() {
  return (
    <div className={styles.notific_list_cont}>
      <li className={styles.notific_li}>
        <button className="notific_btn">
          <img src={Avatar} alt="avatar" />
        </button>
        <div className={styles.notific_btn_text}>
          <p className="p_14Small">
            <span className="p_14Bold">sasha</span> liked your
          </p>
          <p className="p_14Small">
            photo. <span className="p_14SmallGrey">2 wek</span>
          </p>
        </div>
        <div className={styles.notific_li_img}>
          <img src={img2} alt="img" />
        </div>
      </li>
    </div>
  );
}

export default NotifList;
