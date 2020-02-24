export const Debug = (prefix: string) => {
  return (message: string) => {
    console.log(`${prefix}: ${message}`);
  };
};
