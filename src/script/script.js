const hexInputRef = document.getElementById("hexInput");
const sliderRef = document.getElementById("slider");
const sliderTextRef = document.getElementById("sliderText");
const inputColorRef = document.getElementById("inputColor");
const alteredColorRef = document.getElementById("alteredColor");
const alteredColorTextRef = document.getElementById("alteredColorText");
const lighterTextRef = document.getElementById("lighterText");
const darkerTextRef = document.getElementById("darkerText");
const toggleBtnRef = document.getElementById("toggleBtn");


const isValidHex = (hex) => {
    if (!hex) {
        return false;
    }

    const strippedHex = hex.replace("#", "");
    return strippedHex.length === 3
        || strippedHex.length === 6;
}


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

const alterColor = (hex, percentage) => {
    const {r, g, b} = hexToRgb(hex);

    const amount = Math.floor((percentage / 100) * 255);
    return rgbToHex(increaseRgbPiece(r, amount), increaseRgbPiece(g, amount), increaseRgbPiece(b, amount));
}

const increaseRgbPiece = (rgbPiece, amount) => {
    return Math.min(255, Math.max(0, rgbPiece + amount));
}


hexInputRef.addEventListener("keyup", () => {
    const hex = hexInputRef.value;
    if (!isValidHex(hex)) {
        return;
    }

    const strippedHex = hex.replace("#", "");
    inputColorRef.style.backgroundColor = "#" + strippedHex;
});


sliderRef.addEventListener("input", () => {
    if (!isValidHex(hexInputRef.value)) {
        return;
    }
    sliderTextRef.textContent = sliderRef.value + "%";

    const valueAddition =
        toggleBtnRef.classList.contains('toggled') ?
            -sliderRef.value
            : sliderRef.value;

    const alteredHex = alterColor(hexInputRef.value, valueAddition);
    alteredColorRef.style.backgroundColor = alteredHex;

    alteredColorTextRef.textContent = alteredHex;

});


toggleBtnRef.addEventListener('click', () => {
    if (toggleBtnRef.classList.contains('toggled')) {
        toggleBtnRef.classList.remove('toggled');
        lighterTextRef.classList.remove('unselected');
        darkerTextRef.classList.add('unselected');
    } else {
        toggleBtnRef.classList.add('toggled');
        lighterTextRef.classList.add('unselected');
        darkerTextRef.classList.remove('unselected');
    }
});