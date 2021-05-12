import './css/style.css';

// router 
import {router} from './router';

//service
import {readyService} from './readyService';


// app division
const historyAppDiv:HTMLDivElement  = document.querySelector("#history-app")!;

// 화면 초기화
router.initialRoutes(historyAppDiv);
readyService.readyInit();










