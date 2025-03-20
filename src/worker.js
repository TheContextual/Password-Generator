var fullWordList = [];

var animals = ["dog", "cat", "lion", "horse", "bird", "snail", "tiger", "worm", "bug", "snake", "sparrow", "fox", "sheep", "parrot", "ant", "bat", "bear", "bee", "camel", "chicken", "goat", "cobra", "crab", "deer", "dove", "duck", "fish", "frog", "hawk"]; // "pig", "monkey", "cow", "ape",
var instruments = ["guitar", "drum", "piano", "bass", "flute", "trumpet", "banjo", "gong", "tuba", "harp"];
var colours = ["red", "green", "blue",  "pink", "orange", "purple", "grey", "violet", "maroon"]; //"white", "yellow", "black", "brown",
var shapes = ["circle", "square", "triangle"];
var food = ["carrot", "potato", "pizza", "burger", "cake", "jam", "butter", "bread", "apple", "mango", "kiwi", "grape", "cherry", "blueberry", "pie", "banana", "icecream", "sausage", "chip", "pasta", "pancake", "bagel", "cheese", "salad", "bacon", "egg", "cookie", "ham", "soup"];
var sports = ["football", "rugby", "fishing", "skiing", "tennis", "bowling", "hocky", "basketball", "rowing", "netball", "golf"];
var transport = ["car", "bus", "bike", "train", "boat", "plane", "tram", "skateboard", "motorbike", "van"];

var password = "";

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
    });
});

window.onkeyup = function(event) {
    if (event.key == " " || event.code == "Space" || event.keyCode == 32)
    {
        makePassword();
    }
}

function playCopyAnimation() {
    var targetElement = document.getElementById("text-display");
    targetElement.classList.add("copying-animation");
    //remove class after animation plays
    setTimeout(() => {
        targetElement.classList.remove("copying-animation");
    }, 300);
}

function playGenerationAnimation() {
    var targetElement = document.getElementById("text-display");
    targetElement.classList.add("generation-animation");
    //remove class after animation plays
    setTimeout(() => {
        targetElement.classList.remove("generation-animation");
    }, 300);
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
 
    makeFullWordList();
    selectWord();
    selectWord();
    replaceLettersWithNumbers();
    randomCapitals();
    selectRandomNumber();
    selectRandomNumber();
 
    console.log(password);
 
    document.getElementById("text-display").value = password;

    playGenerationAnimation();
}
 
function makeFullWordList() {
    fullWordList.push.apply(fullWordList, animals);
    fullWordList.push.apply(fullWordList, instruments);
    fullWordList.push.apply(fullWordList, colours);
    fullWordList.push.apply(fullWordList, shapes);
    fullWordList.push.apply(fullWordList, food);
    fullWordList.push.apply(fullWordList, sports);
    fullWordList.push.apply(fullWordList, transport);
}
 
function selectWord() { // Selects one random word from the selected word list and adds it to the global password variable
    var randomnumber = Math.floor((Math.random() * fullWordList.length) + 0)
    var tempWord = fullWordList[randomnumber];
 
    if (password.includes(tempWord) == true) {
        var differentWords = false;
 
        while (differentWords == false) {
            tempWord = fullWordList[Math.floor((Math.random() * fullWordList.length) + 0)];
 
            if (password.includes(tempWord) == false) {
                differentWords = true;
            } else {
                continue;
            }
        }
    }
 
    password += tempWord;
}
 
function selectRandomNumber() { // Makes a random number between 0 - 9
    password += Math.floor((Math.random() * 10) + 0);
}
 
function replaceLettersWithNumbers() {
    var replacements = {
        "l": "1",
        "e": "3",
        "s": "5",
        "b": "8",
        "o": "0"
    }
    var chanceToCompare = 20;
    // Gen a number between 1 and 100 then check if it is less than or equal to the chance number set
    for (let i in password) {
        if (password[i].toLocaleLowerCase() in replacements) {
            var chance = Math.floor((Math.random() * 100));
            if (chance <= chanceToCompare) {
                password[i] = replacements[password[i].toLocaleLowerCase()];
                var temp = password.replace(password[i].toLocaleLowerCase(), replacements[password[i].toLocaleLowerCase()]);
                password = temp;
            }
        }
    }
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
 
function randomCapitals() {
    var lengthOfWords = parseInt(password.length) - 0;
 
    var loopNumber = Math.floor((Math.random() * lengthOfWords))
    tempPassword = password.split("");
    for (var x = 0; x < loopNumber; x++) {
        var tempPos = Math.floor((Math.random() * lengthOfWords));
        tempPassword[tempPos] = password[tempPos].toUpperCase();
    }
    password = tempPassword.join("");
}