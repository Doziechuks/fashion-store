/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import styles from "./Auth.module.less";
import CloseIcon from "@mui/icons-material/Close";
import Register from "./register/Register";
import Signin from "./signIn/Signin";

import { connect } from "react-redux";
import { handleToggleAuth } from "../../redux/toggleReducer/toggle.action";

interface AuthProps {
  setShowAuth: () => void;
}

const Auth = ({ setShowAuth }: AuthProps) => {
  const [curentSlide, setCurrentSlide] = useState(0);

  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        <div className={styles.heading}>
          <h4>welcome onboard</h4>
          <div onClick={() => setShowAuth()}>
            <CloseIcon sx={{ color: "#333" }} />
          </div>
        </div>
        <div className={styles.optionBox}>
          <span
            onClick={() => setCurrentSlide(0)}
            className={curentSlide === 0 ? styles.border : ""}
          >
            SIGN IN
          </span>
          <span
            onClick={() => setCurrentSlide(1)}
            className={curentSlide === 1 ? styles.border : ""}
          >
            REGISTER
          </span>
        </div>
        <div className={styles.box}>
          <div
            className={styles.signIn}
            style={{
              transform:
                curentSlide === 0 ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <Signin />
          </div>
          <div
            className={styles.signIn}
            style={{
              transform:
                curentSlide === 0 ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <Register />
          </div>
        </div>
      </section>
    </main>
  );
};
// eslint-disable-next-line @typescript-eslint/ban-types
const mapDispatchToProps = (dispatch: Function) => ({
  setShowAuth: () => dispatch(handleToggleAuth()),
});
export default connect(null, mapDispatchToProps)(Auth);
