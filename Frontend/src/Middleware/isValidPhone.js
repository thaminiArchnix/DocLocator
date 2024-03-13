export const isValidPhone = (phone) => {
  const regex = /^\d{10}$/;
  return phone.length === 10 && regex.test(phone);
};
