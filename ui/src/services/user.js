import React,{useContext} from "react";
import { UserContext,useUserContext } from "../context/user/userContext";


const Userlogin = async(username, password) => {

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
  // const { authStatus,setAuthStatus } = useUserContext()
  // if (data == true) {
  //   setAuthStatus(true)
  // }
  // console.log(data)
  return data
  // const Status  = useContext(userContext)
  // console.log(Status.authStatus)


}

export default Userlogin;
