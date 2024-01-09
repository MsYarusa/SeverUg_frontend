export function sum(array) {
  let totalPrice = 0;
  array?.forEach((item, i, arr) => {
    totalPrice += Number(item);
  });
  return totalPrice;
}
