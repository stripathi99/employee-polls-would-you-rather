export const SET_AUTHED_USER = "SET_AUTHED_USER";
// export const RESET_AUTHED_USER = "RESET_AUTHED_USER";

export const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
};

// export const resetAuthedUser = (id) => {
//   return {
//     type: RESET_AUTHED_USER,
//   };
// };
