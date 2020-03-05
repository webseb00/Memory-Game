import '../scss/style.scss';

(function() {

    let data = {
        player: {
            name: '',
            moves: '',
            level: '',
            time: ''
        }
    };

    const DOMSelectors = {
        nameInput: document.querySelector('#input-name'),
        selectInput: document.querySelector('.modal__select'),
        startButton: document.querySelector('#btn-start'),
        board: document.querySelector('.board'),
        boardCards: document.querySelector('.board__cards'),
        boardName: document.querySelector('.board__name'),
        boardLevel: document.querySelector('.board__level'),
        boardTime: document.querySelector('.board__time'),
        modal: document.querySelector('.modal')
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
        const arr = ['6-moon.svg', '11-black hole.svg', '10-death star.svg', '16-sputnik.svg', '22-iss.svg', 
                    '28-shuttle.svg', '30-rocket.svg', '36-lander.svg', '40-telescope.svg', '42-radar.svg',
                    '45-astronaut.svg', '46-blaster.svg', '48-ufo.svg', '25-module.svg', '18-star.svg'];

        const cards = [];
        let getCards = getRandomElements(arr, level);
        
        while(getCards.length !== level) {
            getCards = getRandomElements(arr, level);
        }
        // double every card in final array
        cards.push(getCards);
        cards.push(getCards);
        // mix randomly cards in array
        const shuffleCards = cards.sort((a,b) => 0.5 - Math.random()).flat();
        // pass cards to displayCards function
        displayCards(shuffleCards);
    }

    const displayCards = (cards) => {
        let element;
        cards.forEach(card => {
            element = 
            `<div class="board__card">
                <div class="board__card-side board__card--front">
                </div>
                <div class="board__card-side board__card--back">
                    <img class="board__icon" src="../icons/SVG/EXPANDED/${card}" onload="SVGInject(this)" />
                </div>
            </div>`;
            
            DOMSelectors.boardCards.insertAdjacentHTML('beforeend', element);
        });

        DOMSelectors.modal.classList.add('hide');
        DOMSelectors.board.classList.add('show');

        displayGameInfo();
    }

    const displayGameInfo = () => {
        DOMSelectors.boardName.innerText = `Player: ${data.player.name}`;
        DOMSelectors.boardLevel.innerText = `Level: ${data.player.level}`;
    };

    const startGame = () => {
        const { nameInput, selectInput } = DOMSelectors;
        // check validity of input
        if(nameInput.value === '') {
            return console.log('Type your name!');
        }
        // assign values from fields into games data object
        data.player.name = nameInput.value;
        data.player.level = selectInput.value;
        // based on selected level, pass number of cards to generate
        let val;

        if(selectInput.value === 'easy') { val = 6 };
        if(selectInput.value === 'medium') { val = 8 };
        if(selectInput.value === 'hard') { val = 10 };

        createCards(val);
    };

    const initListeners = () => {
        DOMSelectors.startButton.addEventListener('click', startGame);
    };

    const init = () => {
        initListeners();
    };

    init();

})();