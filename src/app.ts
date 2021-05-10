import './css/style.css';

// router 
import {router} from './router';

//service
import {readyService} from './readyService';
import {gameService} from './gameService';

// app division
const historyAppDiv:HTMLDivElement  = document.querySelector("#history-app")!;
const gameForm:Element  = document.querySelector("#gameForm")!;
// browser history

router.initialRoutes(historyAppDiv);

window.onload = () =>{
    const historyLinker  = document.querySelectorAll('span.btn');
    // 페이지 이동
    historyLinker.forEach(el =>{
        console.log(el);
        el.addEventListener('click',function(){
            const pathName:string = el.getAttribute('route')!;
            
            switch (pathName) {
                // ready 화면 submit 이벤트
                case "/game":
                    readyService.readySubmit(pathName,historyAppDiv);
                    break;
            
                default:
                    break;
            }

        })
    });
    
};









