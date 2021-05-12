import {router} from './router';
import {gameService} from './gameService';


function readyInit(){
    const btnStart = document.getElementById('btnStart') as HTMLSpanElement;
    btnStart.addEventListener('click',readySubmit);

}
// 준비화면 submit
function readySubmit(this:HTMLElement) {
    const row = document.getElementById('row') as HTMLInputElement;
    const col = document.getElementById('col') as HTMLInputElement;
    const moles = document.getElementById('moles') as HTMLInputElement;

    // validation check
    if(row.value == null || row.value == "")
    {   
        alert("열을 입력해주세요.");
        return;
    }
    if(parseInt(row.value) < 2 ||  parseInt(row.value) > 6 )
    {   
        alert("열:2에서 6 사이의 수를 입력해주세요.");
        return;
    }
    if(col.value == null || col.value == "")
    {   
        alert("행을 입력해주세요.");
        return;
    }
    if(parseInt(col.value) < 2 ||  parseInt(col.value) > 6 )
    {   
        alert("행:2에서 6 사이의 수를 입력해주세요.");
        return;
    }
    if(moles.value == null || moles.value == "")
    {   
        alert("두더지 수를 입력해주세요.");
        return;
    }
    if(parseInt(moles.value) < 1 ||  parseInt(moles.value) >  (parseInt(row.value)*parseInt(col.value))/2)
    {   
        alert("두더지:최소 한 마리 이상 전체 굴 개수의 절반 미만으로 입력해주세요.");
        return;
    }
    

    const hRow = document.getElementById('hRow') as HTMLInputElement;
    const hCol = document.getElementById('hCol') as HTMLInputElement;
    const hMole = document.getElementById('hMole') as HTMLInputElement;

    // 열, 행, 두더지 수 대입
    hRow.value = row.value;
    hCol.value = col.value;
    hMole.value = moles.value;

    const historyAppDiv:HTMLDivElement  = document.querySelector("#history-app")!;
    router.historyRouterPush('/game',historyAppDiv);

    const gameForm = document.querySelector('#gameForm')!;

        if(gameForm) gameService.gameInit();
    
    }

// export
export const readyService = {
    readyInit,
    readySubmit,
}
