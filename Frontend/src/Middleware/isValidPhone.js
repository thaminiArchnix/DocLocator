export const isValidPhone = (phone) => {
  const regex = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
  return regex.test(phone);
};
