let operator = null;

$(document).ready(onReady);

function onReady(){
    //update table results from server
    getResult();
    //create button handlers
    $('.number').on('click', numberPressed);
    $('.operator').on('click', operatorPressed);
    $('.evaluate').on('click', evaluatePressed);
    $('.ac').on('click', clearInput);
    $('.ce').on('click', clearEntry);
}

function numberPressed(){
    let error = '';
    let inputValue = $('input').val();
    let key = $(this).text();
    let operatorIndex = inputValue.indexOf(operator);
    let decimalIndex = inputValue.indexOf('.');

//logic to determine if you can use a decimal or not
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
 else{ //decimal not found simply add the key value to input value
    inputValue+= key;
    $('input').val(inputValue);
 }
}

function operatorPressed(){
    let error = '';
    let inputValue = $('input').val();
    
    //if there is no operator
    if(!operator){
        if(inputValue[inputValue.length-1] === '.'){ //no operators after a decimal
            error = 'Please include a decimal point value before choosing an operator.';
            console.log(error);
        }
        else if(inputValue.length === 0){ //can't start with an operator
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
    else{ //if operator already exists, no more can be added
        error = 'Please only use one operator!';
        console.log(error);
    }
}

function clearInput(){
    operator = null;
    $('input').val('')
}

function evaluatePressed(){
    
    let error = '';
    let inputValue = $('input').val();

    if(operator){ //check to make sure there is an operator
        let operatorIndex = inputValue.indexOf(operator);
        let secondEntry = inputValue.slice((operatorIndex + 2))
        
        console.log(secondEntry);
        //logic to check to make sure the expression has two values and an operator
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
            $.ajax({ //send the server the string to parse and calculate
                type: "POST",
                url: "/evaluate",
                data: {inputValue}
            }).then((response)=>{
                console.log('Server Response: ', response);
                getResult();
                clearInput();
            }).catch((error)=>{
                alert('Error sending calculator input to server: ', error);
            })
        }
    }
    else{
        error = 'Incomplete argument! Please include an operator and an additonal value to evaluate!';
        console.log(error);
    }
}

function clearEntry(){ //remove last chunk of input
    let inputValue = $('input').val();
    let lastInputIndex = inputValue.length - 1;
    let operatorIndex = inputValue.indexOf(operator);
    let newInputValue = '';

    if(operator && operatorIndex + 1 !== lastInputIndex){
         newInputValue = inputValue.slice(0,operatorIndex + 2);
    }
    else if(operator){
         newInputValue = inputValue.slice(0,operatorIndex - 1);
         operator = null;
    }
    $('input').val(newInputValue);

}

function getResult(){
    //get the list for the table
    $.ajax({
        type: "GET",
        url: "/resultList"
    }).then((response)=>{
        //obtain resultList
        console.log(response);
        $('tbody').empty();
        for(item of response){
          $('tbody').append(`
          <tr>
            <td>${item.expression.inputValue}</td>
            <td>= ${item.result}</td>
          </tr>`);
        }
        $('.scrollable').scrollTop(200000);

    }).catch((error)=>{
        alert('Error obtaining evaluation results from server: ', error);
    })
}