/**
 * This function converts epoch time into human readable time
 * @param epoch epoch time
 * @returns {string} human readable time and date in the format "YYYY-MM-DD HH:MM:SS"
 */
function convertEpochToHumanReadableTime(epoch) {
    try {
        const timestamp = parseInt(epoch) + 3600000;
        if (isNaN(timestamp) || timestamp < 0 || timestamp > 8640000000000000) {
            return "";
        }
        const date = new Date(timestamp).toISOString();
        return date.substring(0, 10) + " " + date.substring(11, 19);
    } catch (error) {
        console.log(error);
    }
}

export default convertEpochToHumanReadableTime;
