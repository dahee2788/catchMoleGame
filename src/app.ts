import './css/style.css';

// router 
import {router} from './router';

//service
import {readyService} from './readyService';


// app division
const historyAppDiv:HTMLDivElement  = document.querySelector("#history-app")!;

// browser history

router.initialRoutes(historyAppDiv);
readyService.readyInit();










