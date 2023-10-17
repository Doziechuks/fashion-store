/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaystackButton } from "react-paystack";

interface PaymentProps {
  total: number;
  user: string;
}

const HandlePayment = ({ total, user }: PaymentProps) => {
  const cash = total * 100;
  const toNaira = cash * 712;
  const publicKey = "pk_test_28ace95a0c5d19ba9a4d635c7854a2c8ef0e873d";

  const handleSuccess = (reference: any) => {
    console.log(reference);
    alert("Payment successful");
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

export default HandlePayment;
