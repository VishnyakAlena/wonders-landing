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

let value = 0;

function updateButtons() {
    // Кнопка уменьшения
    if (value > 1) {
        decreaseBtn.classList.add('active-button');
    } else {
        decreaseBtn.classList.remove('active-button');
    }

    // Кнопка увеличения
    if (value < 12) {
        increaseBtn.classList.add('active-button');
    } else {
        increaseBtn.classList.remove('active-button');
    }
}
decreaseBtn.addEventListener('click', () => {
    if (value > 1) {
        value--;
        valueDisplay.textContent = value.toString();
        updateButtons();
    }
});

increaseBtn.addEventListener('click', () => {
    if (value < 12) {
        value++;
        valueDisplay.textContent = value.toString();
        updateButtons();
    }
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



const calendarBlock = document.querySelector('.calendar')
const leftMonthYearEl = document.querySelector('.left-month-year')
const rightMonthYearEl = document.querySelector('.right-month-year')
const prevMonthBtn = document.querySelector('.prev-month-button')
const nextMonthBtn = document.querySelector('.next-month-button')
const currMonthDatesEl = document.querySelector('.curr-month-dates')
const nextMonthDatesEl = document.querySelector('.next-month-dates')
const departureBtn = document.getElementById('departure-date-button');
const returnBtn = document.getElementById('return-date-button');
const departureText = document.getElementById('departure-text');
const returnText = document.getElementById('return-text');
const applyBtn = document.getElementById('apply-btn');
const resetBtn = document.getElementById('reset-btn');
const tripTypeRadios = document.querySelectorAll('input[name="type-trip"]');
tripTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        // при любом переключении типа поездки сбрасываем даты
        departDate = null;
        returnDate = null;
        clearSelection()
        departureText.textContent = 'Depart';
        returnText.textContent = 'Return';
        departureText.style.color = 'var(--primary-grey)';
        returnText.style.color = 'var(--primary-grey)';

        if (radio.value === 'one-way' && radio.checked) {
            // делаем кнопку возврата недоступной
            returnBtn.disabled = true;
            returnBtn.classList.add('disabled');
            returnBtn.classList.remove('selected-border');
        } else if (radio.value === 'round-trip' && radio.checked) {
            // снова включаем кнопку возврата
            returnBtn.disabled = false;
            returnBtn.classList.remove('disabled');
        }
    });
});


let activeButton = null

document.querySelectorAll('.date-input-button').forEach(button => {
    button.addEventListener('click', () => {
        activeButton = button
        calendarBlock.classList.toggle('hidden')
    })
})

class Calendar {
    #currentDate = new Date()
    #nextDate
    #leftMonthYearEl
    #rightMonthYearEl
    #prevMonthBtn
    #nextMonthBtn
    #currMonthDatesEl
    #nextMonthDatesEl

    constructor(leftMonthYearEl, rightMonthYearEl, prevMonthBtn, nextMonthBtn, currMonthDatesEl, nextMonthDatesEl) {
        this.#leftMonthYearEl = leftMonthYearEl
        this.#rightMonthYearEl = rightMonthYearEl
        this.#prevMonthBtn = prevMonthBtn
        this.#nextMonthBtn = nextMonthBtn
        this.#currMonthDatesEl = currMonthDatesEl
        this.#nextMonthDatesEl = nextMonthDatesEl
    }

