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






const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const valueDisplay = document.getElementById('value');

let value = 1;

decreaseBtn.addEventListener('click', () => {
    if (value > 1) value--;
    valueDisplay.textContent = value.toString();
});

increaseBtn.addEventListener('click', () => {
    if (value < 12) value++;
    valueDisplay.textContent = value.toString();
});

const STATIONS = [
    // Switzerland
    "Zermatt Bus Terminal",
    "Interlaken Ost Bus Station",
    "Grindelwald Bus Terminal",
    "Lauterbrunnen Bahnhof",
    "Lucerne Bahnhofquai",
    "Chamonix-Mont-Blanc Sud (France, near Swiss border)",
    "Geneva Bus Station",
    "Bern PostAuto Terminal",
    "Gstaad Bus Station",
    "St. Moritz Bahnhof PostAuto",
    "Verbier Village",
    "Davos Platz Postautohaltestelle",
    "Andermatt Gotthardpass",
    "Täsch Bahnhof (Shuttle to Zermatt)",
    "Flims Dorf Post",

    // France
    "Chamonix Sud Bus Station",
    "Annecy Gare Routière",
    "Grenoble Gare Routière",
    "Nice Airport (Bus to Alps)",
    "Bourg-Saint-Maurice Gare Routière",
    "Morzine Gare Routière",
    "Les Gets Gare Routière",
    "Val d'Isère Centre",
    "Courchevel 1850",
    "Megève Place du Village",

    // Italy
    "Aosta Autostazione",
    "Bolzano Autostazione",
    "Trento Autostazione",
    "Cortina d'Ampezzo Autostazione",
    "Bormio Bus Station",
    "Livigno Centro",
    "Merano Autostazione",
    "Sestriere Bus Stop",
    "Ortisei (St. Ulrich) Autostazione",
    "Canazei Piazza Marconi",

    // Austria
    "Innsbruck Hauptbahnhof Bus Terminal",
    "Salzburg Süd Busbahnhof",
    "Mayrhofen Bahnhof",
    "Lech am Arlberg Postamt",
    "Kitzbühel Hahnenkammbahn",
    "Ischgl Seilbahn",
    "Zell am See Postplatz",
    "Bad Gastein Bahnhof",
    "St. Anton am Arlberg Bahnhof",
    "Sölden Postamt",

    // Germany
    "Garmisch-Partenkirchen Bahnhof (Bus Station)",
    "Berchtesgaden Busbahnhof",
    "Oberstdorf Busbahnhof",
    "Füssen Bahnhof (Bus Station)",
    "Mittenwald Bahnhof (Bus Station)",

    // Slovenia
    "Bled Bus Station",
    "Bohinj Jezero",
    "Kranjska Gora Avtobusna Postaja"
];


//Departure

const departureInput = document.getElementById('departure-input')
const departureClear =document.getElementById('clear-button-departure')
const departureAutocompleteDropdown = document.getElementById('departure-autocomplete-dropdown')

// Появление дропдауна при фокусе на инпут
departureInput.addEventListener("focus", (event) => {
    departureAutocompleteDropdown.classList.remove('hidden')
    const value = event.target.value
    renderDepartureStations(value)
})

// Исчезновение дропдауна при расфокусировке
departureInput.addEventListener("blur", () => {
    departureAutocompleteDropdown.classList.add('hidden')
})

// Работа с содержимым инпута
departureInput.addEventListener("keyup", (event) => {
    const value = event.target.value

    renderDepartureStations(value)
})

function renderDepartureStations(value) {
    let filteredDepartureStations
    if (value.trim().length < 0) {
        filteredDepartureStations = STATIONS
    }
    else {
        filteredDepartureStations = STATIONS.filter(station => station.toUpperCase().includes(value.toUpperCase().trim()))
    }
    const filteredDepartureListElements = filteredDepartureStations.map(station => {
        const li = document.createElement("li")
        li.innerText = station; // <li>Kranjska Gora Avtobusna Postaja</li>
        return li
    })
    departureAutocompleteDropdown.innerHTML = ''
    // не найдена ни одна станция
    if (filteredDepartureListElements.length < 1) {
        departureAutocompleteDropdown.innerHTML = `<span class="not-found-span">Not found</span>`
    }
    else {
        departureAutocompleteDropdown.append(...filteredDepartureListElements) //append(li, li, li)
    }
}

