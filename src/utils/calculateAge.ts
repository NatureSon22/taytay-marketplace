const calculateAge = (birthday: Date): number => {
  const today = new Date();
  const birthYear = birthday.getFullYear();
  const birthMonth = birthday.getMonth();
  const birthDay = birthday.getDate();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  let age = currentYear - birthYear;

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }
  return Math.max(0, age);
};

export default calculateAge;
