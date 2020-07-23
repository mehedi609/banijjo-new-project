import { capitalize } from 'lodash';

export const calDiscountPercentage = (disAmount, basePrice) =>
  Math.ceil((disAmount / basePrice) * 100);

export const capitalizeStr = (str) =>
  str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');

export const shorten_the_name = (text) => {
  const length = 12;
  return text.slice(0, length) + (text.length > length ? '...' : '');
};

export const shorten_the_name_upto_six = (text) => {
  const length = 6;
  return text.slice(0, length) + (text.length > length ? '...' : '');
};

export const computeTotalPrice = (cartProducts) => {
  let totalPrice = 0;
  for (const item of cartProducts) {
    totalPrice += item.quantity * item.productPrice;
  }
  return totalPrice;
};

export const calculateTotalItems = (products) => {
  if (products.length > 0) {
    return products
      .map((product) => product.quantity)
      .reduce((acc, cur) => acc + cur);
  }
  return 0;
};

export const updateLocalStorage = (productsInfo, key) => {
  const data = productsInfo.map(({ color, size, id, quantity }) => {
    return {
      productId: id,
      colorId: color ? color.id : 0,
      sizeId: size ? size.id : 0,
      quantity,
    };
  });
  if (localStorage.getItem(key)) localStorage.removeItem(key);
  localStorage.setItem(key, JSON.stringify(data));
};
