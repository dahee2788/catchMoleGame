// image import
import holeImg from './img/두더지_굴_1.png';
import moleImg from './img/두더지_1.png';
// router import
import {router} from './router';
// service import
import {readyService} from './readyService';
import {resultService} from './resultService';

// 전역변수 선언
let timeflag = true;
let mTimeflag = true;
let time = document.getElementById('time') as HTMLLabelElement;
let catchPoint  = document.getElementById('catchPoint') as HTMLLabelElement;
const historyAppDiv:HTMLDivElement  = document.querySelector("#history-app")!;
let row:number;
let col:number;
let mole:number;

// 게임 초기화 
function gameInit(){

    row = parseInt((document.getElementById('hRow') as HTMLInputElement).value);
    col = parseInt((document.getElementById('hCol') as HTMLInputElement).value);
    mole = parseInt((document.getElementById('hMole') as HTMLInputElement).value);
    const btnPause = document.getElementById('btnPause') as HTMLSpanElement;
    const btnFinish = document.getElementById('btnFinish') as HTMLSpanElement;

    // 일시정지 ,그만하기 add click event
    btnPause.addEventListener('click',onClickPauseBtn);
    btnFinish.addEventListener('click',onClickFinishBtn);

    // 게임 내 변수 초기화
    time = document.getElementById('time') as HTMLLabelElement;
    catchPoint  = document.getElementById('catchPoint') as HTMLLabelElement;
    timeflag = false;
    mTimeflag = false;
    time.innerHTML = "60";
    catchPoint.innerHTML = "0";
    setDiv(row,col);

    // 게임 시작
    gameStart(row,col,mole);

}

// 게임 시작 
function gameStart(row:number, col:number, mole:number)
{
    // 전체 시간 타이머
   timer();
   // 두더지 호출 타이머
   moleTimer(row,col,mole,1000);
      
}
// 전체 시간 timer
function timer() { // 시간 감소 1초. 총 60초
    setTimeout(function(){ 
        if(timeflag) {
            timeflag = false;
            return;
        }
        time.innerHTML = String(parseInt(time.innerHTML) -1);
           
        if(parseInt(time.innerHTML) > 0){
            timer();
        } else {
            timeflag = true;
            mTimeflag = true;
            gameFinish();
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

const mainDiv:HTMLDivElement  = document.querySelector(".main")!;

mainDiv.innerHTML = divStr;
}

// 좌표 생성
function rand(max:number) {
    const min = 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


 // 두더지 호출 timer
function moleTimer(row:number, col:number, mole:number,sec:number) { // 시간 3초마다
    setTimeout(function(){ 
        if(mTimeflag) {
            mTimeflag = false;
            return;
        }
  
    let moleRow = 1;
    let moleCol = 1;
    let id = "";
    let moleClassName="";
    
    // 적용할 클래스 셋팅, 남아있는 시간에 비례하여 두더지 노출 시간 감소
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

    // 입력된 두더지 수만큼 for문 실행되면서 random 좌표 생성 
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
    // 남아있는 시간에 비례하여 두더지 호출 시간 감소
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

        mTimeflag = true;
    }   
    }, sec);
}
// 두더지 클릭 이벤트
function moleClickEvent(this:HTMLElement){
    catchPoint.innerHTML = String(parseInt(catchPoint.innerHTML)+1);
    this.removeEventListener("click",moleClickEvent);
}
// 일시정지 버튼 클릭 이벤트
function onClickPauseBtn(this:HTMLElement){

    if(this.innerHTML == "일시정지")
    {
        this.innerHTML = "재개하기";
        timeflag = true;
        mTimeflag = true;
        
    }
    else{
        this.innerHTML = "일시정지";
        timeflag = false;
        mTimeflag = false;
        gameStart(row,col,mole);
    }

    // 활성화되어있는 두더지들 클래스 변경
    const moles1 = document.querySelectorAll<HTMLElement>('.up-mole-image-1');
    moles1.forEach(el => {  
        const state = el.style.animationPlayState;
        el.style.animationPlayState = (state == 'paused'?'running':'paused');
        if(state =='paused')
        {
            el.addEventListener("click",moleClickEvent);
           
        } else el.removeEventListener("click",moleClickEvent);  
    });
    const moles2 = document.querySelectorAll<HTMLElement>('.up-mole-image-2');
    moles2.forEach(el => {
        const state = el.style.animationPlayState;
        el.style.animationPlayState = (state == 'paused'?'running':'paused');
        if(state =='paused')
        {
            el.addEventListener("click",moleClickEvent);
           
        } else el.removeEventListener("click",moleClickEvent);  
    });
    const moles3 = document.querySelectorAll<HTMLElement>('.up-mole-image-3');
    moles3.forEach(el => {
        const state = el.style.animationPlayState;
        el.style.animationPlayState = state == 'paused'?'running':'paused';
        if(state =='paused')
        {
            el.addEventListener("click",moleClickEvent);
           
        } else el.removeEventListener("click",moleClickEvent);  
    });
}
// 그만하기 버튼 클릭 이벤트
function onClickFinishBtn(this:HTMLElement){

    router.historyRouterPush('/',historyAppDiv);
    readyService.readyInit();
    const hRow = document.getElementById('hRow') as HTMLInputElement;
    const hCol = document.getElementById('hCol') as HTMLInputElement;
    const hMole = document.getElementById('hMole') as HTMLInputElement;

    const row = document.getElementById('row') as HTMLInputElement;
    const col = document.getElementById('col') as HTMLInputElement;
    const mole = document.getElementById('moles') as HTMLInputElement;
    timeflag = true;
    mTimeflag = true;
    row.value = hRow.value;
    col.value = hCol.value;
    mole.value = hMole.value;

}
// 시간 종료 이벤트
function gameFinish(){
    const hPoint = document.getElementById('hPoint') as HTMLInputElement;
    hPoint.value = catchPoint.innerHTML;
    router.historyRouterPush('/result',historyAppDiv);
    resultService.resultInit();    
}
// export
export const gameService = {
    gameInit,
    gameStart,
}