async function testModel(){
    let validationData = await loadValidationData();
    predictValidationData(validationData);
}


async function loadValidationData() {
    path = `./trainingData/validationData.txt`;
    const response = await fetch(path);
    return await response.text();
    }

async function predictValidationData(validationData) {
    validationData = validationData.split(" ");
    for (let i = 0; i < validationData.length; i++) {
        const word = validationData[i].toLowerCase();
        console.log(model);
        predictedWords = await predictNextWordsUsingModel(model, word, 1);
        console.log(predictedWords);
        if (predictedWords.includes(validationData[i+1])) {
            console.log("Richtig");
        }
        else {
            console.log("Falsch");
        }
    }
}