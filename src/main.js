import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { searchCep } from './helpers/cepFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsSection = document.getElementsByClassName('products');

const loading = (bool) => {
  if (bool === true) {
    const loadingDisplay = document.createElement('span');
    loadingDisplay.className = 'loading';
    loadingDisplay.innerHTML = 'carregando...';
    productsSection[0].appendChild(loadingDisplay);
  } else if (bool === false) {
    const loadingDisplay = document.querySelector('.loading');
    loadingDisplay.remove();
  } else if (bool === undefined) {
    const error = document.createElement('span');
    error.className = 'error';
    error.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
    loading(false);
    productsSection[0].appendChild(error);
  }
};

const fillProductsList = async (query) => {
  loading(true);
  try {
    const search = await fetchProductsList(query);
    loading(false);
    search.forEach((element) => {
      const { id, title, thumbnail, price } = element;
      const productElement = createProductElement({ id, title, thumbnail, price });
      productsSection[0].appendChild(productElement);
    });
  } catch (e) {
    loading();
  }
};

fillProductsList('computador');
