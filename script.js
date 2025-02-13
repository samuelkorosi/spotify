const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlist');
const resultNone = document.getElementById('result-none');
const headerPlaylist = document.getElementById('header-playlist');
const artistCardList = document.getElementById('artist-card-list');
const artistCard = document.getElementById('artist-card');

const _hostname = document.location.hostname;
const _json_file = './json/artists.json'

async function readJson() {  
    const response = await fetch(_json_file);
    return await response.json();
};

function displayResults(results) {
    if (results == '') {
        showNone();
        return;
    }

    deleteCardArtist();

    results.forEach(element => {
        createCardArtist(element);
    });
    
    showArtists();
};

function createCardArtist(element) {
    let card = document.createElement('div');
    card.classList.add('artist-card');
    card.classList.add('create-by-js');
    card.classList.add(`ac-${element.id}`);
    card.id = `artist-card-${element.id}`;

    let cardImg = document.createElement('div');
    cardImg.classList.add('card-img');

    let artistImg = document.createElement('img');
    artistImg.classList.add('artist-img');
    artistImg.src = element.urlImg;

    cardImg.appendChild(artistImg);

    let play = document.createElement('div');
    play.classList.add('play');

    let spanPlay = document.createElement('span');
    spanPlay.classList.add('fa');
    spanPlay.classList.add('fa-solid');
    spanPlay.classList.add('fa-play');
    
    play.appendChild(spanPlay);

    cardImg.appendChild(play);

    card.appendChild(cardImg);

    let cardText = document.createElement('div');
    cardText.classList.add('card-text');

    let link = document.createElement('a');
    link.classList.add('vst');
    link.href = "";

    cardText.append(link);

    let artistName = document.createElement('span');
    artistName.classList.add('artist-name');
    artistName.id = `artist-name-${element.id}`
    artistName.innerText = element.name;

    cardText.appendChild(artistName);

    let artistGenre = document.createElement('span');
    artistGenre.classList.add('artist-categorie');
    artistGenre.id = `artist-genre-${element.id}`;
    artistGenre.innerHTML = element.genre;

    cardText.append(artistGenre);

    card.appendChild(cardText);

    artistCardList.appendChild(card);
};

function deleteCardArtist() {
    let cards = document.getElementsByClassName('create-by-js');

    if (cards.length === 0) {
        return;
    }

    while(cards.length) {
        cards[0].remove();
    }
}

function showArtists() {
    resultPlaylist.classList.add('hidden');
    headerPlaylist.classList.add('hidden');
    resultNone.classList.add('hidden');
    resultArtist.classList.remove('hidden');
};

function showPlaylist() {
    resultPlaylist.classList.remove('hidden');
    headerPlaylist.classList.remove('hidden');
    resultNone.classList.add('hidden');
    resultArtist.classList.add('hidden');
};

function showNone() {
    resultArtist.classList.add('hidden');
    headerPlaylist.classList.add('hidden');
    resultPlaylist.classList.remove('hidden');
    resultNone.classList.remove('hidden');
};

document.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        showPlaylist();
        
        return;
    }

    readJson(searchTerm)
        .then(data => {
            const data_filtered = data.artists.filter(x => x.name.toLowerCase().includes(searchTerm));
            displayResults(data_filtered);
        });
});