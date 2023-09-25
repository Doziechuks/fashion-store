import { legacy_createStore } from "redux";
import { persistStore } from "redux-persist";
// import logger from "redux-logger";
import rootReducer from "./rootReducer";

// const middlewares = [];
// if (process.env.NODE_ENV === "development") {
//   middlewares.push(logger);
// }

export const store = legacy_createStore(rootReducer);
export const persistor = persistStore(store);
//  applyMiddleware(...middlewares);applyMiddleware
