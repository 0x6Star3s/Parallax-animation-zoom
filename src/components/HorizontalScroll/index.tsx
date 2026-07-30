import styles from "./styles.module.scss";
import Picture1 from "../../../public/images/13.jpg";
import Picture2 from "../../../public/images/14.jpg";
import Picture3 from "../../../public/images/7.jpeg";
import Picture4 from "../../../public/images/6.jpg";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  motion,
} from "framer-motion";
import { useRef } from "react";

const pictures = [Picture1, Picture2, Picture3, Picture4];

export default function Index() {
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // ponytail: -x w % szerokości toru = (n-1)/n, więc liczba slajdów może rosnąć
  // bez dotykania scss (tor jest n * 100vw).
  const end = `-${((pictures.length - 1) / pictures.length) * 100}%`;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : end]);

  return (
    <div
      ref={container}
      className={styles.container}
      // reduce -> brak przewijania w bok, więc i brak martwej wysokości
      style={{ height: reduce ? "100svh" : `${pictures.length * 100}svh` }}
    >
      <div className={styles.sticky}>
        <motion.div
          style={{ x, width: `${pictures.length * 100}vw` }}
          className={styles.track}
        >
          {pictures.map((src, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.imageContainer}>
                <Image src={src} fill alt="" placeholder="blur" sizes="100vw" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
