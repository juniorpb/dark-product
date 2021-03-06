const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelectorAll('.gradient');
const shoeBg = document.querySelector('.shoeBackgroud');

let prevColor = "blue";
let animationEnd = true;
function changeSize() {
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor() {
    if(!animationEnd) return;

    // get atributes
    let primaryColor = this.getAttribute('primary');
    let color = this.getAttribute('color');
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

    colors.forEach(color => color.classList.remove('active'));
    this.classList.add('active');   
    
    document.documentElement.style.setProperty('--primary', primaryColor);

    shoes.forEach(shoe => shoe.classList.remove('show'));
    shoe.classList.add('show');

    gradients.forEach(g => g.classList.remove('first', 'second'));
    gradient.classList.add('first');
    prevGradient.classList.add('second');

    prevColor = color;
    animationEnd = false;

    gradient.addEventListener('animationend', () => {
        animationEnd = true;
    });
} 

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(color => color.addEventListener('click', changeColor));

let screen = window.matchMedia("(max-width: 1000px)");

function changeHeight() {
    if(screen.matches) {
        let shoeHeight = shoes[0].offsetHeight;
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    
    } else {
        shoeBg.style.height = "475px";
    }
}

window.addEventListener('resize', changeHeight);

// Dark Mode
const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) =>
    window
    .getComputedStyle(element)
    .getPropertyValue(style)


const initialColors = {
    bg: getStyle(html, "--bg"),
    bgPanel: getStyle(html, "--bg-panel"),
    colorHeadings: getStyle(html, "--color-headings"),
    colorText: getStyle(html, "--color-text"),
}

const darkMode = {
    bg: "#565656",
    bgPanel: "#434343",
    colorHeadings: "#3664FF",
    colorText: "#fbfbfb"
}

const transformKey = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()


const changeColors = (colors) => {
    Object.keys(colors).map(key =>
        html.style.setProperty(transformKey(key), colors[key])
    )
}


checkbox.addEventListener("change", ({
    target
}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors)
})