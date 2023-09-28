// ~~~~~~~~~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~~~~~~~~~
// target div with class .overview
const overview = document.querySelector(".overview");
// specify GitHub user
const username = "MeganWallace";
// target unordered list with class .repo-list
const repoList = document.querySelector(".repo-list");

// =============== Function to get user data ===============
const getUser = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  // console.log(data);
  displayUserInfo(data); //calls displayUserInfo function, passing JSON data as argument
};
getUser();

// =============== Function to display user data ===============
const displayUserInfo = function (data) { //accepts JSON data
  const userInfoDiv = document.createElement("div"); //create a new div
  userInfoDiv.classList.add("user-info"); //assign new div a class of .user-info
  userInfoDiv.innerHTML = //add content to .user-info div...you're pulling properties from the data argument, so data. is needed 
    `<figure>
      <img alt="user avatar" src=${data.avatar_url}>
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(userInfoDiv); //adds the userInfoDiv to the overview div
};

// =============== Function to get repos ===============
const getRepos = async function(){
  const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`); //get repos: sort by most recently updated, show up to 100 per page
  const repoData = await repoRes.json();
  console.log(repoData);
};
// getRepos();