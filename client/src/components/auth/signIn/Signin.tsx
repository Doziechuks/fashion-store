import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Signin.module.less";
import CustomInput from "../../customInput/CustomInput";
import CustomButton from "../../customButton/CustomButton";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const initialUser = { identifier: "", password: "" };
const Signin = () => {
  const [user, setUser] = useState(initialUser);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.identifier.trim() === "") {
      setError("Input cannot be empty");
    }
    setUser(initialUser);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
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
          type="password"
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

export default Signin;
