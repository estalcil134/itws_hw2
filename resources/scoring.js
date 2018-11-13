$(document).ready(function() {
    //Get the score information from the user
    let expectedVal = 3; //what user guesses
    let actualVal = 3; //$("#hex_value").val(); //what the color actually is
    let difficulty = $("#difficulty_val").val();
    let milliseconds_taken = 4; //how to figure out time until submit?
    //https://stackoverflow.com/questions/29158573/calculate-the-time-taken-until-a-submit-button-is-clicked


    //Calculate percentage
    let percentRed = (Math.abs(expectedVal - actualVal) / 255) * 100;
    let percentGreen = (Math.abs(expectedVal - actualVal) / 255) * 100;
    let percentBlue = (Math.abs(expectedVal - actualVal) / 255) * 100;

    if(percentRed < 0) {
        percentRed = 0;
    }
    if(percentBlue < 0) {
        percentBlue = 0;
    }
    if(percentGreen < 0) {
        percentGreen = 0;
    }

    let totalPercentOff = (percentRed + percentGreen + percentBlue) / 3;



    //Calculate final score
    let finalScore = ((15 – difficulty – totalPercentOff) / (15 – difficulty)) * (15000 – milliseconds_taken);


    //appending final score to the user
    $("#scoreTotal").append(finalScore);







});