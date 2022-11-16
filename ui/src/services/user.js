import React from "react";
import store from "../state/store";
import {login} from "../state/Auth/actions";


async function userlogin(username, password) {
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

  let res = await fetch("http://localhost:8000/api/users/account/login/",
  requestOptions)

  const data = await res.json()
  console.log(data)

  

}

export default userlogin;
