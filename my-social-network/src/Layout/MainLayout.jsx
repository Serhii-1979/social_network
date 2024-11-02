import React from "react";
import Container from "../components/container/container";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

import styles from "./MainLayout.module.css";

function MainLayout() {

  return (
    <div className={styles.layout}>
      <Container />
      <div className={styles.content}>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
