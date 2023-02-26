/**
 * This function converts temperature in Fahrenheit to Celsius
 * @param tempInFahrenheit temp in Fahrenheit
 * @returns {number} temp in Celsius
 */
function convertToCelsius(tempInFahrenheit){
    const parsedTemp = parseFloat(tempInFahrenheit);
    return ((parsedTemp - 32)/1.8).toFixed(1);
}

export default convertToCelsius;