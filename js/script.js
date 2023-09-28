// ~~~~~~~~~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~~~~~~~~~
// target div with class .overview
const overview = document.querySelector(".overview");
// specify GitHub user
const username = "MeganWallace";
// target unordered list with class .repo-list
const repoList = document.querySelector(".repo-list");

// =============== Function to get user data ===============
const getUser = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`); //get user data
  const data = await response.json(); //parse and hold JSON data (array of user data)
  // console.log(data); //***PLACEHOLDER*** log out JSON data (array of user data)
  displayUserInfo(data); //calls displayUserInfo function, passing JSON data as argument
};
getUser();

// =============== Function to display user data ===============
const displayUserInfo = function (data) { //accepts JSON data (array of user data)
  const userInfoDiv = document.createElement("div"); //create a new div
  userInfoDiv.classList.add("user-info"); //assign "user-info" class to new div
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
    getRepos(); //call getRepos function (this is here because we want it to execute after the user info is displayed)
};

// =============== Function to get public repos ===============
const getRepos = async function(){
  const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`); //get repos: sort by most recently updated, show up to 100 per page
  const repoData = await repoRes.json(); //parse and hold JSON data (array of public repos)
  // console.log(repoData); //***PLACEHOLDER*** log out JSON data (array of public repos)
  displayRepos(repoData); //calls displayRepo function, passing JSON data as argument
};

// =============== Function to display public repo information ===============
const displayRepos = function(repos){ //accepts JSON data (array of public repos)
  repoList.innerHTML = ""; //empty repo list contents
  for (const repo of repos){ //loop through each repo
    const repoName = repo.name //variable for repo name
    let li = document.createElement("li"); //create list item for each repo
    li.classList.add("repos"); //assign "repos" class to list item
    li.innerHTML =`<h3>${repoName}</h3>`; //add content to list item
    repoList.append(li); //add list item to repo list
  }
};