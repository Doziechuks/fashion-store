import { combineReducers } from "redux";
import toggleReducer from "./toggleReducer/toggle.reducer";
import userReducer from "./userReducer/user.reducer";
import cartReducer from "./cartReducer/cart.reducer";
import addressReducer from "./addressReducer/address.reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["toggle", "user", "cart", "address"],
};
const rootReducer = combineReducers({
  toggle: toggleReducer,
  cart: cartReducer,
  address: addressReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
