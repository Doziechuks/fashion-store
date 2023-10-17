/* eslint-disable react-refresh/only-export-components */
import styles from "./Payment.module.less";
import HandlePayment from "../../helpers/handlePaystack";
import { handleTotal } from "../../utility/handleTotal";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";
import { selectCartItem } from "../../redux/cartReducer/cart.selector";
import { selectUserAuth } from "../../redux/userReducer/user.selector";
import { roundNumber } from "../../utility/roundNumber";

interface CartItemProps {
  id?: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  desc: string;
  vendor: string;
}
interface CurrentUser {
  token: string;
  email: string;
}

interface UserState {
  // [x: string]: string;
  token: string;
  userEmail: string;
  userAuth: null | CurrentUser;
}

interface PaymentProps {
  price: string;
  cartItems: CartItemProps[];
  currentUser: UserState;
}
const PaymentPage = ({ cartItems, currentUser }: PaymentProps) => {
  const total = handleTotal(cartItems);
  const user = currentUser?.userEmail;

  // console.log({ total, user });

  return (
    <main className={styles.container}>
      <p>
        Click on the button to complete payent of{" "}
        <span>₦{roundNumber(total * 712)}</span>
      </p>
      <div className={styles.btn}>
        <HandlePayment total={total} user={user} />
      </div>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  price: selectToggleCurrency,
  cartItems: selectCartItem,
  currentUser: selectUserAuth,
});
export default connect(mapStateToProps)(PaymentPage);
