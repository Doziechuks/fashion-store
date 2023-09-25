import React from "react";
import styles from "./CustomButton.module.less";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...others }) => {
  return (
    <button className={styles.container} {...others}>
      {children}
    </button>
  );
};

export default CustomButton;
