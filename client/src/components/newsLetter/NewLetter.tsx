import { useState, useEffect } from "react";
import styles from "./NewsLetter.module.less";
import { useLocation } from "react-router-dom";

const NewLetter = () => {
  const [email, setEmail] = useState("");
  const [pathName, setPathName] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    setPathName(pathname);
  }, [pathname]);

  return (
    <main
      className={styles.container}
      style={{ display: pathName === "/" ? "flex" : "none" }}
    >
      <div className={styles.title}>subscribe to our news letter:</div>
      <div className={styles.inputBox}>
        <input
          type="email"
          placeholder="Enter your email..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" onClick={() => setEmail("")}>
          send
        </button>
      </div>
    </main>
  );
};

export default NewLetter;
