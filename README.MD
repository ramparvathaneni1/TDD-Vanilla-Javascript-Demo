
# Introduction Test-Driven Development (TDD)

- Test-Driven Development (TDD) is a software development approach where you write tests for your functions before you even write the code to implement those functions. It helps ensure your code works as expected and can lead to better designed, more reliable, and easily refactorable code. Let's break down the process using a simple example of adding numbers and testing the functionality.

## Objective
- We will use javascript to build a testing framework that will function similiarly to `jest` a very popular test framework.  Before diving into jest let's take some time to examine some fundamentals of TDD and get some practice building a test framework so we can understand how this tool may be working under neath the hood.


# Applying Test-Driven Development: Writing a Failing Test

- Test-Driven Development (TDD) starts with writing a test for a specific piece of functionality before that functionality itself is implemented. The first step of TDD, therefore, often involves writing a test that fails because the code it tests has not yet been written. This is sometimes referred to as the "Red" phase of TDD. Let's go through this process with our add function and explore the concept of strict comparison, which is a foundational concept in both JavaScript and TDD.

*inside test.js*

```js
console.log(add(2, 2) === 4)
```
- run the file entering the command
```bash
node test.js
```

- The above code should fail because to start off we do not have a add function

## Writing Code To Have Test Pass

- Let's go ahead and write our `add` function that takes two numbers as a parameter and returns the value of adding them together

*test.js*
```js
// Lets Create the add function
function add(num1, num2) {
    return num1 + num2;
}

console.log(add(2, 2) === 4)
```

Now when running your file you should return True

This line checks if the result of add(2,2) is strictly equal to 4. If the function works correctly, this test will print true to the console, indicating the test passed. Otherwise, it will print false, indicating the test failed.

- Limitations
While this approach works, it's not scalable. As you add more functions and more complex tests, you'll need a more systematic way to manage your tests. This is where writing a testing framework, even a simple one, becomes beneficial.

## Building a Simple Testing Framework

1. The expect Function
To handle the comparison in a reusable way:

*test.js*
```js
// The 'expect' function is designed to compare two values: the expected value and the resulting value.
// It serves as an assertion function in testing, verifying that a specific piece of code behaves as expected.
function expect(expectedValue, resultingValue) {
  // The 'if' statement checks if the expected value strictly equals the resulting value.
    // The '===' operator ensures that both the value and the type are the same.
    if (expectedValue === resultingValue) {
      // If the condition is true, it means the test passed because the actual outcome matched the expected outcome.
        // A success message is constructed and logged to the console to inform the user of the passed test.
        const succesMessage = `Test Passed: ${expectedValue} is equal to ${resultingValue}`
        console.log(succesMessage)
        // Returning the success message. This could be useful if the calling code needs to use the result of the test,
        // though in many simple testing frameworks, the return value might not be used.
        return succesMessage
    } else {
      // If the expected value does not strictly equal the resulting value, the test has failed.
        // An error is thrown with a message indicating the failure. Throwing an error is a common way to
        // signal test failures in many testing frameworks, as it immediately halts execution of the test
        // and can be caught by a test runner to be reported.
        throw new Error(`Test Failed: ${expectedValue} is not equal to ${resultingValue}`)

    }
}
```
Let's go ahead and test our expect function by invoking it

```js
expect(add(2,2), 4)
```

Now let's run our test.js file and we should see our test pass.

### 2. Registering Tests

- We are going to improve our organization of our tests by storing them in an array of objects called test.  Each test object will have a testName and testFn key.  We will have a function called addTest that will push that object into our test array.  It will take a string for the test name and a annoymous function that will run our expect function as parameters.

*test.js*

```js
const tests = []

function addTest(testName, testFn) {
    tests.push({ testName, testFn });
}
```

- Let's go ahead and practice using our addTest function

*test.js*
```js
const tests = []

console.log(test, "This should be empty)

function addTest(testName, testFn) {
    tests.push({ testName, testFn });
}

addTest("Addition of 5 and 3 equals 8", () => expect(add(5,3), 8))

console.log(test, "this should not have a test")
```

When running the test.js file you should now see first a empty array appearing since our tests array is initially empty then when envoking our `addTest` function we push our test object to the tests array and when we console.log again after our function is invoked we should now see a object with our testName and our annonymous testFn

### 3. Running Test
- Now we will have runTest function that will iterate over all of our test objects and provide us with a message letting us know:
- The number of tests ran
- How many test have passed
- How many test have failed
- Provide us with a error or passing message

*test.js*

```js
function runTest() {
    let passedTest = 0;

    tests.forEach(({ testName, testFn }) => {
        try {
            const result = testFn();
            passedTest++;
            console.log(`Test Passed: Name: ${testName}, Result: ${result}`);
        } catch (error) {
            console.log(`Failed: Name: ${testName}\n Result: ${error}`);
        }
    });

    console.log(`Ran ${tests.length} Tests, ${passedTest} Passed, ${tests.length - passedTest} Failed`);
}
```

Let's go ahead and invoke our `runTest` function to iterate over our collection of test after they have been added to our tests array by our addTest function

test.js
```js
const tests = []

function runTest() {
    let passedTest = 0

    tests.forEach(({ testName, testFn}) => {
        try {
           const result = testFn()
           passedTest++
           console.log(`Test Passed: Name: ${testName}, Result: ${result}`)
        } catch (error) {
            console.log(`Failed: Name: ${testName}\n Result: ${error}`)
        }
    })

    console.log(`Ran ${tests.length} Tests, ${passedTest} Passed, ${tests.length - passedTest} Failed`)

}

function addTest(testName, testFn) {
    tests.push({ testName, testFn})
}

function expect(expectedValue, resultingValue) {
    if (expectedValue === resultingValue) {
        const succesMessage = `Test Passed: ${expectedValue} is equal to ${resultingValue}`
        console.log(succesMessage)
        return succesMessage
    } else {
        throw new Error(`Test Failed: ${expectedValue} is not equal to ${resultingValue}`)

    }
}

function add(num1, num2) {

    return num1 + num2
}

addTest("Addition of 2 and 5 equals 7", () => expect(add(2,5), 7))
addTest("Addition of 2 and 2 equals 4", () => expect(add(2,2), 6))
addTest("This will fail 2 and 2 not equal to 5", () => expect(add(2,2), 4))
// invoke our runTest function
runTest()
```

- Now let's run our test.js file and we should receive how many tests have passed how many have failed and which tests with the name and result of the ones that have passed and failed.

### With our testing framework components in place, we can follow the TDD cycle:

- Write a failing test: Start by writing a test for functionality that doesn't yet exist or hasn't been implemented. This helps define what you're aiming to build.

- Make the test pass: Implement or modify your code to make the failing test pass. This ensures your code meets the requirements defined by the test.

- Refactor: Once the test passes, refactor your code as needed to improve its structure, readability, or performance without changing its behavior.

- By following this cycle, developers ensure that they're writing only the necessary code to pass tests, leading to cleaner, more maintainable, and reliable software.
