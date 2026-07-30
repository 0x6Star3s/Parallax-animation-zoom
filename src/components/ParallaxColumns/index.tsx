import styles from "./styles.module.scss";
import Picture1 from "../../../public/images/13.jpg";
import Picture2 from "../../../public/images/14.jpg";
import Picture3 from "../../../public/images/7.jpeg";
import Picture4 from "../../../public/images/8.jpg";
import Picture5 from "../../../public/images/9.jpg";
import Picture6 from "../../../public/images/10.jpg";
import Picture7 from "../../../public/images/11.jpg";
import Picture8 from "../../../public/images/12.jpg";
import Picture9 from "../../../public/images/2.jpeg";
import Image from "next/image";
import {
  useScroll,
  useTransform,
  useReducedMotion,
  motion,
} from "framer-motion";
import { useRef } from "react";

export default function Index() {
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // ponytail: przesuw w % wysokości kolumny (nie w px) -> ten sam efekt na
  // każdym viewporcie, a zapas 15% w .column gwarantuje brak pustych pasów.
  const to = (v: string) => (reduce ? "0%" : v);
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", to("-12%")]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", to("8%")]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", to("-7%")]);

  const columns = [
    { y: y1, images: [Picture1, Picture2, Picture3] },
    { y: y2, images: [Picture4, Picture5, Picture6] },
    { y: y3, images: [Picture7, Picture8, Picture9] },
  ];

  return (
    <div ref={container} className={styles.container}>
      {columns.map(({ y, images }, index) => (
        <motion.div key={index} style={{ y }} className={styles.column}>
          {images.map((src, i) => (
            <div key={i} className={styles.imageContainer}>
              <Image
                src={src}
                fill
                alt=""
                placeholder="blur"
                sizes="(max-width: 768px) 34vw, 30vw"
              />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
