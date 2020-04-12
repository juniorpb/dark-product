const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelectorAll('.gradient');

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