import { useEffect, useState } from "react";
import { roundNumber } from "../../utility/roundNumber";
import styles from "./ProductItem.module.less";

interface ItemProps {
  itemPrice: number;
  title: string;
  desc: string;
  price: string;
}
const ProductItem = ({ itemPrice, title, desc, price }: ItemProps) => {
  const [rate, setRate] = useState(itemPrice);
  const [currency, setCurrency] = useState("$");
  const nairaRate = rate! * 712;

  useEffect(() => {
    if (price === "NGN") {
      setRate(nairaRate);
      setCurrency("₦");
    } else {
      setRate(itemPrice);
      setCurrency("$");
    }
  }, [price]);

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <span className={styles.price}>
        {currency}
        {roundNumber(rate!)}
      </span>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};

export default ProductItem;
