export function giveUTCTime(dateString, timezoneOffset) {
    const date = new Date(dateString);
    
    // Adjust date with timezone offset
    const offsetMilliseconds = timezoneOffset * 60 * 60 * 1000;
    const utcMilliseconds = date.getTime() + offsetMilliseconds;
    
    // Create a new Date object with the adjusted milliseconds
    const utcDate = new Date(utcMilliseconds);
    
    // Return the UTC date with timezone offset of 0
    return utcDate;
}