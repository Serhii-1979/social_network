import React, { useState, useEffect } from "react";
import HomePage from "../HomePage/HomePage";
import Notification from '../../components/notifications/notifications';

import styles from '../SearchPage/SearchPage.module.css';


function NotificationsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      setIsVisible(true);
    }, []);
  
    return (
      <div className={styles.container}>
        <div className={`${styles.cont_absolut} ${isVisible ? styles.fadeIn : ''}`}>
          <Notification />
        </div>
        <div className="back"></div>
        <HomePage />
      </div>
    );
  }

export default NotificationsPage;