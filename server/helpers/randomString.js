/* eslint-disable no-plusplus */
const randomString = (length) => {
  let result = '';
  const alphaNumeric = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = length; i > 0; i--) {
    result += alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)];
  }
  return result;
};

export default randomString;
