/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.less";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { handleScrollTop } from "../../utility/scrollToTop";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  handleToggleAuth,
  handleCurrencyToggle,
} from "../../redux/toggleReducer/toggle.action";
import { selectToggleCurrency } from "../../redux/toggleReducer/toggle.selector";

interface AuthProps {
  setShowAuth: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
}
const Navbar = ({ setShowAuth, currency, setCurrency }: AuthProps) => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [pathName, setPathName] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const user: boolean = false;
  const { pathname } = useLocation();

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    setOpen(false);
  };

  const handleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
  };
  // console.log({ currency });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  return (
    <nav className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div
            className={styles.exchange}
            onClick={() => setOpen((prev) => !prev)}
            ref={dropdownRef}
          >
            <span>{currency}</span>
            <div>
              <KeyboardArrowDownIcon />
            </div>
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
        <div className={styles.center}>
          <Link to="/" onClick={handleScrollTop}>
            FASHIONSTORE
          </Link>
        </div>
        <div className={styles.right}>
          <div
            ref={searchRef}
            className={styles.searchBox}
            style={{ width: searchOpen ? "17rem" : "1.6rem" }}
          >
            <input type="text" placeholder="search for product..." />
            <SearchIcon
              sx={{ fontSize: "1.7rem", cursor: "pointer" }}
              onClick={handleSearchOpen}
            />
          </div>
          <span onClick={() => setShowAuth()}>
            {user ? (
              <PersonOutlineIcon sx={{ fontSize: "1.7rem" }} />
            ) : (
              <PersonOffOutlinedIcon sx={{ fontSize: "1.7rem" }} />
            )}
          </span>
          <span>
            <FavoriteBorderIcon sx={{ fontSize: "1.7rem" }} />
          </span>
          <Link to="/cart" className={styles.cartBox} onClick={handleScrollTop}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: "1.7rem" }} />
            <span className={styles.cartCircle}>0</span>
          </Link>
        </div>
      </div>
      {open && (
        <div className={styles.currencyBox}>
          <span onClick={() => handleCurrencyChange("USD")}>USD</span>
          <span onClick={() => handleCurrencyChange("NGN")}>NGN</span>
        </div>
      )}
    </nav>
  );
};
const mapStateToProps = createStructuredSelector({
  currency: selectToggleCurrency,
});
// eslint-disable-next-line @typescript-eslint/ban-types
const mapDispatchToProps = (dispatch: Function) => ({
  setShowAuth: () => dispatch(handleToggleAuth()),
  setCurrency: (e: string) => dispatch(handleCurrencyToggle(e)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