// Делегирование событий
departureAutocompleteDropdown.addEventListener("mousedown", (event) => {
    if (event.target.nodeName === 'LI') {

        const selectedDeparture = event.target.innerText;
        const arrivalValue = arrivalInput.value;

        if (selectedDeparture === arrivalValue && selectedDeparture !== "") {
            showCheckStations()
        }

        departureInput.value = event.target.innerText
        departureToggleClearButton();
    }
})

// Появление крестика при вводе
function departureToggleClearButton() {
    departureClear.style.display = departureInput.value ? 'block' : 'none';
}

departureInput.addEventListener('input', departureToggleClearButton);


//Очистить поле при клике
departureClear.addEventListener('click', () => {
    departureInput.value = '';
    departureClear.style.display = 'none';
    departureInput.focus();
})

// Arrival

const arrivalInput = document.getElementById('arrival-input')
const arrivalClear = document.getElementById('clear-button-arrival')
const arrivalAutocompleteDropdown = document.getElementById('arrival-autocomplete-dropdown')

// Появление дропдауна при фокусе на инпут
arrivalInput.addEventListener("focus", (event) => {
    arrivalAutocompleteDropdown.classList.remove('hidden')
    const value = event.target.value
    renderArrivalStations(value)
})

// Исчезновение дропдауна при расфокусировке
arrivalInput.addEventListener("blur", () => {
    arrivalAutocompleteDropdown.classList.add('hidden')
})

// Работа с содержимым инпута
arrivalInput.addEventListener("keyup", (event) => {
    const value = event.target.value

    renderArrivalStations(value)
})

function renderArrivalStations(value) {
    let filteredArrivalStations
    if (value.trim().length < 0) {
        filteredArrivalStations = STATIONS
    }
    else {
        filteredArrivalStations = STATIONS.filter(station => station.toUpperCase().includes(value.toUpperCase().trim()))
    }
    const filteredArrivalListElements = filteredArrivalStations.map(station => {
        const li = document.createElement("li")
        li.innerText = station; // <li>Kranjska Gora Avtobusna Postaja</li>
        return li
    })
    arrivalAutocompleteDropdown.innerHTML = ''
    // не найдена ни одна станция
    if (filteredArrivalListElements.length < 1) {
        arrivalAutocompleteDropdown.innerHTML = `<span class="not-found-span">Not found</span>`
    }
    else {
        arrivalAutocompleteDropdown.append(...filteredArrivalListElements) //append(li, li, li)
    }
}

// Делегирование событий
arrivalAutocompleteDropdown.addEventListener("mousedown", (event) => {
    if (event.target.nodeName === 'LI') {

        const selectedArrival = event.target.innerText;
        const departureValue = departureInput.value;

        if (selectedArrival === departureValue && selectedArrival !== "") {
            showCheckStations()
            return; // прерываем, не устанавливаем значение
        }

        arrivalInput.value = event.target.innerText
        arrivalToggleClearButton();
    }
})


// Появление крестика при вводе
function arrivalToggleClearButton() {
    arrivalClear.style.display = arrivalInput.value ? 'block' : 'none';
}

arrivalInput.addEventListener('input', arrivalToggleClearButton);


//Очистить поле при клике
arrivalClear.addEventListener('click', () => {
    arrivalInput.value = '';
    arrivalClear.style.display = 'none';
    arrivalInput.focus();
})



function showCheckStations() {
    document.getElementById('custom-alert-station').classList.add('show');
}

function closeCheckStations() {
    document.getElementById('custom-alert-station').classList.remove('show');
}

window.closeCheckStations = closeCheckStations;