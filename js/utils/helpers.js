const getRandomValue = (max, min) => Math.ceil( min + Math.random() * (max - min));

const validateRectangles = (data) => {
    data.forEach(rect => {
        if (rect.height > 0) {
            configureOutputRectangle(data);
        }
    })
}