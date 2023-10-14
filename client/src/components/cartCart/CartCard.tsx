/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import styles from "./CartCard.module.less";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { roundNumber } from "../../utility/roundNumber";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";
import { removeItemFromCart } from "../../redux/cartReducer/cart.action";
// import { CartItemProps } from "../../redux/cartReducer/cart.type";

interface CartItemProps {
  id?: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  desc: string;
  vendor: string;
}
interface CardProps {
  item: CartItemProps;
  itemIndex: number;
  cartLength: number;
  price: string;
  removeItem: (id: CartItemProps) => void;
}
const CartCard = ({
  item,
  itemIndex,
  cartLength,
  price,
  removeItem,
}: CardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [rate, setRate] = useState(item.price);
  const [currency, setCurrency] = useState("$");
  const nairaRate = rate! * 712;
  const lastItem = itemIndex + 1 === cartLength;

  useEffect(() => {
    if (price === "NGN") {
      setRate(nairaRate);
      setCurrency("₦");
    } else {
      setRate(item.price);
      setCurrency("$");
    }
  }, [price]);

  // console.log(removeItem(item.id));

  return (
    <div
      className={styles.container}
      style={{ marginBottom: lastItem ? "" : "1rem" }}
    >
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.imgBox}>
            <img src={item.img} alt="cartPhoto" />
          </div>
          <div className={styles.cartProps}>
            <h4>{item.title}</h4>
            <span className={styles.mobilePrice}>
              {item.quantity} X {currency}
              {roundNumber(rate!)}
            </span>
            <p>{item.desc}</p>
            <span>Seller: {item.vendor}</span>
          </div>
        </div>
        <div className={styles.right}>
          <span>
            {item.quantity} X {currency}
            {roundNumber(rate!)}
          </span>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left} onClick={() => removeItem(item)}>
          <DeleteOutlineOutlinedIcon />
          <span>REMOVE</span>
        </div>
        <div className={styles.right}>
          <button
            disabled={quantity <= 1 ? true : false}
            onClick={() => setQuantity((prev) => prev - 1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  price: selectToggleCurrency,
});

const mapDispatchToProps = (dispatch: Function) => ({
  removeItem: (id: CartItemProps) => dispatch(removeItemFromCart(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartCard);

// onClick={() => removeItem(item.id)}
