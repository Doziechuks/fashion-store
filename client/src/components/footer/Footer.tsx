import React from "react";
import styles from "./Footer.module.less";
import { Link, useNavigate } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { handleScrollTop } from "../../utility/scrollToTop";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className={styles.container}>
      <div className={styles.top}>
        <div className={styles.box}>
          <h4>Categories</h4>
          <Link to="/category/women">Women</Link>
          <Link to="/category/men">Men</Link>
          <Link to="/category/children">Children</Link>
        </div>
        <div className={styles.box}>
          <h4>Links</h4>
          <span
            onClick={() => {
              handleScrollTop();
              navigate("/");
            }}
          >
            Home
          </span>
          <span>FAQs</span>
          <span>Contact us</span>
          <span>Cookies</span>
          <span>Stores</span>
        </div>
        <div className={styles.box} style={{ flex: 1.5 }}>
          <h4>About</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam saepe
            eos necessitatibus harum cum minima, perferendis porro tenetur
          </p>
        </div>
        <div className={styles.box} style={{ flex: 1.5 }}>
          <h4>contact</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam saepe
            eos necessitatibus harum cum minima
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.box}>
          <Link to="/" onClick={handleScrollTop}>
            FASHIONSTORE
          </Link>
          <p>&copy; Copyright 2023, All RightS Reserved</p>
        </div>
        <div className={styles.box2}>
          <h4>Follow us:</h4>
          <div>
            <span>
              <LinkedInIcon />
            </span>
            <span>
              <TwitterIcon />
            </span>
            <span>
              <GitHubIcon />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
