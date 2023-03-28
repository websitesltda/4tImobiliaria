const ColorPrimary = "#F58732";
const ColorWhite = "#FFFFFF";
const ColorGray = "#5b5b5b";
const ColorGray100 = "#eeeeee";
const ColorGray200 = "#999999";
const ColorBlack = "#000000";
const ColorRed = "#F00000";
const ColorGreen = "#4dd711";
const ColorRedDard = "#7c2e2e";

function Aliatorio() {
    return Math.random() * (99 - 10) + 10;
};

function Parametro() {
    const Data = (new Date().getTime()).toString();
    var arr = [];
    for (var i = 10; i < Data.length; i++) {
        arr[i] = (Aliatorio() + Data.charCodeAt(i).toString(16)).slice(-4).substring(0, 20);
    }
    return arr.join("").replace('------', '');
};

const API = "http://200.233.145.221:16888/node/api/authenticate/twofa";

export default { ColorPrimary, ColorWhite, ColorRedDard, ColorGreen, ColorGray, ColorRed, ColorGray100, ColorGray200, Parametro, ColorBlack, API };