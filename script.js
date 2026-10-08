const bmiForm = document.getElementById("bmiForm");

const nameInput = document.getElementById("name");

const weightInput = document.getElementById("weight");

const heightInput = document.getElementById("height");

const errorMessage =
    document.getElementById("errorMessage");

const result =
    document.getElementById("result");

const resultName =
    document.getElementById("resultName");

const bmiValue =
    document.getElementById("bmiValue");

const bmiCategory =
    document.getElementById("bmiCategory");

const idealWeight =
    document.getElementById("idealWeight");

const marker =
    document.getElementById("marker");

const resetButton =
    document.getElementById("resetButton");


// FORM SUBMIT

bmiForm.addEventListener("submit", function (event) {

    // Prevent page from refreshing
    event.preventDefault();


    // Get values from input

    const name =
        nameInput.value.trim();

    const weight =
        parseFloat(weightInput.value);

    const height =
        parseFloat(heightInput.value);


    // Remove previous error

    hideError();


 
    // INPUT VALIDATION


    if (name === "") {

        showError(
            "Please enter your name ♡"
        );

        return;
    }


    if (isNaN(weight) || weight <= 0) {

        showError(
            "Please enter your weight."
        );

        return;
    }


    if (weight > 500) {

        showError(
            "Please enter a realistic weight."
        );

        return;
    }


    if (isNaN(height) || height <= 0) {

        showError(
            "Please enter your height."
        );

        return;
    }


    if (height > 300) {

        showError(
            "Please enter a realistic height."
        );

        return;
    }


    // BMI CALCULATION


    // Convert height from centimeter
    // to meter

    const heightMeter =
        height / 100;


    /*
        BMI Formula:

        BMI =
        weight / (height × height)
    */

    const bmi =
        weight /
        (heightMeter * heightMeter);


    // ======================================
    // DETERMINE BMI CATEGORY
    // ======================================

    let category;

    let backgroundColor;

    let textColor;


    if (bmi < 18.5) {

        category = "Underweight";

        backgroundColor = "#d8e6ed";

        textColor = "#5b7180";

    }

    else if (bmi < 25) {

        category = "Healthy ♡";

        backgroundColor = "#dce8d8";

        textColor = "#5c7258";

    }

    else if (bmi < 30) {

        category = "Overweight";

        backgroundColor = "#eee0bd";

        textColor = "#8a7143";

    }

    else {

        category = "High BMI";

        backgroundColor = "#ead0cc";

        textColor = "#8c5b55";

    }


    
    // HEALTHY WEIGHT RANGE

    /*
        Healthy BMI:
        18.5 - 24.9
    */


    const minimumWeight =
        18.5 *
        heightMeter *
        heightMeter;


    const maximumWeight =
        24.9 *
        heightMeter *
        heightMeter;

    // DISPLAY RESULT
    

    resultName.textContent =
        name;


    bmiValue.textContent =
        bmi.toFixed(1);


    bmiCategory.textContent =
        category;


    bmiCategory.style.backgroundColor =
        backgroundColor;


    bmiCategory.style.color =
        textColor;


    idealWeight.textContent =
        minimumWeight.toFixed(1)
        + " kg — "
        + maximumWeight.toFixed(1)
        + " kg";



    // MOVE BMI MARKER

    /*
        Scale range:
        15 → 40

        Convert BMI into percentage.
    */

    let markerPosition =
        ((bmi - 15) / 25) * 100;


    // Keep marker inside scale

    if (markerPosition < 0) {

        markerPosition = 0;

    }


    if (markerPosition > 100) {

        markerPosition = 100;

    }


    marker.style.left =
        markerPosition + "%";



    // SHOW RESULT


    result.style.display =
        "block";


    // Smooth scroll to result

    setTimeout(function () {

        result.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }, 100);

});


// SHOW ERROR//


function showError(message) {

    errorMessage.textContent =
        message;

    errorMessage.style.display =
        "block";
}



// HIDE ERROR//


function hideError() {

    errorMessage.textContent =
        "";

    errorMessage.style.display =
        "none";
}


// RESET BUTTON

resetButton.addEventListener(
    "click",
    function () {

        // Clear all inputs

        bmiForm.reset();


        // Hide result

        result.style.display =
            "none";


        // Hide error

        hideError();


        // Return marker to center

        marker.style.left =
            "50%";

    }
);
