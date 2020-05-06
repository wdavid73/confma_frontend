export const isEmptyOrBlank = (str) => {
  return !str || 0 === str.length || /^\s*$/.test(str) ? false : true;
};

export const isNumber = (number) => {
  return isNaN(number) ? false : true;
};