    init() {
        this.#updateNextDate()
        this.#render()

        this.#prevMonthBtn.addEventListener('click', function () {
            this.#goPrevMonth()
            this.#render()
        }.bind(this))
        this.#nextMonthBtn.addEventListener('click', function (){
            this.#goNextMonth()
            this.#render()
        }.bind(this))
    }

    #updateNextDate() {
        const year = this.#currentDate.getFullYear()
        const month = this.#currentDate.getMonth()
        this.#nextDate = new Date(year, month + 1, 1) // В следующем месяце число сбрасываем на 1-е, чтобы избежать перепрыгивания через месяц, так как если этого не сделать, а просто месяц текущей даты увеличить на 1, то в случае, если в текущем месяце количество дней больше, чем в следующем, то в последний день текущего месяца следующий месяц перескочит через 1 (например последний день октября 31-е число, а в ноябре 30 дней, то 31 октября увеличивая месяц на 1 будет искаться день, которого нет, так как в ноябре 30 дней, и не найдя его дата перескочит на 1 декабря, в результате 31 октября текущий месяц будет отражаться октябрь, а следующий декабрь
    }

    #goPrevMonth(){
        this.#currentDate.setMonth(this.#currentDate.getMonth() - 1)
        this.#updateNextDate()
    }

    #goNextMonth(){
        this.#currentDate.setMonth(this.#currentDate.getMonth() + 1)
        this.#updateNextDate()
    }

    #getMonthMatrix(dateObj) {
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const firstDay = new Date(year, month, 1)
        const firstDayMonthIndex = (firstDay.getDay() + 6) % 7

        const matrix = []
        // первая неделя
        const firstWeek = new Array(7).fill(null)
        let dayCounter = 1

        // Заполняем массив первой недели (до 1 числа)
        for (let i = 0; i < firstDayMonthIndex; i++) {
            firstWeek[i] = null
        }
        // Заполняем остаток недели (после 1 числа)
        for (let i = firstDayMonthIndex; i < 7; i++) {
            firstWeek[i] = dayCounter
            dayCounter++
        }

        // Добавляем в матрицу первую неделю
        matrix.push(firstWeek)

        // Заполняем остальные дни других недель
        while (dayCounter <= daysInMonth) {
            const newWeek = new Array(7).fill(null)
            for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
                newWeek[i] = dayCounter
                dayCounter++
            }
            matrix.push(newWeek)
        }
        return matrix
    }

    #render() {
        this.#leftMonthYearEl.innerText = this.#currentDate.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})
        this.#rightMonthYearEl.innerText = this.#nextDate.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})

        const currentMonthMatrix = this.#getMonthMatrix(this.#currentDate)
        const nextMonthMatrix = this.#getMonthMatrix(this.#nextDate)

        this.#currMonthDatesEl.innerHTML = ''
        this.#nextMonthDatesEl.innerHTML = ''

        currentMonthMatrix.forEach((week) => {
            week.forEach((day) => {
                if (!day) {
                    this.#currMonthDatesEl.innerHTML += `<span class="empty"></span>`
                }
                else {
                    this.#currMonthDatesEl.innerHTML += `<button type="button" class="date"><span class="circle">${day}</span></button>`
                }
            })
        })

        nextMonthMatrix.forEach((week) => {
            week.forEach((day) => {
                if (!day) {
                    this.#nextMonthDatesEl.innerHTML += `<span class="empty"></span>`
                }
                else {
                    this.#nextMonthDatesEl.innerHTML += `<button type="button" class="date"><span class="circle">${day}</span></button>`
                }
            })
        })
        attachDateClickHandlers();
        restoreSelection()
    }
}

let departDate = null;
let returnDate = null;

const calendar = new Calendar(leftMonthYearEl, rightMonthYearEl, prevMonthBtn, nextMonthBtn, currMonthDatesEl, nextMonthDatesEl)
calendar.init()

function attachDateClickHandlers() {
    const dateButtons = document.querySelectorAll('.date');
    dateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const day = parseInt(btn.textContent.trim());
            const monthYear = btn.closest('.month').querySelector('.month-year').textContent.trim();
            const fullDateStr = `${day} ${monthYear}`;
            const clickedDate = new Date(fullDateStr);

            if (!departDate || (departDate && returnDate)) {
                // Первый клик или сброс — выбираем дату отправления
                departDate = clickedDate;
                returnDate = null;
                clearSelection();
                btn.classList.add('selected-date');
                departureBtn.classList.add('selected-border');
                returnBtn.classList.remove('selected-border');
                departureText.textContent = formatDate(departDate);
                departureText.style.color = 'var(--primary-black)';
                returnText.textContent = 'Return';
                returnText.style.color = 'var(--primary-grey)';
            } else if (departDate && !returnDate) {
                // Второй клик — выбираем дату возвращения
                if (returnBtn.disabled) {
                    // если поле недоступно — просто игнорируем второй клик
                    btn.classList.add('not-allowed');
                    return;
                }
                if (clickedDate > departDate) {
                    returnDate = clickedDate;
                    btn.classList.add('selected-date');
                    highlightRange(departDate, returnDate);
                    applyWeekEdgeRounding()
                    returnBtn.classList.add('selected-border');
                    departureBtn.classList.remove('selected-border');
                    returnText.textContent = formatDate(returnDate);
                    returnText.style.color = 'var(--primary-black)';
                } else {
                    showAlertDates();
                }
            }
        });
    });
}

function clearSelection() {
    const dateButtons = document.querySelectorAll('.date');
    dateButtons.forEach(btn => {
        btn.classList.remove('selected-date', 'in-range');
        departureBtn.classList.remove('selected-border');
        returnBtn.classList.remove('selected-border');
    });
}

