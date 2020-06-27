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
}

function updateResults(){
    for(let tr of tableArray){
        console.log('appending tr', tr);
        
        $('tbody').append(tr);
    }
    $('.scrollable').scrollTop(200000); 
}