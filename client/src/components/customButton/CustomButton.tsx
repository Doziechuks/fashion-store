import React from "react";
import styles from "./CustomButton.module.less";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  isAddress?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  isAddress,
  ...others
}) => {
  return (
    <button
      className={`${styles.container} ${isAddress ? styles.bckAddress : ""}`}
      {...others}
    >
      {children}
    </button>
  );
};

export default CustomButton;
