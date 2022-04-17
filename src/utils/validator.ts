export const validatePassword = (password: string): boolean => {
  const reg = /^[\da-zA-Z~!@#$%^&*]{8,18}$/;
  return reg.test(password);
};
