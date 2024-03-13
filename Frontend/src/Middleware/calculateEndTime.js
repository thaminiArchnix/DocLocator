export const calculateEndTime = (timeString) => {
  if (timeString === undefined) {
    return "00:00:00";
  } else {
    // Split the timeString into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    console.log(hours, minutes, seconds);
    // Calculate the new hours after adding two hours
    let newHours = hours + 2;

    // Ensure that the new hours are within the range of 0 to 23
    newHours %= 24;

    // Format the new time
    const newTimeString = `${newHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return newTimeString;
  }
};
