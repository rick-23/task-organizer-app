export const findDaysDiff = (userDate: Date | null): string | number => {
  if (userDate !== null) {
    const currentDate = new Date();
    const diff = userDate.getTime() - currentDate.getTime();
    // Calculate the difference in days
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Handle different cases
    if (days < 0) {
      return "Overdue";
    } else if (days === 0) {
      return "Due today";
    } else {
      return days;
    }
  } else {
    return "Please input a valid date";
  }
};
