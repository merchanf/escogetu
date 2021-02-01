import React, { createContext, useReducer } from "react";

let globalInfo = createContext();

let reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_PULLET":
      return { ...state, currentPullet: action.currentPullet };
    case "SET_IS_ADMIN":
      return { ...state, isAdmin: action.payload };
    case "SET_USER":
      return { ...state, ...action.payload };
    case "RESET_VALUES":
      return {};
    default:
      return { ...state };
  }
};

const GlobalInfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <globalInfo.Provider value={{ state, dispatch }}>
      {children}
    </globalInfo.Provider>
  );
};

export default globalInfo;
export { GlobalInfoProvider };
