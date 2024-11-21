import { useEffect, useRef, useState } from "react";
import styles from "./LoadingPanel.module.css";
export default function LoadingPanel() {
  const p1 = useRef<HTMLDivElement | null>(null);
  const p2 = useRef<HTMLDivElement | null>(null);
  const p3 = useRef<HTMLDivElement | null>(null);
  function animateRef(ref: HTMLDivElement | null) {
    // console.log("gu");
    if (ref) {
      ref.style.setProperty("transform", "translateY(-50%)");
      setTimeout(() => {
        ref.style.setProperty("transform", "translateY(0%)");
      }, 200);
    }
  }
  useEffect(() => {
    const id = setInterval(() => {
      animateRef(p1.current);
      setTimeout(() => {
        animateRef(p2.current);

        setTimeout(() => {
          animateRef(p3.current);
        }, 200);
      }, 200);
    }, 1000);

    return () => {
      if (id) clearInterval(id);
    };
  }, []);
  return (
    <div id={styles.container}>
      <div ref={p1} className={styles.point}></div>
      <div ref={p2} className={styles.point}></div>
      <div ref={p3} className={styles.point}></div>
    </div>
  );
}
