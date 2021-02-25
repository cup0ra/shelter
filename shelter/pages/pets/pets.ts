import dataPets from '../../assets/data/pets.js';
import showPopup from '../../assets/data/showPopup.js';
const burgerMenu:HTMLElement | null = document.getElementById('burger-menu');
const containerMenu:HTMLElement | null = document.querySelector('.header__menu');
const logo:HTMLElement | null = document.querySelector('.wrapper');
const header:HTMLElement | null = document.querySelector('.header');
const blackout:HTMLElement | null = document.querySelector('#blackout-menu');
const notOnlyButton:HTMLElement | null = document.querySelector('.not-only__content__button');
const headerLogo:HTMLElement | null = document.querySelector('.header__logo');
const html:HTMLElement | null = document.querySelector('html');
const closed: HTMLElement | null = document.querySelector('.closed')
const popup:HTMLElement | null = document.querySelector('.popup')

const openClosedMenu = () => {
    containerMenu?.classList.toggle('active-menu');
    burgerMenu?.classList.toggle('active-burger'); 
    logo?.classList.toggle('wrapper-menu');
    header?.classList.toggle('header-menu');
    blackout?.classList.toggle('hidden');
    html?.classList.toggle('scroll')
}

burgerMenu?.addEventListener('click', () => openClosedMenu())
blackout?.addEventListener('click', () => openClosedMenu())
headerLogo?.addEventListener('click', () => document.location.href = '../main/index.html')


interface Pets {
    name: string;
    img: string;
    type: string;
    breed: string;
    description:string;
    age: string;
    inoculations: string[];
    diseases: string[];
    parasites: string[];
}
interface Item{
    item: HTMLElement;
    position: number;
    transform: number;
}
interface State {
  active: boolean;
  minWidth: number;
  maxWidth: number;
}

class Slider{
    items: HTMLElement | null ;
    itemsChild: HTMLCollection | undefined;
    numberSlide: HTMLElement | null; 
    dataPets: Pets[];
    position: any;
    positionLeftItem: number;
    transform: number;
    state: State[];
    constructor(dataPets: Pets[]){
        this.dataPets =  new Array(6).fill(dataPets).flat();
        this.items = document.querySelector('.pets-slider__wrapper');
        this.numberSlide = document.querySelector('.number');
        this.itemsChild = this.items?.children;
        this.positionLeftItem = 0;
        this.transform = 0;
        this.state = [
        {active: false, minWidth: 1280, maxWidth: 3000},
        {active: false, minWidth: 768, maxWidth: 1279},
        {active: false, minWidth: 0, maxWidth: 767},
        ]
    }
    setActive(){
      let index: number = 0;
      const width = parseFloat(String(document.body.clientWidth));
      this.state.forEach((element, i: number) => {
        element.active = false;
        if(width >= element.minWidth && width <= element.maxWidth){
          index = i;
        }
      })
      this.state[index].active = true;
      return index;
    }
    getActive(){
      let index;
      this.state.forEach((element, i: number) => {
        if(element.active){
          index = i;
        }
      });
      return index;
    }

    disabledButton(){
      if(this.itemsChild){
        if(this.positionLeftItem === this.itemsChild?.length - 1){
          (document.getElementById('next') as HTMLInputElement).disabled = true; 
          (document.getElementById('last') as HTMLInputElement).disabled = true; 
        }else{
          (document.getElementById('next') as HTMLInputElement).disabled = false; 
          (document.getElementById('last') as HTMLInputElement).disabled = false;
        }
        if(this.positionLeftItem  < 1){
          (document.getElementById('prev') as HTMLInputElement).disabled = true; 
          (document.getElementById('first') as HTMLInputElement).disabled = true; 
        }else{
          (document.getElementById('prev') as HTMLInputElement).disabled = false;
          (document.getElementById('first') as HTMLInputElement).disabled = false; 
        }
      }
    }

