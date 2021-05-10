import holeImg from './img/두더지_굴_1.png';
import moleImg from './img/두더지_1.png';

let timeflag = true;
let time = document.getElementById('#time') as HTMLLabelElement;
console.log(time);



function gameStart(){
 console.log("gamestart");

 const row:number = parseInt((document.getElementById('hRow') as HTMLInputElement).value);
const col:number = parseInt((document.getElementById('hCol') as HTMLInputElement).value);
const mole:number = parseInt((document.getElementById('hMole') as HTMLInputElement).value);

console.log(row, col, mole );

time = document.querySelector('#time') as HTMLLabelElement;
console.log(time);
timeflag = false;
time.innerHTML = "60";
setDiv(row,col);
timer();

}

function timer() { // 시간 감소 1초. 총 60초
    console.log("timer");
    setTimeout(function(){
        if(timeflag) {
            timeflag = false;
            return;
        }
        time.innerHTML = String(parseInt(time.innerHTML) -1);
           
        if(parseInt(time.innerHTML) > 0){
            timer();
        } else {
            console.log(">>")
        }
    }, 1000);
}

// row,col,두더지 배치
function setDiv(row:number, col:number){
    const rowClass = "row-"+String(row);
    const colClass = "col-"+String(col);

    
    let divStr = "";


for (let i = 0; i < row; i++) {
    divStr += "<div class='"+rowClass+"' >";
    for(let j = 0; j<col; j++){

        let imgDiv = "";
        imgDiv = "<div class='"+colClass+"'><div class='img-div'><img src='"+holeImg+"' class='hole-image'></img></div><div class='img-div'><img src='"+moleImg+"' class='mole-image'></img></div></div>";
        divStr += imgDiv;
    }
    
    divStr += "</div>";
}

console.log(divStr);
const mainDiv:HTMLDivElement  = document.querySelector(".main")!;

console.log(mainDiv);
mainDiv.innerHTML = divStr;
}
export const gameService = {
    gameStart,
}