import '../scss/style.scss';

(function() {

    let data = {
        player: {
            name: '',
            moves: '',
            level: '',
            time: ''
        },
        firstCard: null,
        secondCard: null
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
        const shuffleCards = cards.flat().sort(() => 0.5 - Math.random());
        // pass cards to displayCards function
        displayCards(shuffleCards);
    }

    const displayCards = (cards) => {
        let element;
        cards.forEach((card, index) => {
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

        displayGameInfo();
    }

    const displayGameInfo = () => {
        DOMSelectors.boardName.innerText = `Player: ${data.player.name}`;
        DOMSelectors.boardLevel.innerText = `Level: ${data.player.level}`;

        DOMSelectors.boardCards.addEventListener('click', (e) => game(e));
    };

    const game = (e) => {

        if(e.target.parentElement.classList.contains('board__card')) {
            if(data.firstCard === null) {
                data.firstCard = e.target.parentElement;
                e.target.parentElement.classList.add('rotate');
            } else {
                data.secondCard = e.target.parentElement;
                e.target.parentElement.classList.add('rotate');
                DOMSelectors.boardCards.style.pointerEvents = "none";
                    if(data.firstCard.id !== data.secondCard.id) {
                        setTimeout(() => {
                            data.firstCard.classList.remove('rotate');
                            data.secondCard.classList.remove('rotate');
                            DOMSelectors.boardCards.style.pointerEvents = "auto";
                            data.firstCard = null;
                            data.secondCard = null;
                        }, 1500);
                    } else {
                            data.firstCard.style.pointerEvents = "none";
                            data.secondCard.style.pointerEvents = "none";
                            DOMSelectors.boardCards.style.pointerEvents = "auto";
                            data.firstCard = null;
                            data.secondCard = null;
                    }
            }
          
        }
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

        if(selectInput.value === 'Easy') { val = 6 };
        if(selectInput.value === 'Medium') { val = 8 };
        if(selectInput.value === 'Hard') { val = 10 };

        createCards(val);
    };

    const initListeners = () => {
        DOMSelectors.startButton.addEventListener('click', startGame);
        window.addEventListener('keydown', (e) => {
            if(e.keyCode === 13) { startGame(); };
        });
    };

    const init = () => {
        initListeners();
    };

    init();

})();