const textInput = document.getElementById('textInput');
const predictedInt = document.getElementById('predictedInt');
const suggestions = document.getElementById('suggestions');
const slidervalue = document.getElementById('slider-value');
const toggleModel = document.getElementById('toggleModel');
const testButton = document.getElementById('testButton');
const helpIcon = document.getElementsByClassName("help-icon");
let predictNextWords = 2;
let inputText = null;
let currentModel;

function main(){
    console.log("DOM Content loaded");
    rnnModel = new model("RNN");
    rnnModel.loadModel();
    ffnnModel = new model("FFNN");
    ffnnModel.loadModel();
    currentModel = rnnModel;
    focusTextInput();
}

async function HandleTextInput(event) {
    inputText = event.target.value;
    await currentModel.predict();
}


function SetPredictedVisual(predicted) {
    suggestions.innerHTML = predicted;
    if (inputText.length > 0) {
        suggestions.style.display = "block";
    } else {
        suggestions.style.display = "none";
    }
}

function SetPredictedInt(event) {
    predictNextWords = event.target.value;
    slidervalue.innerHTML = "Number of predicted words " + predictNextWords;
    currentModel.predict();
}

function focusTextInput() {
    textInput.focus();
}

function ToggleModel(e) {
    ToggleModelVisual();
    currentModel.predict();
}


function ToggleModelVisual() {
    const RNN = document.getElementById('RNN');
    const FFNN = document.getElementById('FFNN');
    const slider = document.getElementById('slider');
    if (currentModel.type == "RNN") {
        currentModel = ffnnModel;
        RNN.style.display = "none";
        FFNN.style.display = "block";
        slider.classList.add("slider-active");
        toggleModel.classList.add("switch-active");
    }

    else {
        currentModel = rnnModel;
        RNN.style.display = "block";
        FFNN.style.display = "none";
        slider.classList.remove("slider-active");
        toggleModel.classList.remove("switch-active");
    }
}

function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
  }


function openHelper(e) {
    key = this.dataset.key;
    helper = document.getElementById(key);
    helper.style.display = "block";
}

function closeHelper(e) {
    key = this.dataset.key;
    helper = document.getElementById(key);
    helper.style.display = "none";
}


function toggleHelper(e) {
    key = this.dataset.key;
    helper = document.getElementById(key);
    if (helper.style.display == "none"){
        helper.style.display = "block";
    }
    else{
        helper.style.display = "none";
    }
}

textInput.addEventListener('input', HandleTextInput);
predictedInt.addEventListener('input', SetPredictedInt);
toggleModel.addEventListener('click', ToggleModel);
testButton.addEventListener('click', testModel);

Array.from(helpIcon).forEach(element => {
    if (isTouchDevice()){
        element.addEventListener("click", toggleHelper)
    }
    else{
        element.addEventListener("mouseover", openHelper),
        element.addEventListener("mouseout", closeHelper)
    }
  });

document.addEventListener('DOMContentLoaded', main);