// ~~~~~~~~~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~~~~~~~~~
// target div with class .overview
const overview = document.querySelector(".overview");
// specify GitHub user
const username = "MeganWallace";
// target unordered list with class .repo-list
const repoList = document.querySelector(".repo-list");
// target section with class .repos
const repoSection = document.querySelector(".repos");
// target section with class .repo-data
const repoDataSection = document.querySelector(".repo-data");
// target back to repo gallery button
const viewReposButton = document.querySelector(".view-repos");
// target search box input
const filterInput = document.querySelector(".filter-repos");

// =============== Function to get user data ===============
const getUser = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`); //get user data
  const data = await response.json(); //parse and hold JSON data (array of user data)
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
  getRepos(); //call getRepos function (this is here because we want it to trigger after the user info is displayed)
};

// =============== Function to get public repos ===============
const getRepos = async function () {
  const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`); //get repos: sort by most recently updated, show up to 100 per page
  const repoData = await repoRes.json(); //parse and hold JSON data (array of public repos)
  displayRepos(repoData); //calls displayRepo function, passing JSON data as argument
};

// =============== Function to display public repo information ===============
const displayRepos = function (repos) { //accepts JSON data (array of public repos)
  repoList.innerHTML = ""; //empty repo list contents
  filterInput.classList.remove("hide"); //display search input box

  for (const repo of repos) { //loop through each repo
    const repoItem = document.createElement("li"); //create list item for each repo
    repoItem.classList.add("repo"); //assign "repo" class to list item
    repoItem.innerHTML = `<h3>${repo.name}</h3>`; //add repo name to list item
    repoList.append(repoItem); //add list item to repo list
  }
  
};

// =============== Click event for repo list ===============
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) { //if target (element clicked) matches the repo name (h3 element)...
    const repoName = e.target.innerText; //set repoName to innerText of target
    getRepoInfo(repoName); // calls getRepoInfo function (which triggers displayRepoInfo function)
  }
});

// =============== Function to get specific repo data ===============
const getRepoInfo = async function (repoName) { //finds info for repo with repoName
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`); //get info for repo with repoName
  const repoInfo = await fetchInfo.json(); //parse and hold JSON data (array of repo info)
  // console.log(repoInfo); //log out JSON data (array of repo info) - use to find repo property names

  //grab languages
  const fetchLanguages = await fetch(repoInfo.languages_url); //get languages_url property from repoInfo
  const languageData = await fetchLanguages.json(); //parse and hold languages_url data

  //make list of languages
  const languages = []; //create empty array to hold language names
  for (const language in languageData) { //loop through language_url array to get individual language names
    languages.push(language); //add language names to empty array
  }

  displayRepoInfo(repoInfo, languages); //calls displayRepoInfo function, passing arguments of repoInfo and languages
  console.log(repoInfo);
};

// =============== Function to display specific repo data ===============
const displayRepoInfo = function (repoInfo, languages) {
  repoDataSection.innerHTML = ""; //empty section with class of .repo-data
  repoDataSection.classList.remove("hide"); //display section with class of .repo-data
  viewReposButton.classList.remove("hide"); //display "back to repo gallery" button
  repoSection.classList.add("hide"); //hide section with class of .repos (location of repo list)

  const repoDiv = document.createElement("div") //add new div to section with class of .repo-data
  repoDiv.innerHTML = //set content of new div
    `<h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages}</p>
      <a class="gh-pages" href = ${repoInfo.homepage} target = "_blank" rel="noreferrer noopener">View Project</a>
      <a class="visit" href = ${repoInfo.html_url} target = "_blank" rel="noreferrer noopener">View Repo on GitHub</a>`
  repoDataSection.append(repoDiv); //add new div to section with class of .repo-data
};

// =============== Click event for Back to Repo Gallery Button ===============
viewReposButton.addEventListener("click", function () {
  repoSection.classList.remove("hide"); //display section with class of .repos
  repoDataSection.classList.add("hide"); //hide section with class of .repo-data
  viewReposButton.classList.add("hide");//hide back to gallery button
});

// =============== Input event for search box (create dynamic search) ===============
filterInput.addEventListener("input", function (e) {
  searchText = e.target.value; //collect the search text...use value to collect actual text input...(innerText will return a true/false based on presence of an input)
  const repos = document.querySelectorAll(".repo"); //selects all elements with class or .repo..."repos" can be used as a variable because it was never previously declared (it was only an argument placeholder in displayRepos function)
  const searchLower = searchText.toLowerCase(); //convert search text to lower case

  for (const repo of repos) { //loop through items in repos array
    const repoLower = repo.innerText.toLowerCase(); //convert repo name (innerText) to lower case
    if (repoLower.includes(searchLower)) { //if repo name contains search text...
      repo.classList.remove("hide"); //display repo item
    } else { //otherwise...
      repo.classList.add("hide"); //hide repo item
    }
  }

});