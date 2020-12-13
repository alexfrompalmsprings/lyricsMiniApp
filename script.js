// --------------------- DOM Elements  ---------------------
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// --------------------- functions  ---------------------
// search song by artist/name
async function searchSongs(input){
  // fetch(`${apiURL}/suggest/${input}`)
  // .then(res => res.json())
  // .then(data => console.log(data));

  let response = await fetch(`${apiURL}/suggest/${input}`);
  let data = await response.json();

  displayData(data);
};


// --------------------- Event Listeners  ---------------------
form.addEventListener('submit', (e) => {
  e.preventDefault();

  //                Dom Search
  let searchInput = search.value.trim();
  console.log(searchInput);

  if(!searchInput){
    alert('Enter a search item')
  } else{
    searchSongs(searchInput);
  }

})