function highlightRange(start, end) {
    const dateButtons = document.querySelectorAll('.date');
    dateButtons.forEach(btn => {
        const day = parseInt(btn.textContent.trim());
        const monthYear = btn.closest('.month').querySelector('.month-year').textContent.trim();
        const currentDate = new Date(`${day} ${monthYear}`);

        if (currentDate > start && currentDate < end) {
            btn.classList.add('in-range');
        }
    });
}

function applyWeekEdgeRounding() {
    const containers = [
        document.querySelector('.curr-month-dates'),
        document.querySelector('.next-month-dates')
    ];

    containers.forEach(container => {
        if (!container) return;

        const allElements = Array.from(container.children);
        const dateButtons = allElements.filter(el => el.classList.contains('date'));

        dateButtons.forEach(btn => {
            btn.classList.remove('range-start', 'range-end');

            if (btn.classList.contains('in-range')) {
                const day = parseInt(btn.textContent.trim());
                const monthYear = btn.closest('.month').querySelector('.month-year')?.textContent.trim();
                const fullDateStr = `${day} ${monthYear}`;
                const date = new Date(fullDateStr);

                const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

                if (dayOfWeek === 1) {
                    btn.classList.add('range-start'); // Понедельник
                }

                if (dayOfWeek === 0) {
                    btn.classList.add('range-end'); // Воскресенье
                }
            }
        });
    });
}

function showAlertDates() {
    document.getElementById('custom-alert-dates').classList.add('show');
}

function closeAlertDates() {
    document.getElementById('custom-alert-dates').classList.remove('show');
}

window.closeAlertDates = closeAlertDates;


function formatDate(date) {
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function restoreSelection() {
    const dateButtons = document.querySelectorAll('.date');

    dateButtons.forEach(btn => {
        const day = parseInt(btn.textContent.trim());
        const monthYearEl = btn.closest('.month')?.querySelector('.month-year');
        const monthYear = monthYearEl ? monthYearEl.textContent.trim() : '';
        const fullDateStr = `${day} ${monthYear}`;
        const currentDate = new Date(fullDateStr);

        btn.classList.remove('selected-date', 'in-range', 'range-start', 'range-end');

        if (departDate && currentDate.getTime() === departDate.getTime()) {
            btn.classList.add('selected-date');
        }

        if (returnDate && currentDate.getTime() === returnDate.getTime()) {
            btn.classList.add('selected-date');
        }

        if (departDate && returnDate && currentDate > departDate && currentDate < returnDate) {
            btn.classList.add('in-range');

            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 1) btn.classList.add('range-start'); // Monday
            if (dayOfWeek === 0) btn.classList.add('range-end');   // Sunday
        }
    });
}

function showAlertChoose() {
    document.getElementById('custom-alert-choose').classList.add('show');
}

function closeAlertChoose() {
    document.getElementById('custom-alert-choose').classList.remove('show');
}

window.closeAlertChoose = closeAlertChoose;


applyBtn.addEventListener('click', () => {
    const isReturnEnabled = !returnBtn.disabled;
    if (departDate && (!isReturnEnabled || returnDate)) {
        calendarBlock.classList.add('hidden'); // скрываем календарь
        departureBtn.classList.remove('selected-border');
        returnBtn.classList.remove('selected-border');
    } else {
        showAlertChoose();
    }
});
resetBtn.addEventListener('click', () => {
    departDate = null;
    returnDate = null;
    departureText.textContent = 'Depart';
    departureText.style.color = 'var(--primary-grey)'
    returnText.textContent = 'Return';
    returnText.style.color = 'var(--primary-grey)'
    clearSelection()
})

document.addEventListener('click', (event) => {
    const clickedOutside =
        !calendarBlock.contains(event.target) &&
        !departureBtn.contains(event.target) &&
        !returnBtn.contains(event.target);

    if (clickedOutside) {
        calendarBlock.classList.add('hidden'); // скрываем календарь
    }
});

const form = document.querySelector('.ticket-order-form');

form.addEventListener('submit', function (e) {
    const selected = document.querySelector('input[name="type-trip"]:checked');
    const isReturnEnabled = !returnBtn.disabled;
    if (!selected || parseInt(valueDisplay.textContent.trim(), 10) < 1 || !departureInput.value.trim() || !arrivalInput.value.trim() || !departDate || (!isReturnEnabled && returnDate)) {
        e.preventDefault();
        showAlertSubmit();
    }
});



function showAlertSubmit() {
    document.getElementById('custom-alert-submit').classList.add('show');
}

function closeAlertSubmit() {
    document.getElementById('custom-alert-submit').classList.remove('show');
}

window.closeAlertSubmit = closeAlertSubmit;

