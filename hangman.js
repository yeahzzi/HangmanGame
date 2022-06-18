const words = ['the', 'hangman', 'game', 'about', 'guessing', 'random', 'word', 'guessing', 'letters', 'one'];
const randomWord = words[Math.floor(Math.random() * words.length)];
const life = 5;

//adds blank spans to 'blanks-to-fill' div accordingly to random word length
function makeBlankSpaces(randomWord, blankSpace) {
    blankSpace.innerHTML = "";
    console.log('randomword: '+randomWord);
    for (var i = 0; i < randomWord.length; i++) {        
        const span = document.createElement('span');
        const node = document.createTextNode('___');
        span.classList.add('blank');
        span.appendChild(node);
        blankSpace.appendChild(span);
    }
}

//compares chosen or typed alphabet letter with each letter of the random word
//if it matches, replace blank span to that letter in that position
function wordCompare(blankSpace, word, letter) {
    var check = 0;
    for (var j = 0; j < word.length; j++) {
        if (word[j] == letter || word[j] == String.fromCharCode(letter)) {
            blankSpace[j].innerHTML = word[j];
            check++;
        }
    }
    return check;
}

//shows game win when blank not ___ and life bigger than 0 
function checkGameWinner(blankSpace, life) {
    for (var i = 0; i < blankSpace.length; i++) {
        if (blankSpace[i].innerHTML == '___') {
            return 0;
        }
    }
    if (life > 0) {
        indicator.innerHTML = "You Win!";
        indicator.classList.add('winner');
    }
}

function startGame(word, lifeNum) {
    console.log('new: '+word);
    const life = document.getElementById('lifeLeft');
    const blanksArea = document.querySelector('#blanks-to-fill');
    const alphabet = document.getElementsByClassName('alphabet');
    const inputSubmit = document.querySelector('.play-as-input button');
    const indicator = document.getElementById('indicator');
    
    life.innerHTML = lifeNum;    
    makeBlankSpaces(word, blanksArea);
    const blanks = document.getElementsByClassName('blank');
    
    Object.values(alphabet).forEach(item => {
        item.addEventListener('click', e => {
            e.target.classList.add('clicked');
            if (wordCompare(blanks, word, e.target.innerHTML) == 0) {
                lifeNum = lifeNum - 1;
            }
            if (lifeNum < 1) {
                indicator.innerHTML = "Game Over";
                indicator.classList.add('loser');
            }
            life.innerHTML = lifeNum;
            checkGameWinner(blanks, lifeNum);
        });
        
    });
    
    inputSubmit.addEventListener('click', e => {
        const inputValue = document.getElementById('alphabet-input').value.toLowerCase().charCodeAt(0);
        for (var i = 0; i < alphabet.length; i++) {
            if (alphabet[i].innerHTML == String.fromCharCode(inputValue)) {
                alphabet[i].classList.add('clicked');
            }
        }
        if (wordCompare(blanks, word, inputValue) == 0) {
            lifeNum = lifeNum - 1;
        }
        if (lifeNum < 1) {
            indicator.innerHTML = "Game Over";
            indicator.classList.add('loser');
        }
        life.innerHTML = lifeNum;
        checkGameWinner(blanks, lifeNum);
    });
    return 0;
}

startGame(randomWord, life);
