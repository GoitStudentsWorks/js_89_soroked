import axios from 'axios';
const BASE_URL = 'https://drinkify.b.goit.study/api/v1/';
const ENDPOINT_INGREDIENTS = 'ingredients/';
import { getCocktails } from '../swagger-api.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { addToFavorites, removeFromFavoritesByIndex } from '../localstorage-fav-ingredients.js';

// import {
//   favoriteCoctail,
//   favoriteIngridient,
//   getFavoriteCoctail,
//   getFavoriteIngridient,
//   setFavoriteCoctail,
//   setFavoriteIngridient,
// } from './local-storage';
function getIngredients(queryId) {
  //   return axios.get(
  //     `https://drinkify.b.goit.study/api/v1/ingredients/64aebb7f82d96cc69e0eb4a5`
  //   );
  return axios.get(BASE_URL + ENDPOINT_INGREDIENTS + `${queryId}`);
}

const btnLearnMore = document.querySelector('.btn');

const query = 'The Jimmy Conway';

function handleBtnOpenModalCoctail(event) {
  event.preventDefault();
  if (event.target.nodeName === 'BUTTON') {
    getCocktails(query).then(response => {
      console.log(response);
      const ingridientsMarkup = response.data[0].ingredients
        .map(
          item =>
            `<li class="item-modal-coctail-ingridients" data-value=${item.ingredientId}>
                    <p class="link-modal-coctail-ingridient">
                    ${item.title}
                    </p>
                    </li>`
        )
        .join('');
      console.log(ingridientsMarkup);

      // MODAL TEXT
      const modalInstanceCoctail = basicLightbox.create(
        `
                    <div class="modal modal-coctail">
                    <div class="photo-card-coctail photo-card-coctail dark-photo-card-coctail">
                    <div class="photo-info photo-info-dark">
                    <img class="photo-coctail" src="${response.data[0].drinkThumb}" alt="" title="" height="277" loading="lazy" class="image-coctail" />
                    <div class="info-modal-coctail">
                    <h2 class="main-title-modal-coctail">${response.data[0].drink}</h2>
                    <p2 class="title-modal-coctail-categories">INGREDIENTS:</p2>
                    <p class="text-modal-coctail-type">Per cocktail</p>
                    <ul class="list-modal-coctail-ingridients">` +
          ingridientsMarkup +
          `</ul>
                     </div></div>
                    <p class="title-modal-coctail-categories">INSTRUCTIONS:</p>
                    
                    <p class="paragrapg-modal-coctail">
                    ${response.data[0].instructions}
                    </p>
                    <div class="buttons">
                    <button class="add-btn-modal-coctail">ADD TO FAVORITE</button>
                    <button class="back-btn-modal-coctail">Back</button>
                    </div>
                    </div>
                    </div>
                    `
      );

      // RENDER
      modalInstanceCoctail.show();

      // Add listeners for window
      //   const linkModalCoctail = document.querySelector(
      //     '.link-modal-coctail-ingridient'
      //     );
      const linkModalCoctail = document.querySelector(
        '.list-modal-coctail-ingridients'
      );

      const backBtnModalCoctail = document.querySelector(
        '.back-btn-modal-coctail'
      );
      const modalCoctail = document.querySelector('.modal-coctail');
      console.log('hi');
      console.log(linkModalCoctail);

      // RENDER INGREDIENTS
     function handleLinkOpenModalIngridient(e) {
        e.preventDefault();
        console.log('START');
        console.dir(
          e.target.parentElement.classList.contains(
            'item-modal-coctail-ingridients'
          )
        );

        //const queryId = '64f1d5dc69d8333cf130fd36';
        if (
          e.target.parentElement.classList.contains(
            'item-modal-coctail-ingridients'
          )
        ) {
          const queryId = e.target.closest('.item-modal-coctail-ingridients')
            .dataset.value;
          console.log('hoorey');

          modalCoctail.classList.add('is-hidden');

          getIngredients(queryId).then(resp => {
            console.log(resp);

            const modalInstanceIngridient = basicLightbox.create(`
                    <div class="modal modal-ingridient">
                    <div class="ingridient-card">
                    <h2 class="title-modal-ingridient">${resp.data[0].title}</h2>
                    <p class="type-ingridient-modal-ingridient">${resp.data[0].type}</p>
                    <div class="line"> </div>
                    <p class="paragraph-modal-ingridient"><span class="span-paragraph-modal-ingridient">${resp.data[0].title}</span> ${resp.data[0].description}</p>
                    <ul class="list-modal-ingridients">
                    <li class="item-modal-ingridients">
                    <p class="text-modal">Type: ${resp.data[0].type}</p>
                    </li>
                    <li class="item-modal-ingridients">
                    <p class="text-modal">
                    Country of origin: ${resp.data[0].country}</p>
                    </li>
                    <li class="item-modal-ingridients">
                    <p class="text-modal"> Alcohol by volume: ${resp.data[0].abv}</p>
                    </li>
                    <li class="item-modal-ingridients">
                    <p class="text-modal">Flavour: ${resp.data[0].flavour}</p>
                    </li>
                    </ul>
                    </div>
                    <div class="buttons">
                    <button class="add-btn-modal-ingridient">ADD TO FAVORITE</button>
                    <button class="back-btn-modal-ingridient">Back</button>
                    </div>
                    </div></div>
                    `);
            modalInstanceIngridient.show();

            const backBtnModalIngridient = document.querySelector(
              '.back-btn-modal-ingridient'
            );
            const addBtnModalCoctail = document.querySelector(
              '.add-btn-modal-ingridient'
            );

            addBtnModalCoctail.addEventListener('click', e => {
              addToFavorites(resp.data[0]);
            })
            
            function modalCloseIngridient() {
              modalInstanceIngridient.close();
              modalCoctail.classList.remove('is-hidden');
            }
            backBtnModalIngridient.addEventListener(
              'click',
              modalCloseIngridient
            );
          });
        }
      }

      function modalCloseCoctail() {
        modalInstanceCoctail.close();
      }
      linkModalCoctail.addEventListener('click', handleLinkOpenModalIngridient);
      backBtnModalCoctail.addEventListener('click', modalCloseCoctail);
    });
  }
}

