var _a, _b, _c;
import dataPets from '../../assets/data/pets.js';
import showPopup from '../../assets/data/showPopup.js';
const burgerMenu = document.getElementById('burger-menu');
const containerMenu = document.querySelector('.header__menu');
const logo = document.querySelector('.wrapper');
const header = document.querySelector('.header');
const blackout = document.querySelector('#blackout-menu');
const notOnlyButton = document.querySelector('.not-only__content__button');
const headerLogo = document.querySelector('.header__logo');
const html = document.querySelector('html');
const openClosedMenu = () => {
    containerMenu === null || containerMenu === void 0 ? void 0 : containerMenu.classList.toggle('active-menu');
    burgerMenu === null || burgerMenu === void 0 ? void 0 : burgerMenu.classList.toggle('active-burger');
    logo === null || logo === void 0 ? void 0 : logo.classList.toggle('wrapper-menu');
    header === null || header === void 0 ? void 0 : header.classList.toggle('header-menu');
    blackout === null || blackout === void 0 ? void 0 : blackout.classList.toggle('hidden');
    html === null || html === void 0 ? void 0 : html.classList.toggle('scroll');
};
burgerMenu === null || burgerMenu === void 0 ? void 0 : burgerMenu.addEventListener('click', () => openClosedMenu());
blackout === null || blackout === void 0 ? void 0 : blackout.addEventListener('click', () => openClosedMenu());
headerLogo === null || headerLogo === void 0 ? void 0 : headerLogo.addEventListener('click', () => document.location.href = '../main/main.html');
class Slider {
    constructor(dataPets) {
        var _a;
        this.dataPets = new Array(6).fill(dataPets).flat();
        this.items = document.querySelector('.pets-slider__wrapper');
        this.numberSlide = document.querySelector('.number');
        this.itemsChild = (_a = this.items) === null || _a === void 0 ? void 0 : _a.children;
        this.positionLeftItem = 0;
        this.transform = 0;
        this.state = [
            { active: false, minWidth: 1280, maxWidth: 3000 },
            { active: false, minWidth: 768, maxWidth: 1279 },
            { active: false, minWidth: 0, maxWidth: 767 },
        ];
    }
    setActive() {
        let index = 0;
        const width = parseFloat(String(document.body.clientWidth));
        this.state.forEach((element, i) => {
            element.active = false;
            if (width >= element.minWidth && width <= element.maxWidth) {
                index = i;
            }
        });
        this.state[index].active = true;
        return index;
    }
    getActive() {
        let index;
        this.state.forEach((element, i) => {
            if (element.active) {
                index = i;
            }
        });
        return index;
    }
    disabledButton() {
        var _a;
        if (this.itemsChild) {
            if (this.positionLeftItem === ((_a = this.itemsChild) === null || _a === void 0 ? void 0 : _a.length) - 1) {
                document.getElementById('next').disabled = true;
                document.getElementById('last').disabled = true;
            }
            else {
                document.getElementById('next').disabled = false;
                document.getElementById('last').disabled = false;
            }
            if (this.positionLeftItem < 1) {
                document.getElementById('prev').disabled = true;
                document.getElementById('first').disabled = true;
            }
            else {
                document.getElementById('prev').disabled = false;
                document.getElementById('first').disabled = false;
            }
        }
    }
    refresh() {
        if (this.items && this.numberSlide) {
            this.items.style.transform = `translateX(0%)`;
            this.items.innerHTML = '';
            this.createItems();
            this.positionLeftItem = 0;
            this.transform = 0;
            this.numberSlide.innerText = '1';
            this.disabledButton();
        }
    }
    createItem(item) {
        const containerItem = document.createElement('div');
        containerItem.className = 'pets-slider__item';
        containerItem.id = item.name;
        const imageItem = document.createElement('img');
        imageItem.className = 'pets-slider__item_photo';
        imageItem.src = item.img;
        imageItem.alt = item.name;
        const nameItem = document.createElement('p');
        nameItem.className = 'pets-slider__item_name';
        nameItem.innerText = item.name;
        const buttonItem = document.createElement('button');
        buttonItem.className = 'pets-slider__item_button';
        buttonItem.id = item.name;
        buttonItem.innerText = 'Learn more';
        containerItem.append(imageItem, nameItem, buttonItem);
        return containerItem;
    }
    createSlide(number) {
        var _a;
        const data = [...this.dataPets];
        for (let i = 0; i < Math.ceil(this.dataPets.length / number); i++) {
            const itemsSlide = data.splice(0, number).sort(() => Math.random() - 0.5);
            const containerWrapper = document.createElement('div');
            containerWrapper.className = 'pets-slider__wrapper__item';
            (_a = this.items) === null || _a === void 0 ? void 0 : _a.appendChild(containerWrapper);
            itemsSlide.forEach((e) => {
                containerWrapper.appendChild(this.createItem(e));
            });
        }
    }
    createItems() {
        if (this.getActive() === 0) {
            this.createSlide(8);
        }
        if (this.getActive() === 1) {
            this.createSlide(6);
        }
        if (this.getActive() === 2) {
            this.createSlide(3);
        }
    }
    transformItem(direction) {
        if (this.items && this.itemsChild && this.numberSlide) {
            if (direction === 'next') {
                this.positionLeftItem++;
                this.transform -= (parseFloat(getComputedStyle(this.itemsChild[0]).width) / parseFloat(getComputedStyle(this.items).width) * 100);
            }
            if (direction === 'last') {
                this.transform -= ((this.itemsChild.length - 1) - this.positionLeftItem) * 100;
                this.positionLeftItem = this.itemsChild.length - 1;
            }
            if (direction === 'prev') {
                this.positionLeftItem--;
                this.transform += (parseFloat(getComputedStyle(this.itemsChild[0]).width) / parseFloat(getComputedStyle(this.items).width) * 100);
            }
            if (direction === 'first') {
                this.transform += (this.positionLeftItem) * 100;
                this.positionLeftItem = 0;
            }
            this.items.style.transform = `translateX(${this.transform}%)`;
            this.disabledButton();
            this.numberSlide.innerText = String(this.positionLeftItem + 1);
        }
    }
    update(width) {
        let index = 0;
        this.state.forEach(function (element, i) {
            if (width >= element.minWidth && width <= element.maxWidth)
                index = i;
        });
        if (index !== this.getActive()) {
            this.setActive();
            this.refresh();
        }
    }
    loud() {
        this.setActive();
        this.getActive();
        this.createItems();
        console.log(this.dataPets);
    }
}
const slider = new Slider(dataPets);
slider.loud();
window.addEventListener("resize", (e) => slider.update(e.target.outerWidth));
(_a = document.querySelector('.pets-slider__pagination')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => slider.transformItem(e.target.id));
(_b = document.querySelector('.pets-slider')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
    var _a;
    if (e.target.closest('.pets-slider__item')) {
        console.log(e.target.closest('.pets-slider__item').id);
        (_a = document.querySelector('#blackout-popup')) === null || _a === void 0 ? void 0 : _a.classList.toggle('hidden-popup');
        showPopup(e.target.closest('.pets-slider__item').id, dataPets);
    }
});
(_c = document.querySelector('body')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (e) => {
    var _a, _b;
    if (e.target.className === 'popup__wrapper' || e.target.id === 'blackout-popup' || e.target.className === 'closed') {
        (_a = document.querySelector('#blackout-popup')) === null || _a === void 0 ? void 0 : _a.classList.toggle('hidden-popup');
        return (_b = document.querySelector('body')) === null || _b === void 0 ? void 0 : _b.removeChild(document.querySelector('.popup__wrapper'));
    }
});
