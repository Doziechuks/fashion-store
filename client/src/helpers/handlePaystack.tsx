/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { resetCart } from "../redux/cartReducer/cart.action";

interface PaymentProps {
  total: number;
  user: string;
  resetCart: () => void;
}

const HandlePayment = ({ total, user, resetCart }: PaymentProps) => {
  const cash = total * 100;
  const toNaira = cash * 712;
  const publicKey = import.meta.env.VITE_REACT_APP_PAYSTACK_TOKEN;
  const navigate = useNavigate();

  const handleSuccess = (reference: any) => {
    console.log(reference);
    alert("Payment successful");
    navigate("/");
    resetCart();
  };

  const handleClosedSession = () => {
    console.log("session closed");
    alert("You are about to close this payment session!!");
  };

  const config = {
    reference: new Date().getTime().toString(),
    amount: toNaira,
    publicKey: publicKey,
    email: user,
  };

  const componentProps = {
    ...config,
    text: "Make Payment",
    onSuccess: (reference: any) => handleSuccess(reference),
    onClose: handleClosedSession,
  };

  return <PaystackButton {...componentProps} />;
};
const mapDispatchToProps = (dispatch: Function) => ({
  resetCart: () => dispatch(resetCart()),
});
export default connect(null, mapDispatchToProps)(HandlePayment);
