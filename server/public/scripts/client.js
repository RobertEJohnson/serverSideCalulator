let tableArray = [
    `<tr>
        <td>19 + 3</td>
        <td>= 1</td>
    </tr>`, 
    `<tr>
        <td>22 + 3</td>
        <td>= 2</td>
    </tr>`,
    `<tr>
        <td>19 + 3</td>
        <td>= 3</td>
    </tr>`,  
       `<tr>
    <td>19 + 3</td>
     <td>= 1</td>
 </tr>`, 
`<tr>
    <td>22 + 3</td>
    <td>= 2</td>
</tr>`,
`<tr>
    <td>19 + 3</td>
    <td>= Last Result</td>
</tr>`
]

let operator = 0;

$(document).ready(onReady);

function onReady(){
    updateResults();
    $('.number').on('click', numberPressed);
    $('.operator').on('click', operatorPressed);
    $('.evaluate').on('click', evaluatePressed);
    $('.ac').on('click', clearInput);
}

function updateResults(){
    for(let tr of tableArray){
        console.log('appending tr', tr);
        
        $('tbody').append(tr);
    }
    $('.scrollable').scrollTop(200000); 
}



function numberPressed(){
    let error = '';
    let inputValue = $('input').val();
    let key = $(this).text();
    let operatorIndex = inputValue.indexOf(operator);
    let decimalIndex = inputValue.indexOf('.');

 if(key === '.'){
    if(decimalIndex !== -1 && operatorIndex === -1){ //if a decimal is found and there is no operator
        error = 'Please use only one decimal point in a number.';
        console.log(error);
    }
    else if(operator){ 
        if(decimalIndex > operatorIndex){
            error = 'Please use only one decimal poin in a number.';
        }
        else if(inputValue.slice(decimalIndex + 1).indexOf('.') === -1){//check to make sure there are no more decimals in the string that follows the decimal
            inputValue += '.';
            $('input').val(inputValue);
            }
        else{
            error = 'Please use only one decimal point in a number.';
            console.log(error);
        }
    }
    else{
        inputValue += '.';
        $('input').val(inputValue);
    } 
 }
 else{ //decimal not found
    inputValue+= key;
    $('input').val(inputValue);
 }
}

function operatorPressed(){
    let error = '';
    let inputValue = $('input').val();
    
    if(!operator){
        if(inputValue[inputValue.length-1] === '.'){
            error = 'Please include a decimal point value before choosing an operator.';
            console.log(error);
        }
        else if(inputValue.length === 0){
            error = 'Please include a value before choosing an operator.';
            console.log(error);
        }
        else{
            operator = $(this).text();
            inputValue += ` ${operator} `;
            $('input').val(inputValue);
        }
    }
    else if(inputValue[inputValue.length-2]=== operator){
        let operatorIndex = inputValue.indexOf(operator);
        let newInputValue = inputValue.slice(0, operatorIndex-1);
        operator = $(this).text();
        newInputValue += ` ${operator} `;
        $('input').val(newInputValue);
    }
    else{
        error = 'Please only use one operator!';
        console.log(error);
    }
}

function clearInput(){
    operator = 0;
    $('input').val('')
}

function evaluatePressed(){
    
    let error = '';
    let inputValue = $('input').val();

    if(operator){ //check to make sure there is an operator
        let operatorIndex = inputValue.indexOf(operator);
        let secondEntry = inputValue.slice((operatorIndex + 2))
        
        console.log(secondEntry);
        
        if(secondEntry[secondEntry.length-1] === '.'){
            error = 'Please include a value after the final decimal point.';
            console.log(error);
        }
        else if(secondEntry.length === 0){
            error = 'Please include a second value for operator to use.';
            console.log(error);
        }
        else{
            console.log('The evaluation to send to server is: ', inputValue);
        }
    }
    else{
        error = 'Incomplete argument! Please include an operator and an additonal value to evaluate!';
        console.log(error);
    }
}

app.send()