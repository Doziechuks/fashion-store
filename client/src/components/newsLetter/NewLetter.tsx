import React, { useState } from "react";
import styles from "./NewsLetter.module.less";

const NewLetter = () => {
  const [email, setEmail] = useState("");
  return (
    <main className={styles.container}>
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
