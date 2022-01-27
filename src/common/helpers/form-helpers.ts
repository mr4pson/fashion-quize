export const getFormValues = (target: EventTarget) => {
  return Object.values(target).reduce((acc, { name, value }) => {
    name && (acc[name] = value);
    return acc;
  }, {});
};
