/* eslint-disable react-refresh/only-export-components */
import { FormEvent, ChangeEvent, useState, useEffect } from "react";

import CustomButton from "../customButton/CustomButton";
import CustomInput from "../customInput/CustomInput";
import styles from "./AddressForm.module.less";
// import { axiosRequest } from "../../helpers/axiosRequest";
import axios from "axios";

import Loader from "../../utility/loader/Loader";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/userReducer/user.selector";
import { CurrentUserProps } from "../../redux/userReducer/user.type";

const initialUser = {
  fullName: "",
  phoneNumber: "",
  address: "",
};

interface AddressProps {
  setShowAddress: (e: boolean) => void;
  setCheckNewAddress: (prop: string) => void;
  currentUser: CurrentUserProps | null;
}

const AddressForm = (props: AddressProps) => {
  const { setShowAddress, setCheckNewAddress, currentUser } = props;

  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `http://localhost:1337/api/addresses`;
    const name = user.fullName.trim();
    const phoneNumber = user.address.trim();
    const address = user.phoneNumber.trim();
    const userToken = currentUser?.token;
    const authToken = "bearer" + userToken;
    const headers = {
      Authorization: authToken,
    };

    try {
      if (name === "" || phoneNumber === "" || address === "") {
        setError("Input cannot be empty");
        return;
      } else if (!currentUser?.token) {
        setError("Please make sure you are signed in");
        return;
      } else {
        setIsLoading(true);
        const res = await axios.post(
          url,
          {
            data: {
              ...user,
              userId: String(currentUser?.id),
            },
          },
          { headers }
        );
        if (res) {
          // console.log(res);
          setCheckNewAddress("new");
        }
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        setError("something went wrong");
        // console.log(error);
      } else if (error instanceof Error) {
        setError("something went wrong");
        // console.log(error.message);
      }
    } finally {
      setIsLoading(false);
      setUser(initialUser);
      setShowAddress(true);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(timerId);
  }, []);

  // console.log({ currentUser });

  return (
    <section onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.titleBox}>
        <h2>Add deliver address details</h2>
        <span>All fields are required</span>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
      {isLoading && <Loader />}
      <form className={styles.formWrapper}>
        <div className={styles.addressBox}>
          <CustomInput
            type="text"
            name="fullName"
            value={user.fullName}
            placeholder="Full Name"
            onChange={handleChange}
            required
            isLast
          />
          <CustomInput
            type="number"
            name="phoneNumber"
            value={user.phoneNumber}
            placeholder="Phone Number"
            onChange={handleChange}
            required
            isLast
          />
        </div>
        <div className={styles.addressBox}>
          <CustomInput
            type="text"
            name="address"
            value={user.address}
            placeholder="Enter Your Address"
            onChange={handleChange}
            required
            isLast
          />
        </div>
        <CustomButton isAddress>Add</CustomButton>
      </form>
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(AddressForm);
