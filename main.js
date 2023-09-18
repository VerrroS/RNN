const textInput = document.getElementById('textInput');
const predictedInt = document.getElementById('predictedInt');
const output = document.getElementById('output');
let predictNextWords = 2;
let model;

function main(){
    console.log("DOM Content loaded");
    loadModel();
}

async function loadModel() {
    const modelPath = './tfjs_models/model/model.json'; // Passe den Pfad entsprechend an
    try {
        model = await tf.loadLayersModel(modelPath);
        console.log('Modell geladen');
    } catch (error) {
        console.error('Fehler beim Laden des Modells:', error);
    }
  }
  
async function HandleTextInput(event) {
    inputText = event.target.value;
    predicted = await predictNextWordsUsingModel(model, inputText, predictNextWords);
    output.innerHTML = predicted;
}

function SetPredictedInt(event) {
    predictNextWords = event.target.value;
}

async function predictNextWordsUsingModel(model, inputText, numWords) {
    const tokenizer = new Tokenizer();
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


textInput.addEventListener('input', HandleTextInput);
predictedInt.addEventListener('input', SetPredictedInt);

document.addEventListener('DOMContentLoaded', main);