btnLearnMore.addEventListener('click', handleBtnOpenModalCoctail);

// onFavoriteCoctailCheck();
// onFavoriteIngridientCheck();

// function onFavoriteCoctailCheck() {
//   const addBtnModalCoctail = document.querySelector(`add-btn-modal-coctail`);
//   //якщо коктейль в списку
//   if (favoriteCoctail.includes(query)) {
//     addBtnModalCoctail.textContent = 'remove from favorite'; //змінити текст кнопки
//     return;
//   }
//   addBtnModalCoctail.textContent = 'add to favorite'; //змінити текст кнопки
// }

// function onFavoriteIngridientCheck() {
//   const addBtnModalIngridient = document.querySelector(
//     '.add-btn-modal-ingridient'
//   );
//   if (favoriteIngridient.includes(queryId)) {
//     addBtnModalIngridient.textContent = 'remove from favorite';
//     return;
//   }

//   addBtnModalIngridient.textContent = 'add to favorite';
// }

// const addBtnModalCoctail = document.querySelector(`.add-btn-modal-ingridient`);
// const addBtnModalIngridient = document.querySelector(
//   `.add-btn-modal-ingridient`
// );

// addBtnModalCoctail.addEventListener('click', onBtnCoctailClick);
// addBtnModalIngridient.addEventListener('click', onBtnIngridientClick);

// function onBtnCoctailClick() {
//   //якщо коктейль вже в списку
//   if (favoriteCoctail.includes(query)) {
//     favoriteCoctail.splice(favoriteCoctail.indexOf(query), 1); //видаляємо з масиву коктейль
//     setFavoriteCoctail(favoriteCoctail); //перезаписуємо сховище
//     addBtnModalCoctail.textContent = 'add to favorite'; //змінити текст кнопки
//     if (PAGE_OPEN === 1) {
//       renderList(watched); //оновлюємо сторінку
//     }
//   }

//   favoriteCoctail.push(query); //додати в масив коктейль
//   setFavoriteCoctail(query); //записати в сховище
//   addBtnModalCoctail.textContent = 'remove from favorite'; //змінити текст кнопки
//   if (PAGE_OPEN === 1) {
//     renderList(watched); //оновлюємо сторінку
//   }
// }

// function onBtnIngridientClick() {
//   if (favoriteIngridient.includes(queryId)) {
//     favoriteIngridient.splice(favoriteIngridient.indexOf(queryId), 1);
//     setFavoriteIngridient(favoriteIngridient); //перезаписуємо сховище
//     onBtnIngridientClick.textContent = 'add to favorite'; //змінити текст кнопки
//     if (PAGE_OPEN === 2) {
//       renderList(favoriteIngridient); //оновлюємо сторінку
//     }

//     return;
//   }

//   favoriteIngridient.push(queryId);
//   setFavoriteIngridient(favoriteIngridient);
//   onBtnIngridientClick.textContent = 'remove from favorite';
//   if (PAGE_OPEN === 2) {
//     renderList(favoriteIngridient); //оновлюємо сторінку
//   }
// }