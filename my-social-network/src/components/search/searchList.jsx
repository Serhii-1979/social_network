import styles from "./search.module.css";
import Avatar from "../../images/png/notific_btn.jpg.png";

function SearchList() {
  return (
    <div className={styles.notific_list}>
      <div className={styles.search_li}>
        <button className="notific_btn">
          <img src={Avatar} alt="avatar" />
        </button>
        <div className={styles.notific_btn_text}>
          <p className="p_14Bold">sasha</p>
        </div>
      </div>
    </div>
  );
}

export default SearchList;
