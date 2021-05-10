
import {router} from './router';
import {gameService} from './gameService';
    // 준비화면 submit
    function readySubmit(pathName:string,historyAppDiv:HTMLDivElement) {
        const readyForm = document.querySelector('#readyForm')!;
        
        const row = document.getElementById('row') as HTMLInputElement;
        const col = document.getElementById('col') as HTMLInputElement;
        const moles = document.getElementById('moles') as HTMLInputElement;

        const hRow = document.getElementById('hRow') as HTMLInputElement;
        const hCol = document.getElementById('hCol') as HTMLInputElement;
        const hMole = document.getElementById('hMole') as HTMLInputElement;

        // 열, 행, 두더지 수 대입
        hRow.value = row.value;
        hCol.value = col.value;
        hMole.value = moles.value;
    
        router.historyRouterPush(pathName,historyAppDiv);

        const gameForm = document.querySelector('#gameForm')!;

         if(gameForm) gameService.gameStart();
     
        }

    // export
    export const readyService = {
        readySubmit,
    }
