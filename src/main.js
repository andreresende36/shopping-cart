import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { searchCep } from './helpers/cepFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsSection = document.getElementsByClassName('products');
const searchComputador = await fetchProductsList('computador');

searchComputador.forEach((element, i) => {
  const { id, title, thumbnail, price } = element;
  const productElement = createProductElement({ id, title, thumbnail, price });
  productsSection[0].appendChild(productElement);
});
