/**
 * transform image to character
 *
 * @author ethan lee
 */
const img2character = (file) => {

};

const getImgData = (file) => {
    const img = new Image();
    img.src = file;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    // canvas's default size is 300 * 150 so we should resize it
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    const imgData = context.getImageData(0, 0, img.width, img.height).data;
    const result = [];
    let rowData = [];
    for (let i = 0; i < imgData.length; i += 4) {
        const rgba = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];
        const gray = _gray(rgba);
        const threshold = _threshold(gray);
        rowData.push(threshold);
        if (rowData.length === img.width) {
            result.push(rowData);
            rowData = [];
        }
    }
    return result;
};

const sampleImgData = (imgData, rateX = 1, rateY = 1) => {
    const result = [];
    for (let i = 0; i < imgData.length; i += rateY) {
        const rowResult = [];
        for (let j = 0; j < imgData[i].length; j += rateY) {
            rowResult.push(imgData[i][j]);
        }
        result.push(rowResult);
    }
    return result;
};

// gray = 0.30r + 0,59g + 0.11b
const _gray = (pixelData) => {
    return Math.floor(pixelData[0] * 0.30 + pixelData[1] * 0.59 + pixelData[2] * 0.11);
};

const _threshold = (data) => {
    return data > 127 ? 1 : 0;
};
