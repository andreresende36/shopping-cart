const cepInput = document.querySelector('.cep-input');
const cartAddress = document.querySelector('.cart__address');

export const getAddress = async (cep) => {
  const statusError1 = 400;
  const statusError2 = 404;
  const response1 = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const response2 = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const address = await Promise.any([response1, response2])
    .then((resp) => {
      if (resp.status === statusError1 || resp.status === statusError2) {
        throw new Error('CEP não encontrado');
      }
      return resp.json();
    })
    .then((data) => data)
    .catch(() => { throw new Error('CEP não encontrado'); });
  return address;
};

export const searchCep = async () => {
  try {
    const cep = cepInput.value;
    const data = await getAddress(cep);
    const { street, address, neighborhood, district,
      city, state } = data;
    const res = `${street || address} - ${neighborhood || district} - ${city} - ${state}`;
    cartAddress.innerHTML = res;
  } catch (e) {
    cartAddress.innerText = e.message;
  }
};
