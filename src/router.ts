import homeTemplate  from './pages/home.html';
import aboutTemplate   from './pages/about.html';

interface route{
    [key:string] : string
}
const routes :route= {
  '/' : homeTemplate,
  '/home': homeTemplate,
  '/about': aboutTemplate
}

function initialRoutes (el:HTMLDivElement){
    renderHTML(el,routes['/'])  
     window.onpopstate  = () => renderHTML(el, routes[window.location.pathname])
}

function historyRouterPush (pathName:string,el:HTMLDivElement){
    window.history.pushState({}, pathName, window.location.origin + pathName)
  renderHTML(el, routes[pathName]) 
}

function renderHTML(el:HTMLDivElement,route:string){
    el.innerHTML = route
}

export const router = {
    initialRoutes,
    historyRouterPush
}