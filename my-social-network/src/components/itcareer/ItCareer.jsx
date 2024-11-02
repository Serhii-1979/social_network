import React from "react";
import ItCareerList from "./itcareer_list";

import styles from './ItCareer.module.css';

function ItCareer() {
    return(
        <div className={styles.container}>
            <div className={styles.cont_up}>
                <button className="h3">itcareerhub</button>
            </div>
            <div className={styles.cont_list}>
                <ItCareerList />
                <ItCareerList />
                <ItCareerList />
            </div>
        </div>
    )
}

export default ItCareer;