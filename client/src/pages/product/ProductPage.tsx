/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */
import { useState, useEffect } from "react";
import styles from "./Product.module.less";
import { roundNumber } from "../../utility/roundNumber";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { Seo } from "../../utility/seo";
import useFetch from "../../customHooks/useFetch";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";
import { addItemToCart } from "../../redux/cartReducer/cart.action";

export interface CartItemProps {
  id: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  desc: string;
  vendor: string;
}
interface ProductProp {
  price: string;
  setCartItems: (item: CartItemProps) => void;
}

interface ProductAttributes {
  title: string;
  desc: string;
  vendor: string;
  productType: string;
  tag: string;
  img1: { data: { attributes: { url: string } } };
  img2: { data: { attributes: { url: string } } };
  price: number;
}

interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

const ProductPage = ({ price, setCartItems }: ProductProp) => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetch<ProductData>(
    `/products/${id}?populate=*`
  );

  const [selectedImg, setSelectedImg] = useState("img1");
  const [rate, setRate] = useState(data?.attributes?.price);
  const [currency, setCurrency] = useState("$");
  const [quantity, setQuantity] = useState(1);
  const nairaRate = rate! * 712;
  let currentImg = "";

  const img1 = `http://localhost:1337${data?.attributes?.img1?.data?.attributes?.url}`;
  const img2Array = data?.attributes?.img2?.data;
  const img2 = Array.isArray(img2Array)
    ? `http://localhost:1337${img2Array[0]?.attributes?.url}`
    : "";

  if (selectedImg === "img1") {
    currentImg = img1;
  } else {
    currentImg = img2;
  }

  useEffect(() => {
    if (price === "NGN") {
      setRate(nairaRate);
      setCurrency("₦");
    } else {
      setRate(data?.attributes?.price);
      setCurrency("$");
    }
  }, [price]);

  const title = data?.attributes?.title;
  // console.log(title);

  useEffect(() => {
    Seo({
      title: `${title ? title : "Fashion store quality product"}`,
      metaDescription:
        "Buy quality and pocket friendly fashion products at fashionstore ",
    });
  }, [title]);

  // console.log(cartItems);
  if (error) return <h1>Something went wrong</h1>;
  if (isLoading) return <Spinner />;
  return (
    <main className={styles.container}>
      <section className={styles.left}>
        <div className={styles.thumbnail}>
          <img
            src={img1}
            alt="first thumbnail"
            onClick={() => setSelectedImg("img1")}
            style={{
              border: selectedImg === "img1" ? "2px #0582ff solid" : "none",
            }}
          />
          <img
            src={img2}
            alt="second thumbnail"
            onClick={() => setSelectedImg("img2")}
            style={{
              border: selectedImg === "img2" ? "2px #0582ff solid" : "none",
            }}
          />
        </div>
        <div className={styles.mainImage}>
          <img src={currentImg} alt="product main" />
        </div>
      </section>
      <section className={styles.right}>
        <div className={styles.top}>
          <h2>{data?.attributes?.title}</h2>
          <span className={styles.price}>
            {currency}
            {roundNumber(rate!)}
          </span>
          <p className={styles.desc}>{data?.attributes?.desc}</p>
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
          <button
            className={styles.addToCart}
            onClick={() =>
              setCartItems({
                id: data ? data.id : 0,
                title: data ? data?.attributes?.title : "",
                img: img1,
                desc: data ? data?.attributes?.vendor : "",
                price: data ? data?.attributes?.price : 0,
                vendor: data ? data?.attributes?.vendor : "",
                quantity,
              })
            }
          >
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
          <div>vendor: {data?.attributes?.vendor}</div>
          <div>product type: {data?.attributes?.productType}</div>
          <div>tag: {data?.attributes?.tag}</div>
        </div>
      </section>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  price: selectToggleCurrency,
});
const mapDispatchToProps = (dispatch: Function) => ({
  setCartItems: (item: CartItemProps) => dispatch(addItemToCart(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
