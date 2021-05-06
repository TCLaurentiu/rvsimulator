let drawDot = (canvas, x, y) => {
    canvas.fillRect(x, y, 2, 2);
}

let width = 1000,
    height = 300;

let plot = (canvas, data, yCoords, hasNegativeX = 0) => {
    console.log(yCoords);
    console.log(data);
    canvas = canvas.getContext("2d");

    // if data is an array, transform it into an object, for normalization between discrete and continuous
    if (Array.isArray(data)) {
        let aux = data;
        data = {
            y: [],
            x: [],
        }
        aux.forEach((e, i) => {
            data.y.push(e);
            data.x.push(i);
        })
    }

    // draw the axis
    canvas.moveTo(0, height - 25);
    canvas.lineTo(width, height - 25);
    canvas.strokeStyle = "gray";
    canvas.stroke();
    if (hasNegativeX) {
        canvas.moveTo(width / 2, 0);
        canvas.lineTo(width / 2, height);
    } else {
        canvas.moveTo(25, 0);
        canvas.lineTo(25, height);
    }
    canvas.stroke();

    let max = -1,
        len = data.x.length,
        specialX = -9999,
        specialY = -9999;
    for (let i = 0; i < len; i++)
        if (Math.abs(data.y[i]) > max) max = Math.abs(data.y[i]);

    let umH = (height - 50) / (max),
        umV = (width - 50) / len;
    // plot the actual data
    for (let i = 0; i < len; i++) {
        drawDot(canvas, 25 + (data.x[i]) * umV, height - (data.y[i] * umH) - 26);
    }


    // draw 10 coordinates on the x axis
    for (let i = 0; i <= len; i += (len / 10)) {
        if (i == 0) {
            canvas.fillText(i, 27 + i * umV, height - 15);
        } else {
            let measure = canvas.measureText(i);
            canvas.fillText(i == parseInt(i) ? i : i.toFixed(2), 24 + i * umV - measure.width / 2, height - 15);
        }
    }

    for (let i = 0; i < yCoords.length; i++) {
        let measure = canvas.measureText(yCoords[i]);
        measure.width = 0;
        if (yCoords[i] > 0) {
            canvas.fillText(yCoords[i], 18 - measure.width / 2 - 5, height - (yCoords[i] * umH) - 23);
        } else {
            canvas.fillText(yCoords[i], 18 - measure.width / 2 - 5, height - (yCoords[i] * umH) - 30);
        }
    }


}