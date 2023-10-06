/* eslint-disable react-refresh/only-export-components */
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Signin.module.less";
import CustomInput from "../../customInput/CustomInput";
import CustomButton from "../../customButton/CustomButton";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { axiosRequest } from "../../../helpers/axiosRequest";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserAuth } from "../../../redux/userReducer/user.selector";
import { handleUserAuth } from "../../../redux/userReducer/user.action";
import { handleToggleAuth } from "../../../redux/toggleReducer/toggle.action";

const initialUser = { identifier: "", password: "" };

interface UserProps {
  currentUser: object | null;
  setCurrentUser: (user: object) => void;
  setShowAuth: () => void;
}

const Signin = ({ currentUser, setCurrentUser, setShowAuth }: UserProps) => {
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
        });
        setShowAuth();
      }

      // console.log(res);
    } catch (error: unknown) {
      if (typeof error === "string") {
        // console.log(error);
        setError("something went wrong");
        // setCurrentUser({});
      } else if (error instanceof Error) {
        if (error.message === "Request failed with status code 400") {
          setError("Invalid email or password");
        } else {
          setError("something went wrong");
        }
        // setCurrentUser({});
        // console.log(error);
      }
    } finally {
      setIsLoading(false);
      setUser(initialUser);
    }
  };
  console.log({ currentUser });

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {isLoading && <span>loading...</span>}
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
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUserAuth,
});
// eslint-disable-next-line @typescript-eslint/ban-types
const mapDispatchToProps = (dispatch: Function) => ({
  setCurrentUser: (user: object) => dispatch(handleUserAuth(user)),
  setShowAuth: () => dispatch(handleToggleAuth()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
