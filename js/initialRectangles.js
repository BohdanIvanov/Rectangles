const config = {
    maxWidth: 960,
    maxHeight: 300,
};

let rectArray = [],
    rectStartOn = 0,
    rectEndOn = 0,
    updatedRectLength = 0,

canvasWidth = 0;

const showNotification = () => {
    document.getElementById("notification").style.visibility = "visible";
    document.getElementById("notification").style.opacity = 1; 
}

const hideNotification = () => {
    document.getElementById("notification").style.visibility = "hidden";
    document.getElementById("notification").style.opacity = 0;  
}

const initRectangles = () => {
    let rectQuantity = document.getElementById("quantity").value;
    let updatedGraph = document.getElementById("finalCanvas"),
    updatedContext = updatedGraph.getContext("2d");
    if(rectQuantity >= 3 && rectQuantity <= 30){
        hideNotification();
        updatedContext.clearRect(0, 0, updatedGraph.width, updatedGraph.height);
        createRectangles(rectQuantity);
    } else {
        showNotification();
    }
}

const findStartCoord = index => {
    const prevRect = localStorage.getItem("initialRect-" + (index - 1));
    return prevRect !== null ? JSON.parse(prevRect).x + JSON.parse(prevRect).width : 0;
}

const generateRectData = (index, maxWidth) => {
    let height = getRandomValue(config.maxHeight, 10),
        width = getRandomValue(maxWidth, 10),
        x = findStartCoord(index),
        y = config.maxHeight - height;
    
    return {x, y, height, width, index};
}

const drawInitialRectangles = graphWidth => {
    let canvas = document.getElementById("initialCanvas"),
        context = canvas.getContext("2d");
    const rectangles = Object.keys(localStorage);
    canvas.width = graphWidth;
    canvas.height = config.maxHeight;

    rectangles.forEach(rect => {
        if (rect.includes("initial")) {
            const rectData = JSON.parse(localStorage[rect]);
            context.strokeRect(rectData.x, rectData.y, rectData.width, rectData.height);
        }
    });
}

const clearData = () => {
    localStorage.clear();
    rectArray = [];
    const rectInfo = {
        rectStartOn,
        rectEndOn,
        updatedRectLength,
    };
    Object.keys(rectInfo).forEach(key => rectInfo[key] = 0);
}

const createRectangles = quantity => {
    canvasWidth = window.innerWidth > config.maxWidth ? config.maxWidth : window.innerWidth,

    clearData();

    for (let i = 0; i < quantity; i++) {
        const generatedRect = generateRectData(i, canvasWidth / quantity);
        localStorage.setItem("initialRect-" + generatedRect.index, JSON.stringify({
            x: generatedRect.x,
            y: generatedRect.y,
            height: generatedRect.height,
            width: generatedRect.width,
        }));
    }    

    drawInitialRectangles(canvasWidth);
}


