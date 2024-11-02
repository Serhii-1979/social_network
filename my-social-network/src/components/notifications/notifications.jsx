import NotifList from "./notifList";


import styles from "./notifications.module.css";

function Notific() {
  return (
    <div className="notific">
      <h2>Notifications</h2>
      <p className="p_14Bold">New</p>
      <div className={styles.notific_list}>
        <NotifList />
        <NotifList />
        <NotifList />
      </div>
    </div>
  );
}

export default Notific;
