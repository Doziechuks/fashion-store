import { useState } from "react";
import styles from "./Slider.module.less";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const data: string[] = [
  "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

const Slider = () => {
  const [curentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    if (curentSlide === 0) {
      setCurrentSlide(2);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };
  const nextSlide = () => {
    if (curentSlide === 2) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <main className={styles.container}>
      <div
        className={styles.slideWrapper}
        style={{ transform: `translateX(-${curentSlide * 100}vw)` }}
      >
        <img src={data[0]} alt="slide1" />
        <img src={data[1]} alt="slide2" />
        <img src={data[2]} alt="slide3" />
      </div>
      <div className={styles.arrowBox}>
        <div className={styles.icon} onClick={prevSlide}>
          <ArrowBackIcon sx={{ color: "white" }} />
        </div>
        <div className={styles.icon} onClick={nextSlide}>
          <ArrowForwardIcon sx={{ color: "white" }} />
        </div>
      </div>
      <img
        src="https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="mobile single slide"
        className={styles.mobileImg}
      />
    </main>
  );
};

export default Slider;
