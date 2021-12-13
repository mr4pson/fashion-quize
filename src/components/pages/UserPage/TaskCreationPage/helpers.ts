export const handleTimeChange = (e, form) => {
  let time: string = e.target.value;
  if (+time[0] > 2) {
    time = time.replaceAt(0, "2");
  }

  if (+time[0] === 2 && +time[1] > 4) {
    time = time.replaceAt(1, "3");
  }

  if (+time[3] > 5) {
    time = time.replaceAt(3, "5");
  }

  form.setFieldsValue({
    time,
  });
};