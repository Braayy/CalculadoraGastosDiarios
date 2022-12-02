(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const C={},Ee=(e,t)=>e===t,Ne=Symbol("solid-track"),q={equals:Ee};let Fe=ue;const N=1,P=2,se={owned:null,cleanups:null,context:null,owner:null};var b=null;let A=null,g=null,$=null,E=null,K=0;function R(e,t){const n=g,l=b,i=e.length===0,o=i?se:{owned:null,cleanups:null,context:null,owner:t||l},a=i?e:()=>e(()=>L(()=>Q(o)));b=o,g=null;try{return O(a,!0)}finally{g=n,b=l}}function T(e,t){t=t?Object.assign({},q,t):q;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},l=i=>(typeof i=="function"&&(i=i(n.value)),re(n,i));return[oe.bind(n),l]}function G(e,t,n){const l=ae(e,t,!1,N);U(l)}function H(e,t,n){n=n?Object.assign({},q,n):q;const l=ae(e,t,!0,0);return l.observers=null,l.observerSlots=null,l.comparator=n.equals||void 0,U(l),oe.bind(l)}function L(e){const t=g;g=null;try{return e()}finally{g=t}}function Te(e){return b===null||(b.cleanups===null?b.cleanups=[e]:b.cleanups.push(e)),e}function oe(){const e=A;if(this.sources&&(this.state||e))if(this.state===N||e)U(this);else{const t=$;$=null,O(()=>j(this),!1),$=t}if(g){const t=this.observers?this.observers.length:0;g.sources?(g.sources.push(this),g.sourceSlots.push(t)):(g.sources=[this],g.sourceSlots=[t]),this.observers?(this.observers.push(g),this.observerSlots.push(g.sources.length-1)):(this.observers=[g],this.observerSlots=[g.sources.length-1])}return this.value}function re(e,t,n){let l=e.value;return(!e.comparator||!e.comparator(l,t))&&(e.value=t,e.observers&&e.observers.length&&O(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],a=A&&A.running;a&&A.disposed.has(o),(a&&!o.tState||!a&&!o.state)&&(o.pure?$.push(o):E.push(o),o.observers&&fe(o)),a||(o.state=N)}if($.length>1e6)throw $=[],new Error},!1)),t}function U(e){if(!e.fn)return;Q(e);const t=b,n=g,l=K;g=b=e,Ie(e,e.value,l),g=n,b=t}function Ie(e,t,n){let l;try{l=e.fn(t)}catch(i){e.pure&&(e.state=N),de(i)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?re(e,l):e.value=l,e.updatedAt=n)}function ae(e,t,n,l=N,i){const o={fn:e,state:l,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:b,context:null,pure:n};return b===null||b!==se&&(b.owned?b.owned.push(o):b.owned=[o]),o}function ce(e){const t=A;if(e.state===0||t)return;if(e.state===P||t)return j(e);if(e.suspense&&L(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<K);)(e.state||t)&&n.push(e);for(let l=n.length-1;l>=0;l--)if(e=n[l],e.state===N||t)U(e);else if(e.state===P||t){const i=$;$=null,O(()=>j(e,n[0]),!1),$=i}}function O(e,t){if($)return e();let n=!1;t||($=[]),E?n=!0:E=[],K++;try{const l=e();return Be(n),l}catch(l){$||(E=null),de(l)}}function Be(e){if($&&(ue($),$=null),e)return;const t=E;E=null,t.length&&O(()=>Fe(t),!1)}function ue(e){for(let t=0;t<e.length;t++)ce(e[t])}function j(e,t){const n=A;e.state=0;for(let l=0;l<e.sources.length;l+=1){const i=e.sources[l];i.sources&&(i.state===N||n?i!==t&&ce(i):(i.state===P||n)&&j(i,t))}}function fe(e){const t=A;for(let n=0;n<e.observers.length;n+=1){const l=e.observers[n];(!l.state||t)&&(l.state=P,l.pure?$.push(l):E.push(l),l.observers&&fe(l))}}function Q(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),l=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const o=i.pop(),a=n.observerSlots.pop();l<i.length&&(o.sourceSlots[a]=l,i[l]=o,n.observerSlots[l]=a)}}if(e.owned){for(t=0;t<e.owned.length;t++)Q(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Le(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function de(e){throw e=Le(e),e}const Oe=Symbol("fallback");function te(e){for(let t=0;t<e.length;t++)e[t]()}function Me(e,t,n={}){let l=[],i=[],o=[],a=0,s=t.length>1?[]:null;return Te(()=>te(o)),()=>{let u=e()||[],c,r;return u[Ne],L(()=>{let h=u.length,f,p,w,D,_,m,S,y,v;if(h===0)a!==0&&(te(o),o=[],l=[],i=[],a=0,s&&(s=[])),n.fallback&&(l=[Oe],i[0]=R(k=>(o[0]=k,n.fallback())),a=1);else if(a===0){for(i=new Array(h),r=0;r<h;r++)l[r]=u[r],i[r]=R(d);a=h}else{for(w=new Array(h),D=new Array(h),s&&(_=new Array(h)),m=0,S=Math.min(a,h);m<S&&l[m]===u[m];m++);for(S=a-1,y=h-1;S>=m&&y>=m&&l[S]===u[y];S--,y--)w[y]=i[S],D[y]=o[S],s&&(_[y]=s[S]);for(f=new Map,p=new Array(y+1),r=y;r>=m;r--)v=u[r],c=f.get(v),p[r]=c===void 0?-1:c,f.set(v,r);for(c=m;c<=S;c++)v=l[c],r=f.get(v),r!==void 0&&r!==-1?(w[r]=i[c],D[r]=o[c],s&&(_[r]=s[c]),r=p[r],f.set(v,r)):o[c]();for(r=m;r<h;r++)r in w?(i[r]=w[r],o[r]=D[r],s&&(s[r]=_[r],s[r](r))):i[r]=R(d);i=i.slice(0,a=h),l=u.slice(0)}return i});function d(h){if(o[r]=h,s){const[f,p]=T(r);return s[r]=p,t(u[r],f)}return t(u[r])}}}function B(e,t){return L(()=>e(t||{}))}function Re(e){const t="fallback"in e&&{fallback:()=>e.fallback};return H(Me(()=>e.each,e.children,t||void 0))}function ne(e){let t=!1;const n=e.keyed,l=H(()=>e.when,void 0,{equals:(i,o)=>t?i===o:!i==!o});return H(()=>{const i=l();if(i){const o=e.children,a=typeof o=="function"&&o.length>0;return t=n||a,a?L(()=>o(i)):o}return e.fallback})}function qe(e,t,n){let l=n.length,i=t.length,o=l,a=0,s=0,u=t[i-1].nextSibling,c=null;for(;a<i||s<o;){if(t[a]===n[s]){a++,s++;continue}for(;t[i-1]===n[o-1];)i--,o--;if(i===a){const r=o<l?s?n[s-1].nextSibling:n[o-s]:u;for(;s<o;)e.insertBefore(n[s++],r)}else if(o===s)for(;a<i;)(!c||!c.has(t[a]))&&t[a].remove(),a++;else if(t[a]===n[o-1]&&n[s]===t[i-1]){const r=t[--i].nextSibling;e.insertBefore(n[s++],t[a++].nextSibling),e.insertBefore(n[--o],r),t[i]=n[o]}else{if(!c){c=new Map;let d=s;for(;d<o;)c.set(n[d],d++)}const r=c.get(t[a]);if(r!=null)if(s<r&&r<o){let d=a,h=1,f;for(;++d<i&&d<o&&!((f=c.get(t[d]))==null||f!==r+h);)h++;if(h>r-s){const p=t[a];for(;s<r;)e.insertBefore(n[s++],p)}else e.replaceChild(n[s++],t[a++])}else a++;else t[a++].remove()}}}const le="_$DX_DELEGATE";function Pe(e,t,n,l={}){let i;return R(o=>{i=o,t===document?e():x(t,e(),t.firstChild?null:void 0,n)},l.owner),()=>{i(),t.textContent=""}}function I(e,t,n){const l=document.createElement("template");l.innerHTML=e;let i=l.content.firstChild;return n&&(i=i.firstChild),i}function je(e,t=window.document){const n=t[le]||(t[le]=new Set);for(let l=0,i=e.length;l<i;l++){const o=e[l];n.has(o)||(n.add(o),t.addEventListener(o,Ve))}}function x(e,t,n,l){if(n!==void 0&&!l&&(l=[]),typeof t!="function")return V(e,t,l,n);G(i=>V(e,t(),i,n),l)}function Ve(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),C.registry&&!C.done&&(C.done=!0,document.querySelectorAll("[id^=pl-]").forEach(l=>l.remove()));n!==null;){const l=n[t];if(l&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?l.call(n,i,e):l.call(n,e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function V(e,t,n,l,i){for(C.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,a=l!==void 0;if(e=a&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(C.context)return n;if(o==="number"&&(t=t.toString()),a){let s=n[0];s&&s.nodeType===3?s.data=t:s=document.createTextNode(t),n=F(e,n,l,s)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(C.context)return n;n=F(e,n,l)}else{if(o==="function")return G(()=>{let s=t();for(;typeof s=="function";)s=s();n=V(e,s,n,l)}),()=>n;if(Array.isArray(t)){const s=[],u=n&&Array.isArray(n);if(J(s,t,n,i))return G(()=>n=V(e,s,n,l,!0)),()=>n;if(C.context){if(!s.length)return n;for(let c=0;c<s.length;c++)if(s[c].parentNode)return n=s}if(s.length===0){if(n=F(e,n,l),a)return n}else u?n.length===0?ie(e,s,l):qe(e,n,s):(n&&F(e),ie(e,s));n=s}else if(t instanceof Node){if(C.context&&t.parentNode)return n=a?[t]:t;if(Array.isArray(n)){if(a)return n=F(e,n,l,t);F(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function J(e,t,n,l){let i=!1;for(let o=0,a=t.length;o<a;o++){let s=t[o],u=n&&n[o];if(s instanceof Node)e.push(s);else if(!(s==null||s===!0||s===!1))if(Array.isArray(s))i=J(e,s,u)||i;else if(typeof s=="function")if(l){for(;typeof s=="function";)s=s();i=J(e,Array.isArray(s)?s:[s],Array.isArray(u)?u:[u])||i}else e.push(s),i=!0;else{const c=String(s);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return i}function ie(e,t,n=null){for(let l=0,i=t.length;l<i;l++)e.insertBefore(t[l],n)}function F(e,t,n,l){if(n===void 0)return e.textContent="";const i=l||document.createTextNode("");if(t.length){let o=!1;for(let a=t.length-1;a>=0;a--){const s=t[a];if(i!==s){const u=s.parentNode===e;!o&&!a?u?e.replaceChild(i,s):e.insertBefore(i,n):u&&s.remove()}else o=!0}}else e.insertBefore(i,n);return[i]}function Ue(e){const t=e.split("/");return{day:parseInt(t[0]),month:parseInt(t[1])}}function Ge(e){return e.map(t=>({date:Ue(t.date),name:t.name}))}const He=I('<form class="col-5 mb-5"><div class="mb-3 col-6"><div class="input-group"><span class="input-group-text">R$</span><input type="number" step=".01" class="form-control" name="value" id="value" placeholder="Valor Di\xE1rio"></div></div><div class="mb-3"><div class="form-text mb-1">Selecione os dias que n\xE3o entrar\xE3o na conta:</div><div class="form-check"><input type="checkbox" class="form-check-input" name="sunday" id="sunday"><label class="form-check-label" for="sunday">Domingo</label></div><div class="form-check"><input type="checkbox" class="form-check-input" name="monday" id="monday"><label class="form-check-label" for="monday">Segunda-Feira</label></div><div class="form-check"><input type="checkbox" class="form-check-input" name="tuesday" id="tuesday"><label class="form-check-label" for="tuesday">Ter\xE7a-Feira</label></div><div class="form-check"><input type="checkbox" class="form-check-input" name="wednesday" id="wednesday"><label class="form-check-label" for="wednesday">Quarta-Feira</label></div><div class="form-check"><input type="checkbox" class="form-check-input" name="thursday" id="thursday"><label class="form-check-label" for="thursday">Quinta-Feira</label></div><div class="form-check"><input type="checkbox" class="form-check-input" name="friday" id="friday"><label class="form-check-label" for="friday">Sexta-Feira</label></div><div class="form-check"><input type="checkbox" class="form-check-input" name="saturday" id="saturday"><label class="form-check-label" for="saturday">S\xE1bado</label></div><div class="form-check"><input type="checkbox" class="form-check-input" name="holidays" id="holidays"><label class="form-check-label" for="holidays">Feriados</label></div></div><div class="row mb-3"><div class="col-6"><div class="input-group"><span class="input-group-text">In\xEDcio</span><input type="date" class="form-control" name="start-period"></div></div><div class="col-6"><div class="input-group"><span class="input-group-text">Fim</span><input type="date" class="form-control" name="end-period"></div></div></div><div class="d-flex justify-content-center"><input type="submit" class="btn btn-lg btn-success" value="Calcular"></div></form>');class Je{constructor(t,n,l,i){this.dailyValue=t,this.ignoredDays=n,this.startDate=l,this.endDate=i}}const Ke=e=>{const[t,n]=T(0),[l,i]=T(0),[o,a]=T(new Date),[s,u]=T(new Date);function c(f){const p=f.target;a(new Date(Date.parse(p.value.replaceAll("-","/"))))}function r(f){const p=f.target;u(new Date(Date.parse(p.value.replaceAll("-","/"))))}function d(f){i(l()^1<<f)}function h(f){f.preventDefault(),e.onSubmit(new Je(t(),l(),o(),s()))}return(()=>{const f=He.cloneNode(!0),p=f.firstChild,w=p.firstChild,D=w.firstChild,_=D.nextSibling,m=p.nextSibling,S=m.firstChild,y=S.nextSibling,v=y.firstChild,k=y.nextSibling,M=k.firstChild,Y=k.nextSibling,he=Y.firstChild,W=Y.nextSibling,pe=W.firstChild,X=W.nextSibling,ge=X.firstChild,Z=X.nextSibling,me=Z.firstChild,z=Z.nextSibling,ye=z.firstChild,be=z.nextSibling,$e=be.firstChild,Se=m.nextSibling,ee=Se.firstChild,ve=ee.firstChild,we=ve.firstChild,xe=we.nextSibling,De=ee.nextSibling,_e=De.firstChild,Ce=_e.firstChild,ke=Ce.nextSibling;return f.addEventListener("submit",h),_.$$input=Ae=>n(parseFloat(Ae.target.value)),v.$$input=()=>d(0),M.$$input=()=>d(1),he.$$input=()=>d(2),pe.$$input=()=>d(3),ge.$$input=()=>d(4),me.$$input=()=>d(5),ye.$$input=()=>d(6),$e.$$input=()=>d(7),xe.$$input=c,ke.$$input=r,f})()};je(["input"]);const Qe=I('<div class="container min-vh-100 d-flex flex-column align-items-center"><div><h1 class="text-center">Calculadora de Gastos Di\xE1rios</h1></div><div class="flex-grow-1 d-flex flex-column justify-content-end"><a href="https://github.com/Braayy/CalculadoraGastosDiarios" target="_blank" class="link-primary text-center">C\xF3digo Fonte</a><p>* Os feriados utilizados s\xE3o validos para o munic\xEDpio de Niter\xF3i/RJ</p></div></div>'),Ye=I("<p>Foram encontrados os seguintes feriados durante o per\xEDodo selecionado:</p>"),We=I('<ul class="list-group col-6"></ul>'),Xe=I('<div><p class="lead">O valor calculado para o periodo de <strong></strong> at\xE9 <strong></strong> \xE9 de <strong>R$</strong></p></div>'),Ze=I('<li class="list-group-item">/<!> - </li>');class ze{constructor(t,n,l,i){this.startDate=t,this.endDate=n,this.value=l,this.holidays=i}}function et(e,t){const n=[];let l=new Date(e.getFullYear(),e.getMonth(),e.getDate());for(;l<=t;)n.push(l),l=new Date(l.getFullYear(),l.getMonth(),l.getDate()+1);return n}function tt(e,t){return e!=null?t(e):null}const nt=e=>{const[t,n]=T(null);function l(s){const{dailyValue:u,ignoredDays:c,startDate:r,endDate:d}=s;let h=0,f=[];for(const p of et(r,d)){if(i(c,7)){const w=o(p,e.holidays);if(w!=null){f.push(w);continue}}i(c,p.getDay())||h++}n(new ze(a(r),a(d),u*h,f))}function i(s,u){return(s&1<<u)>0}function o(s,u){for(const c of u)if(s.getDate()==c.date.day&&s.getMonth()+1==c.date.month)return c;return null}function a(s){return`${s.getDate().toString().padStart(2,"0")}/${(s.getMonth()+1).toString().padStart(2,"0")}/${s.getFullYear()}`}return(()=>{const s=Qe.cloneNode(!0),u=s.firstChild,c=u.nextSibling;return x(s,B(Ke,{onSubmit:l}),c),x(s,B(ne,{get when(){return t()!=null},get children(){return tt(t(),r=>(()=>{const d=Xe.cloneNode(!0),h=d.firstChild,f=h.firstChild,p=f.nextSibling,w=p.nextSibling,D=w.nextSibling,_=D.nextSibling,m=_.nextSibling;return m.firstChild,x(p,()=>r.startDate),x(D,()=>r.endDate),x(m,()=>r.value.toFixed(2),null),x(d,B(ne,{get when(){return r.holidays.length>0},get children(){return[Ye.cloneNode(!0),(()=>{const S=We.cloneNode(!0);return x(S,B(Re,{get each(){return r.holidays},children:y=>(()=>{const v=Ze.cloneNode(!0),k=v.firstChild,M=k.nextSibling;return M.nextSibling,x(v,()=>y.date.day.toString().padStart(2,"0"),k),x(v,()=>y.date.month.toString().padStart(2,"0"),M),x(v,()=>y.name,null),v})()})),S})()]}}),null),d})())}}),c),s})()},lt=[{date:"01/01/2022",name:"Ano Novo"},{date:"15/04/2022",name:"Sexta-Feira Santa"},{date:"21/04/2022",name:"Dia de Tiradentes"},{date:"01/05/2022",name:"Dia do Trabalho"},{date:"07/09/2022",name:"Independ\xEAncia do Brasil"},{date:"12/10/2022",name:"Nossa Senhora Aparecida"},{date:"02/11/2022",name:"Dia de Finados"},{date:"15/11/2022",name:"Proclama\xE7\xE3o da Rep\xFAblica"},{date:"25/12/2022",name:"Natal"},{date:"01/03/2022",name:"Carnaval"},{date:"23/04/2022",name:"Dia de S\xE3o Jorge"},{date:"20/11/2022",name:"Dia da Consci\xEAncia Negra"},{date:"24/06/2022",name:"Dia de S\xE3o Jo\xE3o, padroeiro da cidade"}],it=Ge(lt);Pe(()=>B(nt,{holidays:it}),document.getElementById("root"));
