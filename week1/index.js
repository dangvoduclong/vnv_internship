
let globalVariable = 'I am global variable';

const arithmeticOperations = (a, b) => {
    const sum = a + b;
    const sub = a - b;
    const mul = a * b;
    const div = (a, b) => a / b;

    console.log(`SUM : ${a} + ${b} = ${sum}`);
    console.log(`SUB = ${a} + ${b} = ${sub}`);
    console.log(`MUL = ${a} + ${b} = ${mul}`);
    console.log(`DIV = ${div(a, b)}`); // example of function with back tick
}

arithmeticOperations(15, 3);

let globalVar = 10;

function modifyGlobal() {
    globalVar += 5;
    console.log(`Inside function, globalVar: ${globalVar}`);
}
console.log(`Before function call, globalVar: ${globalVar}`);
modifyGlobal();
console.log(`After function call, globalVar: ${globalVar}`);

// Nested Functions
function outerFunction(x) {
    function innerFunction(y) {
        return x + y;
    }
    return innerFunction;
}
let add10 = outerFunction(10);
let result = add10(5);
console.log(`Result : ${result}`);

const localScope = () => {
    let localVariable = 'I am local variable';
    console.log(`Inside function, localVariable: ${localVariable}`);
    console.log("Outside function, globalVariable: " + globalVariable);

}
localScope();