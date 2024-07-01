import { createSlice } from "@reduxjs/toolkit";

const datafromlocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem("user")) || {
      user: null,
      isAuthState: false,
    }
  );
};
const saveToLocalStorege = (state) => {
  localStorage.setItem("user", JSON.stringify(state));
};

const userSlice = createSlice({
  name: "user",
  initialState: datafromlocalStorage(),
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      saveToLocalStorege(state);
    },
    logout: (state) => {
      state.user = null;
      saveToLocalStorege(state);
    },
    isAuthChange: (state) => {
      state.isAuthState = true;
      saveToLocalStorege(state);
    },
  },
});

export const { isAuthChange, login, logout } = userSlice.actions;
export default userSlice.reducer;
