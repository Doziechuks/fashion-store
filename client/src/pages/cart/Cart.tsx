/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import styles from "./Cart.module.less";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";
import { roundNumber } from "../../utility/roundNumber";
import CartCard from "../../components/cartCart/CartCard";
import Empty from "../empty/Empty";
import { Seo } from "../../utility/seo";
import { handleScrollTop } from "../../utility/scrollToTop";

interface CartProps {
  price: string;
}

const cartItems: {
  id: number;
  title: string;
  price: number;
  desc: string;
  vendor: string;
  img: string;
}[] = [
  {
    id: 1,
    title: "man fine plane trouser pant",
    price: 30,
    desc: "elit. Quam saepe eos necessitatibus harum cum minima, perferendis porro tenetur",
    vendor: "my quality seller",
    img: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "man fine stock jeans jacket",
    price: 500,
    desc: "elit. Quam saepe eos necessitatibus harum cum minima, perferendis porro tenetur  harum cum minima, perferendis porro tenetur",
    vendor: "my quality seller",
    img: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const Cart = ({ price }: CartProps) => {
  const [rate, setRate] = useState(3010);
  const [currency, setCurrency] = useState("$");
  const nairaRate = rate * 712;

  useEffect(() => {
    if (price === "NGN") {
      setRate(nairaRate);
      setCurrency("₦");
    } else {
      setRate(3010);
      setCurrency("$");
    }
  }, [price]);

  useEffect(() => {
    Seo({
      title: "Cart || Buy quality and amazing fashion products and glow",
      metaDescription: " Proceed to checkout items in your fashion cart ",
    });
  }, []);
  return (
    <>
      {cartItems.length ? (
        <main className={styles.container}>
          <section className={styles.wrapper}>
            <section className={styles.left}>
              <h3>Cart ({cartItems.length})</h3>
              <div className={styles.cardWrapper}>
                {cartItems.map((item, index) => (
                  <CartCard
                    item={item}
                    cartLength={cartItems.length}
                    itemIndex={index}
                  />
                ))}
              </div>
            </section>
            <section className={styles.right}>
              <h3>Cart Summary</h3>
              <div className={styles.subtotalBox}>
                <div>
                  <span>SUBTOTAL</span>
                  <span>
                    {currency}
                    {roundNumber(rate)}
                  </span>
                </div>
                <span className={styles.notice}>
                  Delivery fees not included yet
                </span>
              </div>
              <Link to="/checkout" onClick={handleScrollTop}>
                PROCEED TO CHECKOUT
              </Link>
            </section>
          </section>
          <Link
            to="/checkout"
            onClick={handleScrollTop}
            className={styles.mobileBtn}
          >
            PROCEED TO CHECKOUT
          </Link>
        </main>
      ) : (
        <Empty title="Your Empty is Cart!!" />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  price: selectToggleCurrency,
});
export default connect(mapStateToProps)(Cart);
