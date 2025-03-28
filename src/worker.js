var wordList = []

var lastFivePasswords = []

var password = "";

//this value is responsible for controlling the selected text value, this app stores up to 5 of your last generated passwords
selectedValue = 1;
noOfPasswordsGenerated = 0;

// running these at the start of the program
populateWordList();
addHTMLFunctionality();

function populateWordList() {
    fetch("./txt/dictionary.json")
    .then(res => res.json())
    .then(json => {
        jsonList = JSON.parse(JSON.stringify(json));

        // this converts the JSON list to a javascript array
        tempList = Object.keys(jsonList).map(function(_) { return jsonList[_]; })
        tempList = Object.values(jsonList)

        wordList = tempList;
    })
}

function addHTMLFunctionality(){
    window.addEventListener("DOMContentLoaded", function() {
        // adding the event listener to the button
        // we have to do this because making an inline 'onlick=makePassword()' is against the Content Security Policy (CSP)
        // we also have to do it after the Document Object Model (DOM) loads or our JS won't be able to load our button
        const pwordButton = document.getElementById("wand-button");
        if (pwordButton)
        {
            pwordButton.addEventListener("click", makePassword);
        }
        
        const copyButton = document.getElementById("copy-button");
        if (copyButton)
        {
            copyButton.addEventListener("click", copyText);
        }
        
        document.addEventListener("keydown", function(event) {
            if (event.ctrlKey)
            {
                if (event.key == "c")
                {
                    copyText();
                }
            }
            
            if (event.key === "ArrowUp") {
                selectUp();
            }

            if (event.key === "ArrowDown") {
                selectDown();
            }
        });
    });

    window.onkeyup = function(event) {
        if (event.key == " " || event.code == "Space" || event.keyCode == 32)
        {
            makePassword();
        }
    }
}

//both select up and down navigates through the last 5 passwords generated
function selectUp() {
    if (selectedValue > 1) {
        // move the selection up
        selectedValue = selectedValue - 1;
        playSwitchAnimation();
    }
}

function selectDown() {
    if (selectedValue < noOfPasswordsGenerated) {
        // move the selection down
        selectedValue = selectedValue + 1;
        console.log(selectedValue)
        playSwitchAnimation();
    }
}

function storePassword() {
    for (let i = 4; i >= 0; i--) {
        // just checking that the index doesnt exceed the array length
        if (lastFivePasswords.length >=  i + 1)
        {
            if (i == 4)
            {
                //get rid of the last password in the list if we are at 5
            }
            else
            {
                //move it down one position in the array
                lastFivePasswords[i + 1] = lastFivePasswords[i];
            }
        }
        if (i == 0)
        {
            //store the new password in the first position
            lastFivePasswords[i] = password;
        }
    }
    updateVisual();
}

function updateVisual() {
    for (let i = 0; i < lastFivePasswords.length; i++) {
        document.getElementById(`${i + 1}`).innerHTML = lastFivePasswords[i];
    }
}

function playCopyAnimation() {
    var targetElement = document.getElementById("text-display-wrapper");
    targetElement.classList.add("copying-animation");
    //remove class after animation plays
    setTimeout(() => {
        targetElement.classList.remove("copying-animation");
    }, 300);
}

function playGenerationAnimation() {
    var targetElement = document.getElementById("text-display-wrapper");
    targetElement.classList.add("generation-animation");
    //remove class after animation plays
    setTimeout(() => {
        targetElement.classList.remove("generation-animation");
    }, 300);
}

function playSwitchAnimation() {
    const wrapper = document.getElementById('text-display-wrapper');

    wrapper.classList.remove('select-1');
    wrapper.classList.remove('select-2');
    wrapper.classList.remove('select-3');
    wrapper.classList.remove('select-4');
    wrapper.classList.remove('select-5');
    wrapper.classList.add(`select-${selectedValue}`);
}

function copyText() 
{
    // Get the text field
    var copyText = document.getElementById("text-display");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    document.execCommand("copy");
  
    // Deselect the text (remove selection)
    window.getSelection().removeAllRanges();

    // Create a new range that doesn't highlight anything
    var range = document.createRange();

    // Select a point in the document (e.g., at the very beginning of the body)
    range.selectNodeContents(document.body);
    range.setStart(document.body, 0); // Start the range at the very beginning of the body
    range.setEnd(document.body, 0); // End the range at the same point

    // Apply the empty selection
    window.getSelection().addRange(range);

    playCopyAnimation();
}

