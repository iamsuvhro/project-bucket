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
