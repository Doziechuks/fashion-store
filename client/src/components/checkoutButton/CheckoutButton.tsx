import React, { ReactNode } from "react";
import styles from "./CheckoutButton.module.less";

interface CheckoutButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  title: string;
  icon: ReactNode;
  isProceed?: boolean;
}
const CheckoutButton = ({
  title,
  icon,
  isProceed,
  ...others
}: CheckoutButtonProps) => {
  return (
    <button
      type="button"
      className={` ${styles.wrapper} ${isProceed ? styles.normal : ""}`}
      {...others}
    >
      <span>{title}</span>
      {icon}
    </button>
  );
};

export default CheckoutButton;
