import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  base: "USD",
  target: "INR",
  amount: "",
  convertedAmount: "",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setFrom(state, action) {
      state.base = action.payload;
    },
    setTo(state, action) {
      state.target = action.payload;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setCA(state, action) {
      state.convertedAmount = action.payload;
    },
  },
});

export const { setFrom, setTo, setAmount, setCA } =
  currencySlice.actions;
export default currencySlice.reducer;
