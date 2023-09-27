import { FormEvent, ChangeEvent, useState } from "react";

import CustomButton from "../customButton/CustomButton";
import CustomInput from "../customInput/CustomInput";
import styles from "./AddressForm.module.less";

const initialUser = { fullName: "", phoneNumber: "", address: "" };

interface AddressProps {
  setShowAddress: (e: boolean) => void;
}

const AddressForm = ({ setShowAddress }: AddressProps) => {
  const [user, setUser] = useState(initialUser);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(initialUser);
    setShowAddress(true);
  };
  return (
    <section onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.titleBox}>
        <h2>Add deliver address details</h2>
        <span>All fields are required</span>
      </div>
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
        <CustomButton type="submit" isAddress>
          Add
        </CustomButton>
      </form>
    </section>
  );
};

export default AddressForm;