function makePassword()
{    
    //clear the password
    password = "";

    password += selectRandomSymbol();
    password += selectWord();
    password += capitaliseFirstLetter(selectWord());
    //password =  replaceLettersWithNumbers(password);
    password += selectRandomNumber();
    password += selectRandomNumber();
    password += selectRandomSymbol();
 
    document.getElementById("1").value = password;

    if (noOfPasswordsGenerated < 5) {
        noOfPasswordsGenerated++;
    }

    storePassword();

    playGenerationAnimation();
}
 
function selectWord() { // Selects one random word from the selected word list and adds it to the global password variable
    try {
        var randomnumber = Math.floor((Math.random() * wordList.length) + 0)
        var tempWord = wordList[randomnumber];
    
        console.log(wordList[randomnumber]);

        if (password.includes(tempWord) == true) {
            var differentWords = false;
    
            while (differentWords == false) {
                tempWord = wordList[Math.floor((Math.random() * wordList.length) + 0)];
    
                if (password.includes(tempWord) == false) {
                    differentWords = true;
                } else {
                    continue;
                }
            }
        }

        return tempWord;
    }
    catch(e) {
        console.error(e);
    }
    return "NaN";
    //password += tempWord;
}
 
function selectRandomNumber() { // Makes a random number between 0 - 9
    return Math.floor((Math.random() * 10) + 0);
    //password += Math.floor((Math.random() * 10) + 0);
}

function selectRandomSymbol() { // Selects a random symbol from the list of symbols below
    var baseSymbols = ["!", "$", "%", "*", ".", "#"];

    return baseSymbols[Math.floor((Math.random() * baseSymbols.length) + 0)];
    //password += baseSymbols[Math.floor((Math.random() * baseSymbols.length) + 0)];
}
 
function replaceLettersWithNumbers(word) {
    var replacements = {
        "l": "1",
        "e": "3",
        "s": "5",
        "b": "8",
        "o": "0",
        "t": "+"
    }

    var chanceSuccess = 50;

    //replaces one letter with a symbol
    for (let i in word)
    {
        if (word.toLocaleLowerCase() in replacements)
        {
            var randomRoll = Math.floor((Math.random() * 100))
            if (randomRoll <= chanceSuccess)
            {
                word[i] = replacements[word[i].toLocaleLowerCase()];
                //var temp = word.replace(word[i].toLocaleLowerCase(), replacements[word[i].toLocaleLowerCase()]);
                return word;
            }
        }
    }

    //var chanceToCompare = 5;
    //// Gen a number between 1 and 100 then check if it is less than or equal to the chance number set
    //for (let i in password) {
    //    if (password[i].toLocaleLowerCase() in replacements) {
    //        var chance = Math.floor((Math.random() * 100));
    //        if (chance <= chanceToCompare) {
    //            password[i] = replacements[password[i].toLocaleLowerCase()];
    //            var temp = password.replace(password[i].toLocaleLowerCase(), replacements[password[i].toLocaleLowerCase()]);
    //            password = temp;
    //        }
    //    }
    //}

    return word;
}
 
function replaceLettersWithSymbols() {
    var baseSymbols = ["@", "$", "!"];
    var excludeSymbols = document.getElementById("excludeSymbols").value.split("");
 
    var possibleSymbols = [];
 
    for(let i = 0; i < baseSymbols.length; i++){
        if(excludeSymbols.includes(baseSymbols[i]) == false){
            possibleSymbols.push(baseSymbols[i]);
        }
    }
 
    var replacements = {
        "a": "@",
        "s": "$",
        "i": "!"
    }
 
    var chanceToCompare = parseInt(document.getElementById("replaceSymbolSlider").value);
    // Gen a number between 1 and 100 then check if it is less than or equal to the chance number set
    for (let i in password) {
        if (password[i].toLocaleLowerCase() in replacements) {
            var chance = Math.floor((Math.random() * 100));
            if (chance <= chanceToCompare) {
                if(possibleSymbols.includes(replacements[password[i].toLocaleLowerCase()])){
                    password[i] = replacements[password[i].toLocaleLowerCase()];
                    var temp = password.replace(password[i].toLocaleLowerCase(), replacements[password[i].toLocaleLowerCase()]);
                    password = temp;
                }
            }
        }
    }
}
 
function capitaliseFirstLetter(word) {
    tempWord = "";

    let array = word.split("");
    array[0] = array[0].toUpperCase();

    for (let i = 0; i < array.length; i++)
    {
        tempWord += array[i];
    }

    return tempWord;
}