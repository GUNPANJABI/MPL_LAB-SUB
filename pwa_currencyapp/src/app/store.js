import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../features/currency";

const Store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

export default Store;
