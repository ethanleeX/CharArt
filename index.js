/**
 * transform image to character
 *
 * @author ethan lee
 */
const getImgData = (file, width, height) => {
    const img = new Image();
    img.src = file;
    const canvas = document.createElement('canvas');
    // canvas's default size is 300 * 150 so we should resize it
    const imgWidth = width || img.width;
    const imgHeight = height || imgWidth / img.width * img.height;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const context = canvas.getContext('2d');

    context.drawImage(img, 0, 0, imgWidth, imgHeight);
    const imgData = context.getImageData(0, 0, imgWidth, imgHeight).data;
    const result = [];
    let rowData = [];
    for (let i = 0; i < imgData.length; i += 4) {
        const rgba = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];
        const gray = _gray(rgba);
        const threshold = _threshold(gray);
        rowData.push(threshold);
        if (rowData.length === imgWidth) {
            result.push(rowData);
            rowData = [];
        }
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
