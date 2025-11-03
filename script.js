const burgerIcon = document.getElementById('burger-icon')
const burgerMenu = document.getElementById('burger-menu')
const burgerLine1 = document.getElementById('burger-line1')
const burgerLine2 = document.getElementById('burger-line2')
const burgerLine3 = document.getElementById('burger-line3')
const links = burgerMenu.querySelectorAll('a');
const body = document.body;


let isOpen = false;
burgerIcon.addEventListener('click', () => {
    if (!isOpen) {
        burgerMenu.classList.remove('closing');
        burgerMenu.classList.add('active');
        body.classList.add('lock-scroll');
        burgerLine2.style.opacity = '0';
        burgerLine1.style.transform = 'rotate(45deg) translate(-8px, 20px)';
        burgerLine3.style.transform = 'rotate(-45deg) translate(-8px, -20px)';
        isOpen = true;
    }
    else {
        hiddenBurgerMenu()


    }
})

links.forEach(link => {
    link.addEventListener('click', () => {
        hiddenBurgerMenu()
    })
})

function hiddenBurgerMenu() {
    burgerMenu.classList.remove('active');
    burgerMenu.classList.add('closing');
    burgerLine2.style.opacity = '100%';
    burgerLine1.style.transform = 'initial';
    burgerLine3.style.transform = 'initial';
    body.classList.remove('lock-scroll');
    setTimeout(() => {
        burgerMenu.classList.remove('closing');
        isOpen = false;
    }, 400);
}