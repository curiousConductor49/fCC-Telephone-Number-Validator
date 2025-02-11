// Variables
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

// Clear function
const clearResultsDiv = () => {
  resultsDiv.innerHTML = "";
  userInput.value = "";
  };

// Check function
const checkUserInput = (input) => {
  // Input logic checks if a phone number has been entered
  if (input.value === "") {
    alert("Please provide a phone number");
    return;
  }
  // Telephone number logic checks if the phone number is valid
  let failedCheck = 0;
  let openBracketCounter = 0;
  let closeBracketCounter = 0;
  // Number of digits and country code check
  const intArr = input.value.split("").map((arrEl) => parseInt(arrEl)).filter((arrEl) => !isNaN(arrEl));

  if (intArr.length < 10 || (intArr[0] !== 1 && intArr.length === 11) || intArr.length > 11) {
    failedCheck++;
  }
  // Non-numerical character check
  const userNumStr = input.value;
  if (!userNumStr.match(/[\d\s-()]/)) {
    failedCheck++;
  }
 // Number of brackets check 
  for (const el of input.value) {
    if (el === "(") {
      openBracketCounter++;
    } else if (el === ")") {
      closeBracketCounter++;
    }
  }
  const totalBrackets = openBracketCounter + closeBracketCounter;
  if (totalBrackets > 2 || totalBrackets === 1) {
     failedCheck++;
  }
  // Hyphen and space placement check
  if (!userNumStr.match(/^(1?\s?\(?[0-9][0-9][0-9]\)?(\s|-)?[0-9][0-9][0-9]?(\s|-)?[0-9][0-9][0-9][0-9])|(1?\(?[0-9][0-9][0-9]\)?[0-9][0-9][0-9][0-9][0-9][0-9][0-9])$/)) {
    failedCheck++;
  } else if (userNumStr.match(/-$/) || userNumStr.match(/\)$/)) {
    failedCheck++;
  } else if (userNumStr.match(/\(\s[0-9][0-9][0-9]\s\)/)) {
    failedCheck++;
  }
  console.log(userNumStr);
  console.log(failedCheck);
  
  failedCheck !== 0 ? resultsDiv.innerHTML = `Invalid US number: ${userInput.value}` : resultsDiv.innerHTML = `Valid US number: ${userInput.value}`;
}

// Connect to buttons
clearBtn.addEventListener("click", clearResultsDiv);
checkBtn.addEventListener("click", () => { checkUserInput(userInput) });