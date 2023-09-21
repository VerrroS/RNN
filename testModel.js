async function testModel(currentModel){
    let validationData = await loadValidationData();
    let predictions = predictValidationData(validationData);
    let accuracies = evaluatePredictions(validationData, predictions);
}


function evaluatePredictions(validationData, predictions) {
    const kValues = [1, 5, 10, 20, 100];
    const accuracies = {};

    for (const k of kValues) {
        accuracies[k] = 0;
    }

    for (let i = 0; i < validationData.length; i++) {
        const trueNextWords = validationData[i].slice(initialSequenceLength);
        const predictedWords = predictions[i];

        for (const k of kValues) {
            if (predictedWords.slice(0, k).includes(trueNextWords[0])) {
                accuracies[k]++;
            }
        }
    }

    const totalSentences = validationData.length;

    for (const k of kValues) {
        const accuracy = accuracies[k] / totalSentences;
        console.log(`Accuracy @ ${k}: ${accuracy}`);
    }
    return accuracies;
}

async function loadValidationData() {
    path = `./tfjs_models/validationData.json`;
    const response = await fetch(path);
    return await response.json();
    }

function predictValidationData(validationData) {
    for (const sentence of validationData) {
        const initialSequence = sentence.slice(0, initialSequenceLength);
        const predictedWords = [];

        for (let i = 0; i < predictedSequenceLength; i++) {
            const predictedWord = predictNextWord(initialSequence);
            predictedWords.push(predictedWord);
            initialSequence.shift();
            initialSequence.push(predictedWord);
        }

        predictions.push(predictedWords);
    }
    return predictions;
}