/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import styles from "./CheckoutBox.module.less";
import { roundNumber } from "../../utility/roundNumber";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";

interface CheckoutProps {
  item: {
    id?: number;
    title: string;
    img: string;
    price: number;
    quantity: number;
    desc: string;
    vendor: string;
  };
  price: string;
}
const CheckoutBox = ({ item, price }: CheckoutProps) => {
  const [currency, setCurrency] = useState("$");
  const [rate, setRate] = useState(item.price);
  const nairaRate = rate * 712;

  useEffect(() => {
    if (price === "NGN") {
      setRate(nairaRate);
      setCurrency("₦");
    } else {
      setRate(item.price);
      setCurrency("$");
    }
  }, [price]);

  return (
    <div className={styles.itemSummary} key={item.id}>
      <img src={item.img} alt={item.title} />
      <span>
        {item.quantity} X {currency}
        {roundNumber(rate)}
      </span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  price: selectToggleCurrency,
});

export default connect(mapStateToProps)(CheckoutBox);
