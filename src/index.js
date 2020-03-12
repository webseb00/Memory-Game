import '../scss/style.scss';

(function() {
    // game & players data
    let data = {
        player: {
            name: '',
            level: '',
            time: ''
        },
        firstCard: null,
        secondCard: null,
        counter: false,
        movesToFinish: null,
        playersCards: null,
        randomCards: null
    };
    // global variable for timer
    let timer;
    // selectors to the dom
    const DOMSelectors = {
        nameInput: document.querySelector('#input-name'),
        selectInput: document.querySelector('.modal__select'),
        startButton: document.querySelector('#btn-start'),
        newGameButton: document.querySelector('#btn-newGame'),
        board: document.querySelector('.board'),
        boardCards: document.querySelector('.board__cards'),
        boardName: document.querySelector('.board__name'),
        boardLevel: document.querySelector('.board__level'),
        boardTime: document.querySelector('.board__time-counter'),
        boardMoves: document.querySelector('.board__moves'),
        modal: document.querySelector('.modal'),
        result: document.querySelector('.result'),
        resultTime: document.querySelector('.result__info--time'),
        resultName: document.querySelector('.result__heading--name')
    };

    const getRandomElements = (arr, level) => {
        const elements = [];
        
        for(let i=0;i <= level;i++) {
            const getRandomItems = Math.floor(Math.random() * arr.length);
            elements.push(arr[getRandomItems]);
        }

        return [...new Set(elements)];
    };

    const createCards = (level) => {
        // array with names of icons
        const arr = ['6-moon', '11-black hole', '10-death star', '16-sputnik', '22-iss', 
                    '28-shuttle', '30-rocket', '36-lander', '40-telescope', '42-radar',
                    '45-astronaut', '46-blaster', '48-ufo', '25-module', '18-star',
                    '1-venus', '9-uranus', '14-galaxy', '21-spaceport', '29-moonwalker'];

        const cards = [];
        let getCards = getRandomElements(arr, level);
        
        while(getCards.length !== level) {
            getCards = getRandomElements(arr, level);
        }
        // double every card in final array
        cards.push(getCards);
        cards.push(getCards);
        // mix randomly cards in array
        data.randomCards = cards.flat().sort(() => 0.5 - Math.random());
        data.playersCards = data.randomCards;
        // get number of moves to finish tthe game
        data.movesToFinish = data.playersCards.length / 2;
        // pass cards to displayCards function
        displayCards(data.randomCards);
    };

    const displayCards = (cards) => {
        DOMSelectors.boardCards.innerHTML = '';
        let element;
        cards.forEach(card => {
            element = 
            `<div id=${card} class="board__card">
                <div class="board__card-side board__card--front">
                </div>
                <div class="board__card-side board__card--back">
                    <img class="board__icon" src="../icons/SVG/EXPANDED/${card}.svg" onload="SVGInject(this)" />
                </div>
            </div>`;
            
            DOMSelectors.boardCards.insertAdjacentHTML('beforeend', element);
        });

        DOMSelectors.modal.classList.add('hide');
        DOMSelectors.board.classList.add('show');

        // attach click listener to board cards
        DOMSelectors.boardCards.addEventListener('click', (e) => game(e));

        displayGameInfo();
    }

    const displayGameInfo = () => {
        // display info on players name and level
        DOMSelectors.boardName.innerText = `Player: ${data.player.name}`;
        DOMSelectors.boardLevel.innerText = `Level: ${data.player.level}`;
        DOMSelectors.boardMoves.innerText = `Moves to Finish: ${data.movesToFinish}`;
        checkGameResult();
    };

    const displayTimer = () => {
        let minutes = 0,
            seconds = 0;

        timer = setInterval(() => {
            if(seconds <= 59) {
                seconds++;
                if(seconds < 10) {
                    seconds = '0' + seconds;
                }
                if(seconds >= 59) {
                    minutes++;
                    seconds = 0;
                    seconds = '0' + seconds;
                }
            }
            DOMSelectors.boardTime.textContent = `${minutes}:${seconds}`;
        }, 1000);
    };

    const checkGameResult = () => {
        if(data.movesToFinish === 0) {
            // stop working of timer
            clearInterval(timer);
            data.player.time = DOMSelectors.boardTime.textContent;
            // get time and name of player and show them in the result box
            DOMSelectors.resultTime.textContent = data.player.time;
            DOMSelectors.resultName.textContent = data.player.name;
            // show result box after 3 seconds
            setTimeout(() => {
                DOMSelectors.result.classList.add('show');
            }, 3000);
        }
    };

    const game = (e) => {
        // check if timer is working, if not set counter to true and start counting
        if(data.counter === false) {
            data.counter = true; 
            displayTimer(); 
        }
        // check if board card was clicked
        if(e.target.parentElement.classList.contains('board__card')) {
            if(data.firstCard === null) {
                data.firstCard = e.target.parentElement;
                e.target.parentElement.classList.add('rotate');
            } else {
                data.secondCard = e.target.parentElement;
                e.target.parentElement.classList.add('rotate');
                DOMSelectors.boardCards.style.pointerEvents = "none";
                    // check if cards are different...
                    if(data.firstCard.id !== data.secondCard.id) {
                        setTimeout(() => {
                            data.firstCard.classList.remove('rotate');
                            data.secondCard.classList.remove('rotate');
                            DOMSelectors.boardCards.style.pointerEvents = "auto";
                            // remove cards from data
                            data.firstCard = null;
                            data.secondCard = null;
                        }, 1000);
                    } else {
                        // check if cards are similar
                            data.firstCard.style.pointerEvents = "none";
                            data.secondCard.style.pointerEvents = "none";
                            DOMSelectors.boardCards.style.pointerEvents = "auto";
                            // update player cards and count total moves to finish the game
                            const updateCardsArray = data.playersCards.filter(card => card !== data.firstCard.id);
                            data.playersCards = null;
                            data.playersCards = updateCardsArray;
                            data.movesToFinish -= 1;
                            // remove cards from data
                            data.firstCard = null;
                            data.secondCard = null;
                            displayGameInfo();
                    }
                }
            }
    };

    const startGame = () => {
        const { nameInput, selectInput } = DOMSelectors;
        // check validity of input
        if(nameInput.value === '') {
            return alert('Please add your name!');
        }
        // assign values from fields into games data object
        data.player.name = nameInput.value;
        data.player.level = selectInput.value;
        // based on selected level, pass number of cards to generate
        let val;

        if(selectInput.value === 'Easy') { val = 6 };
        if(selectInput.value === 'Medium') { val = 8 };
        if(selectInput.value === 'Hard') { val = 10 };

        createCards(val);
    };

    const newGame = () => {
        window.location.reload();
    };

    const initListeners = () => {
        DOMSelectors.startButton.addEventListener('click', startGame);
        window.addEventListener('keydown', (e) => {
            if(e.keyCode === 13) { startGame(); };
        });
        DOMSelectors.newGameButton.addEventListener('click', newGame);
    };

    initListeners();

})();