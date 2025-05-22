function capitalizeFirstLetter(s: string): string {
  return s
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase())
    .trim();
}

export default capitalizeFirstLetter;
