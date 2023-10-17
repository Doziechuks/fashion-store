import styles from "./Loader.module.less";

const Loader = () => {
  return (
    <div className={styles.loaderBox}>
      <span className={styles.loader} />
    </div>
  );
};

export default Loader;
