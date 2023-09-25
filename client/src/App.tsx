/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import "./App.less";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectToggleAuth } from "./redux/toggleReducer/toggle.selector";

// utility components
import Spinner from "./components/spinner/Spinner";
import Navbar from "./components/navbar/Navbar";
import MobileNavbar from "./components/mobileNavbar/MobileNavbar";
import Footer from "./components/footer/Footer";
import MobileFooter from "./components/mobileFooter/MobileFooter";
import NewLetter from "./components/newsLetter/NewLetter";
import ScrollToTopBtn from "./components/scrollToTopBtn/ScrollToTopBtn";
import Auth from "./components/auth/Auth";

// public routes
const HomePage = lazy(() => import("./pages/home/HomePage"));
const ProductCategories = lazy(
  () => import("./pages/productCategories/ProductCategories")
);
const ProductPage = lazy(() => import("./pages/product/ProductPage"));
const CartPage = lazy(() => import("./pages/cart/Cart"));
const CheckoutPage = lazy(() => import("./pages/checkout/Checkout"));

interface AuthProps {
  showAuth: boolean;
}
function App({ showAuth }: AuthProps) {
  // console.log({ showAuth });

  return (
    <div
      style={{
        height: showAuth ? "100vh" : "",
        overflow: showAuth ? "hidden" : "",
      }}
    >
      {showAuth && <Auth />}
      <ScrollToTopBtn />
      <Navbar />
      <MobileNavbar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route caseSensitive path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:id" element={<ProductCategories />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Suspense>
      <NewLetter />
      <Footer />
      <MobileFooter />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  showAuth: selectToggleAuth,
});
export default connect(mapStateToProps)(App);
