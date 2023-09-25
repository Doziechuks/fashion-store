import React from "react";
import styles from "./Category.module.less";
import { Link } from "react-router-dom";
import { handleScrollTop } from "../../utility/scrollToTop";

interface Category {
  img1: string;
  img2: string;
  img3: string;
}
const data: Category = {
  img1: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
  img2: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
  img3: "https://images.pexels.com/photos/4715314/pexels-photo-4715314.jpeg?auto=compress&cs=tinysrgb&w=600",
};
const Category = () => {
  return (
    <main className={styles.container}>
      <div className={styles.top}>
        <div className={styles.box}>
          <img src={data.img1} alt="category banner" />
          <Link to="/category/women" onClick={handleScrollTop}>
            Women
          </Link>
        </div>
        <div className={styles.box}>
          <img src={data.img2} alt="category banner" />
          <Link to="/category/men" onClick={handleScrollTop}>
            Men
          </Link>
        </div>
        <div className={styles.box}>
          <img src={data.img3} alt="category banner" />
          <Link to="/category/children" onClick={handleScrollTop}>
            Chldren
          </Link>
        </div>
      </div>
      {/* <div className={styles.bottom}></div> */}
    </main>
  );
};

export default Category;
