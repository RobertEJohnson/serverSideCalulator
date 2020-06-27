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
// `<tr>
//     <td>22 + 3</td>
//     <td>= 2</td>
// </tr>`,
// `<tr>
//     <td>19 + 3</td>
//     <td>= 3</td>
// </tr>`, 
]

$(document).ready(onReady);

function onReady(){
    updateResults();
    $('.number').on('click', numberPressed)
}

function updateResults(){
    for(let tr of tableArray){
        console.log('appending tr', tr);
        
        $('tbody').append(tr);
    }
    $('.scrollable').scrollTop(200000); 
}

function numberPressed(){

    let display = $('input');
    let displayValue = $(display).val();

    // console.log(display);
    
    let key = $(this).text();
    if(key === '.' && displayValue.includes('.')){
        return;
    }
    // console.log(key);
    
    displayValue += key;
    // console.log(displayValue);
    
    display.val(displayValue);
}