// ~~~~~~~~~~~~~~~~~ GLOBAL VARIABLES ~~~~~~~~~~~~~~~~~
// targets div with class = overview
const overview = document.querySelector(".overview");
// specifies GitHub user
const username = "MeganWallace";

const getUser = async function(){
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  console.log(data);
}

