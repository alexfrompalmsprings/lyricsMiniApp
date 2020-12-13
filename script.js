// --------------------- DOM Elements  ---------------------
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// --------------------- functions  ---------------------

// search song by artist/name
async function searchSongs(input) {
  // fetch(`${apiURL}/suggest/${input}`)
  // .then(res => res.json())
  // .then(data => console.log(data));

  let response = await fetch(`${apiURL}/suggest/${input}`);
  let data = await response.json();
  console.log(data);

  displayData(data);
};

// display the songs in the Dom
function displayData(data) {
  // let results = '';

  // data.data.forEach((song) => {
  //   results += `
  //   <li>
  //     <span>
  //       <strong>${song.artist.name}</strong>
  //       - ${song.title}
  //     </span>

  //     <button
  //       class="btn"
  //       data-artist="${song.artist.name}"
  //       data-songtitle="${song.title}"
  //     > Get Lyrics </button>
  //   </li>
  //   `;
  // });

  // result.innerHTML = `
  //   <ul class="songs">
  //     ${results}
  //   </ul>
  // `


  // using map & join
  result.innerHTML = `
  <ul class="songs">
  ${data.data
    .map(
      (song) => `
          <li>
            <span>
              <strong>${song.artist.name}</strong>
              - ${song.title}
            </span>

            <button
              class="btn"
              data-artist="${song.artist.name}"
              data-songtitle="${song.title}"
            > Get Lyrics </button>
            </li>`
            ).join('')}
            </ul>
            `;


  // display the next & previous button
  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ''
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    more.innerHTML = '';
  }
}

// Get prev and next songs
async function getMoreSongs(url) {
  // prevents the CORS errors
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  let lyrics = data.lyrics
}


// get the song lyrics
async function getLyrics(artist, songTitle){
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
        `;


  more.innerHTML = '';
}



// --------------------- Event Listeners  ---------------------
form.addEventListener('submit', (e) => {
  e.preventDefault();

  //                Dom Search
  let searchInput = search.value.trim();
  console.log(searchInput);

  if (!searchInput) {
    alert('Enter a search item')
  } else {
    searchSongs(searchInput);
  }
})

// get the lyrics after the click
result.addEventListener('click', e => {
  let clickedElement = e.target;

  if(clickedElement.tagName === 'BUTTON'){
    let artist = clickedElement.getAttribute('data-artist');
    let songTitle = clickedElement.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);

  }

});