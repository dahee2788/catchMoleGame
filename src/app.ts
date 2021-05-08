import './css/style.css';

// router 
import {router} from './router';

// app division
const historyAppDiv:HTMLDivElement  = document.querySelector("#history-app")!;

// browser history

router.initialRoutes(historyAppDiv);

window.onload = () =>{
    const historyLinker  = document.querySelectorAll('span.history');

    historyLinker.forEach(el =>{
        el.addEventListener('click',function(){
            const pathName:string = el.getAttribute('route')!;
            router.historyRouterPush(pathName,historyAppDiv);
        })
    });
}

