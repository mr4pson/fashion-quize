export const checkIfRateIsAccessible = (taskTitle) =>
  !["Подтверждена", "В пути", "Завершена"].includes(taskTitle);
