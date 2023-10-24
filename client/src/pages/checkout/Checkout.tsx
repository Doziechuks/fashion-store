/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import styles from "./Checkout.module.less";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";
import { roundNumber } from "../../utility/roundNumber";
import AddressForm from "../../components/addressForm/AddressForm";
import CheckoutButton from "../../components/checkoutButton/CheckoutButton";
import { selectCartItem } from "../../redux/cartReducer/cart.selector";
import CheckoutBox from "../../components/checkoutBox/CheckoutBox";
import { axiosRequest } from "../../helpers/axiosRequest";
import { handleTotal } from "../../utility/handleTotal";
import Spinner from "../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/userReducer/user.selector";
import { CurrentUserProps } from "../../redux/userReducer/user.type";
import { Seo } from "../../utility/seo";

interface CartItemProps {
  id?: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  desc: string;
  vendor: string;
}
interface AttributeProps {
  fullName: string;
  address: string;
  phoneNumber: number;
}
interface Address {
  id: number;
  attributes: AttributeProps;
}

interface CheckoutProps {
  price: string;
  cartItems: CartItemProps[];
  currentUser: CurrentUserProps | null;
}
const Checkout = ({ price, cartItems, currentUser }: CheckoutProps) => {
  const [totalRate, setTotalRate] = useState(handleTotal(cartItems));
  const [currency, setCurrency] = useState("$");
  const [showAddress, setShowAddress] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [addressResult, setAddressResult] = useState<Address[]>([]);
  const [checkNewAddress, setCheckNewAddress] = useState("");
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(0);
  const nairaRate = totalRate * 712;
  const navigate = useNavigate();
  // const [testUser] = useState("user");

  const handleDeletAddress = async (id: number) => {
    const url = `/addresses/${id}`;
    const userToken = currentUser?.token;
    const headers = {
      Authorization: "bearer" + userToken,
    };
    try {
      const res = await axiosRequest.delete(url, { headers });
      if (res) {
        // console.log(res);
        setCheckNewAddress("removed");
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        setError("Something went wrong");
      } else if (error instanceof Error) {
        setError("Something went wrong");
        console.log(error.message);
      }
    } finally {
      setError("");
    }
  };

  const handlePayment = () => {
    if (selected === 0) {
      setError("Please add or select an address");
      return;
    } else {
      navigate("/payment");
    }
  };

  useEffect(() => {
    const handleFetch = async () => {
      const url = `/addresses?[filters][userId][$eq]=${String(
        currentUser?.id
      )}`;
      const userToken = currentUser?.token;
      const headers = {
        Authorization: "bearer" + userToken,
      };
      try {
        if (currentUser?.token) {
          setIsLoading(true);
          const { data } = await axiosRequest.get(url, { headers });
          if (data) {
            // const filteredAddress = data.data.filter(
            //   (item) => item.attributes.user === String(currentUser.id)
            // );
            setAddressResult(data.data);
          }
        } else {
          setError("Please make sure you are signed in");
          return;
        }
      } catch (error: unknown) {
        if (typeof error === "string") {
          setError("something went wrong");
          // console.log(error);
        } else if (error instanceof Error) {
          // console.log(error.message);
          setError("something went wrong");
        }
      } finally {
        setIsLoading(false);
        setCheckNewAddress("");
      }
    };
    handleFetch();
    return () => {};
  }, [currentUser, checkNewAddress]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timerId);
  }, []);

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
      title: "Checkout || Proceed to make payments",
      metaDescription:
        "A swift and easy way to checkou and pay for purchased products at fashionstore",
    });
  }, []);

  // console.log({ currentUser });
  if (isLoading) return <Spinner />;

  return (
    <main className={styles.container}>
      <section className={styles.left}>
        <h2 className={styles.title}>delivery details</h2>
        {error && <div className={styles.errorText}>{error}</div>}
        {showAddress ? (
          addressResult.length ? (
            <div className={styles.addressBox}>
              <p>Select your delivery address or add a new one</p>
              {addressResult.map((item) => (
                <div className={styles.addressWrapper} key={item.id}>
                  <input
                    type="radio"
                    id={item.id.toString()}
                    value={item.id}
                    name="address"
                    onChange={() => setSelected(item.id)}
                  />
                  <div className={styles.addressInfo}>
                    <h5>{item.attributes.fullName}</h5>
                    <span className={styles.address}>
                      {item.attributes.address}
                    </span>
                    <span>{item.attributes.phoneNumber}</span>
                  </div>
                  <div
                    className={styles.delete}
                    onClick={() => handleDeletAddress(item.id)}
                  >
                    <DeleteOutlineOutlinedIcon sx={{ fontSize: "1.5rem" }} />
                  </div>
                </div>
              ))}

              <CheckoutButton
                onClick={() => setShowAddress(false)}
                icon={<AddOutlinedIcon sx={{ color: "#333" }} />}
                title="add new address"
              />
            </div>
          ) : (
            <div className={styles.noAddress}>
              <span className={styles.text}>
                You do not have any delivery address
              </span>
              <CheckoutButton
                onClick={() => setShowAddress(false)}
                icon={<AddOutlinedIcon sx={{ color: "#333" }} />}
                title="add new address"
              />
            </div>
          )
        ) : (
          <AddressForm
            setShowAddress={setShowAddress}
            setCheckNewAddress={setCheckNewAddress}
          />
        )}
      </section>
      <section className={styles.right}>
        <span className={styles.title}>summary</span>
        <div className={styles.itemBox}>
          {cartItems.map((item) => (
            <CheckoutBox key={item.id} item={item} />
          ))}
        </div>
        <div className={styles.total}>
          <span>total</span>
          <span>
            {currency}
            {roundNumber(totalRate)}
          </span>
        </div>
        <CheckoutButton
          onClick={handlePayment}
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
  cartItems: selectCartItem,
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(Checkout);
