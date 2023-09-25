import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Register.module.less";
import CustomInput from "../../customInput/CustomInput";
import CustomButton from "../../customButton/CustomButton";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const initialUser = { username: "", email: "", password: "" };

const Register = () => {
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
    if (
      user.email.trim() === "" ||
      user.password.trim() === "" ||
      user.username.trim() === ""
    ) {
      setError("Input cannot be empty");
    }
    setUser(initialUser);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
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

export default Register;
