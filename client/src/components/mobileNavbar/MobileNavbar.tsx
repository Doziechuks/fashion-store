/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef } from "react";
import styles from "./MobileNavbar.module.less";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { handleScrollTop } from "../../utility/scrollToTop";
import checkedUser from "../../assets/User_Check.svg";
import userClose from "../../assets/User_Close.svg";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  handleCurrencyToggle,
  handleToggleAuth,
} from "../../redux/toggleReducer/toggle.action";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";
import { selectUserAuth } from "../../redux/userReducer/user.selector";
import { handleUserAuth } from "../../redux/userReducer/user.action";
import { selectCartItem } from "../../redux/cartReducer/cart.selector";

interface CartItemProps {
  id?: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  desc: string;
  vendor: string;
}
interface AuthProps {
  setShowAuth: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
  currentUser: object | null;
  setCurrentUser: (user: object | null) => void;
  cartItems: CartItemProps[];
}
const MobileNavbar = ({
  setCurrency,
  setShowAuth,
  currency,
  currentUser,
  setCurrentUser,
  cartItems,
}: AuthProps) => {
  // const [currency, setCurrency] = useState("USD");
  const [open, setOpen] = useState(false);
  const [pathName, setPathName] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const user: boolean = false;
  const { pathname } = useLocation();

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    // setOpen(false);
  };
  const handleLogOut = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setPathName(pathname);
  }, [pathname]);

  // console.log({ open });

  return (
    <nav className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          {currentUser !== null ? (
            <div onClick={handleLogOut} className={styles.logout}>
              <img src={checkedUser} alt="user present" />
              <span> log out</span>
            </div>
          ) : (
            <span onClick={() => setShowAuth()}>
              <img src={userClose} alt="no user" />
            </span>
          )}
          {/* <div onClick={() => setShowAuth()}>
            {user ? (
              <PersonOutlineIcon sx={{ fontSize: "1.7rem" }} />
            ) : (
              <PersonOffOutlinedIcon sx={{ fontSize: "1.7rem" }} />
            )}
          </div> */}
          <div className={styles.search}>
            <SearchIcon />
          </div>
        </div>
        <div className={styles.center}>
          <Link to="/" onClick={handleScrollTop}>
            FASHIONSTORE
          </Link>
        </div>
        <div className={styles.right}>
          <div>
            <FavoriteBorderIcon />
          </div>
          <Link to="/cart" className={styles.cartBox} onClick={handleScrollTop}>
            <ShoppingCartOutlinedIcon />
            <span className={styles.cartCircle}>
              {cartItems.length ? cartItems.length : 0}
            </span>
          </Link>
        </div>
      </div>
      <div className={styles.wrapper2}>
        <div
          className={styles.exchange}
          onClick={() => setOpen((prev) => !prev)}
          ref={dropdownRef}
        >
          <span>{currency}</span>
          <div>
            <KeyboardArrowDownIcon />
          </div>
          {open && (
            <div className={styles.currencyBox}>
              <span onClick={() => handleCurrencyChange("USD")}>USD</span>
              <span onClick={() => handleCurrencyChange("NGN")}>NGN</span>
            </div>
          )}
        </div>
        <Link
          to="/category/women"
          style={{
            borderBottom: pathName.includes("/women") ? "1px solid #000" : "",
          }}
          onClick={handleScrollTop}
        >
          Women
        </Link>
        <Link
          to="/category/men"
          style={{
            borderBottom: pathName.includes("/men") ? "1px solid #000" : "",
          }}
          onClick={handleScrollTop}
        >
          Men
        </Link>
        <Link
          to="/category/children"
          style={{
            borderBottom: pathName.includes("/children")
              ? "1px solid #000"
              : "",
          }}
          onClick={handleScrollTop}
        >
          Children
        </Link>
      </div>
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  currency: selectToggleCurrency,
  currentUser: selectUserAuth,
  cartItems: selectCartItem,
});
// eslint-disable-next-line @typescript-eslint/ban-types
const mapDispatchToProps = (dispatch: Function) => ({
  setShowAuth: () => dispatch(handleToggleAuth()),
  setCurrency: (e: string) => dispatch(handleCurrencyToggle(e)),
  setCurrentUser: (user: object | null) => dispatch(handleUserAuth(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MobileNavbar);
