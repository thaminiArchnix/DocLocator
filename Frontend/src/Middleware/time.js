export const time = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0'); // Get hours and ensure 2-digit format
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and ensure 2-digit format
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Get seconds and ensure 2-digit format

    return `${hours}:${minutes}:${seconds}`;
};