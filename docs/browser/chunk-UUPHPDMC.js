import{a as c}from"./chunk-AJPISUXH.js";import{e as s}from"./chunk-FP7EQKGB.js";var m=(o,...r)=>console.warn(`[Ionic Warning]: ${o}`,...r);var l=(o,...r)=>console.error(`<${o.tagName.toLowerCase()}> must be used inside ${r.join(" or ")}.`);var E="ION-CONTENT",i="ion-content",a=".ion-content-scroll-host",u=`${i}, ${a}`,n=o=>o.tagName===E,f=o=>s(void 0,null,function*(){return n(o)?(yield new Promise(r=>c(o,r)),o.getScrollElement()):o}),I=o=>{let r=o.querySelector(a);return r||o.querySelector(u)},O=o=>o.closest(u),S=(o,r)=>n(o)?o.scrollToTop(r):Promise.resolve(o.scrollTo({top:0,left:0,behavior:r>0?"smooth":"auto"})),_=(o,r,t,e)=>n(o)?o.scrollByPoint(r,t,e):Promise.resolve(o.scrollBy({top:t,left:r,behavior:e>0?"smooth":"auto"})),y=o=>l(o,i),d=o=>{if(n(o)){let r=o,t=r.scrollY;return r.scrollY=!1,t}else return o.style.setProperty("overflow","hidden"),!0},g=(o,r)=>{n(o)?o.scrollY=r:o.style.removeProperty("overflow")};export{m as a,n as b,f as c,I as d,O as e,S as f,_ as g,y as h,d as i,g as j};
