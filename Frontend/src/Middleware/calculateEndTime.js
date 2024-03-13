export const calculateEndTime = (timeString) => {
  if (timeString === undefined) {
    return "00:00:00";
  } else {
    
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    console.log(hours, minutes, seconds);
    
    let newHours = hours + 2;

    
    newHours %= 24;

    const newTimeString = `${newHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return newTimeString;
  }
};
