export const calculateEndTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Add 2 hours to the current time
    date.setHours(date.getHours() + 2);

    // Format the new time
    const endTime = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    return endTime;
}