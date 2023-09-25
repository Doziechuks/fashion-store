import styles from "./MobileFooter.module.less";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const MobileFooter = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.top}>
        <h4>Categories</h4>
        <Link to="/category/women">Women</Link>
        <Link to="/category/men">Men</Link>
        <Link to="/category/children">Children</Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.box}>
          <Link to="/">FASHIONSTORE</Link>
          <p>&copy; Copyright 2023, All RightS Reserved</p>
        </div>
        <hr className={styles.line} />
        <div className={styles.box2}>
          <h4>Follow us</h4>
          <div>
            <span>
              <LinkedInIcon sx={{ fontSize: "1.2rem" }} />
            </span>
            <span>
              <TwitterIcon sx={{ fontSize: "1.2rem" }} />
            </span>
            <span>
              <GitHubIcon sx={{ fontSize: "1.2rem" }} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
