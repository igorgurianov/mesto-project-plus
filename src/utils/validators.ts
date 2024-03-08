const linkValidator = (url: string) => {
  const regex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/;
  return regex.test(url);
};

export default linkValidator;
