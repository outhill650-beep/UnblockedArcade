let games = [];
const gameGrid = document.getElementById('game-grid');
const searchInput = document.getElementById('search-input');
const noResults = document.getElementById('no-results');
const searchTermSpan = document.getElementById('search-term');
const gameCountSpan = document.getElementById('game-count');
const playFeaturedBtn = document.getElementById('play-featured');

const modal = document.getElementById('game-modal');
const modalContent = document.getElementById('modal-content');
const modalTitle = document.getElementById('modal-title');
const gameIframe = document.getElementById('game-iframe');
const closeModalBtn = document.getElementById('close-modal');
const toggleFullscreenBtn = document.getElementById('toggle-fullscreen');
const modalFooter = document.getElementById('modal-footer');

let isFullScreen = false;

// Fetch games from JSON
async function loadGames() {
    try {
        const response = await fetch('games.json');
        games = await response.json();
        gameCountSpan.textContent = games.length;
        renderGames(games);
    } catch (error) {
        console.error('Error loading games:', error);
    }
}

function renderGames(gamesToRender) {
    gameGrid.innerHTML = '';
    
    if (gamesToRender.length === 0) {
        noResults.classList.remove('hidden');
        searchTermSpan.textContent = searchInput.value;
    } else {
        noResults.classList.add('hidden');
        gamesToRender.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'group cursor-pointer bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-white/50 transition-all hover:shadow-2xl hover:shadow-white/5 transform hover:-translate-y-1';
            gameCard.innerHTML = `
                <div class="aspect-video relative overflow-hidden">
                    <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black w-6 h-6"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-1 group-hover:text-white transition-colors">${game.title}</h3>
                    <p class="text-zinc-500 text-sm line-clamp-2">${game.description}</p>
                </div>
            `;
            gameCard.onclick = () => openGame(game);
            gameGrid.appendChild(gameCard);
        });
    }
}

function openGame(game) {
    modalTitle.textContent = game.title;
    gameIframe.src = game.iframeUrl;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeGame() {
    modal.classList.add('hidden');
    gameIframe.src = '';
    document.body.style.overflow = 'auto';
    isFullScreen = false;
    updateFullscreenUI();
}

function updateFullscreenUI() {
    if (isFullScreen) {
        modalContent.classList.add('h-full', 'max-w-none', 'rounded-none', 'border-none');
        modalContent.classList.remove('max-h-[90vh]', 'max-w-6xl', 'rounded-3xl');
        modalFooter.classList.add('hidden');
    } else {
        modalContent.classList.remove('h-full', 'max-w-none', 'rounded-none', 'border-none');
        modalContent.classList.add('max-h-[90vh]', 'max-w-6xl', 'rounded-3xl');
        modalFooter.classList.remove('hidden');
    }
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = games.filter(game => 
        game.title.toLowerCase().includes(query) || 
        game.description.toLowerCase().includes(query)
    );
    renderGames(filtered);
});

playFeaturedBtn.addEventListener('click', () => {
    if (games.length > 0) openGame(games[0]);
});

closeModalBtn.addEventListener('click', closeGame);

toggleFullscreenBtn.addEventListener('click', () => {
    isFullScreen = !isFullScreen;
    updateFullscreenUI();
});

// Close modal on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGame();
});

// Initial load
loadGames();
