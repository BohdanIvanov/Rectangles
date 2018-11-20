const configureOutputRectangle = data => {
    const smallestRectData = getSmallestRect(data);

    localStorage.setItem("updatedRect-" + updatedRectLength, JSON.stringify({
        x: getXPosition(smallestRectData.index),
        y: smallestRectData.y,
        height: smallestRectData.height,
        width: updatedRectLength === 0 ? calcMaxWidth() : getRectWidth(rectStartOn)
    }));

    updatedRectLength++;

    for (let i = rectStartOn; i < rectEndOn; i++) {
        data[i].height -= smallestRectData.height;
    }

    validateRectangles(rectArray);
}

const createUpdatedRectangles = () => {
    if(rectArray.length === 0 && localStorage.length > 0) {
        const rectangles = Object.keys(localStorage);
        
        rectangles.forEach(rect => {
            const rectIdx = rect.split('-').pop();
            rectArray.splice(rectIdx, 0, JSON.parse(localStorage[rect]));
        });
        configureOutputRectangle(rectArray);
        drawUpdatedRectangles(canvasWidth);
    }
}

const drawUpdatedRectangles = canvasWidth => {
    let canvas = document.getElementById("finalCanvas"),
        context = canvas.getContext("2d");
    const rectangles = Object.keys(localStorage);

    canvas.width = canvasWidth;
    canvas.height = config.maxHeight;

    rectangles.forEach(rect => {
        const rectConfig = JSON.parse(localStorage[rect]);
        if (rect.includes("updated")) {
            context.strokeRect(rectConfig.x, rectConfig.y, rectConfig.width, rectConfig.height);
        }
    });
}

const getSmallestRect = data => {
    let y = 0,
        position = 0,
        smallerHeight = config.maxHeight;

    data.forEach((rectConfig, index) => {
        if (rectConfig.height < smallerHeight && rectConfig.height > 0) {
            y = rectConfig.y;
            smallerHeight = rectConfig.height;
            position = index;
        }
    });

    return {
        y,
        height: smallerHeight,
        index: position,
    };
}

const calcMaxWidth = () => {
    let width = 0;
        i = 0;

    rectArray.forEach(rect => {
        width += rect.width;
        i++;
    });

    rectEndOn = i;

    return width;
}

const getXPosition = index => {
    for (let i = index; i >= 0; i--) {
        if (rectArray[i].height === 0) {
            rectStartOn = i + 1;
            return rectArray[i + 1].x;
        }
    }

    rectStartOn = 0;

    return 0;
}

const getRectWidth = index => {
    let width = 0,
        i = index;

    while (i < rectArray.length && rectArray[i].height > 0) {
        width += rectArray[i].width;
        i++
    }

    rectEndOn = i;

    return width;
}
