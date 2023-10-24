/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import styles from "./Cart.module.less";
import { useNavigate } from "react-router-dom";

import { roundNumber } from "../../utility/roundNumber";
import CartCard from "../../components/cartCart/CartCard";
import Empty from "../empty/Empty";
import { Seo } from "../../utility/seo";
import { handleScrollTop } from "../../utility/scrollToTop";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";
import { handleToggleAuth } from "../../redux/toggleReducer/toggle.action";
import { selectCartItem } from "../../redux/cartReducer/cart.selector";
import { resetCart } from "../../redux/cartReducer/cart.action";
import { handleTotal } from "../../utility/handleTotal";
import { selectCurrentUser } from "../../redux/userReducer/user.selector";
import { CurrentUserProps } from "../../redux/userReducer/user.type";

interface CartItemProps {
  id?: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  desc: string;
  vendor: string;
}
interface CartProps {
  price: string;
  setShowAuth: () => void;
  cartItems: CartItemProps[];
  resetCart: () => void;
  currentUser: CurrentUserProps | null;
}

const Cart = (props: CartProps) => {
  const { price, cartItems, setShowAuth, resetCart, currentUser } = props;
  const [totalRate, setTotalRate] = useState(handleTotal(cartItems));
  const [currency, setCurrency] = useState("$");
  const nairaRate = totalRate * 712;
  const navigate = useNavigate();

  // console.log(handleTotal());

  const handleNavigate = () => {
    if (!currentUser) {
      setShowAuth();
      return;
    } else {
      navigate("/checkout");
      handleScrollTop();
    }
  };

  useEffect(() => {
    if (price === "NGN") {
      setTotalRate(nairaRate);
      setCurrency("₦");
    } else {
      setTotalRate(handleTotal(cartItems));
      setCurrency("$");
    }
  }, [price]);

  useEffect(() => {
    Seo({
      title: "Cart || Buy quality and amazing fashion products and glow",
      metaDescription: " Proceed to checkout items in your fashion cart ",
    });
  }, []);
  // console.log(removeItem(10));
  return (
    <>
      {cartItems.length ? (
        <main className={styles.container}>
          <section className={styles.wrapper}>
            <section className={styles.left}>
              <div className={styles.cartTitle}>
                <h3>Cart ({cartItems.length ? cartItems.length : 0})</h3>
                <span className={styles.resetCart} onClick={() => resetCart()}>
                  reset cart
                </span>
              </div>

              <div className={styles.cardWrapper}>
                {cartItems.map((item, index) => (
                  <CartCard
                    key={item.id}
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
                    {roundNumber(totalRate)}
                  </span>
                </div>
                <span className={styles.notice}>
                  Delivery fees not included yet
                </span>
              </div>
              <span onClick={handleNavigate} className={styles.navigate}>
                PROCEED TO CHECKOUT
              </span>
            </section>
          </section>
          <span onClick={handleNavigate} className={styles.mobileBtn}>
            PROCEED TO CHECKOUT
          </span>
        </main>
      ) : (
        <Empty title="Your Empty is Cart!!" />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  price: selectToggleCurrency,
  cartItems: selectCartItem,
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch: Function) => ({
  setShowAuth: () => dispatch(handleToggleAuth()),
  resetCart: () => dispatch(resetCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
