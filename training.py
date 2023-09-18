import pandas as pd
import tensorflow as tf
import nltk
import numpy as np

inputText = "I am a dummy text, living in a dummy world."

tokenizer = nltk.tokenize.RegexpTokenizer(r'\w+')
tokens = tokenizer.tokenize(inputText)

uniqueTokens = np.unique(tokens)
uniqueTokenIndex = {token: idx for idx, token in enumerate(uniqueTokens)}

nWords = 3
inputWords = []
nextWords = []

for i in range(len(tokens) - nWords):
    inputWords.append(tokens[i:i + nWords])
    nextWords.append(tokens[i + nWords])

print(inputWords)