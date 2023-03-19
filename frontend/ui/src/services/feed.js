import { BACKEND_URL } from "../config";

export const getCards = async (id) => {
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("username", id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  let res = await fetch("localhost:8000/api/feed/get-cards", requestOptions);

  const data = await res.json();

  return data;
};

export const createCard = async (id, projectTitle, projectDetails, repo) => {
  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("user_id", id);
  formdata.append("projectTitle", projectTitle);
  formdata.append("projectDetails", projectDetails);
  formdata.append("repo", repo);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  let res = await fetch(`${BACKEND_URL}/api/feed/create-cards`, requestOptions);

  const data = await res.json();
  return data;
};
