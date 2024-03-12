export const isValidPassword = (password) => {
  const lowerCaseRegex = /[a-z]/;
  const upperCaseRegex = /[A-Z]/;
  const digitOrSymbolRegex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  return (
    password.length >= 8 &&
    lowerCaseRegex.test(password) &&
    upperCaseRegex.test(password) &&
    digitOrSymbolRegex.test(password)
  );
};
