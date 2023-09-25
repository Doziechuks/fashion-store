import { combineReducers } from "redux";
import toggleReducer from "./toggleReducer/toggle.reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["toggle"],
};
const rootReducer = combineReducers({
  toggle: toggleReducer,
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
