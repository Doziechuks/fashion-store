import styles from "./CustomInput.module.less";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLast?: boolean;
}
const CustomInput: React.FC<CustomInputProps> = ({ isLast, ...others }) => {
  return (
    <input
      {...others}
      className={`${styles.inputBox} ${isLast ? styles.last : ""}`}
    />
  );
};

export default CustomInput;
