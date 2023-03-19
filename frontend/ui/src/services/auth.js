import { BACKEND_URL } from "../config";

export const Userlogin = async (username, password) => {
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  let res = await fetch(
    `${BACKEND_URL}/api/users/account/login/`,
    requestOptions
  );

  const data = await res.json();

  return data;
};

export const CreateUser = async (
  username,
  password,
  email,
  lastname,
  firstname
) => {
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("fname", firstname);
  formdata.append("lname", lastname);
  formdata.append("email", email);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  let res = await fetch(
    `${BACKEND_URL}/api/users/account/create/`,
    requestOptions
  );

  const data = await res.json();

  return data;
};
