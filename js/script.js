'use strict';

window.addEventListener('DOMContentLoaded', () => {


    /// TABS


    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabContent();
    tabsParent.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });


    // TIMER

    const deadline = '2020-12-01';

    function getTimeRemaining(endtime) {
        const time = Date.parse(deadline) - Date.parse(new Date())
        const days = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((time / 1000 / 60) % 60),
            seconds = Math.floor((time / 1000) % 60);

        return {
            time,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function addZero(number) {
        if (number < 10 && number >= 0) {
            return '0' + number;
        } else {
            return number;
        }

    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 950);

        updateClock();

        function updateClock() {
            const time = getTimeRemaining(endtime);

            days.innerHTML = addZero(time.days);
            hours.innerHTML = addZero(time.hours);
            minutes.innerHTML = addZero(time.minutes);
            seconds.innerHTML = addZero(time.seconds);

            if (time.time <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    //  MODAL WINDOW

    const modalWindowOpen = document.querySelectorAll('[data-modal]'),
        modalBlock = document.querySelector('.modal'),
        modalWindowClose = document.querySelector('[data-close]');


    function openModal(modalWindow = modalBlock) {
        modalWindow.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal(modalWindow = modalBlock) {
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }
    modalWindowOpen.forEach(item => {
        item.addEventListener('click', () => {
            openModal(modalBlock);
        });
    });

    modalWindowClose.addEventListener('click', () => {
        closeModal(modalBlock);
    });

    modalBlock.addEventListener('click', event => {
        if (event.target === modalBlock) {
            closeModal(modalBlock);
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Escape' && modalBlock.classList.contains('show')) {
            closeModal();
        }
    })

    // const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

    }

    window.addEventListener('scroll', showModalByScroll);




    // using classes for cards




    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = parentSelector;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        createCard() {
            const card = document.createElement('div');

            if (this.classes.length === 0) {
                this.defaultClass = 'menu__item';
                card.classList.add(this.defaultClass);
            } else {
                this.classes.forEach(className => card.classList.add(className));
            }

            card.innerHTML = ` 
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parentSelector.append(card);
        }
    }

    const menuContainer = document.querySelector('.menu__field').querySelector('.container')


    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        13,
        menuContainer,
        'menu__item'
    ).createCard();

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        30,
        menuContainer,
    ).createCard();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        20,
        menuContainer,
        'menu__item'
    ).createCard();
});