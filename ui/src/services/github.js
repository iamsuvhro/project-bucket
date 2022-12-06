export const getGithubDetails = async (token, username) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer "+token
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let res = await fetch(
    "https://api.github.com/users/"+username,
    requestOptions
  );

  const data = await res.json();

  const response = {
      "status":res.status,
      "data":data
  }

  

  return response;
};

export const getGithubRepo = async (token, username) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer "+token
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let res = await fetch(
    "https://api.github.com/users/"+username+"/repos",
    requestOptions
  );

  const data = await res.json();
  const items = []
  if (data.length > 0) {
    data.forEach((data) => items.push(data.name));
  }
  const response = {
      "status":res.status,
      "data":items
  }
  return response;
};

