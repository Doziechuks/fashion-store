/* eslint-disable react-refresh/only-export-components */
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Signin.module.less";
import CustomInput from "../../customInput/CustomInput";
import CustomButton from "../../customButton/CustomButton";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { axiosRequest } from "../../../helpers/axiosRequest";

import { connect } from "react-redux";
import { handleUserAuth } from "../../../redux/userReducer/user.action";
import { handleToggleAuth } from "../../../redux/toggleReducer/toggle.action";
import Loader from "../../../utility/loader/Loader";

const initialUser = { identifier: "", password: "" };
interface CurrentUser {
  token: string;
  email: string;
}

interface UserState {
  // [x: string]: string;
  token: string;
  userEmail: string;
  name: string;
  userAuth: null | CurrentUser;
}

interface UserProps {
  setCurrentUser: (user: UserState) => void;
  setShowAuth: () => void;
}

const Signin = ({ setCurrentUser, setShowAuth }: UserProps) => {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `/auth/local`;
    try {
      if (user.identifier.trim() === "" || user.password.trim() === "") {
        setError("Input cannot be empty");
        return;
      }
      setIsLoading(true);
      const { data } = await axiosRequest.post(url, user);
      if (data.jwt) {
        setCurrentUser({
          name: data.user.username,
          userEmail: data.user.email,
          token: data.jwt,
          userAuth: null,
        });
        setShowAuth();
        setUser(initialUser);
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        setError("something went wrong");
      } else if (error instanceof Error) {
        if (error.message === "Request failed with status code 400") {
          setError("Invalid email or password");
        } else {
          setError("something went wrong");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleForgotPassword = async () => {
    const url = "/auth/forgot-password";
    try {
      if (user.identifier.trim() === "") {
        setError("Please provide your email");
      }
      setIsLoading(true);
      const res = await axiosRequest.post(url, {
        email: user.identifier,
      });
      if (res) {
        console.log(res);
      } else {
        console.log("no response");
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        setError("something went wrong");
        console.log(error);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setIsLoading(false);
      setUser(initialUser);
    }
  };
  // console.log({ currentUser });

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {isLoading && <Loader />}
      {error && <span className={styles.error}>{error}</span>}
      <CustomInput
        placeholder="Email"
        name="identifier"
        type="email"
        value={user.identifier}
        onChange={handleChange}
        required
      />
      <div className={styles.passwordBox}>
        <CustomInput
          placeholder="Password"
          name="password"
          type={isVisible ? "text" : "password"}
          value={user.password}
          onChange={handleChange}
          required
          isLast
        />
        <span>
          {isVisible ? (
            <VisibilityOutlinedIcon
              sx={{ color: "#333", cursor: "pointer" }}
              onClick={() => setIsVisible((prev) => !prev)}
            />
          ) : (
            <VisibilityOffOutlinedIcon
              sx={{ color: "#333", cursor: "pointer" }}
              onClick={() => setIsVisible((prev) => !prev)}
            />
          )}
        </span>
      </div>
      <CustomButton>SIGN IN</CustomButton>
      <div className={styles.forgotPassword} onClick={handleForgotPassword}>
        forgot password?
      </div>
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
const mapDispatchToProps = (dispatch: Function) => ({
  setCurrentUser: (user: UserState) => dispatch(handleUserAuth(user)),
  setShowAuth: () => dispatch(handleToggleAuth()),
});
export default connect(null, mapDispatchToProps)(Signin);
