/* ----- axios ----- */
import axios from 'axios';

/* ----- iziToast ----- */
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

/* ----- SimpleLightbox ----- */
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

/* ----- JS ----- */
import { searchImages } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

import Container from 'postcss/lib/container'; // ???

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

const form = document.querySelector('.js-search-form');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.load-more');

let page = 1;
let per_page = 15;
let totalHits = 0;
let query = '';

//=============================================================

form.addEventListener('submit', handleSearch);
loadBtn.addEventListener('click', loadMore);

async function handleSearch(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  loadBtn.disabled = false;
  loadBtn.classList.replace('load-more', 'load-more-hidden');
  page = 1;

  query = event.target.elements.search.value.trim();

  if (query.trim() === '') {
    loadBtn.disabled = true;
    loadBtn.classList.replace('load-more', 'load-more-hidden');
    warningMessage();
    return;
  }

  loader.classList.replace('loader-on', 'loader'); //Loader on

  searchImages(query, page)
    .then(data => {
      loader.classList.replace('loader', 'loader-on'); //Loader off
      loadBtn.classList.replace('load-more-hidden', 'load-more');

      if (data.hits.length === 0) {
        noMessage();
        loadBtn.classList.replace('load-more', 'load-more-hidden');
        return;
      }

      form.reset();
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

      if (page === 1) totalHits = data.totalHits;

      if (page * per_page >= totalHits) {
        loadBtn.classList.replace('load-more-hidden', 'load-more');
      }

      console.log(totalHits);

      if (totalHits < per_page) {
        loadBtn.classList.replace('load-more', 'load-more-hidden');
        infoMessage();
      }

      lightbox.refresh();
      form.reset();
    })
    .catch(error => alert(error.message));

  gallery.innerHTML = '';
}

async function loadMore() {
  page += 1;
  loadBtn.disabled = true;

  loader.classList.replace('loader', 'loader-on'); //Loader off

  try {
    const data = await searchImages(query, page);
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightbox.refresh();

    loadBtn.disabled = false;

    const item = document.querySelector('.gallery-item');
    const itemHeight = item.getBoundingClientRect().height;

    window.scrollBy({
      top: itemHeight * 2,
      left: 0,
      behavior: 'smooth',
    });

    if (page * per_page >= totalHits) {
      loadBtn.disabled = false;
      loadBtn.classList.replace('load-more', 'load-more-hidden');
      infoMessage();
      loader.classList.replace('loader-on', 'loader'); //Loader on
    }
  } catch (error) {
    iziToast.show({
      message: `${error}`,
    });
  } finally {
    loadBtn.disabled = false;
    loader.classList.replace('loader', 'loader-on'); //Loader off
  }
}

/* ---------------------- iziToast ---------------------- */
function infoMessage() {
  iziToast.info({
    title: 'We are sorry, ',
    message: `but you've reached the end of search results.`,
    titleSize: '16px',
    position: 'topRight',
    timeout: '5000',
    closeOnClick: 'true',
    progressBarColor: '#fff',
    transitionIn: 'bounceInDown',
    transitionOut: 'fadeOutRight',
  });
}

function warningMessage() {
  iziToast.warning({
    title: 'Caution',
    message: `Search field cannot be empty!`,
    titleSize: '16px',
    position: 'topRight',
    timeout: '5000',
    closeOnClick: 'true',
    progressBarColor: '#fff',
    transitionIn: 'bounceInDown',
    transitionOut: 'fadeOutRight',
  });
}

function noMessage() {
  iziToast.error({
    title: 'Sorry, ',
    message: `there is no result for your request!`,
    titleSize: '16px',
    position: 'topRight',
    timeout: '5000',
    closeOnClick: 'true',
    progressBarColor: '#fff',
    transitionIn: 'bounceInDown',
    transitionOut: 'fadeOutRight',
  });
}
