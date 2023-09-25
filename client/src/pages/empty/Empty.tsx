import styles from "./Empty.module.less";
import { Link } from "react-router-dom";

interface EmptyProp {
  title: string;
}
const Empty = ({ title }: EmptyProp) => {
  return (
    <main className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.imgBox}>
        <img
          src="https://cdn.pixabay.com/photo/2019/12/31/12/15/white-4731778_640.png"
          alt="empty cart"
        />
      </div>
      <p>
        Please go back <Link to="/">home</Link> and start shopping
      </p>
    </main>
  );
};

export default Empty;
