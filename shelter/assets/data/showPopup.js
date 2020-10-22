const  showPopup = (name, data) => {
    const itemPets = data.filter((e) => e.name === name)
    const popupWrapper = document.createElement('div');
    popupWrapper.className = 'popup__wrapper';
    document.querySelector('body')?.appendChild(popupWrapper);
    const closed = document.createElement('div');
    closed.className = 'closed';
    closed.innerText = '✖';
    const container = document.createElement('div');
    container.className = 'popup';
    popupWrapper.append(container, closed);
    const popupImages = document.createElement('img');
    popupImages.className = 'popup__image';
    popupImages.src = itemPets[0].img;
    popupImages.alt = itemPets[0].name;
    container.appendChild(popupImages)
    const popupContent = document.createElement('div');
    popupContent.className = 'popup__content';
    container.appendChild(popupContent);
    const popupContentTitle = document.createElement('h3');
    popupContentTitle.className = 'popup__content__title';
    popupContentTitle.innerText = itemPets[0].name;
    const popupContentSubtitle = document.createElement('h4');
    popupContentSubtitle.className = 'popup__content__subtitle';
    popupContentSubtitle.innerText = `${itemPets[0].type } - ${itemPets[0].breed}`;
    const popupContentDescription = document.createElement('p');
    popupContentDescription.className = 'popup__content__description';
    popupContentDescription.innerText = itemPets[0].description;
    const popupContentList = document.createElement('ul');
    popupContentList.className = 'popup__content__list';
    popupContent.append(popupContentTitle, popupContentSubtitle, popupContentDescription,  popupContentList);
    const popupContentListAge = document.createElement('li');
    popupContentListAge.className = 'popup__content__list__item';
    popupContentListAge.innerHTML = `<b>Age:</b> <span>${itemPets[0].age}</span>` ;
    const popupContentListInoculations = document.createElement('li');
    popupContentListInoculations.className = 'popup__content__list__item';
    popupContentListInoculations.innerHTML = `<b>Inoculations:</b> <span>${itemPets[0].inoculations.join(',')}</span>`;
    const popupContentListDiseases = document.createElement('li');
    popupContentListDiseases.className = 'popup__content__list__item';
    popupContentListDiseases.innerHTML = `<b>Diseases:</b> <span>${itemPets[0].diseases.join(',')}</span>`;
    const popupContentListParasites = document.createElement('li');
    popupContentListParasites.className = 'popup__content__list__item';
    popupContentListParasites.innerHTML = `<b>Parasites:</b> <span>${itemPets[0].parasites.join(',')}</span>`;
    popupContentList.append(popupContentListAge, popupContentListInoculations, popupContentListDiseases, popupContentListParasites);
  }

  export default showPopup;