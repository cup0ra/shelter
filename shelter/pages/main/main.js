var _a, _b, _c;
import dataPets from '../../assets/data/pets.js';
import showPopup from '../../assets/data/showPopup.js';
const burgerMenu = document.getElementById('burger-menu');
const containerMenu = document.querySelector('.header__menu');
const logo = document.querySelector('.wrapper');
const header = document.querySelector('.header');
const blackout = document.querySelector('#blackout-menu');
const notOnlyButton = document.querySelector('.not-only__content__button');
const petsButton = document.querySelector('.pets__button');
const html = document.querySelector('html');
console.log(dataPets);
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
notOnlyButton === null || notOnlyButton === void 0 ? void 0 : notOnlyButton.addEventListener('click', () => document.location.href = '../pets/pets.html');
petsButton === null || petsButton === void 0 ? void 0 : petsButton.addEventListener('click', () => document.location.href = '../pets/pets.html');
class Slider {
    constructor(dataPets) {
        var _a;
        this.dataPets = dataPets;
        this.items = document.querySelector('.pets-slider__wrapper');
        this.itemsChild = (_a = this.items) === null || _a === void 0 ? void 0 : _a.children;
        this.positionLeftItem = 0;
        this.transform = 0;
        this.arrayItems = [];
        this.state = [
            { active: false, minWidth: 0, maxWidth: 767 },
            { active: false, minWidth: 768, maxWidth: 1279 },
            { active: false, minWidth: 1280, maxWidth: 3000 },
        ];
        this.position = {
            getItemMin: () => {
                var indexItem = 0;
                this.arrayItems.forEach((items, index) => {
                    if (items.position < this.arrayItems[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: () => {
                var indexItem = 0;
                this.arrayItems.forEach((item, index) => {
                    if (item.position > this.arrayItems[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: () => { return this.arrayItems[this.position.getItemMin()].position; },
            getMax: () => { return this.arrayItems[this.position.getItemMax()].position; }
        };
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
    refresh() {
        if (this.items) {
            this.items.style.transform = `translateX(0%)`;
        }
        this.positionLeftItem = 0;
        this.transform = 0;
        this.arrayItems = [];
        if (this.itemsChild) {
            Array.from(this.itemsChild).forEach((element, i) => {
                if (element.style.transform) {
                    element.style.transform = `translateX(0%)`;
                }
                this.arrayItems.push({ item: element, position: i, transform: 0 });
            });
        }
    }
    createItem(item, i) {
        var _a;
        const containerWrapper = document.createElement('div');
        containerWrapper.className = 'pets-slider__wrapper__item';
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
        containerWrapper.appendChild(containerItem);
        (_a = this.items) === null || _a === void 0 ? void 0 : _a.appendChild(containerWrapper);
        this.arrayItems.push({ item: containerWrapper, position: i, transform: 0 });
    }
    createItems() {
        this.dataPets.forEach((e, i) => {
            this.createItem(e, i);
        });
    }
    transformItem(direction) {
        if (this.items && this.itemsChild) {
            let nextItem;
            let quantityItems = this.getActive();
            if (direction === 'right') {
                this.positionLeftItem += quantityItems + 1;
                console.log(this.positionLeftItem + parseFloat(getComputedStyle(this.items).width) / parseFloat(getComputedStyle(this.itemsChild[0]).width), this.position.getMax() - 2);
                if ((this.positionLeftItem + parseFloat(getComputedStyle(this.items).width) / parseFloat(getComputedStyle(this.itemsChild[0]).width) - 1) > this.position.getMax() - 2) {
                    for (let i = 0; i < quantityItems + 1; i++) {
                        nextItem = this.position.getItemMin();
                        this.arrayItems[nextItem].position = this.position.getMax() + 1;
                        this.arrayItems[nextItem].transform += (this.arrayItems.length) * 100;
                        this.arrayItems[nextItem].item.style.transform = `translateX(${this.arrayItems[nextItem].transform}%)`;
                    }
                }
                this.transform -= 100;
            }
            if (direction === 'left') {
                this.positionLeftItem -= quantityItems + 1;
                if (this.positionLeftItem < this.position.getMin()) {
                    for (let i = 0; i < quantityItems + 1; i++) {
                        nextItem = this.position.getItemMax();
                        this.arrayItems[nextItem].position = this.position.getMin() - 1;
                        this.arrayItems[nextItem].transform -= this.arrayItems.length * 100;
                        console.log(this.arrayItems[nextItem].transform, nextItem);
                        this.arrayItems[nextItem].item.style.transform = `translateX(${this.arrayItems[nextItem].transform}%)`;
                    }
                }
                this.transform += 100;
            }
            this.items.style.transform = `translateX(${this.transform}%)`;
        }
    }
    loud() {
        this.createItems();
        this.setActive();
        this.getActive();
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
}
const slider = new Slider(dataPets);
slider.loud();
window.addEventListener("resize", (e) => {
    slider.update(e.target.outerWidth);
});
(_a = document.querySelector('.slider-next')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    slider.transformItem('right');
});
(_b = document.querySelector('.slider-previous')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    slider.transformItem('left');
});
document.querySelectorAll('.pets-slider__item').forEach((click) => {
    click.addEventListener('click', function (e) {
        var _a;
        console.log(e.target.closest('.pets-slider__item').id);
        (_a = document.querySelector('#blackout-popup')) === null || _a === void 0 ? void 0 : _a.classList.toggle('hidden-popup');
        showPopup(e.target.closest('.pets-slider__item').id, dataPets);
    });
});
(_c = document.querySelector('body')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (e) => {
    var _a, _b;
    if (e.target.className === 'popup__wrapper' || e.target.id === 'blackout-popup' || e.target.className === 'closed') {
        (_a = document.querySelector('#blackout-popup')) === null || _a === void 0 ? void 0 : _a.classList.toggle('hidden-popup');
        return (_b = document.querySelector('body')) === null || _b === void 0 ? void 0 : _b.removeChild(document.querySelector('.popup__wrapper'));
    }
});
