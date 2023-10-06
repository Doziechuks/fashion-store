import { combineReducers } from "redux";
import toggleReducer from "./toggleReducer/toggle.reducer";
import userReducer from "./userReducer/user.reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["toggle", "user"],
};
const rootReducer = combineReducers({
  toggle: toggleReducer,
  user: userReducer,
});
export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

// const rootReducer = combineReducers({
//   user: userReducer,
//   cart: cartReducer,
//   directory: directoryReducer,
//   shop: shopReducer,
// });
// export default persistReducer(persistConfig, rootReducer);
