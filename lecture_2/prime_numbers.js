function getPrimeNum(n) {
    let result = [];
    for (let i = 2; result.length < n; i++) {
        let flag = false;
        for (let counter = 2; counter < i; counter++) {
            if (i % counter === 0) {
                flag = true;
                break;
            }
        }
        if (flag === false) {
            result.push(i)
        };
    }
    return result;
}

console.time();
console.log(getPrimeNum(process.argv[2]));
console.timeEnd();