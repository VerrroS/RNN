const testNextWords = document.getElementById("testNextWords");
const score = document.getElementById("score");
const progressbar = document.getElementById("progressbar");
const sliderValueNextWords = document.getElementById("slider-value-nextWordsTest");
let nextWords = 2;

function removePunctuation(text) {
    var punctuation = /[\.,?!]/g;
    var newText = text.replace(punctuation, "");
    return newText;
  }

function prepareValidationData(validationData){
    validationData = String(validationData);
    validationData = removePunctuation(validationData);
    validationData = validationData.split(" ");
    for (let i = 0; i < validationData.length; i++){
        validationData[i] = validationData[i].toLowerCase();
        //console.log(validationData[i]);
    }
    return validationData;
}


async function testModel(){
    let validationData = await loadValidationData();
    validationData = prepareValidationData(validationData);
    predictValidationData(validationData, nextWords);
}

async function loadValidationData() {
    path = `./trainingData/validationData.txt`;
    const response = await fetch(path);
    return await response.text();
    }

async function predictValidationData(validationData, nextWords) {
    let rightCounter = 0;
    let total = 0;
    let progress = 0;
    for (let i = 0; i < validationData.length - 1; i++) { 
        const word = validationData[i];
        const nextWord = validationData[i + 1]; 
        let predictedWords = await currentModel.predictNextWordsUsingModel(word, nextWords);
        predictedWords = predictedWords.split(" ")
        predictedWords = Array.from(predictedWords);
        if (predictedWords.includes(nextWord)) {
            rightCounter++;
        }
        total++;
        progress = Math.round((i / validationData.length) * 100);
        progressbar.style.width = `${progress}%`;
    }
    probability = Math.round((rightCounter / total) * 10000) / 100;
    score.innerHTML = `The probability that the right next word is in the ${nextWords} next predicted words is ${probability}%`;
}

function HandleNextWordsChanged(e){
    nextWords = e.target.value;
    const text = `Test the probability of the correct prediction in the next ${nextWords} word(s)`;
    sliderValueNextWords.innerHTML = text;
}


testNextWords.addEventListener('input', HandleNextWordsChanged);