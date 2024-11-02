import React from "react";
import Profile from "../Profile/Profile";
import PostCont from './PostsCont'

import styles from './Posts.module.css'

function Posts() {
    // const [isVisible, setIsVisible] = useState(false);

    // useEffect(() => {
    //   setIsVisible(true);
    // }, []);

  return (
    <div className={styles.container}>
      {/* <div
        className={`${styles.cont_absolut} ${isVisible ? styles.fadeIn : ""}`}
      > */}
      <div className={styles.postCon}>
        <PostCont />
      </div>
      <div className="back"></div>
      <Profile />
    </div>
  );
}

export default Posts;
