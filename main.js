const textInput = document.getElementById('textInput');
const predictedInt = document.getElementById('predictedInt');
const suggestions = document.getElementById('suggestions');
const slidervalue = document.getElementById('slider-value');
let predictNextWords = 2;
let model;
let inputText = null;

function main(){
    console.log("DOM Content loaded");
    loadModel("RNN");
    focusTextInput();
}

async function loadModel(type) {
    const modelPath = `./tfjs_models/${type}/model.json`;
    try {
        model = await tf.loadLayersModel(modelPath);
        console.log('Modell geladen');
    } catch (error) {
        console.error('Fehler beim Laden des Modells:', error);
    }
  }
  
async function HandleTextInput(event) {
    inputText = event.target.value;
    await predict();
}

async function predict() {
    if (inputText != null) {
        predicted = await predictNextWordsUsingModel(model, inputText, predictNextWords);
        SetPredictedVisual();   
    }
}

function SetPredictedVisual() {
    suggestions.innerHTML = predicted;
    if (inputText.length > 0) {
        suggestions.style.display = "block";
    } else {
        suggestions.style.display = "none";
    }
}

function SetPredictedInt(event) {
    predictNextWords = event.target.value;
    slidervalue.innerHTML = predictNextWords;
    predict();
}

async function predictNextWordsUsingModel(model, inputText, numWords) {
    const tokenizer = new Tokenizer("RNN");
        await tokenizer.initialize();
        for (let i = 0; i < numWords; i++) {
            const tokenList = await tokenizer.textsToSequences(inputText);
            const paddedTokenList = await tokenizer.padSequences([tokenList]);
            let predicted = model.predict(tf.tensor(paddedTokenList), [1, 1]);
            let predictedIndex = argMax(predicted.dataSync());
            let outputWord = await tokenizer.getWordByIndex(predictedIndex);
            inputText += " " + outputWord;
            //console.log(inputText);
        }
    return inputText;
  }

function focusTextInput() {
    textInput.focus();
}

textInput.addEventListener('input', HandleTextInput);
predictedInt.addEventListener('input', SetPredictedInt);

document.addEventListener('DOMContentLoaded', main);


