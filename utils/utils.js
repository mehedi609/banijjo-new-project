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
