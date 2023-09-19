async function getMaxSequenceLength(type) {

    const myPath = `./tfjs_models/${type}/max_sequence_len.txt`;
    const response = await fetch(myPath);
    const data = await response.text();
    return data;
}

async function getWordIndex(type) {
    const myPath = `./tfjs_models/${type}/wordIndex.json`;
    const response = await fetch(myPath);
    const data = await response.json();
    return data;
}

class Tokenizer {
    constructor(type) {
        this.wordIndexPromise = getWordIndex(type);
        this.maxSequenceLenPromise = getMaxSequenceLength(type);
    }

    async initialize() {
        // Warte auf die Ergebnisse der asynchronen Funktionen und speichere sie.
        this.wordIndex = await this.wordIndexPromise;
        this.maxSequenceLen = await this.maxSequenceLenPromise;
    }

    async textsToSequences(texts) {
        await this.initialize();

        // split into array of words
        texts = texts.split(" ");
        var textLength = texts.length;
        const sequence = [];
        for (let i = 0; i < textLength; i++) {
            const word = texts[i].toLowerCase();
            if (this.wordIndex[word] !== undefined) {
                sequence.push(this.wordIndex[word]);
            }
        }
        return sequence;
    }

    async padSequences(sequence) {
        await this.initialize();

        const paddedSequence = [];
        for (const seq of sequence) {
            const pad = this.maxSequenceLen - seq.length -1;
            const paddedSeq = Array(pad).fill(0).concat(seq);
            paddedSequence.push(paddedSeq);
        }
        return paddedSequence;
    }

    wordIndex() {
        return this.wordIndex;
    }

    async getWordByIndex(index) {
        await this.initialize();

        for (const [word, wordIndex] of Object.entries(this.wordIndex)) {
            if (wordIndex === index) {
                return word;
            }
        }
    }
}

function argMax(array) {
    return [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0)
  }
