/* eslint-disable @typescript-eslint/no-explicit-any */
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
    [x: string]: any;
    id: number;
    img: string;
    img2?: string;
    title: string;
    price: number;
    oldPrice: number;
    isNew?: boolean;
  };
  isList?: boolean;
  price: string;
}

const Card = ({ item, isList, price }: CardProps) => {
  const { attributes } = item;
  const [oldRate, setOldRate] = useState(attributes.oldPrice);
  const [rate, setRate] = useState(attributes.price);
  const [currency, setCurrency] = useState("$");
  const nairaRate = rate * 712;
  const nairaOldRate = oldRate * 712;

  const img1 = `http://localhost:1337${attributes?.img1?.data?.attributes?.url}`;
  const img2 = `http://localhost:1337${attributes?.img2?.data[0]?.attributes?.url}`;
  // console.log(img2);

  useEffect(() => {
    if (price === "NGN") {
      setOldRate(nairaOldRate);
      setRate(nairaRate);
      setCurrency("₦");
    } else {
      setOldRate(attributes.oldPrice);
      setRate(attributes.price);
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
        {attributes.isNew && <span className={styles.new}>New Season</span>}
        <img src={img1} alt="card image" className={styles.img} />
        <img src={img2} alt="card image" className={styles.img2} />
      </div>
      <h4>{attributes?.title}</h4>
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
