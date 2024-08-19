import React from "react";
import styles from "./styles.module.scss";

export default function Index(props) {
  return (
    <section {...props} className={styles.container}>
      <h2>{props.children}</h2>
    </section>
  );
}
