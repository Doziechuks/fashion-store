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
import { selectUserAuth } from "../../redux/userReducer/user.selector";
import { handleToggleAuth } from "../../redux/toggleReducer/toggle.action";
import { selectCartItem } from "../../redux/cartReducer/cart.selector";
// import { CartItemProps } from "../../redux/cartReducer/cart.type";
import { resetCart } from "../../redux/cartReducer/cart.action";

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
  currentUser: object | null;
  setShowAuth: () => void;
  cartItems: CartItemProps[];
  resetCart: () => void;
  // removeItem: (id: CartItemProps) => void;
}

const Cart = ({
  price,
  currentUser,
  cartItems,
  setShowAuth,
  resetCart,
}: CartProps) => {
  const handleTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  const [totalRate, setTotalRate] = useState(handleTotal());
  const [currency, setCurrency] = useState("$");
  const nairaRate = totalRate * 712;
  const navigate = useNavigate();

  // console.log(handleTotal());

  const handleNavigate = () => {
    if (currentUser === null) {
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
      setTotalRate(handleTotal());
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
  currentUser: selectUserAuth,
  cartItems: selectCartItem,
});
const mapDispatchToProps = (dispatch: Function) => ({
  setShowAuth: () => dispatch(handleToggleAuth()),
  resetCart: () => dispatch(resetCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

// const cartItems: {
//   id: number;
//   title: string;
//   price: number;
//   desc: string;
//   vendor: string;
//   img: string;
// }[] = [
//   {
//     id: 1,
//     title: "man fine plane trouser pant",
//     price: 30,
//     desc: "elit. Quam saepe eos necessitatibus harum cum minima, perferendis porro tenetur",
//     vendor: "my quality seller",
//     img: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     id: 2,
//     title: "man fine stock jeans jacket",
//     price: 500,
//     desc: "elit. Quam saepe eos necessitatibus harum cum minima, perferendis porro tenetur  harum cum minima, perferendis porro tenetur",
//     vendor: "my quality seller",
//     img: "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
// ];