    refresh(){
      if(this.items && this.numberSlide){
        this.items.style.transform = `translateX(0%)`;
        this.items.innerHTML = ''
        this.createItems()
        this.positionLeftItem = 0;
        this.transform = 0;
        this.numberSlide.innerText = '1';
        this.disabledButton()
      }
    }
    createItem(item: Pets): any{
     const containerItem: HTMLElement = document.createElement('div');
     containerItem.className =  'pets-slider__item';
     containerItem.id = item.name;
     const imageItem: HTMLImageElement = document.createElement('img');
     imageItem.className = 'pets-slider__item_photo';
     imageItem.src = item.img;
     imageItem.alt = item.name;
     const nameItem: HTMLParagraphElement = document.createElement('p');
     nameItem.className = 'pets-slider__item_name';
     nameItem.innerText = item.name;
     const buttonItem: HTMLButtonElement = document.createElement('button');
     buttonItem.className = 'pets-slider__item_button';
     buttonItem.id = item.name;
     buttonItem.innerText = 'Learn more';
     containerItem.append(imageItem, nameItem, buttonItem);
     return containerItem
    }

    createSlide(number: number){
      const data = [...this.dataPets]
        for(let i = 0; i < Math.ceil(this.dataPets.length/number); i++){
          const itemsSlide = data.splice(0, number).sort(() => Math.random() - 0.5);
          const containerWrapper = document.createElement('div');
          containerWrapper.className = 'pets-slider__wrapper__item';
          this.items?.appendChild(containerWrapper)
          itemsSlide.forEach((e) => {
            containerWrapper.appendChild(this.createItem(e)) 
            })
        }
    }

    createItems(){
      if(this.getActive() === 0){
        this.createSlide(8);
      }
      if(this.getActive() === 1){
        this.createSlide(6);
      }
      if(this.getActive() === 2){
        this.createSlide(3);
      } 
    }

    transformItem(direction: string) {
      if(this.items && this.itemsChild && this.numberSlide){
        if (direction === 'next') {
          this.positionLeftItem++;
           this.transform -= (parseFloat(getComputedStyle(this.itemsChild[0]).width)/parseFloat(getComputedStyle(this.items).width) * 100);
        }
        if (direction === 'last') {
           this.transform -= ((this.itemsChild.length - 1) - this.positionLeftItem) * 100;
           this.positionLeftItem = this.itemsChild.length - 1;
        }
        if (direction === 'prev') {
          this.positionLeftItem--;
            this.transform += (parseFloat(getComputedStyle(this.itemsChild[0]).width)/parseFloat(getComputedStyle(this.items).width) * 100);
        }
        if (direction === 'first') {
           this.transform += (this.positionLeftItem) * 100;
           this.positionLeftItem = 0;
        }
        this.items.style.transform = `translateX(${this.transform}%)`;
        this.disabledButton()
        this.numberSlide.innerText = String(this.positionLeftItem + 1);
      }
     
    }
    
  update(width: number){
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

  loud(){
    this.setActive()
    this.getActive()
    this.createItems()
  }

}

const slider = new Slider(dataPets);
slider.loud()

window.addEventListener("resize",  (e: any) => slider.update(e.target.outerWidth) )

document.querySelector('.pets-slider__pagination')?.addEventListener('click', (e: any) => slider.transformItem(e.target.id));

document.querySelector('.pets-slider')?.addEventListener('click', (e: any) => {
  if(e.target.closest('.pets-slider__item')){
    html?.classList.toggle('scroll')
    document.querySelector('#blackout-popup')?.classList.toggle('hidden-popup');
    showPopup(e.target.closest('.pets-slider__item').id, dataPets);
    const q = parseFloat(getComputedStyle(document.querySelector('.popup')).height) 
    document.getElementById('closed').style.marginTop=`${-(q + 50)}px`
  }
})

document.querySelector('body')?.addEventListener('click', (e: any) => {
  if(e.target.className === 'popup__wrapper' || e.target.id === 'blackout-popup' || e.target.className === 'closed'){
    document.querySelector('#blackout-popup')?.classList.toggle('hidden-popup');
    html?.classList.toggle('scroll')
    return document.querySelector('body')?.removeChild(document.querySelector('.popup__wrapper'));
  }
})