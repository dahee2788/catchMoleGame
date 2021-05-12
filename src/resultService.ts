import {router} from './router';
import {readyService} from './readyService';
import {gameService} from './gameService';
const historyAppDiv:HTMLDivElement  = document.querySelector("#history-app")!;

function resultInit()
{
    // button 클릭이벤트 추가 
    const btnRestart = document.getElementById('btnRestart') as HTMLSpanElement;
    const btnGohome = document.getElementById('btnGohome') as HTMLSpanElement;

    btnRestart.addEventListener('click',onClickRestartBtn);
    btnGohome.addEventListener('click',onClickGohomeBtn);
    const catchPoint = document.getElementById('hPoint') as HTMLInputElement;
    const finalP = document.getElementById('finalP') as HTMLLabelElement;

    finalP.innerHTML = catchPoint.value;

}
// 다시시작
function onClickRestartBtn(this:HTMLElement){
    router.historyRouterPush('/game',historyAppDiv);
    gameService.gameInit();
}
//처음으로 
function onClickGohomeBtn(this:HTMLElement){
    router.historyRouterPush('/',historyAppDiv);

    readyService.readyInit();
    const hRow = document.getElementById('hRow') as HTMLInputElement;
    const hCol = document.getElementById('hCol') as HTMLInputElement;
    const hMole = document.getElementById('hMole') as HTMLInputElement;

    const row = document.getElementById('row') as HTMLInputElement;
    const col = document.getElementById('col') as HTMLInputElement;
    const mole = document.getElementById('moles') as HTMLInputElement;

    row.value = hRow.value;
    col.value = hCol.value;
    mole.value = hMole.value;
}

 // export
 export const resultService = {
    resultInit,
}