import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { searchCep } from './helpers/cepFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsSection = document.getElementsByClassName('products');

const loading = () => {
  const loadingDisplay = document.createElement('span');
  loadingDisplay.className = 'loading';
  loadingDisplay.innerHTML = 'carregando...';
  productsSection[0].appendChild(loadingDisplay);
};

const disableLoading = () => {
  const loadingDisplay = document.querySelector('.loading');
  loadingDisplay.remove();
};

const fillProductsList = async (query) => {
  loading();
  const search = await fetchProductsList(query);
  disableLoading();
  search.forEach((element) => {
    const { id, title, thumbnail, price } = element;
    const productElement = createProductElement({ id, title, thumbnail, price });
    productsSection[0].appendChild(productElement);
  });
};

fillProductsList('computador');
