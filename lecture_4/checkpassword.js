function getPasswordChecker(password) {
    return function check(correctPassword) {
        return (correctPassword === password)
    }
}

const checkPassword = getPasswordChecker('helloWorld2023!');

console.log(checkPassword('hello'));
console.log(checkPassword('hf3jkjfd98'));
console.log(checkPassword('helloWorld2023!'));
