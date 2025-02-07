const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlist');

const _hostname = document.location.hostname;


function requestApi(searchTerm) {
    let url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    if (_hostname === 'localhost') {
        url = `https://samuelkorosi.github.io/spotify/api-artists/artists.json?name_like=${searchTerm}`;        
    }
    
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result));
};

function displayResults(results) {
    resultPlaylist.classList.add('hidden');
    
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');
    const artistGenre = document.getElementById('artist-genre');

    if (_hostname === 'localhost') {
        results = results.artists;
    }

    results.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
        artistGenre.innerHTML = element.genre;
    });
    
    resultArtist.classList.remove('hidden');
};

document.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        
        return;
    }

    requestApi(searchTerm);
});