const dateConverter = (date) => {
  const utcDate = new Date(date);
  console.log(`date : ${date}, date : ${utcDate}`);
  const offset = 330;
  const localTime = new Date(utcDate.getTime() + offset * 60000);
  console.log(localTime);
};

module.exports = dateConverter;
