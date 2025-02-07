const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlist');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result));
};

function displayResults(results) {
    resultPlaylist.classList.add('hidden');
    
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');
    const artistGenre = document.getElementById('artist-genre');

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