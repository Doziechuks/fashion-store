/* eslint-disable react-refresh/only-export-components */
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Register.module.less";
import CustomInput from "../../customInput/CustomInput";
import CustomButton from "../../customButton/CustomButton";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { axiosRequest } from "../../../helpers/axiosRequest";

import { connect } from "react-redux";
import { handleToggleAuth } from "../../../redux/toggleReducer/toggle.action";
import { handleUserAuth } from "../../../redux/userReducer/user.action";
import Loader from "../../../utility/loader/Loader";
import { CurrentUserProps } from "../../../redux/userReducer/user.type";

const initialUser = { username: "", email: "", password: "" };

interface UserProps {
  setShowAuth: () => void;
  setCurrentUser: (user: CurrentUserProps | null) => void;
}
const Register = ({ setShowAuth, setCurrentUser }: UserProps) => {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    const url = `/auth/local/register`;
    try {
      if (
        user.email.trim() === "" ||
        user.password.trim() === "" ||
        user.username.trim() === ""
      ) {
        setError("Input cannot be empty");
        return;
      }
      setIsLoading(true);
      const { data } = await axiosRequest.post(url, user);
      if (data) {
        // console.log(data);
        setCurrentUser({
          token: data.jwt,
          id: data.user.id,
          name: data.user.username,
          userEmail: data.user.email,
        });
        setShowAuth();
      }

      // console.log(res.data);
    } catch (error: unknown) {
      if (typeof error === "string") {
        setError("something went wrong");
        console.log(error);
      } else if (error instanceof Error) {
        if (error.message === "Request failed with status code 400") {
          setError("Email or Username are already taken");
        } else {
          setError("something went wrong");
        }
        // console.log(error.message);
      }
    } finally {
      setIsLoading(false);
      setUser(initialUser);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {isLoading && <Loader />}
      {error && <span className={styles.error}>{error}</span>}
      <CustomInput
        placeholder="Username"
        name="username"
        type="text"
        value={user.username}
        onChange={handleChange}
        required
      />
      <CustomInput
        placeholder="Email"
        name="email"
        type="email"
        value={user.email}
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
      <CustomButton type="submit">REGISTER</CustomButton>
    </form>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
const mapDispatchToProps = (dispatch: Function) => ({
  setCurrentUser: (user: CurrentUserProps | null) =>
    dispatch(handleUserAuth(user)),
  setShowAuth: () => dispatch(handleToggleAuth()),
});
export default connect(null, mapDispatchToProps)(Register);
