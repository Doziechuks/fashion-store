/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import styles from "./Card.module.less";
import { Link } from "react-router-dom";
import { roundNumber } from "../../utility/roundNumber";
import { handleScrollTop } from "../../utility/scrollToTop";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";

interface CardProps {
  item: {
    id: number;
    img: string;
    img2?: string;
    title: string;
    price: number;
    oldPrice: number;
    isNew?: boolean;
  };
  isList?: string;
  price: string;
}

const Card = ({ item, isList, price }: CardProps) => {
  const [oldRate, setOldRate] = useState(item.oldPrice);
  const [rate, setRate] = useState(item.price);
  const [currency, setCurrency] = useState("$");
  const nairaRate = rate * 712;
  const nairaOldRate = oldRate * 712;

  // console.log({ price });

  useEffect(() => {
    if (price === "NGN") {
      setOldRate(nairaOldRate);
      setRate(nairaRate);
      setCurrency("₦");
    } else {
      setOldRate(item.oldPrice);
      setRate(item.price);
      setCurrency("$");
    }
  }, [price]);
  return (
    <Link
      to={`/product/${item.id}`}
      className={`${styles.card} ${isList && styles.catCart}`}
      onClick={handleScrollTop}
    >
      <div className={styles.cardImage}>
        {item.isNew && <span className={styles.new}>New Season</span>}
        <img src={item?.img} alt="card image" className={styles.img} />
        <img src={item?.img2} alt="card image" className={styles.img2} />
      </div>
      <h4>{item?.title}</h4>
      <div className={styles.priceBox}>
        <span className={styles.oldPrice}>
          {currency}
          {roundNumber(oldRate)}
        </span>
        <span className={styles.price}>
          {currency}
          {roundNumber(rate)}
        </span>
      </div>
    </Link>
  );
};

const mapStateToProps = createStructuredSelector({
  price: selectToggleCurrency,
});
export default connect(mapStateToProps)(Card);
