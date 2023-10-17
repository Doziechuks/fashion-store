/* eslint-disable react-refresh/only-export-components */
import { FormEvent, ChangeEvent, useState } from "react";

import CustomButton from "../customButton/CustomButton";
import CustomInput from "../customInput/CustomInput";
import styles from "./AddressForm.module.less";
// import { axiosRequest } from "../../helpers/axiosRequest";
import axios from "axios";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserAuth } from "../../redux/userReducer/user.selector";
import Loader from "../../utility/loader/Loader";

const initialUser = { fullName: "", phoneNumber: "", address: "" };

interface CurrentUser {
  token: string;
  email: string;
}
interface UserState {
  token: UserState;
  userAuth: null | CurrentUser;
}
interface AddressProps {
  setShowAddress: (e: boolean) => void;
  currentUser: UserState;
  setCheckNewAddress: (prop: string) => void;
}

const AddressForm = ({
  setShowAddress,
  currentUser,
  setCheckNewAddress,
}: AddressProps) => {
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
    const url = "http://localhost:1337/api/addresses";
    const name = user.fullName.trim();
    const phoneNumber = user.address.trim();
    const address = user.phoneNumber.trim();
    const userToken = currentUser && currentUser.token;
    const authToken = "bearer" + userToken;
    const headers = {
      Authorization: authToken,
    };

    try {
      if (name === "" || phoneNumber === "" || address === "") {
        setError("Input cannot be empty");
        return;
      }
      setIsLoading(true);
      const res = await axios.post(url, { data: user }, { headers });
      if (res) {
        // console.log(res);
        setCheckNewAddress("new");
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        setError("something went wrong");
      } else if (error instanceof Error) {
        setError("something went wrong");
        console.log(error.message);
      }
    } finally {
      setIsLoading(false);
      setUser(initialUser);
      setShowAddress(true);
    }
  };

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
  currentUser: selectUserAuth,
});
export default connect(mapStateToProps)(AddressForm);
