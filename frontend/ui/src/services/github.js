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
    "https://api.github.com/users/"+username+"/repos?per_page=100",
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

export const getCards = async(id) => {

  var myHeaders = new Headers();
  var formdata = new FormData();
  formdata.append("username", id);

  var requestOptions = {
    method: "POST",
    body: formdata,
    headers: myHeaders,
    redirect: "follow",
  };

  let res = await fetch("localhost:8000/api/feed/get-cards?username="+id,
  requestOptions)

  const data = await res.json()

  return data

}


export const getGitRepoIssues = async (username,token,repository) => {
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
    "https://api.github.com/repos/"+username+"/project-bucket/issues",
    requestOptions
  );
  const data = await res.json();
  
  const dictData = []
  
  data.map((data)=>(
    dictData.push({
      'issueTitle':data.title,
      'isssueBody':data.body,
      'issueNumber':data.number,
      'issueState':data.state,
      'issueUrl':data.url,
      'issueLabel':data.labels
    })
  ))

  const response = {
      "status":res.status,
      "data":dictData
  }
  return response;
};


export const getNotifications = async (token) => {
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
    "https://api.github.com/notifications",
    requestOptions
  );
  const data = await res.json();
  
  const dictData = []
  
  data.map((data)=>(
    dictData.push({
      'title':data.subject.title,
      'url':data.subject.url,
      'repository':data.repository.full_name,
      'reason':data.reason,
    })
  ))

  const response = {
      "status":res.status,
      "data":dictData
  }
  return response;
};