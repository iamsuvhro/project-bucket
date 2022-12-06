const initialState = {
    name:"",
    email:"",
    company:"",
    id:"",
    username:"",
    avatar_url:"",
    followers: "",
    following: "",
    bio:""
};

const githubProfile = (state=initialState, action) =>{
    if (action.type === "updateGitProfile"){
        return state = action.payload
    }
    else{
        return state;
    }
}
export default githubProfile;