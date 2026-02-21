let container=document.querySelector('.container');
let btn=document.querySelector('.size');

//to create the grid
btn.addEventListener('click',()=>{
    let r=prompt("enter num of rows");
    let c=prompt("enter num of cols");
for(let i=0;i<r;i++){
   let row= document.createElement('div');
   row.classList.add('row')
    for(let j=0;j<c;j++){
        let cell=document.createElement('div');
        cell.classList.add('cell')
        row.appendChild(cell)
    }
    container.appendChild(row);
    console.log("appended row")
}
})


//to clear the grid.
let clear=document.querySelector('.clear')
clear.addEventListener('click',()=>{
    let rows=document.querySelectorAll('.row')
    rows.forEach((row)=>{
        container.removeChild(row);
    })
})


