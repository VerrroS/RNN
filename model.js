class model{
    constructor(type){
        this.type = type;
        this.modelPath = `./tfjs_models/${type}/model.json`;
    }

    async loadModel(){
        try {
            this.model = await tf.loadLayersModel(this.modelPath);
            console.log('Modell geladen');
            this.predict();
            return true;
        } catch (error) {
            console.error('Fehler beim Laden des Modells:', error);
            return false;
        }
    }

    async predict (){
        if (inputText != null) {
            let predicted = await this.predictNextWordsUsingModel(inputText, predictNextWords);
            SetPredictedVisual(predicted);   
        }
    }

    async predictNextWordsUsingModel(inputText, numWords) {
        //console.log(typeof inputText)
        const tokenizer = new Tokenizer();
            await tokenizer.initialize();
            for (let i = 0; i < numWords; i++) {
                const tokenList = await tokenizer.textsToSequences(inputText);
                const paddedTokenList = await tokenizer.padSequences([tokenList]);
                let predicted = this.model.predict(tf.tensor(paddedTokenList), [1, 1]);
                let predictedIndex = argMax(predicted.dataSync());
                let outputWord = await tokenizer.getWordByIndex(predictedIndex);
                inputText += " " + outputWord;
                //console.log(inputText);
            }
        return inputText;
        }
}