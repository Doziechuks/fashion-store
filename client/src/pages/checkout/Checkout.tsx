/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import styles from "./Checkout.module.less";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";
import { roundNumber } from "../../utility/roundNumber";
import AddressForm from "../../components/addressForm/AddressForm";
import CheckoutButton from "../../components/checkoutButton/CheckoutButton";
interface CheckoutProps {
  price: string;
}
const Checkout = ({ price }: CheckoutProps) => {
  const [rate, setRate] = useState(36);
  const [currency, setCurrency] = useState("$");
  const [showAddress, setShowAddress] = useState(true);
  const nairaRate = rate * 712;

  useEffect(() => {
    if (price === "NGN") {
      setRate(nairaRate);
      setCurrency("₦");
    } else {
      setRate(36);
      setCurrency("$");
    }
  }, [price]);
  return (
    <main className={styles.container}>
      <section className={styles.left}>
        <h2 className={styles.title}>delivery details</h2>
        {showAddress ? (
          <div className={styles.addressBox}>
            <p>Select your delivery address or add a new one</p>
            <div className={styles.addressWrapper}>
              <input type="radio" />
              <div className={styles.addressInfo}>
                <h5>obodozie chuka</h5>
                <span className={styles.address}>
                  15 awa street, park view estate, agoh palace way okota, Lagos
                </span>
                <span>08100278354</span>
              </div>
            </div>
            <CheckoutButton
              onClick={() => setShowAddress(false)}
              icon={<AddOutlinedIcon sx={{ color: "#333" }} />}
              title="add new address"
            />
          </div>
        ) : (
          <AddressForm setShowAddress={setShowAddress} />
        )}
      </section>
      <section className={styles.right}>
        <span className={styles.title}>summary</span>
        <div className={styles.itemSummary}>
          <img
            src="https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="productImage"
          />
          <span>
            1 X {currency}
            {roundNumber(rate)}
          </span>
        </div>
        <div className={styles.itemSummary}>
          <img
            src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="productImage"
          />
          <span>
            2 X {currency}
            {roundNumber(rate)}
          </span>
        </div>
        <div className={styles.total}>
          <span>total</span>
          <span>
            {currency}
            {roundNumber(3000)}
          </span>
        </div>
        <CheckoutButton
          icon={<ChevronRightOutlinedIcon sx={{ color: "#fff" }} />}
          title="proceed to payment"
          isProceed
        />
      </section>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  price: selectToggleCurrency,
});
export default connect(mapStateToProps)(Checkout);
