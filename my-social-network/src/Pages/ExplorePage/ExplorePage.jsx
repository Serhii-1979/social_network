import React, { useEffect, useState } from "react";
import styles from './ExplorePage.module.css';
import Explore from '../../images/png/explore.jpg';

function ExplorePage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`${styles.container} ${isVisible ? styles.fadeIn : ''}`}>
            <div className={styles.cont_img}>
                {Array.from({ length: 12 }).map((_, index) => (
                    <img key={index} src={Explore} alt="img" />
                ))}
            </div>
        </div>
    );
}

export default ExplorePage;
