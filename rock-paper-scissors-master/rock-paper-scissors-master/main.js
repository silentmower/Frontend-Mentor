const playerWinsLSKey = "playerWins";
const houseWinsLSKey = "houseWins";

let state = {
    playerWins: parseInt(localStorage.getItem(playerWinsLSKey)) || 0,
    houseWins: parseInt(localStorage.getItem(houseWinsLSKey)) || 0,
    playerPick: null,
    housePick: null
};

const renderScore = () => {
    const pointsElement = document.querySelector(".points");
    pointsElement.innerHTML = state.playerWins - state.houseWins;
};

const bindPickEvents = () => {
    document.querySelectorAll(".game button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const pick = e.currentTarget.dataset.pick;
            state.playerPick = pick;
            pickByHouse();
            hideOptions();
            showFight();
        });
    });
};

const pickByHouse = () => {
    const options = ["rock", "paper", "scissors"];
    const housePick = options[Math.floor(Math.random() * options.length)];
    state.housePick = housePick;
};

const hideOptions = () => {
    document.querySelector(".game").classList.add("hidden");
};

const showFight = () => {
    const fightSection = document.querySelector(".fight");
    fightSection.classList.remove("hidden");

    // GRACZ
    const playerButton = fightSection.querySelector(".picked .paperbtn");
    playerButton.className = `${state.playerPick}btn`; // dodajemy odpowiednią klasę (np. rockbtn)
    playerButton.innerHTML = `
        <div class="btnimg">
            <img src="./images/icon-${state.playerPick}.svg" alt="${state.playerPick}-icon">
        </div>
    `;

    // KOMPUTER
    const housePicked = fightSection.querySelectorAll(".picked")[1];
    housePicked.innerHTML = `
        <span>THE HOUSE PICKED</span>
        <button class="${state.housePick}btn">
            <div class="btnimg">
                <img src="./images/icon-${state.housePick}.svg" alt="${state.housePick}-icon">
            </div>
        </button>
    `;
};

const init = () => {
    renderScore();
    bindPickEvents();
};

init();

