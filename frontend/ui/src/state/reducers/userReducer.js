const initialState = {
  user_id: "",
  last_login: "",
  username: "",
  name: "",
  email: "",
  date_joined: "",
};

const userDetails = (state = initialState, action) => {
  if (action.type === "setUserDetails") {
    return (state = action.payload);
  }
  if (action.type === "logout") {
    return state;
  } else {
    return state;
  }
};
export default userDetails;
