import holeImg from './img/두더지_굴_1.png';
import moleImg from './img/두더지_1.png';
import {router} from './router';

let timeflag = true;
let time = document.getElementById('time') as HTMLLabelElement;
let catchPoint  = document.getElementById('catchPoint') as HTMLLabelElement;
console.log(time);



function gameInit(){
 console.log("gamestart");

 const row:number = parseInt((document.getElementById('hRow') as HTMLInputElement).value);
const col:number = parseInt((document.getElementById('hCol') as HTMLInputElement).value);
const mole:number = parseInt((document.getElementById('hMole') as HTMLInputElement).value);
const btnPause = document.getElementById('btnPause') as HTMLHtmlElement;
const btnFinish = document.getElementById('btnFinish') as HTMLHtmlElement;
console.log(btnPause,btnFinish);
btnPause.addEventListener('click',onClickPauseBtn);
btnFinish.addEventListener('click',onClickFinishBtn);
// 일시정지 // 그만하기 add click event

console.log(row, col, mole );

time = document.getElementById('time') as HTMLLabelElement;
catchPoint  = document.getElementById('catchPoint') as HTMLLabelElement;
console.log(time);
timeflag = false;
time.innerHTML = "60";
catchPoint.innerHTML = "0";
setDiv(row,col);
// 게임 시작
gameStart(row,col,mole);
}
// 게임 시작 
function gameStart(row:number, col:number, mole:number)
{
   timer();
    moleTimer(row,col,mole,1000);
    
    

   
}
// 전체 시간 timer
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
            console.log(">>");
            timeflag = true;
        }
    }, 1000);
}

// row,col,두더지 배치
function setDiv(row:number, col:number){

    const rowClass = "row-"+String(row);
    const colClass = "col-"+String(col);

    
    let divStr = "";
    let moleId = ""
    let imgDiv = "";

for (let i = 0; i < row; i++) {
    divStr += "<div class='"+rowClass+"' >";
    for(let j = 0; j<col; j++){
        moleId= String(i+1)+"_"+String(j+1);      
        imgDiv = "<div class='"+colClass+"'>"
        +"<div class='img-div'><img src='"+holeImg+"' class='hole-image'></img></div>"
        +"<div class='img-div'><img src='"+moleImg+"' class='basic-mole-image' id='"+moleId+"'></img></div>"
        +"</div>";
        divStr += imgDiv;
    }
    
    divStr += "</div>";
}

console.log(divStr);
const mainDiv:HTMLDivElement  = document.querySelector(".main")!;

console.log(mainDiv);
mainDiv.innerHTML = divStr;
}

// 좌표 생성
function rand(max:number) {
    const min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


 // 두더지 timer
function moleTimer(row:number, col:number, mole:number,sec:number) { // 시간 3초마다
    console.log("moletimer");
    setTimeout(function(){ 
        if(timeflag) {
            timeflag = false;
            return;
        }

        
        let moleRow = 1;
        let moleCol = 1;
        let id = "";
        let moleClassName="";
        if( 10 > parseInt(time.innerHTML)) moleClassName = "up-mole-image-3";
        else if( 45 > parseInt(time.innerHTML)) moleClassName = "up-mole-image-2";
        else if( 60 > parseInt(time.innerHTML)) moleClassName = "up-mole-image-1";
        
        // class 초기화 
        const moles1 = document.querySelectorAll('.up-mole-image-1');
        moles1.forEach(el => {

            el.className = "basic-mole-image";
        });
        const moles2 = document.querySelectorAll('.up-mole-image-2');
        moles2.forEach(el => {
            el.className = "basic-mole-image";
        });
        const moles3 = document.querySelectorAll('.up-mole-image-3');
        moles3.forEach(el => {
            el.className = "basic-mole-image";
        });

        for(let m = 0; m< mole; m++){

            moleRow = rand(row);
            moleCol = rand(col);
            id = String(moleRow) + "_" +String(moleCol);

            const moleElem = document.getElementById(id);

            if(moleElem?.className == "basic-mole-image"){
                moleElem.className = moleClassName;
                moleElem.addEventListener("click",moleClickEvent);   
            }           
        }
        if(10 > parseInt(time.innerHTML) ){
            moleTimer(row,col,mole,1000);
        } 
        else if( 45 > parseInt(time.innerHTML) ){
            moleTimer(row,col,mole,2000);
        }
        else if(60 > parseInt(time.innerHTML)){
            moleTimer(row,col,mole,3000);
        }
        else {
            console.log(">>")
        }   
    }, sec);
}
function moleClickEvent(this:HTMLElement){
console.log("moleClickEvent")

catchPoint.innerHTML = String(parseInt(catchPoint.innerHTML)+1);
 this.removeEventListener("click",moleClickEvent);

}
function onClickPauseBtn(this:HTMLElement){
    console.log(this);
}
// 그만하기 버튼 클릭 이벤트
function onClickFinishBtn(this:HTMLElement){
    console.log(this);
    const historyAppDiv:HTMLDivElement  = document.querySelector("#history-app")!;

    router.historyRouterPush('/',historyAppDiv);
}
export const gameService = {
    gameInit,
    gameStart,
}