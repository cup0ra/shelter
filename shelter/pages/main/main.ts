import dataPets from '../../assets/data/pets.js';
import showPopup from '../../assets/data/showPopup.js';
const burgerMenu:Element | null = document.getElementById('burger-menu');
const containerMenu:Element | null = document.querySelector('.header__menu');
const logo:Element | null = document.querySelector('.wrapper');
const header:Element | null = document.querySelector('.header');
const blackout:Element | null = document.querySelector('#blackout-menu');
const notOnlyButton:Element | null = document.querySelector('.not-only__content__button');
const petsButton:Element | null = document.querySelector('.pets__button');

console.log(dataPets)
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
const openClosedMenu = () => {
    containerMenu?.classList.toggle('active-menu');
    burgerMenu?.classList.toggle('active-burger'); 
    logo?.classList.toggle('wrapper-menu');
    header?.classList.toggle('header-menu');
    blackout?.classList.toggle('hidden');
}

burgerMenu?.addEventListener('click', () => openClosedMenu())
blackout?.addEventListener('click', () => openClosedMenu())
notOnlyButton?.addEventListener('click', () => document.location.href = '../pets/pets.html')
petsButton?.addEventListener('click', () => document.location.href = '../pets/pets.html')


class Slider{
    items: HTMLElement | null ;
    itemsChild: HTMLCollection | undefined;
    dataPets: Pets[];
    arrayItems: Item[];
    position: any;
    positionLeftItem: number;
    transform: number;
    state: State[];
    constructor(dataPets: Pets[]){
        this.dataPets = dataPets;
        this.items = document.querySelector('.pets-slider__wrapper');
        this.itemsChild = this.items?.children;
        this.positionLeftItem = 0;
        this.transform = 0;
        this.arrayItems = [];
        this.state = [
        {active: false, minWidth: 0, maxWidth: 767},
        {active: false, minWidth: 768, maxWidth: 1279},
        {active: false, minWidth: 1280, maxWidth: 3000},
        ]
        this.position = {
          getItemMin: () => {
            var indexItem = 0;
            this.arrayItems.forEach((items: Item, index: number) => {
              if (items.position < this.arrayItems[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getItemMax: () => {
            var indexItem = 0;
            this.arrayItems.forEach( (item: Item, index: number) => {
              if (item.position > this.arrayItems[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getMin: () => {return this.arrayItems[this.position.getItemMin()].position;},
          getMax: () => {return this.arrayItems[this.position.getItemMax()].position;}
        }
  
    }
    setActive(){
      let index: number = 0;
      const width: number = parseFloat(String(document.body.clientWidth));
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
    refresh(){
      if(this.items){
        this.items.style.transform = `translateX(0%)`;
      }
        this.positionLeftItem = 0;
        this.transform = 0;
        this.arrayItems = [];
        if(this.itemsChild){
         Array.from(this.itemsChild).forEach((element: any, i) => {
           if(element.style.transform){
            element.style.transform = `translateX(0%)`;
           }
            this.arrayItems.push({item: element, position: i, transform: 0}) 
          });
        }
    
    }
    createItem(item: Pets,i: number){
     const containerWrapper = document.createElement('div');
     containerWrapper.className = 'pets-slider__wrapper__item';
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
     containerWrapper.appendChild(containerItem);
     this.items?.appendChild(containerWrapper)
     this.arrayItems.push({item: containerWrapper , position: i, transform: 0}) 
    }
    createItems(){
        this.dataPets.forEach((e, i) => {
        this.createItem(e, i);
        })
    }

    transformItem(direction: string) {
      if(this.items && this.itemsChild){
        let nextItem;
        let quantityItems: any = this.getActive();
        if (direction === 'right') {
          this.positionLeftItem+= quantityItems + 1;
          console.log(this.positionLeftItem + parseFloat(getComputedStyle(this.items).width) / parseFloat(getComputedStyle(this.itemsChild[0]).width)  , this.position.getMax()-2)
          if ((this.positionLeftItem + parseFloat(getComputedStyle(this.items).width) / parseFloat(getComputedStyle(this.itemsChild[0]).width) - 1)  > this.position.getMax()-2) {
          for(let i = 0; i < quantityItems + 1; i++){
            nextItem = this.position.getItemMin();
            this.arrayItems[nextItem].position = this.position.getMax() + 1;
            this.arrayItems[nextItem].transform += (this.arrayItems.length ) * 100;
            this.arrayItems[nextItem].item.style.transform = `translateX(${this.arrayItems[nextItem].transform}%)`;
          }
          }
           this.transform -= 100;
        }
        if (direction === 'left') {
          this.positionLeftItem-=quantityItems + 1;
          if (this.positionLeftItem < this.position.getMin()) {
            for(let i = 0; i < quantityItems + 1; i++){
              nextItem = this.position.getItemMax();
              this.arrayItems[nextItem].position = this.position.getMin() - 1;
              this.arrayItems[nextItem].transform -= this.arrayItems.length * 100;
              console.log(this.arrayItems[nextItem].transform, nextItem)
              this.arrayItems[nextItem].item.style.transform = `translateX(${this.arrayItems[nextItem].transform}%)`;
            }
          }
            this.transform += 100;
        }
        this.items.style.transform = `translateX(${this.transform}%)`;
      }
    }
    
loud(){
  this.createItems()
  this.setActive()
  this.getActive()
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

}

const slider = new Slider(dataPets);
slider.loud()

window.addEventListener("resize",  (e: any) => {
  slider.update( e.target.outerWidth)
  })  
 document.querySelector('.slider-next')?.addEventListener('click', function() {
  slider.transformItem('right')
});
document.querySelector('.slider-previous')?.addEventListener('click', function() {
  slider.transformItem('left')
}); 
document.querySelectorAll('.pets-slider__item').forEach((click) =>{
  click.addEventListener('click', function (e: any) {
    console.log(e.target.closest('.pets-slider__item').id)
    document.querySelector('#blackout-popup')?.classList.toggle('hidden-popup');
    showPopup(e.target.closest('.pets-slider__item').id, dataPets);
  }); 
}) 

document.querySelector('body')?.addEventListener('click', (e: any) => {
if(e.target.className === 'popup__wrapper' || e.target.id === 'blackout-popup' || e.target.className === 'closed'){
  document.querySelector('#blackout-popup')?.classList.toggle('hidden-popup');
  return document.querySelector('body')?.removeChild(document.querySelector('.popup__wrapper'));
}
})
