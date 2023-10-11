const hexInputRef = document.getElementById("hexInput");
const sliderRef = document.getElementById("slider");
const inputColorRef = document.getElementById("inputColor");
const alteredColorRef = document.getElementById("alteredColor");


const isValidHex = (hex) => {
    if (!hex) {
        return false;
    }

    const strippedHex = hex.replace("#", "");
    return strippedHex.length === 3
        || strippedHex.length === 6;
}


hexInputRef.addEventListener("keyup", () => {
    const hex = hexInputRef.value;
    if (!isValidHex(hex)) {
        return;
    }

    const strippedHex = hex.replace("#", "");
    inputColorRef.style.backgroundColor = "#" + strippedHex;
})

const hexToRgb = (hex) => {
    if (!isValidHex(hex)) {
        return null
    }

    let strippedHex = hex.replace("#", "");
    if (strippedHex.length === 3) {
        strippedHex = duplicateEachChar(strippedHex);
    }

    return {
        r: parseInt(strippedHex.substring(0, 2), 16),
        g: parseInt(strippedHex.substring(2, 4), 16),
        b: parseInt(strippedHex.substring(4, 6), 16),
    };
}

const rgbToHex = (r, g, b) => {
    const pairs = [
        ("0" + r.toString(16)).slice(-2),
        ("0" + g.toString(16)).slice(-2),
        ("0" + b.toString(16)).slice(-2)
    ]

    return "#" + pairs[0] + pairs[1] + pairs[2];
}


const duplicateEachChar = (string) => {
    let modifiedString = "";
    for (let char of string) {
        modifiedString += char + char;
    }
    return modifiedString;
}
