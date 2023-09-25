/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import styles from "./Product.module.less";
import { roundNumber } from "../../utility/roundNumber";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { Seo } from "../../utility/seo";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";

interface ProductProp {
  price: string;
}
const img: string[] = [
  "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const ProductPage = ({ price }: ProductProp) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [rate, setRate] = useState(30);
  const [currency, setCurrency] = useState("$");
  const [quantity, setQuantity] = useState(1);
  const nairaRate = rate * 712;

  useEffect(() => {
    if (price === "NGN") {
      setRate(nairaRate);
      setCurrency("₦");
    } else {
      setRate(30);
      setCurrency("$");
    }
  }, [price]);

  useEffect(() => {
    Seo({
      title: "Fine boy packet shirt",
      metaDescription:
        "Buy quality and pocket friendly fashion products at fashionstore ",
    });
  }, []);
  return (
    <main className={styles.container}>
      <section className={styles.left}>
        <div className={styles.thumbnail}>
          <img
            src={img[0]}
            alt="first thumbnail"
            onClick={() => setSelectedImg(0)}
            style={{ border: selectedImg === 0 ? "2px #0582ff solid" : "none" }}
          />
          <img
            src={img[1]}
            alt="second thumbnail"
            onClick={() => setSelectedImg(1)}
            style={{ border: selectedImg === 1 ? "2px #0582ff solid" : "none" }}
          />
        </div>
        <div className={styles.mainImage}>
          <img src={img[selectedImg]} alt="product main" />
        </div>
      </section>
      <section className={styles.right}>
        <div className={styles.top}>
          <h2>fine boy packet shirt</h2>
          <span className={styles.price}>
            {currency}
            {roundNumber(rate)}
          </span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ut
            sint culpa tempora amet id!
          </p>
          <div className={styles.quantity}>
            <button
              disabled={quantity <= 1 ? true : false}
              onClick={() => setQuantity((prev) => prev - 1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>
          <button className={styles.addToCart}>
            <AddShoppingCartIcon sx={{ color: "#fff" }} />
            <span>ADD TO CART</span>
          </button>
          <div className={styles.box}>
            <div>
              <FavoriteBorderIcon
                sx={{ marginRight: "1rem", color: "#0582ff" }}
              />
              <span>ADD TO WISH LIST</span>
            </div>
            <div>
              <BalanceIcon sx={{ marginRight: "1rem", color: "#0582ff" }} />
              <span>ADD TO COMPARE</span>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>vendor: Lorem, ipsum dolor.</div>
          <div>product type: t-shirt</div>
          <div>tag: t-shirt, women, top</div>
        </div>
      </section>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  price: selectToggleCurrency,
});
export default connect(mapStateToProps)(ProductPage);
