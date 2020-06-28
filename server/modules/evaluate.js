   
function evaluate(string){
    let operatorIndex, operation, result;
    if(string.indexOf('×') !== -1){
        operation = 'multiplication';
        operatorIndex = string.indexOf('×');
    }
    else if(string.indexOf('÷') !== -1){
        operation = 'division';
        operatorIndex = string.indexOf('÷');
    }
    else if(string.indexOf('+') !== -1){
        operation = 'addition';
        operatorIndex = string.indexOf('+');
    }
    else{
        operation = 'subtraction';
        operatorIndex = string.indexOf('-');
    }

    //parse for first and second values
    let firstValue = string.slice(0, operatorIndex - 1);
    let secondValue = string.slice(operatorIndex + 2);
    //convert to floats from string
    firstValue = parseFloat(firstValue);
    secondValue = parseFloat(secondValue);
    //apply correct operation to values in order
    switch(operation){
        case 'multiplication':
            result = firstValue * secondValue;
            break;
        case 'division':
            result = firstValue / secondValue;
            break;
        case 'addition':
            result = firstValue + secondValue;
            break;
        case 'subtraction':
            result = firstValue - secondValue;
            break;
    }
    console.log(result);
    
    if(String(result).indexOf('.') !== -1){
        return result.toFixed(2);
    }
    return String(result);
    
}   
   
   



module.exports = evaluate;