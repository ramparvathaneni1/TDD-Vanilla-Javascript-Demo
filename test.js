// Create the add function
function add(num1, num2) {
  return num1 + num2;
}

function expect(expectedValue, actualValue) {
  if (expectedValue === actualValue) {
    const successMessage = `Test Passed: ${expectedValue} is equal to the ${actualValue}`;
    console.log(successMessage);
    return successMessage;
  } else {
    throw new Error(
      `Test failed: ${expectedValue} is not equal to ${actualValue}`
    );
  }
}

const tests = [];

console.log("All tests = ", tests);

function addTest(testName, testFn) {
    tests.push({ testName, testFn });
}

addTest("Addition of 5 and 3 equals 8", 
    () => expect(add(5, 3), 8));

addTest("Addition of -1 and -4 equals -5", 
    () => expect(add(-1, -4), -5));

addTest("Addition of -1 and 3 equals -5", 
    () => expect(add(-1, 3), -5));

console.log("All tests = ", tests);

function runTests() {
    let passedTest = 0;

    tests.forEach(({testName, testFn}) => {
        try {
            const result = testFn();
            passedTest++;
            console.log(`Test Passed: Name: ${testName}, Result: ${result}`);
        } catch (error) {
            console.log(`Failed: Name: ${testName} \n Result: ${error}`);
        }
    });

    console.log(`Ran ${tests.length} Tests, ${passedTest} Passed, ${tests.length - passedTest} Failed`);
}

runTests();