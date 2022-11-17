import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsSection = document.getElementsByClassName('products');
const cartProducts = document.querySelector('.cart__products');

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

const cartButtonFn = async (event) => {
  const productBox = event.target.parentElement;
  const id = productBox.querySelector('.product__id').innerText;
  saveCartID(id);
  const product = await fetchProduct(id);
  cartProducts.appendChild(createCartProductElement(product));
};

const fillProductsList = async (query) => {
  loading(true);
  try {
    const search = await fetchProductsList(query);
    loading(false);
    search.forEach((element) => {
      const { id, title, thumbnail, price } = element;
      const productElement = createProductElement({ id, title, thumbnail, price });
      const cartButton = productElement.querySelector('.product__add');
      cartButton.addEventListener('click', cartButtonFn);
      productsSection[0].appendChild(productElement);
    });
  } catch (e) {
    loading();
  }
};

fillProductsList('computador');
