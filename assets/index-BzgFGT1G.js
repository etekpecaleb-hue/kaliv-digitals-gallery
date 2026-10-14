var Tg=Object.defineProperty;var Dg=(s,t,e)=>t in s?Tg(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var P=(s,t,e)=>Dg(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();function Cn(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function jp(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ai={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ma={duration:.5,overwrite:!1,delay:0},ch,je,Te,Oi=1e8,ye=1/Oi,Kc=Math.PI*2,Ag=Kc/4,Cg=0,t0=Math.sqrt,Pg=Math.cos,Rg=Math.sin,Ze=function(t){return typeof t=="string"},Fe=function(t){return typeof t=="function"},On=function(t){return typeof t=="number"},uh=function(t){return typeof t>"u"},xn=function(t){return typeof t=="object"},di=function(t){return t!==!1},hh=function(){return typeof window<"u"},Ka=function(t){return Fe(t)||Ze(t)},e0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},oi=Array.isArray,Lg=/random\([^)]+\)/g,Fg=/,\s*/g,mf=/(?:-?\.?\d|\.)+/gi,i0=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ur=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ol=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,n0=/[+-]=-?[.\d]+/,Ig=/[^,'"\[\]\s]+/gi,Ng=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ce,on,Zc,fh,Ci={},jo={},s0,r0=function(t){return(jo=Mr(t,Ci))&&vi},dh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Sa=function(t,e){return!e&&console.warn(t)},a0=function(t,e){return t&&(Ci[t]=e)&&jo&&(jo[t]=e)||Ci},ba=function(){return 0},Ug={suppressEvents:!0,isStart:!0,kill:!1},Vo={suppressEvents:!0,kill:!1},Og={suppressEvents:!0},ph={},ns=[],Jc={},o0,Mi={},Bl={},gf=30,Go=[],mh="",gh=function(t){var e=t[0],i,n;if(xn(e)||Fe(e)||(t=[t]),!(i=(e._gsap||{}).harness)){for(n=Go.length;n--&&!Go[n].targetTest(e););i=Go[n]}for(n=t.length;n--;)t[n]&&(t[n]._gsap||(t[n]._gsap=new C0(t[n],i)))||t.splice(n,1);return t},Ts=function(t){return t._gsap||gh(Bi(t))[0]._gsap},l0=function(t,e,i){return(i=t[e])&&Fe(i)?t[e]():uh(i)&&t.getAttribute&&t.getAttribute(e)||i},pi=function(t,e){return(t=t.split(",")).forEach(e)||t},Ue=function(t){return Math.round(t*1e5)/1e5||0},Ae=function(t){return Math.round(t*1e7)/1e7||0},mr=function(t,e){var i=e.charAt(0),n=parseFloat(e.substr(2));return t=parseFloat(t),i==="+"?t+n:i==="-"?t-n:i==="*"?t*n:t/n},Bg=function(t,e){for(var i=e.length,n=0;t.indexOf(e[n])<0&&++n<i;);return n<i},tl=function(){var t=ns.length,e=ns.slice(0),i,n;for(Jc={},ns.length=0,i=0;i<t;i++)n=e[i],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},vh=function(t){return!!(t._initted||t._startAt||t.add)},c0=function(t,e,i,n){ns.length&&!je&&tl(),t.render(e,i,!!(je&&e<0&&vh(t))),ns.length&&!je&&tl()},u0=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Ig).length<2?e:Ze(t)?t.trim():t},h0=function(t){return t},Pi=function(t,e){for(var i in e)i in t||(t[i]=e[i]);return t},kg=function(t){return function(e,i){for(var n in i)n in e||n==="duration"&&t||n==="ease"||(e[n]=i[n])}},Mr=function(t,e){for(var i in e)t[i]=e[i];return t},vf=function s(t,e){for(var i in e)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(t[i]=xn(e[i])?s(t[i]||(t[i]={}),e[i]):e[i]);return t},el=function(t,e){var i={},n;for(n in t)n in e||(i[n]=t[n]);return i},oa=function(t){var e=t.parent||Ce,i=t.keyframes?kg(oi(t.keyframes)):Pi;if(di(t.inherit))for(;e;)i(t,e.vars.defaults),e=e.parent||e._dp;return t},zg=function(t,e){for(var i=t.length,n=i===e.length;n&&i--&&t[i]===e[i];);return i<0},f0=function(t,e,i,n,r){var a=t[n],o;if(r)for(o=e[r];a&&a[r]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[i],t[i]=e),e._next?e._next._prev=e:t[n]=e,e._prev=a,e.parent=e._dp=t,e},Sl=function(t,e,i,n){i===void 0&&(i="_first"),n===void 0&&(n="_last");var r=e._prev,a=e._next;r?r._next=a:t[i]===e&&(t[i]=a),a?a._prev=r:t[n]===e&&(t[n]=r),e._next=e._prev=e.parent=null},rs=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Ds=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var i=t;i;)i._dirty=1,i=i.parent;return t},Vg=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Qc=function(t,e,i,n){return t._startAt&&(je?t._startAt.revert(Vo):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,n))},Gg=function s(t){return!t||t._ts&&s(t.parent)},_f=function(t){return t._repeat?Sr(t._tTime,t=t.duration()+t._rDelay)*t:0},Sr=function(t,e){var i=Math.floor(t=Ae(t/e));return t&&i===t?i-1:i},il=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},bl=function(t){return t._end=Ae(t._start+(t._tDur/Math.abs(t._ts||t._rts||ye)||0))},wl=function(t,e){var i=t._dp;return i&&i.smoothChildTiming&&t._ts&&(t._start=Ae(i._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),bl(t),i._dirty||Ds(i,t)),t},d0=function(t,e){var i;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(i=il(t.rawTime(),e),(!e._dur||Wa(0,e.totalDuration(),i)-e._tTime>ye)&&e.render(i,!0)),Ds(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(i=t;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;t._zTime=-ye}},un=function(t,e,i,n){return e.parent&&rs(e),e._start=Ae((On(i)?i:i||t!==Ce?Ni(t,i,e):t._time)+e._delay),e._end=Ae(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),f0(t,e,"_first","_last",t._sort?"_start":0),jc(e)||(t._recent=e),n||d0(t,e),t._ts<0&&wl(t,t._tTime),t},p0=function(t,e){return(Ci.ScrollTrigger||dh("scrollTrigger",e))&&Ci.ScrollTrigger.create(e,t)},m0=function(t,e,i,n,r){if(xh(t,e,r),!t._initted)return 1;if(!i&&t._pt&&!je&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&o0!==wi.frame)return ns.push(t),t._lazy=[r,n],1},Hg=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},jc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Wg=function(t,e,i,n){var r=t.ratio,a=e<0||!e&&(!t._start&&Hg(t)&&!(!t._initted&&jc(t))||(t._ts<0||t._dp._ts<0)&&!jc(t))?0:1,o=t._rDelay,l=0,c,u,f;if(o&&t._repeat&&(l=Wa(0,t._tDur,e),u=Sr(l,o),t._yoyo&&u&1&&(a=1-a),u!==Sr(t._tTime,o)&&(r=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==r||je||n||t._zTime===ye||!e&&t._zTime){if(!t._initted&&m0(t,e,n,i,l))return;for(f=t._zTime,t._zTime=e||(i?ye:0),i||(i=e&&!f),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&Qc(t,e,i,!0),t._onUpdate&&!i&&Ti(t,"onUpdate"),l&&t._repeat&&!i&&t.parent&&Ti(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&rs(t,1),!i&&!je&&(Ti(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Xg=function(t,e,i){var n;if(i>e)for(n=t._first;n&&n._start<=i;){if(n.data==="isPause"&&n._start>e)return n;n=n._next}else for(n=t._last;n&&n._start>=i;){if(n.data==="isPause"&&n._start<e)return n;n=n._prev}},br=function(t,e,i,n){var r=t._repeat,a=Ae(e)||0,o=t._tTime/t._tDur;return o&&!n&&(t._time*=a/t._dur),t._dur=a,t._tDur=r?r<0?1e10:Ae(a*(r+1)+t._rDelay*r):a,o>0&&!n&&wl(t,t._tTime=t._tDur*o),t.parent&&bl(t),i||Ds(t.parent,t),t},xf=function(t){return t instanceof fi?Ds(t):br(t,t._dur)},qg={_start:0,endTime:ba,totalDuration:ba},Ni=function s(t,e,i){var n=t.labels,r=t._recent||qg,a=t.duration()>=Oi?r.endTime(!1):t._dur,o,l,c;return Ze(e)&&(isNaN(e)||e in n)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?r:i).totalDuration()/100:1)):o<0?(e in n||(n[e]=a),n[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&i&&(l=l/100*(oi(i)?i[0]:i).totalDuration()),o>1?s(t,e.substr(0,o-1),i)+l:a+l)):e==null?a:+e},la=function(t,e,i){var n=On(e[1]),r=(n?2:1)+(t<2?0:1),a=e[r],o,l;if(n&&(a.duration=e[1]),a.parent=i,t){for(o=a,l=i;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=di(l.vars.inherit)&&l.parent;a.immediateRender=di(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[r-1]}return new ze(e[0],a,e[r+1])},ls=function(t,e){return t||t===0?e(t):e},Wa=function(t,e,i){return i<t?t:i>e?e:i},ai=function(t,e){return!Ze(t)||!(e=Ng.exec(t))?"":e[1]},Yg=function(t,e,i){return ls(i,function(n){return Wa(t,e,n)})},tu=[].slice,g0=function(t,e){return t&&xn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&xn(t[0]))&&!t.nodeType&&t!==on},$g=function(t,e,i){return i===void 0&&(i=[]),t.forEach(function(n){var r;return Ze(n)&&!e||g0(n,1)?(r=i).push.apply(r,Bi(n)):i.push(n)})||i},Bi=function(t,e,i){return Te&&!e&&Te.selector?Te.selector(t):Ze(t)&&!i&&(Zc||!wr())?tu.call((e||fh).querySelectorAll(t),0):oi(t)?$g(t,i):g0(t)?tu.call(t,0):t?[t]:[]},eu=function(t){return t=Bi(t)[0]||Sa("Invalid scope")||{},function(e){var i=t.current||t.nativeElement||t;return Bi(e,i.querySelectorAll?i:i===t?Sa("Invalid scope")||fh.createElement("div"):t)}},v0=function(t){return t.sort(function(){return .5-Math.random()})},_0=function(t){if(Fe(t))return t;var e=xn(t)?t:{each:t},i=As(e.ease),n=e.from||0,r=parseFloat(e.base)||0,a={},o=n>0&&n<1,l=isNaN(n)||o,c=e.axis,u=n,f=n;return Ze(n)?u=f={center:.5,edges:.5,end:1}[n]||0:!o&&l&&(u=n[0],f=n[1]),function(h,d,p){var v=(p||e).length,g=a[v],m,M,b,_,S,y,T,x,E;if(!g){if(E=e.grid==="auto"?0:(e.grid||[1,Oi])[1],!E){for(T=-Oi;T<(T=p[E++].getBoundingClientRect().left)&&E<v;);E<v&&E--}for(g=a[v]=[],m=l?Math.min(E,v)*u-.5:n%E,M=E===Oi?0:l?v*f/E-.5:n/E|0,T=0,x=Oi,y=0;y<v;y++)b=y%E-m,_=M-(y/E|0),g[y]=S=c?Math.abs(c==="y"?_:b):t0(b*b+_*_),S>T&&(T=S),S<x&&(x=S);n==="random"&&v0(g),g.max=T-x,g.min=x,g.v=v=(parseFloat(e.amount)||parseFloat(e.each)*(E>v?v-1:c?c==="y"?v/E:E:Math.max(E,v/E))||0)*(n==="edges"?-1:1),g.b=v<0?r-v:r,g.u=ai(e.amount||e.each)||0,i=i&&v<0?ov(i):i}return v=(g[h]-g.min)/g.max||0,Ae(g.b+(i?i(v):v)*g.v)+g.u}},iu=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(i){var n=Ae(Math.round(parseFloat(i)/t)*t*e);return(n-n%1)/e+(On(i)?0:ai(i))}},x0=function(t,e){var i=oi(t),n,r;return!i&&xn(t)&&(n=i=t.radius||Oi,t.values?(t=Bi(t.values),(r=!On(t[0]))&&(n*=n)):t=iu(t.increment)),ls(e,i?Fe(t)?function(a){return r=t(a),Math.abs(r-a)<=n?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=Oi,u=0,f=t.length,h,d;f--;)r?(h=t[f].x-o,d=t[f].y-l,h=h*h+d*d):h=Math.abs(t[f]-o),h<c&&(c=h,u=f);return u=!n||c<=n?t[u]:a,r||u===a||On(a)?u:u+ai(a)}:iu(t))},y0=function(t,e,i,n){return ls(oi(t)?!e:i===!0?!!(i=0):!n,function(){return oi(t)?t[~~(Math.random()*t.length)]:(i=i||1e-5)&&(n=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((t-i/2+Math.random()*(e-t+i*.99))/i)*i*n)/n})},Kg=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return function(n){return e.reduce(function(r,a){return a(r)},n)}},Zg=function(t,e){return function(i){return t(parseFloat(i))+(e||ai(i))}},Jg=function(t,e,i){return S0(t,e,0,1,i)},M0=function(t,e,i){return ls(i,function(n){return t[~~e(n)]})},Qg=function s(t,e,i){var n=e-t;return oi(t)?M0(t,s(0,t.length),e):ls(i,function(r){return(n+(r-t)%n)%n+t})},jg=function s(t,e,i){var n=e-t,r=n*2;return oi(t)?M0(t,s(0,t.length-1),e):ls(i,function(a){return a=(r+(a-t)%r)%r||0,t+(a>n?r-a:a)})},wa=function(t){return t.replace(Lg,function(e){var i=e.indexOf("[")+1,n=e.substring(i||7,i?e.indexOf("]"):e.length-1).split(Fg);return y0(i?n:+n[0],i?0:+n[1],+n[2]||1e-5)})},S0=function(t,e,i,n,r){var a=e-t,o=n-i;return ls(r,function(l){return i+((l-t)/a*o||0)})},tv=function s(t,e,i,n){var r=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!r){var a=Ze(t),o={},l,c,u,f,h;if(i===!0&&(n=1)&&(i=null),a)t={p:t},e={p:e};else if(oi(t)&&!oi(e)){for(u=[],f=t.length,h=f-2,c=1;c<f;c++)u.push(s(t[c-1],t[c]));f--,r=function(p){p*=f;var v=Math.min(h,~~p);return u[v](p-v)},i=e}else n||(t=Mr(oi(t)?[]:{},t));if(!u){for(l in e)_h.call(o,t,l,"get",e[l]);r=function(p){return Sh(p,o)||(a?t.p:t)}}}return ls(i,r)},yf=function(t,e,i){var n=t.labels,r=Oi,a,o,l;for(a in n)o=n[a]-e,o<0==!!i&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},Ti=function(t,e,i){var n=t.vars,r=n[e],a=Te,o=t._ctx,l,c,u;if(r)return l=n[e+"Params"],c=n.callbackScope||t,i&&ns.length&&tl(),o&&(Te=o),u=l?r.apply(c,l):r.call(c),Te=a,u},ta=function(t){return rs(t),t.scrollTrigger&&t.scrollTrigger.kill(!!je),t.progress()<1&&Ti(t,"onInterrupt"),t},hr,b0=[],w0=function(t){if(t)if(t=!t.name&&t.default||t,hh()||t.headless){var e=t.name,i=Fe(t),n=e&&!i&&t.init?function(){this._props=[]}:t,r={init:ba,render:Sh,add:_h,kill:vv,modifier:gv,rawVars:0},a={targetTest:0,get:0,getSetter:Mh,aliases:{},register:0};if(wr(),t!==n){if(Mi[e])return;Pi(n,Pi(el(t,r),a)),Mr(n.prototype,Mr(r,el(t,a))),Mi[n.prop=e]=n,t.targetTest&&(Go.push(n),ph[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}a0(e,n),t.register&&t.register(vi,n,mi)}else b0.push(t)},xe=255,ea={aqua:[0,xe,xe],lime:[0,xe,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,xe],navy:[0,0,128],white:[xe,xe,xe],olive:[128,128,0],yellow:[xe,xe,0],orange:[xe,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[xe,0,0],pink:[xe,192,203],cyan:[0,xe,xe],transparent:[xe,xe,xe,0]},kl=function(t,e,i){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(i-e)*t*6:t<.5?i:t*3<2?e+(i-e)*(2/3-t)*6:e)*xe+.5|0},E0=function(t,e,i){var n=t?On(t)?[t>>16,t>>8&xe,t&xe]:0:ea.black,r,a,o,l,c,u,f,h,d,p;if(!n){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),ea[t])n=ea[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+r+r+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return n=parseInt(t.substr(1,6),16),[n>>16,n>>8&xe,n&xe,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),n=[t>>16,t>>8&xe,t&xe]}else if(t.substr(0,3)==="hsl"){if(n=p=t.match(mf),!e)l=+n[0]%360/360,c=+n[1]/100,u=+n[2]/100,a=u<=.5?u*(c+1):u+c-u*c,r=u*2-a,n.length>3&&(n[3]*=1),n[0]=kl(l+1/3,r,a),n[1]=kl(l,r,a),n[2]=kl(l-1/3,r,a);else if(~t.indexOf("="))return n=t.match(i0),i&&n.length<4&&(n[3]=1),n}else n=t.match(mf)||ea.transparent;n=n.map(Number)}return e&&!p&&(r=n[0]/xe,a=n[1]/xe,o=n[2]/xe,f=Math.max(r,a,o),h=Math.min(r,a,o),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===r?(a-o)/d+(a<o?6:0):f===a?(o-r)/d+2:(r-a)/d+4,l*=60),n[0]=~~(l+.5),n[1]=~~(c*100+.5),n[2]=~~(u*100+.5)),i&&n.length<4&&(n[3]=1),n},T0=function(t){var e=[],i=[],n=-1;return t.split(ss).forEach(function(r){var a=r.match(ur)||[];e.push.apply(e,a),i.push(n+=a.length+1)}),e.c=i,e},Mf=function(t,e,i){var n="",r=(t+n).match(ss),a=e?"hsla(":"rgba(",o=0,l,c,u,f;if(!r)return t;if(r=r.map(function(h){return(h=E0(h,e,1))&&a+(e?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),i&&(u=T0(t),l=i.c,l.join(n)!==u.c.join(n)))for(c=t.replace(ss,"1").split(ur),f=c.length-1;o<f;o++)n+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(u.length?u:r.length?r:i).shift());if(!c)for(c=t.split(ss),f=c.length-1;o<f;o++)n+=c[o]+r[o];return n+c[f]},ss=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in ea)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),ev=/hsl[a]?\(/,D0=function(t){var e=t.join(" "),i;if(ss.lastIndex=0,ss.test(e))return i=ev.test(e),t[1]=Mf(t[1],i),t[0]=Mf(t[0],i,T0(t[1])),!0},Ea,wi=(function(){var s=Date.now,t=500,e=33,i=s(),n=i,r=1e3/240,a=r,o=[],l,c,u,f,h,d,p=function v(g){var m=s()-n,M=g===!0,b,_,S,y;if((m>t||m<0)&&(i+=m-e),n+=m,S=n-i,b=S-a,(b>0||M)&&(y=++f.frame,h=S-f.time*1e3,f.time=S=S/1e3,a+=b+(b>=r?4:r-b),_=1),M||(l=c(v)),_)for(d=0;d<o.length;d++)o[d](S,h,y,g)};return f={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(g){return h/(1e3/(g||60))},wake:function(){s0&&(!Zc&&hh()&&(on=Zc=window,fh=on.document||{},Ci.gsap=vi,(on.gsapVersions||(on.gsapVersions=[])).push(vi.version),r0(jo||on.GreenSockGlobals||!on.gsap&&on||{}),b0.forEach(w0)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(g){return setTimeout(g,a-f.time*1e3+1|0)},Ea=1,p(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Ea=0,c=ba},lagSmoothing:function(g,m){t=g||1/0,e=Math.min(m||33,t)},fps:function(g){r=1e3/(g||240),a=f.time*1e3+r},add:function(g,m,M){var b=m?function(_,S,y,T){g(_,S,y,T),f.remove(b)}:g;return f.remove(g),o[M?"unshift":"push"](b),wr(),b},remove:function(g,m){~(m=o.indexOf(g))&&o.splice(m,1)&&d>=m&&d--},_listeners:o},f})(),wr=function(){return!Ea&&wi.wake()},oe={},iv=/^[\d.\-M][\d.\-,\s]/,nv=/["']/g,sv=function(t){for(var e={},i=t.substr(1,t.length-3).split(":"),n=i[0],r=1,a=i.length,o,l,c;r<a;r++)l=i[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[n]=isNaN(c)?c.replace(nv,"").trim():+c,n=l.substr(o+1).trim();return e},rv=function(t){var e=t.indexOf("(")+1,i=t.indexOf(")"),n=t.indexOf("(",e);return t.substring(e,~n&&n<i?t.indexOf(")",i+1):i)},av=function(t){var e=(t+"").split("("),i=oe[e[0]];return i&&e.length>1&&i.config?i.config.apply(null,~t.indexOf("{")?[sv(e[1])]:rv(t).split(",").map(u0)):oe._CE&&iv.test(t)?oe._CE("",t):i},ov=function(t){return function(e){return 1-t(1-e)}},As=function(t,e){return t&&(Fe(t)?t:oe[t]||av(t))||e},Is=function(t,e,i,n){i===void 0&&(i=function(l){return 1-e(1-l)}),n===void 0&&(n=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:i,easeInOut:n},a;return pi(t,function(o){oe[o]=Ci[o]=r,oe[a=o.toLowerCase()]=i;for(var l in r)oe[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=oe[o+"."+l]=r[l]}),r},A0=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},zl=function s(t,e,i){var n=e>=1?e:1,r=(i||(t?.3:.45))/(e<1?e:1),a=r/Kc*(Math.asin(1/n)||0),o=function(u){return u===1?1:n*Math.pow(2,-10*u)*Rg((u-a)*r)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:A0(o);return r=Kc/r,l.config=function(c,u){return s(t,c,u)},l},Vl=function s(t,e){e===void 0&&(e=1.70158);var i=function(a){return a?--a*a*((e+1)*a+e)+1:0},n=t==="out"?i:t==="in"?function(r){return 1-i(1-r)}:A0(i);return n.config=function(r){return s(t,r)},n};pi("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;Is(s+",Power"+(e-1),t?function(i){return Math.pow(i,e)}:function(i){return i},function(i){return 1-Math.pow(1-i,e)},function(i){return i<.5?Math.pow(i*2,e)/2:1-Math.pow((1-i)*2,e)/2})});oe.Linear.easeNone=oe.none=oe.Linear.easeIn;Is("Elastic",zl("in"),zl("out"),zl());(function(s,t){var e=1/t,i=2*e,n=2.5*e,r=function(o){return o<e?s*o*o:o<i?s*Math.pow(o-1.5/t,2)+.75:o<n?s*(o-=2.25/t)*o+.9375:s*Math.pow(o-2.625/t,2)+.984375};Is("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);Is("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});Is("Circ",function(s){return-(t0(1-s*s)-1)});Is("Sine",function(s){return s===1?1:-Pg(s*Ag)+1});Is("Back",Vl("in"),Vl("out"),Vl());oe.SteppedEase=oe.steps=Ci.SteppedEase={config:function(t,e){t===void 0&&(t=1);var i=1/t,n=t+(e?0:1),r=e?1:0,a=1-ye;return function(o){return((n*Wa(0,a,o)|0)+r)*i}}};Ma.ease=oe["quad.out"];pi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return mh+=s+","+s+"Params,"});var C0=function(t,e){this.id=Cg++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:l0,this.set=e?e.getSetter:Mh},Ta=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,br(this,+e.duration,1,1),this.data=e.data,Te&&(this._ctx=Te,Te.data.push(this)),Ea||wi.wake()}var t=s.prototype;return t.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},t.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},t.totalDuration=function(i){return arguments.length?(this._dirty=0,br(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(i,n){if(wr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(wl(this,i),!r._dp||r.parent||d0(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&un(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===ye||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),c0(this,i,n)),this},t.time=function(i,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+_f(this))%(this._dur+this._rDelay)||(i?this._dur:0),n):this._time},t.totalProgress=function(i,n){return arguments.length?this.totalTime(this.totalDuration()*i,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(i,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+_f(this),n):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(i,n){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,n):this._repeat?Sr(this._tTime,r)+1:1},t.timeScale=function(i,n){if(!arguments.length)return this._rts===-ye?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?il(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-ye?0:this._rts,this.totalTime(Wa(-Math.abs(this._delay),this.totalDuration(),r),n!==!1),bl(this),Vg(this)},t.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(wr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==ye&&(this._tTime-=ye)))),this):this._ps},t.startTime=function(i){if(arguments.length){this._start=Ae(i);var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&un(n,this,this._start-this._delay),this}return this._start},t.endTime=function(i){return this._start+(di(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(i){var n=this.parent||this._dp;return n?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?il(n.rawTime(i),this):this._tTime:this._tTime},t.revert=function(i){i===void 0&&(i=Og);var n=je;return je=i,vh(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),je=n,this},t.globalTime=function(i){for(var n=this,r=arguments.length?i:n.rawTime();n;)r=n._start+r/(Math.abs(n._ts)||1),n=n._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},t.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,xf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(i){if(arguments.length){var n=this._time;return this._rDelay=i,xf(this),n?this.time(n):this}return this._rDelay},t.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},t.seek=function(i,n){return this.totalTime(Ni(this,i),di(n))},t.restart=function(i,n){return this.play().totalTime(i?-this._delay:0,di(n)),this._dur||(this._zTime=-ye),this},t.play=function(i,n){return i!=null&&this.seek(i,n),this.reversed(!1).paused(!1)},t.reverse=function(i,n){return i!=null&&this.seek(i||this.totalDuration(),n),this.reversed(!0).paused(!1)},t.pause=function(i,n){return i!=null&&this.seek(i,n),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-ye:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-ye,this},t.isActive=function(){var i=this.parent||this._dp,n=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=n&&r<this.endTime(!0)-ye)},t.eventCallback=function(i,n,r){var a=this.vars;return arguments.length>1?(n?(a[i]=n,r&&(a[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=n)):delete a[i],this):a[i]},t.then=function(i){var n=this,r=n._prom;return new Promise(function(a){var o=Fe(i)?i:h0,l=function(){var u=n.then;n.then=null,r&&r(),Fe(o)&&(o=o(n))&&(o.then||o===n)&&(n.then=u),a(o),n.then=u};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?l():n._prom=l})},t.kill=function(){ta(this)},s})();Pi(Ta.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-ye,_prom:0,_ps:!1,_rts:1});var fi=(function(s){jp(t,s);function t(i,n){var r;return i===void 0&&(i={}),r=s.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=di(i.sortChildren),Ce&&un(i.parent||Ce,Cn(r),n),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&p0(Cn(r),i.scrollTrigger),r}var e=t.prototype;return e.to=function(n,r,a){return la(0,arguments,this),this},e.from=function(n,r,a){return la(1,arguments,this),this},e.fromTo=function(n,r,a,o){return la(2,arguments,this),this},e.set=function(n,r,a){return r.duration=0,r.parent=this,oa(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new ze(n,r,Ni(this,a),1),this},e.call=function(n,r,a){return un(this,ze.delayedCall(0,n,r),a)},e.staggerTo=function(n,r,a,o,l,c,u){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new ze(n,a,Ni(this,l)),this},e.staggerFrom=function(n,r,a,o,l,c,u){return a.runBackwards=1,oa(a).immediateRender=di(a.immediateRender),this.staggerTo(n,r,a,o,l,c,u)},e.staggerFromTo=function(n,r,a,o,l,c,u,f){return o.startAt=a,oa(o).immediateRender=di(o.immediateRender),this.staggerTo(n,r,o,l,c,u,f)},e.render=function(n,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=n<=0?0:Ae(n),f=this._zTime<0!=n<0&&(this._initted||!c),h,d,p,v,g,m,M,b,_,S,y,T;if(this!==Ce&&u>l&&n>=0&&(u=l),u!==this._tTime||a||f){if(o!==this._time&&c&&(u+=this._time-o,n+=this._time-o),h=u,_=this._start,b=this._ts,m=!b,f&&(c||(o=this._zTime),(n||!r)&&(this._zTime=n)),this._repeat){if(y=this._yoyo,g=c+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(g*100+n,r,a);if(h=Ae(u%g),u===l?(v=this._repeat,h=c):(S=Ae(u/g),v=~~S,v&&v===S&&(h=c,v--),h>c&&(h=c)),S=Sr(this._tTime,g),!o&&this._tTime&&S!==v&&this._tTime-S*g-this._dur<=0&&(S=v),y&&v&1&&(h=c-h,T=1),v!==S&&!this._lock){var x=y&&S&1,E=x===(y&&v&1);if(v<S&&(x=!x),o=x?0:u%c?c:u,this._lock=1,this.render(o||(T?0:Ae(v*g)),r,!c)._lock=0,this._tTime=u,!r&&this.parent&&Ti(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,S=v),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,E&&(this._lock=2,o=x?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=Xg(this,Ae(o),Ae(h)),M&&(u-=h-(h=M._start))),this._tTime=u,this._time=h,this._act=!!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,o=0),!o&&u&&c&&!r&&!S&&(Ti(this,"onStart"),this._tTime!==u))return this;if(h>=o&&n>=0)for(d=this._first;d;){if(p=d._next,(d._act||h>=d._start)&&d._ts&&M!==d){if(d.parent!==this)return this.render(n,r,a);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,r,a),h!==this._time||!this._ts&&!m){M=0,p&&(u+=this._zTime=-ye);break}}d=p}else{d=this._last;for(var C=n<0?n:h;d;){if(p=d._prev,(d._act||C<=d._end)&&d._ts&&M!==d){if(d.parent!==this)return this.render(n,r,a);if(d.render(d._ts>0?(C-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(C-d._start)*d._ts,r,a||je&&vh(d)),h!==this._time||!this._ts&&!m){M=0,p&&(u+=this._zTime=C?-ye:ye);break}}d=p}}if(M&&!r&&(this.pause(),M.render(h>=o?0:-ye)._zTime=h>=o?1:-1,this._ts))return this._start=_,bl(this),this.render(n,r,a);this._onUpdate&&!r&&Ti(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(_===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((n||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&rs(this,1),!r&&!(n<0&&!o)&&(u||o||!l)&&(Ti(this,u===l&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(n,r){var a=this;if(On(r)||(r=Ni(this,r,n)),!(n instanceof Ta)){if(oi(n))return n.forEach(function(o){return a.add(o,r)}),this;if(Ze(n))return this.addLabel(n,r);if(Fe(n))n=ze.delayedCall(0,n);else return this}return this!==n?un(this,n,r):this},e.getChildren=function(n,r,a,o){n===void 0&&(n=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-Oi);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof ze?r&&l.push(c):(a&&l.push(c),n&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},e.getById=function(n){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===n)return r[a]},e.remove=function(n){return Ze(n)?this.removeLabel(n):Fe(n)?this.killTweensOf(n):(n.parent===this&&Sl(this,n),n===this._recent&&(this._recent=this._last),Ds(this))},e.totalTime=function(n,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ae(wi.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),s.prototype.totalTime.call(this,n,r),this._forcing=0,this):this._tTime},e.addLabel=function(n,r){return this.labels[n]=Ni(this,r),this},e.removeLabel=function(n){return delete this.labels[n],this},e.addPause=function(n,r,a){var o=ze.delayedCall(0,r||ba,a);return o.data="isPause",this._hasPause=1,un(this,o,Ni(this,n))},e.removePause=function(n){var r=this._first;for(n=Ni(this,n);r;)r._start===n&&r.data==="isPause"&&rs(r),r=r._next},e.killTweensOf=function(n,r,a){for(var o=this.getTweensOf(n,a),l=o.length;l--;)Jn!==o[l]&&o[l].kill(n,r);return this},e.getTweensOf=function(n,r){for(var a=[],o=Bi(n),l=this._first,c=On(r),u;l;)l instanceof ze?Bg(l._targets,o)&&(c?(!Jn||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(u=l.getTweensOf(o,r)).length&&a.push.apply(a,u),l=l._next;return a},e.tweenTo=function(n,r){r=r||{};var a=this,o=Ni(a,n),l=r,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,p=ze.to(a,Pi({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||ye,onStart:function(){if(a.pause(),!d){var g=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());p._dur!==g&&br(p,g,0,1).render(p._time,!0,!0),d=1}u&&u.apply(p,f||[])}},r));return h?p.render(0):p},e.tweenFromTo=function(n,r,a){return this.tweenTo(r,Pi({startAt:{time:Ni(this,n)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(n){return n===void 0&&(n=this._time),yf(this,Ni(this,n))},e.previousLabel=function(n){return n===void 0&&(n=this._time),yf(this,Ni(this,n),1)},e.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+ye)},e.shiftChildren=function(n,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(n=Ae(n);o;)o._start>=a&&(o._start+=n,o._end+=n),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=n);return Ds(this)},e.invalidate=function(n){var r=this._first;for(this._lock=0;r;)r.invalidate(n),r=r._next;return s.prototype.invalidate.call(this,n)},e.clear=function(n){n===void 0&&(n=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),Ds(this)},e.totalDuration=function(n){var r=0,a=this,o=a._last,l=Oi,c,u,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-n:n));if(a._dirty){for(f=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,un(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(r-=u,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=Ae(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;br(a,a===Ce&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(n){if(Ce._ts&&(c0(Ce,il(n,Ce)),o0=wi.frame),wi.frame>=gf){gf+=Ai.autoSleep||120;var r=Ce._first;if((!r||!r._ts)&&Ai.autoSleep&&wi._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||wi.sleep()}}},t})(Ta);Pi(fi.prototype,{_lock:0,_hasPause:0,_forcing:0});var lv=function(t,e,i,n,r,a,o){var l=new mi(this._pt,t,e,0,1,N0,null,r),c=0,u=0,f,h,d,p,v,g,m,M;for(l.b=i,l.e=n,i+="",n+="",(m=~n.indexOf("random("))&&(n=wa(n)),a&&(M=[i,n],a(M,t,e),i=M[0],n=M[1]),h=i.match(Ol)||[];f=Ol.exec(n);)p=f[0],v=n.substring(c,f.index),d?d=(d+1)%5:v.substr(-5)==="rgba("&&(d=1),p!==h[u++]&&(g=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:v||u===1?v:",",s:g,c:p.charAt(1)==="="?mr(g,p)-g:parseFloat(p)-g,m:d&&d<4?Math.round:0},c=Ol.lastIndex);return l.c=c<n.length?n.substring(c,n.length):"",l.fp=o,(n0.test(n)||m)&&(l.e=0),this._pt=l,l},_h=function(t,e,i,n,r,a,o,l,c,u){Fe(n)&&(n=n(r||0,t,a));var f=t[e],h=i!=="get"?i:Fe(f)?c?t[e.indexOf("set")||!Fe(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,d=Fe(f)?c?dv:F0:yh,p;if(Ze(n)&&(~n.indexOf("random(")&&(n=wa(n)),n.charAt(1)==="="&&(p=mr(h,n)+(ai(h)||0),(p||p===0)&&(n=p))),!u||h!==n||nu)return!isNaN(h*n)&&n!==""?(p=new mi(this._pt,t,e,+h||0,n-(h||0),typeof f=="boolean"?mv:I0,0,d),c&&(p.fp=c),o&&p.modifier(o,this,t),this._pt=p):(!f&&!(e in t)&&dh(e,n),lv.call(this,t,e,h,n,d,l||Ai.stringFilter,c))},cv=function(t,e,i,n,r){if(Fe(t)&&(t=ca(t,r,e,i,n)),!xn(t)||t.style&&t.nodeType||oi(t)||e0(t))return Ze(t)?ca(t,r,e,i,n):t;var a={},o;for(o in t)a[o]=ca(t[o],r,e,i,n);return a},P0=function(t,e,i,n,r,a){var o,l,c,u;if(Mi[t]&&(o=new Mi[t]).init(r,o.rawVars?e[t]:cv(e[t],n,r,a,i),i,n,a)!==!1&&(i._pt=l=new mi(i._pt,r,t,0,1,o.render,o,0,o.priority),i!==hr))for(c=i._ptLookup[i._targets.indexOf(r)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Jn,nu,xh=function s(t,e,i){var n=t.vars,r=n.ease,a=n.startAt,o=n.immediateRender,l=n.lazy,c=n.onUpdate,u=n.runBackwards,f=n.yoyoEase,h=n.keyframes,d=n.autoRevert,p=t._dur,v=t._startAt,g=t._targets,m=t.parent,M=m&&m.data==="nested"?m.vars.targets:g,b=t._overwrite==="auto"&&!ch,_=t.timeline,S=n.easeReverse||f,y,T,x,E,C,F,I,O,L,U,V,H,K;if(_&&(!h||!r)&&(r="none"),t._ease=As(r,Ma.ease),t._rEase=S&&(As(S)||t._ease),t._from=!_&&!!n.runBackwards,t._from&&(t.ratio=1),!_||h&&!n.stagger){if(O=g[0]?Ts(g[0]).harness:0,H=O&&n[O.prop],y=el(n,ph),v&&(v._zTime<0&&v.progress(1),e<0&&u&&o&&!d?v.render(-1,!0):v.revert(u&&p?Vo:Ug),v._lazy=0),a){if(rs(t._startAt=ze.set(g,Pi({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!v&&di(l),startAt:null,delay:0,onUpdate:c&&function(){return Ti(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(je||!o&&!d)&&t._startAt.revert(Vo),o&&p&&e<=0&&i<=0){e&&(t._zTime=e);return}}else if(u&&p&&!v){if(e&&(o=!1),x=Pi({overwrite:!1,data:"isFromStart",lazy:o&&!v&&di(l),immediateRender:o,stagger:0,parent:m},y),H&&(x[O.prop]=H),rs(t._startAt=ze.set(g,x)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(je?t._startAt.revert(Vo):t._startAt.render(-1,!0)),t._zTime=e,!o)s(t._startAt,ye,ye);else if(!e)return}for(t._pt=t._ptCache=0,l=p&&di(l)||l&&!p,T=0;T<g.length;T++){if(C=g[T],I=C._gsap||gh(g)[T]._gsap,t._ptLookup[T]=U={},Jc[I.id]&&ns.length&&tl(),V=M===g?T:M.indexOf(C),O&&(L=new O).init(C,H||y,t,V,M)!==!1&&(t._pt=E=new mi(t._pt,C,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(Y){U[Y]=E}),L.priority&&(F=1)),!O||H)for(x in y)Mi[x]&&(L=P0(x,y,t,V,C,M))?L.priority&&(F=1):U[x]=E=_h.call(t,C,x,"get",y[x],V,M,0,n.stringFilter);t._op&&t._op[T]&&t.kill(C,t._op[T]),b&&t._pt&&(Jn=t,Ce.killTweensOf(C,U,t.globalTime(e)),K=!t.parent,Jn=0),t._pt&&l&&(Jc[I.id]=1)}F&&U0(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!K,h&&e<=0&&_.render(Oi,!0,!0)},uv=function(t,e,i,n,r,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,f,h,d;if(!c)for(c=t._ptCache[e]=[],h=t._ptLookup,d=t._targets.length;d--;){if(u=h[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return nu=1,t.vars[e]="+=0",xh(t,o),nu=0,l?Sa(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(n||n===0)&&!r?n:u.s+(n||0)+a*u.c,u.c=i-u.s,f.e&&(f.e=Ue(i)+ai(f.e)),f.b&&(f.b=u.s+ai(f.b))},hv=function(t,e){var i=t[0]?Ts(t[0]).harness:0,n=i&&i.aliases,r,a,o,l;if(!n)return e;r=Mr({},e);for(a in n)if(a in r)for(l=n[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},fv=function(t,e,i,n){var r=e.ease||n||"power1.inOut",a,o;if(oi(e))o=i[t]||(i[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:r})});else for(a in e)o=i[a]||(i[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:r})},ca=function(t,e,i,n,r){return Fe(t)?t.call(e,i,n,r):Ze(t)&&~t.indexOf("random(")?wa(t):t},R0=mh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",L0={};pi(R0+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return L0[s]=1});var ze=(function(s){jp(t,s);function t(i,n,r,a){var o;typeof n=="number"&&(r.duration=n,n=r,r=null),o=s.call(this,a?n:oa(n))||this;var l=o.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,p=l.keyframes,v=l.defaults,g=l.scrollTrigger,m=n.parent||Ce,M=(oi(i)||e0(i)?On(i[0]):"length"in n)?[i]:Bi(i),b,_,S,y,T,x,E,C;if(o._targets=M.length?gh(M):Sa("GSAP target "+i+" not found. https://gsap.com",!Ai.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,p||h||Ka(c)||Ka(u)){n=o.vars;var F=n.easeReverse||n.yoyoEase;if(b=o.timeline=new fi({data:"nested",defaults:v||{},targets:m&&m.data==="nested"?m.vars.targets:M}),b.kill(),b.parent=b._dp=Cn(o),b._start=0,h||Ka(c)||Ka(u)){if(y=M.length,E=h&&_0(h),xn(h))for(T in h)~R0.indexOf(T)&&(C||(C={}),C[T]=h[T]);for(_=0;_<y;_++)S=el(n,L0),S.stagger=0,F&&(S.easeReverse=F),C&&Mr(S,C),x=M[_],S.duration=+ca(c,Cn(o),_,x,M),S.delay=(+ca(u,Cn(o),_,x,M)||0)-o._delay,!h&&y===1&&S.delay&&(o._delay=u=S.delay,o._start+=u,S.delay=0),b.to(x,S,E?E(_,x,M):0),b._ease=oe.none;b.duration()?c=u=0:o.timeline=0}else if(p){oa(Pi(b.vars.defaults,{ease:"none"})),b._ease=As(p.ease||n.ease||"none");var I=0,O,L,U;if(oi(p))p.forEach(function(V){return b.to(M,V,">")}),b.duration();else{S={};for(T in p)T==="ease"||T==="easeEach"||fv(T,p[T],S,p.easeEach);for(T in S)for(O=S[T].sort(function(V,H){return V.t-H.t}),I=0,_=0;_<O.length;_++)L=O[_],U={ease:L.e,duration:(L.t-(_?O[_-1].t:0))/100*c},U[T]=L.v,b.to(M,U,I),I+=U.duration;b.duration()<c&&b.to({},{duration:c-b.duration()})}}c||o.duration(c=b.duration())}else o.timeline=0;return d===!0&&!ch&&(Jn=Cn(o),Ce.killTweensOf(M),Jn=0),un(m,Cn(o),r),n.reversed&&o.reverse(),n.paused&&o.paused(!0),(f||!c&&!p&&o._start===Ae(m._time)&&di(f)&&Gg(Cn(o))&&m.data!=="nested")&&(o._tTime=-ye,o.render(Math.max(0,-u)||0)),g&&p0(Cn(o),g),o}var e=t.prototype;return e.render=function(n,r,a){var o=this._time,l=this._tDur,c=this._dur,u=n<0,f=n>l-ye&&!u?l:n<ye?0:n,h,d,p,v,g,m,M,b;if(!c)Wg(this,n,r,a);else if(f!==this._tTime||!n||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,b=this.timeline,this._repeat){if(v=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(v*100+n,r,a);if(h=Ae(f%v),f===l?(p=this._repeat,h=c):(g=Ae(f/v),p=~~g,p&&p===g?(h=c,p--):h>c&&(h=c)),m=this._yoyo&&p&1,m&&(h=c-h),g=Sr(this._tTime,v),h===o&&!a&&this._initted&&p===g)return this._tTime=f,this;p!==g&&this.vars.repeatRefresh&&!m&&!this._lock&&h!==v&&this._initted&&(this._lock=a=1,this.render(Ae(v*p),!0).invalidate()._lock=0)}if(!this._initted){if(m0(this,u?n:h,a,r,f))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&p!==g))return this;if(c!==this._dur)return this.render(n,r,a)}if(this._rEase){var _=h<o;if(_!==this._inv){var S=_?o:c-o;this._inv=_,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=S?(_?-1:1)/S:0,this._invScale=_?-this.ratio:1-this.ratio,this._invEase=_?this._rEase:this._ease}this.ratio=M=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=M=this._ease(h/c);if(this._from&&(this.ratio=M=1-M),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!r&&!g&&(Ti(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(M,d.d),d=d._next;b&&b.render(n<0?n:b._dur*b._ease(h/this._dur),r,a)||this._startAt&&(this._zTime=n),this._onUpdate&&!r&&(u&&Qc(this,n,r,a),Ti(this,"onUpdate")),this._repeat&&p!==g&&this.vars.onRepeat&&!r&&this.parent&&Ti(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&Qc(this,n,!0,!0),(n||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&rs(this,1),!r&&!(u&&!o)&&(f||o||m)&&(Ti(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),s.prototype.invalidate.call(this,n)},e.resetTo=function(n,r,a,o,l){Ea||wi.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||xh(this,c),u=this._ease(c/this._dur),uv(this,n,r,a,o,u,c,l)?this.resetTo(n,r,a,o,1):(wl(this,0),this.parent||f0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(n,r){if(r===void 0&&(r="all"),!n&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?ta(this):this.scrollTrigger&&this.scrollTrigger.kill(!!je),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(n,r,Jn&&Jn.vars.overwrite!==!0)._first||ta(this),this.parent&&a!==this.timeline.totalDuration()&&br(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=n?Bi(n):o,c=this._ptLookup,u=this._pt,f,h,d,p,v,g,m;if((!r||r==="all")&&zg(o,l))return r==="all"&&(this._pt=0),ta(this);for(f=this._op=this._op||[],r!=="all"&&(Ze(r)&&(v={},pi(r,function(M){return v[M]=1}),r=v),r=hv(o,r)),m=o.length;m--;)if(~l.indexOf(o[m])){h=c[m],r==="all"?(f[m]=r,p=h,d={}):(d=f[m]=f[m]||{},p=r);for(v in p)g=h&&h[v],g&&((!("kill"in g.d)||g.d.kill(v)===!0)&&Sl(this,g,"_pt"),delete h[v]),d!=="all"&&(d[v]=1)}return this._initted&&!this._pt&&u&&ta(this),this},t.to=function(n,r){return new t(n,r,arguments[2])},t.from=function(n,r){return la(1,arguments)},t.delayedCall=function(n,r,a,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(n,r,a){return la(2,arguments)},t.set=function(n,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(n,r)},t.killTweensOf=function(n,r,a){return Ce.killTweensOf(n,r,a)},t})(Ta);Pi(ze.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});pi("staggerTo,staggerFrom,staggerFromTo",function(s){ze[s]=function(){var t=new fi,e=tu.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var yh=function(t,e,i){return t[e]=i},F0=function(t,e,i){return t[e](i)},dv=function(t,e,i,n){return t[e](n.fp,i)},pv=function(t,e,i){return t.setAttribute(e,i)},Mh=function(t,e){return Fe(t[e])?F0:uh(t[e])&&t.setAttribute?pv:yh},I0=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},mv=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},N0=function(t,e){var i=e._pt,n="";if(!t&&e.b)n=e.b;else if(t===1&&e.e)n=e.e;else{for(;i;)n=i.p+(i.m?i.m(i.s+i.c*t):Math.round((i.s+i.c*t)*1e4)/1e4)+n,i=i._next;n+=e.c}e.set(e.t,e.p,n,e)},Sh=function(t,e){for(var i=e._pt;i;)i.r(t,i.d),i=i._next},gv=function(t,e,i,n){for(var r=this._pt,a;r;)a=r._next,r.p===n&&r.modifier(t,e,i),r=a},vv=function(t){for(var e=this._pt,i,n;e;)n=e._next,e.p===t&&!e.op||e.op===t?Sl(this,e,"_pt"):e.dep||(i=1),e=n;return!i},_v=function(t,e,i,n){n.mSet(t,e,n.m.call(n.tween,i,n.mt),n)},U0=function(t){for(var e=t._pt,i,n,r,a;e;){for(i=e._next,n=r;n&&n.pr>e.pr;)n=n._next;(e._prev=n?n._prev:a)?e._prev._next=e:r=e,(e._next=n)?n._prev=e:a=e,e=i}t._pt=r},mi=(function(){function s(e,i,n,r,a,o,l,c,u){this.t=i,this.s=r,this.c=a,this.p=n,this.r=o||I0,this.d=l||this,this.set=c||yh,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(i,n,r){this.mSet=this.mSet||this.set,this.set=_v,this.m=i,this.mt=r,this.tween=n},s})();pi(mh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return ph[s]=1});Ci.TweenMax=Ci.TweenLite=ze;Ci.TimelineLite=Ci.TimelineMax=fi;Ce=new fi({sortChildren:!1,defaults:Ma,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Ai.stringFilter=D0;var Cs=[],Ho={},xv=[],Sf=0,yv=0,Gl=function(t){return(Ho[t]||xv).map(function(e){return e()})},su=function(){var t=Date.now(),e=[];t-Sf>2&&(Gl("matchMediaInit"),Cs.forEach(function(i){var n=i.queries,r=i.conditions,a,o,l,c;for(o in n)a=on.matchMedia(n[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(i.revert(),l&&e.push(i))}),Gl("matchMediaRevert"),e.forEach(function(i){return i.onMatch(i,function(n){return i.add(null,n)})}),Sf=t,Gl("matchMedia"))},O0=(function(){function s(e,i){this.selector=i&&eu(i),this.data=[],this._r=[],this.isReverted=!1,this.id=yv++,e&&this.add(e)}var t=s.prototype;return t.add=function(i,n,r){Fe(i)&&(r=n,n=i,i=Fe);var a=this,o=function(){var c=Te,u=a.selector,f;return c&&c!==a&&c.data.push(a),r&&(a.selector=eu(r)),Te=a,f=n.apply(a,arguments),Fe(f)&&a._r.push(f),Te=c,a.selector=u,a.isReverted=!1,f};return a.last=o,i===Fe?o(a,function(l){return a.add(null,l)}):i?a[i]=o:o},t.ignore=function(i){var n=Te;Te=null,i(this),Te=n},t.getTweens=function(){var i=[];return this.data.forEach(function(n){return n instanceof s?i.push.apply(i,n.getTweens()):n instanceof ze&&!(n.parent&&n.parent.data==="nested")&&i.push(n)}),i},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(i,n){var r=this;if(i?(function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(i)}),l=r.data.length;l--;)c=r.data[l],c instanceof fi?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof ze)&&c.revert&&c.revert(i);r._r.forEach(function(u){return u(i,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),n)for(var a=Cs.length;a--;)Cs[a].id===this.id&&Cs.splice(a,1)},t.revert=function(i){this.kill(i||{})},s})(),Mv=(function(){function s(e){this.contexts=[],this.scope=e,Te&&Te.data.push(this)}var t=s.prototype;return t.add=function(i,n,r){xn(i)||(i={matches:i});var a=new O0(0,r||this.scope),o=a.conditions={},l,c,u;Te&&!a.selector&&(a.selector=Te.selector),this.contexts.push(a),n=a.add("onMatch",n),a.queries=i;for(c in i)c==="all"?u=1:(l=on.matchMedia(i[c]),l&&(Cs.indexOf(a)<0&&Cs.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(su):l.addEventListener("change",su)));return u&&n(a,function(f){return a.add(null,f)}),this},t.revert=function(i){this.kill(i||{})},t.kill=function(i){this.contexts.forEach(function(n){return n.kill(i,!0)})},s})(),nl={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];e.forEach(function(n){return w0(n)})},timeline:function(t){return new fi(t)},getTweensOf:function(t,e){return Ce.getTweensOf(t,e)},getProperty:function(t,e,i,n){Ze(t)&&(t=Bi(t)[0]);var r=Ts(t||{}).get,a=i?h0:u0;return i==="native"&&(i=""),t&&(e?a((Mi[e]&&Mi[e].get||r)(t,e,i,n)):function(o,l,c){return a((Mi[o]&&Mi[o].get||r)(t,o,l,c))})},quickSetter:function(t,e,i){if(t=Bi(t),t.length>1){var n=t.map(function(u){return vi.quickSetter(u,e,i)}),r=n.length;return function(u){for(var f=r;f--;)n[f](u)}}t=t[0]||{};var a=Mi[e],o=Ts(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(u){var f=new a;hr._pt=0,f.init(t,i?u+i:u,hr,0,[t]),f.render(1,f),hr._pt&&Sh(1,hr)}:o.set(t,l);return a?c:function(u){return c(t,l,i?u+i:u,o,1)}},quickTo:function(t,e,i){var n,r=vi.to(t,Pi((n={},n[e]="+=0.1",n.paused=!0,n.stagger=0,n),i||{})),a=function(l,c,u){return r.resetTo(e,l,c,u)};return a.tween=r,a},isTweening:function(t){return Ce.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=As(t.ease,Ma.ease)),vf(Ma,t||{})},config:function(t){return vf(Ai,t||{})},registerEffect:function(t){var e=t.name,i=t.effect,n=t.plugins,r=t.defaults,a=t.extendTimeline;(n||"").split(",").forEach(function(o){return o&&!Mi[o]&&!Ci[o]&&Sa(e+" effect requires "+o+" plugin.")}),Bl[e]=function(o,l,c){return i(Bi(o),Pi(l||{},r),c)},a&&(fi.prototype[e]=function(o,l,c){return this.add(Bl[e](o,xn(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){oe[t]=As(e)},parseEase:function(t,e){return arguments.length?As(t,e):oe},getById:function(t){return Ce.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var i=new fi(t),n,r;for(i.smoothChildTiming=di(t.smoothChildTiming),Ce.remove(i),i._dp=0,i._time=i._tTime=Ce._time,n=Ce._first;n;)r=n._next,(e||!(!n._dur&&n instanceof ze&&n.vars.onComplete===n._targets[0]))&&un(i,n,n._start-n._delay),n=r;return un(Ce,i,0),i},context:function(t,e){return t?new O0(t,e):Te},matchMedia:function(t){return new Mv(t)},matchMediaRefresh:function(){return Cs.forEach(function(t){var e=t.conditions,i,n;for(n in e)e[n]&&(e[n]=!1,i=1);i&&t.revert()})||su()},addEventListener:function(t,e){var i=Ho[t]||(Ho[t]=[]);~i.indexOf(e)||i.push(e)},removeEventListener:function(t,e){var i=Ho[t],n=i&&i.indexOf(e);n>=0&&i.splice(n,1)},utils:{wrap:Qg,wrapYoyo:jg,distribute:_0,random:y0,snap:x0,normalize:Jg,getUnit:ai,clamp:Yg,splitColor:E0,toArray:Bi,selector:eu,mapRange:S0,pipe:Kg,unitize:Zg,interpolate:tv,shuffle:v0},install:r0,effects:Bl,ticker:wi,updateRoot:fi.updateRoot,plugins:Mi,globalTimeline:Ce,core:{PropTween:mi,globals:a0,Tween:ze,Timeline:fi,Animation:Ta,getCache:Ts,_removeLinkedListItem:Sl,reverting:function(){return je},context:function(t){return t&&Te&&(Te.data.push(t),t._ctx=Te),Te},suppressOverwrites:function(t){return ch=t}}};pi("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return nl[s]=ze[s]});wi.add(fi.updateRoot);hr=nl.to({},{duration:0});var Sv=function(t,e){for(var i=t._pt;i&&i.p!==e&&i.op!==e&&i.fp!==e;)i=i._next;return i},bv=function(t,e){var i=t._targets,n,r,a;for(n in e)for(r=i.length;r--;)a=t._ptLookup[r][n],a&&(a=a.d)&&(a._pt&&(a=Sv(a,n)),a&&a.modifier&&a.modifier(e[n],t,i[r],n))},Hl=function(t,e){return{name:t,headless:1,rawVars:1,init:function(n,r,a){a._onInit=function(o){var l,c;if(Ze(r)&&(l={},pi(r,function(u){return l[u]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}bv(o,r)}}}},vi=nl.registerPlugin({name:"attr",init:function(t,e,i,n,r){var a,o,l;this.tween=i;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],n,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var i=e._pt;i;)je?i.set(i.t,i.p,i.b,i):i.r(t,i.d),i=i._next}},{name:"endArray",headless:1,init:function(t,e){for(var i=e.length;i--;)this.add(t,i,t[i]||0,e[i],0,0,0,0,0,1)}},Hl("roundProps",iu),Hl("modifiers"),Hl("snap",x0))||nl;ze.version=fi.version=vi.version="3.15.0";s0=1;hh()&&wr();oe.Power0;oe.Power1;oe.Power2;oe.Power3;oe.Power4;oe.Linear;oe.Quad;oe.Cubic;oe.Quart;oe.Quint;oe.Strong;oe.Elastic;oe.Back;oe.SteppedEase;oe.Bounce;oe.Sine;oe.Expo;oe.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var bf,Qn,gr,bh,bs,wf,wh,wv=function(){return typeof window<"u"},Bn={},xs=180/Math.PI,vr=Math.PI/180,ks=Math.atan2,Ef=1e8,Eh=/([A-Z])/g,Ev=/(left|right|width|margin|padding|x)/i,Tv=/[\s,\(]\S/,fn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ru=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Dv=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Av=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Cv=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Pv=function(t,e){var i=e.s+e.c*t;e.set(e.t,e.p,~~(i+(i<0?-.5:.5))+e.u,e)},B0=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},k0=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},Rv=function(t,e,i){return t.style[e]=i},Lv=function(t,e,i){return t.style.setProperty(e,i)},Fv=function(t,e,i){return t._gsap[e]=i},Iv=function(t,e,i){return t._gsap.scaleX=t._gsap.scaleY=i},Nv=function(t,e,i,n,r){var a=t._gsap;a.scaleX=a.scaleY=i,a.renderTransform(r,a)},Uv=function(t,e,i,n,r){var a=t._gsap;a[e]=i,a.renderTransform(r,a)},Pe="transform",gi=Pe+"Origin",Ov=function s(t,e){var i=this,n=this.target,r=n.style,a=n._gsap;if(t in Bn&&r){if(this.tfm=this.tfm||{},t!=="transform")t=fn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return i.tfm[o]=Rn(n,o)}):this.tfm[t]=a.x?a[t]:Rn(n,t),t===gi&&(this.tfm.zOrigin=a.zOrigin);else return fn.transform.split(",").forEach(function(o){return s.call(i,o,e)});if(this.props.indexOf(Pe)>=0)return;a.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(gi,e,"")),t=Pe}(r||e)&&this.props.push(t,e,r[t])},z0=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},Bv=function(){var t=this.props,e=this.target,i=e.style,n=e._gsap,r,a;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?i[t[r]]=t[r+2]:i.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(Eh,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)n[a]=this.tfm[a];n.svg&&(n.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=wh(),(!r||!r.isStart)&&!i[Pe]&&(z0(i),n.zOrigin&&i[gi]&&(i[gi]+=" "+n.zOrigin+"px",n.zOrigin=0,n.renderTransform()),n.uncache=1)}},V0=function(t,e){var i={target:t,props:[],revert:Bv,save:Ov};return t._gsap||vi.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(n){return i.save(n)}),i},G0,au=function(t,e){var i=Qn.createElementNS?Qn.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Qn.createElement(t);return i&&i.style?i:Qn.createElement(t)},Di=function s(t,e,i){var n=getComputedStyle(t);return n[e]||n.getPropertyValue(e.replace(Eh,"-$1").toLowerCase())||n.getPropertyValue(e)||!i&&s(t,Er(e)||e,1)||""},Tf="O,Moz,ms,Ms,Webkit".split(","),Er=function(t,e,i){var n=e||bs,r=n.style,a=5;if(t in r&&!i)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(Tf[a]+t in r););return a<0?null:(a===3?"ms":a>=0?Tf[a]:"")+t},ou=function(){wv()&&window.document&&(bf=window,Qn=bf.document,gr=Qn.documentElement,bs=au("div")||{style:{}},au("div"),Pe=Er(Pe),gi=Pe+"Origin",bs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",G0=!!Er("perspective"),wh=vi.core.reverting,bh=1)},Df=function(t){var e=t.ownerSVGElement,i=au("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=t.cloneNode(!0),r;n.style.display="block",i.appendChild(n),gr.appendChild(i);try{r=n.getBBox()}catch{}return i.removeChild(n),gr.removeChild(i),r},Af=function(t,e){for(var i=e.length;i--;)if(t.hasAttribute(e[i]))return t.getAttribute(e[i])},H0=function(t){var e,i;try{e=t.getBBox()}catch{e=Df(t),i=1}return e&&(e.width||e.height)||i||(e=Df(t)),e&&!e.width&&!e.x&&!e.y?{x:+Af(t,["x","cx","x1"])||0,y:+Af(t,["y","cy","y1"])||0,width:0,height:0}:e},W0=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&H0(t))},as=function(t,e){if(e){var i=t.style,n;e in Bn&&e!==gi&&(e=Pe),i.removeProperty?(n=e.substr(0,2),(n==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),i.removeProperty(n==="--"?e:e.replace(Eh,"-$1").toLowerCase())):i.removeAttribute(e)}},jn=function(t,e,i,n,r,a){var o=new mi(t._pt,e,i,0,1,a?k0:B0);return t._pt=o,o.b=n,o.e=r,t._props.push(i),o},Cf={deg:1,rad:1,turn:1},kv={grid:1,flex:1},os=function s(t,e,i,n){var r=parseFloat(i)||0,a=(i+"").trim().substr((r+"").length)||"px",o=bs.style,l=Ev.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=n==="px",d=n==="%",p,v,g,m;if(n===a||!r||Cf[n]||Cf[a])return r;if(a!=="px"&&!h&&(r=s(t,e,i,"px")),m=t.getCTM&&W0(t),(d||a==="%")&&(Bn[e]||~e.indexOf("adius")))return p=m?t.getBBox()[l?"width":"height"]:t[u],Ue(d?r/p*f:r/100*p);if(o[l?"width":"height"]=f+(h?a:n),v=n!=="rem"&&~e.indexOf("adius")||n==="em"&&t.appendChild&&!c?t:t.parentNode,m&&(v=(t.ownerSVGElement||{}).parentNode),(!v||v===Qn||!v.appendChild)&&(v=Qn.body),g=v._gsap,g&&d&&g.width&&l&&g.time===wi.time&&!g.uncache)return Ue(r/g.width*f);if(d&&(e==="height"||e==="width")){var M=t.style[e];t.style[e]=f+n,p=t[u],M?t.style[e]=M:as(t,e)}else(d||a==="%")&&!kv[Di(v,"display")]&&(o.position=Di(t,"position")),v===t&&(o.position="static"),v.appendChild(bs),p=bs[u],v.removeChild(bs),o.position="absolute";return l&&d&&(g=Ts(v),g.time=wi.time,g.width=v[u]),Ue(h?p*r/f:p&&r?f/p*r:0)},Rn=function(t,e,i,n){var r;return bh||ou(),e in fn&&e!=="transform"&&(e=fn[e],~e.indexOf(",")&&(e=e.split(",")[0])),Bn[e]&&e!=="transform"?(r=Aa(t,n),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:rl(Di(t,gi))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||n||~(r+"").indexOf("calc("))&&(r=sl[e]&&sl[e](t,e,i)||Di(t,e)||l0(t,e)||(e==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?os(t,e,r,i)+i:r},zv=function(t,e,i,n){if(!i||i==="none"){var r=Er(e,t,1),a=r&&Di(t,r,1);a&&a!==i?(e=r,i=a):e==="borderColor"&&(i=Di(t,"borderTopColor"))}var o=new mi(this._pt,t.style,e,0,1,N0),l=0,c=0,u,f,h,d,p,v,g,m,M,b,_,S;if(o.b=i,o.e=n,i+="",n+="",n.substring(0,6)==="var(--"&&(n=Di(t,n.substring(4,n.indexOf(")")))),n==="auto"&&(v=t.style[e],t.style[e]=n,n=Di(t,e)||n,v?t.style[e]=v:as(t,e)),u=[i,n],D0(u),i=u[0],n=u[1],h=i.match(ur)||[],S=n.match(ur)||[],S.length){for(;f=ur.exec(n);)g=f[0],M=n.substring(l,f.index),p?p=(p+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(p=1),g!==(v=h[c++]||"")&&(d=parseFloat(v)||0,_=v.substr((d+"").length),g.charAt(1)==="="&&(g=mr(d,g)+_),m=parseFloat(g),b=g.substr((m+"").length),l=ur.lastIndex-b.length,b||(b=b||Ai.units[e]||_,l===n.length&&(n+=b,o.e+=b)),_!==b&&(d=os(t,e,v,b)||0),o._pt={_next:o._pt,p:M||c===1?M:",",s:d,c:m-d,m:p&&p<4||e==="zIndex"?Math.round:0});o.c=l<n.length?n.substring(l,n.length):""}else o.r=e==="display"&&n==="none"?k0:B0;return n0.test(n)&&(o.e=0),this._pt=o,o},Pf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Vv=function(t){var e=t.split(" "),i=e[0],n=e[1]||"50%";return(i==="top"||i==="bottom"||n==="left"||n==="right")&&(t=i,i=n,n=t),e[0]=Pf[i]||i,e[1]=Pf[n]||n,e.join(" ")},Gv=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var i=e.t,n=i.style,r=e.u,a=i._gsap,o,l,c;if(r==="all"||r===!0)n.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],Bn[o]&&(l=1,o=o==="transformOrigin"?gi:Pe),as(i,o);l&&(as(i,Pe),a&&(a.svg&&i.removeAttribute("transform"),n.scale=n.rotate=n.translate="none",Aa(i,1),a.uncache=1,z0(n)))}},sl={clearProps:function(t,e,i,n,r){if(r.data!=="isFromStart"){var a=t._pt=new mi(t._pt,e,i,0,0,Gv);return a.u=n,a.pr=-10,a.tween=r,t._props.push(i),1}}},Da=[1,0,0,1,0,0],X0={},q0=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Rf=function(t){var e=Di(t,Pe);return q0(e)?Da:e.substr(7).match(i0).map(Ue)},Th=function(t,e){var i=t._gsap||Ts(t),n=t.style,r=Rf(t),a,o,l,c;return i.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?Da:r):(r===Da&&!t.offsetParent&&t!==gr&&!i.svg&&(l=n.display,n.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,gr.appendChild(t)),r=Rf(t),l?n.display=l:as(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):gr.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},lu=function(t,e,i,n,r,a){var o=t._gsap,l=r||Th(t,!0),c=o.xOrigin||0,u=o.yOrigin||0,f=o.xOffset||0,h=o.yOffset||0,d=l[0],p=l[1],v=l[2],g=l[3],m=l[4],M=l[5],b=e.split(" "),_=parseFloat(b[0])||0,S=parseFloat(b[1])||0,y,T,x,E;i?l!==Da&&(T=d*g-p*v)&&(x=_*(g/T)+S*(-v/T)+(v*M-g*m)/T,E=_*(-p/T)+S*(d/T)-(d*M-p*m)/T,_=x,S=E):(y=H0(t),_=y.x+(~b[0].indexOf("%")?_/100*y.width:_),S=y.y+(~(b[1]||b[0]).indexOf("%")?S/100*y.height:S)),n||n!==!1&&o.smooth?(m=_-c,M=S-u,o.xOffset=f+(m*d+M*v)-m,o.yOffset=h+(m*p+M*g)-M):o.xOffset=o.yOffset=0,o.xOrigin=_,o.yOrigin=S,o.smooth=!!n,o.origin=e,o.originIsAbsolute=!!i,t.style[gi]="0px 0px",a&&(jn(a,o,"xOrigin",c,_),jn(a,o,"yOrigin",u,S),jn(a,o,"xOffset",f,o.xOffset),jn(a,o,"yOffset",h,o.yOffset)),t.setAttribute("data-svg-origin",_+" "+S)},Aa=function(t,e){var i=t._gsap||new C0(t);if("x"in i&&!e&&!i.uncache)return i;var n=t.style,r=i.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=Di(t,gi)||"0",u,f,h,d,p,v,g,m,M,b,_,S,y,T,x,E,C,F,I,O,L,U,V,H,K,Y,Q,j,dt,Et,Xt,qt;return u=f=h=v=g=m=M=b=_=0,d=p=1,i.svg=!!(t.getCTM&&W0(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(n[Pe]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Pe]!=="none"?l[Pe]:"")),n.scale=n.rotate=n.translate="none"),T=Th(t,i.svg),i.svg&&(i.uncache?(K=t.getBBox(),c=i.xOrigin-K.x+"px "+(i.yOrigin-K.y)+"px",H=""):H=!e&&t.getAttribute("data-svg-origin"),lu(t,H||c,!!H||i.originIsAbsolute,i.smooth!==!1,T)),S=i.xOrigin||0,y=i.yOrigin||0,T!==Da&&(F=T[0],I=T[1],O=T[2],L=T[3],u=U=T[4],f=V=T[5],T.length===6?(d=Math.sqrt(F*F+I*I),p=Math.sqrt(L*L+O*O),v=F||I?ks(I,F)*xs:0,M=O||L?ks(O,L)*xs+v:0,M&&(p*=Math.abs(Math.cos(M*vr))),i.svg&&(u-=S-(S*F+y*O),f-=y-(S*I+y*L))):(qt=T[6],Et=T[7],Q=T[8],j=T[9],dt=T[10],Xt=T[11],u=T[12],f=T[13],h=T[14],x=ks(qt,dt),g=x*xs,x&&(E=Math.cos(-x),C=Math.sin(-x),H=U*E+Q*C,K=V*E+j*C,Y=qt*E+dt*C,Q=U*-C+Q*E,j=V*-C+j*E,dt=qt*-C+dt*E,Xt=Et*-C+Xt*E,U=H,V=K,qt=Y),x=ks(-O,dt),m=x*xs,x&&(E=Math.cos(-x),C=Math.sin(-x),H=F*E-Q*C,K=I*E-j*C,Y=O*E-dt*C,Xt=L*C+Xt*E,F=H,I=K,O=Y),x=ks(I,F),v=x*xs,x&&(E=Math.cos(x),C=Math.sin(x),H=F*E+I*C,K=U*E+V*C,I=I*E-F*C,V=V*E-U*C,F=H,U=K),g&&Math.abs(g)+Math.abs(v)>359.9&&(g=v=0,m=180-m),d=Ue(Math.sqrt(F*F+I*I+O*O)),p=Ue(Math.sqrt(V*V+qt*qt)),x=ks(U,V),M=Math.abs(x)>2e-4?x*xs:0,_=Xt?1/(Xt<0?-Xt:Xt):0),i.svg&&(H=t.getAttribute("transform"),i.forceCSS=t.setAttribute("transform","")||!q0(Di(t,Pe)),H&&t.setAttribute("transform",H))),Math.abs(M)>90&&Math.abs(M)<270&&(r?(d*=-1,M+=v<=0?180:-180,v+=v<=0?180:-180):(p*=-1,M+=M<=0?180:-180)),e=e||i.uncache,i.x=u-((i.xPercent=u&&(!e&&i.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*i.xPercent/100:0)+a,i.y=f-((i.yPercent=f&&(!e&&i.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*i.yPercent/100:0)+a,i.z=h+a,i.scaleX=Ue(d),i.scaleY=Ue(p),i.rotation=Ue(v)+o,i.rotationX=Ue(g)+o,i.rotationY=Ue(m)+o,i.skewX=M+o,i.skewY=b+o,i.transformPerspective=_+a,(i.zOrigin=parseFloat(c.split(" ")[2])||!e&&i.zOrigin||0)&&(n[gi]=rl(c)),i.xOffset=i.yOffset=0,i.force3D=Ai.force3D,i.renderTransform=i.svg?Wv:G0?Y0:Hv,i.uncache=0,i},rl=function(t){return(t=t.split(" "))[0]+" "+t[1]},Wl=function(t,e,i){var n=ai(e);return Ue(parseFloat(e)+parseFloat(os(t,"x",i+"px",n)))+n},Hv=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Y0(t,e)},fs="0deg",Lr="0px",ds=") ",Y0=function(t,e){var i=e||this,n=i.xPercent,r=i.yPercent,a=i.x,o=i.y,l=i.z,c=i.rotation,u=i.rotationY,f=i.rotationX,h=i.skewX,d=i.skewY,p=i.scaleX,v=i.scaleY,g=i.transformPerspective,m=i.force3D,M=i.target,b=i.zOrigin,_="",S=m==="auto"&&t&&t!==1||m===!0;if(b&&(f!==fs||u!==fs)){var y=parseFloat(u)*vr,T=Math.sin(y),x=Math.cos(y),E;y=parseFloat(f)*vr,E=Math.cos(y),a=Wl(M,a,T*E*-b),o=Wl(M,o,-Math.sin(y)*-b),l=Wl(M,l,x*E*-b+b)}g!==Lr&&(_+="perspective("+g+ds),(n||r)&&(_+="translate("+n+"%, "+r+"%) "),(S||a!==Lr||o!==Lr||l!==Lr)&&(_+=l!==Lr||S?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+ds),c!==fs&&(_+="rotate("+c+ds),u!==fs&&(_+="rotateY("+u+ds),f!==fs&&(_+="rotateX("+f+ds),(h!==fs||d!==fs)&&(_+="skew("+h+", "+d+ds),(p!==1||v!==1)&&(_+="scale("+p+", "+v+ds),M.style[Pe]=_||"translate(0, 0)"},Wv=function(t,e){var i=e||this,n=i.xPercent,r=i.yPercent,a=i.x,o=i.y,l=i.rotation,c=i.skewX,u=i.skewY,f=i.scaleX,h=i.scaleY,d=i.target,p=i.xOrigin,v=i.yOrigin,g=i.xOffset,m=i.yOffset,M=i.forceCSS,b=parseFloat(a),_=parseFloat(o),S,y,T,x,E;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=vr,c*=vr,S=Math.cos(l)*f,y=Math.sin(l)*f,T=Math.sin(l-c)*-h,x=Math.cos(l-c)*h,c&&(u*=vr,E=Math.tan(c-u),E=Math.sqrt(1+E*E),T*=E,x*=E,u&&(E=Math.tan(u),E=Math.sqrt(1+E*E),S*=E,y*=E)),S=Ue(S),y=Ue(y),T=Ue(T),x=Ue(x)):(S=f,x=h,y=T=0),(b&&!~(a+"").indexOf("px")||_&&!~(o+"").indexOf("px"))&&(b=os(d,"x",a,"px"),_=os(d,"y",o,"px")),(p||v||g||m)&&(b=Ue(b+p-(p*S+v*T)+g),_=Ue(_+v-(p*y+v*x)+m)),(n||r)&&(E=d.getBBox(),b=Ue(b+n/100*E.width),_=Ue(_+r/100*E.height)),E="matrix("+S+","+y+","+T+","+x+","+b+","+_+")",d.setAttribute("transform",E),M&&(d.style[Pe]=E)},Xv=function(t,e,i,n,r){var a=360,o=Ze(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?xs:1),c=l-n,u=n+c+"deg",f,h;return o&&(f=r.split("_")[1],f==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),f==="cw"&&c<0?c=(c+a*Ef)%a-~~(c/a)*a:f==="ccw"&&c>0&&(c=(c-a*Ef)%a-~~(c/a)*a)),t._pt=h=new mi(t._pt,e,i,n,c,Dv),h.e=u,h.u="deg",t._props.push(i),h},Lf=function(t,e){for(var i in e)t[i]=e[i];return t},qv=function(t,e,i){var n=Lf({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=i.style,o,l,c,u,f,h,d,p;n.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),a[Pe]=e,o=Aa(i,1),as(i,Pe),i.setAttribute("transform",c)):(c=getComputedStyle(i)[Pe],a[Pe]=e,o=Aa(i,1),a[Pe]=c);for(l in Bn)c=n[l],u=o[l],c!==u&&r.indexOf(l)<0&&(d=ai(c),p=ai(u),f=d!==p?os(i,l,c,p):parseFloat(c),h=parseFloat(u),t._pt=new mi(t._pt,o,l,f,h-f,ru),t._pt.u=p||0,t._props.push(l));Lf(o,n)};pi("padding,margin,Width,Radius",function(s,t){var e="Top",i="Right",n="Bottom",r="Left",a=(t<3?[e,i,n,r]:[e+r,e+i,n+i,n+r]).map(function(o){return t<2?s+o:"border"+o+s});sl[t>1?"border"+s:s]=function(o,l,c,u,f){var h,d;if(arguments.length<4)return h=a.map(function(p){return Rn(o,p,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},a.forEach(function(p,v){return d[p]=h[v]=h[v]||h[(v-1)/2|0]}),o.init(l,d,f)}});var $0={name:"css",register:ou,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,i,n,r){var a=this._props,o=t.style,l=i.vars.startAt,c,u,f,h,d,p,v,g,m,M,b,_,S,y,T,x,E;bh||ou(),this.styles=this.styles||V0(t),x=this.styles.props,this.tween=i;for(v in e)if(v!=="autoRound"&&(u=e[v],!(Mi[v]&&P0(v,e,i,n,t,r)))){if(d=typeof u,p=sl[v],d==="function"&&(u=u.call(i,n,t,r),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=wa(u)),p)p(this,t,v,u,i)&&(T=1);else if(v.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(v)+"").trim(),u+="",ss.lastIndex=0,ss.test(c)||(g=ai(c),m=ai(u),m?g!==m&&(c=os(t,v,c,m)+m):g&&(u+=g)),this.add(o,"setProperty",c,u,n,r,0,0,v),a.push(v),x.push(v,0,o[v]);else if(d!=="undefined"){if(l&&v in l?(c=typeof l[v]=="function"?l[v].call(i,n,t,r):l[v],Ze(c)&&~c.indexOf("random(")&&(c=wa(c)),ai(c+"")||c==="auto"||(c+=Ai.units[v]||ai(Rn(t,v))||""),(c+"").charAt(1)==="="&&(c=Rn(t,v))):c=Rn(t,v),h=parseFloat(c),M=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),f=parseFloat(u),v in fn&&(v==="autoAlpha"&&(h===1&&Rn(t,"visibility")==="hidden"&&f&&(h=0),x.push("visibility",0,o.visibility),jn(this,o,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),v!=="scale"&&v!=="transform"&&(v=fn[v],~v.indexOf(",")&&(v=v.split(",")[0]))),b=v in Bn,b){if(this.styles.save(v),E=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=Di(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var C=t.style.perspective;t.style.perspective=u,u=Di(t,"perspective"),C?t.style.perspective=C:as(t,"perspective")}f=parseFloat(u)}if(_||(S=t._gsap,S.renderTransform&&!e.parseTransform||Aa(t,e.parseTransform),y=e.smoothOrigin!==!1&&S.smooth,_=this._pt=new mi(this._pt,o,Pe,0,1,S.renderTransform,S,0,-1),_.dep=1),v==="scale")this._pt=new mi(this._pt,S,"scaleY",S.scaleY,(M?mr(S.scaleY,M+f):f)-S.scaleY||0,ru),this._pt.u=0,a.push("scaleY",v),v+="X";else if(v==="transformOrigin"){x.push(gi,0,o[gi]),u=Vv(u),S.svg?lu(t,u,0,y,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==S.zOrigin&&jn(this,S,"zOrigin",S.zOrigin,m),jn(this,o,v,rl(c),rl(u)));continue}else if(v==="svgOrigin"){lu(t,u,1,y,0,this);continue}else if(v in X0){Xv(this,S,v,h,M?mr(h,M+u):u);continue}else if(v==="smoothOrigin"){jn(this,S,"smooth",S.smooth,u);continue}else if(v==="force3D"){S[v]=u;continue}else if(v==="transform"){qv(this,u,t);continue}}else v in o||(v=Er(v)||v);if(b||(f||f===0)&&(h||h===0)&&!Tv.test(u)&&v in o)g=(c+"").substr((h+"").length),f||(f=0),m=ai(u)||(v in Ai.units?Ai.units[v]:g),g!==m&&(h=os(t,v,c,m)),this._pt=new mi(this._pt,b?S:o,v,h,(M?mr(h,M+f):f)-h,!b&&(m==="px"||v==="zIndex")&&e.autoRound!==!1?Pv:ru),this._pt.u=m||0,b&&E!==u?(this._pt.b=c,this._pt.e=E,this._pt.r=Cv):g!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=Av);else if(v in o)zv.call(this,t,v,c,M?M+u:u);else if(v in t)this.add(t,v,c||t[v],M?M+u:u,n,r);else if(v!=="parseTransform"){dh(v,u);continue}b||(v in o?x.push(v,0,o[v]):typeof t[v]=="function"?x.push(v,2,t[v]()):x.push(v,1,c||t[v])),a.push(v)}}T&&U0(this)},render:function(t,e){if(e.tween._time||!wh())for(var i=e._pt;i;)i.r(t,i.d),i=i._next;else e.styles.revert()},get:Rn,aliases:fn,getSetter:function(t,e,i){var n=fn[e];return n&&n.indexOf(",")<0&&(e=n),e in Bn&&e!==gi&&(t._gsap.x||Rn(t,"x"))?i&&wf===i?e==="scale"?Iv:Fv:(wf=i||{})&&(e==="scale"?Nv:Uv):t.style&&!uh(t.style[e])?Rv:~e.indexOf("-")?Lv:Mh(t,e)},core:{_removeProperty:as,_getMatrix:Th}};vi.utils.checkPrefix=Er;vi.core.getStyleSaver=V0;(function(s,t,e,i){var n=pi(s+","+t+","+e,function(r){Bn[r]=1});pi(t,function(r){Ai.units[r]="deg",X0[r]=1}),fn[n[13]]=s+","+t,pi(i,function(r){var a=r.split(":");fn[a[1]]=n[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");pi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){Ai.units[s]="px"});vi.registerPlugin($0);var ft=vi.registerPlugin($0)||vi;ft.core.Tween;/*!
 * strings: 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Yv=/(?:^\s+|\s+$)/g,$v=/([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2642\u2640]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDD27\uDCBC\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCC\uDFCB]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;function Dh(s){var t=s.nodeType,e="";if(t===1||t===9||t===11){if(typeof s.textContent=="string")return s.textContent;for(s=s.firstChild;s;s=s.nextSibling)e+=Dh(s)}else if(t===3||t===4)return s.nodeValue;return e}function an(s,t,e,i,n){if(s+="",e&&(s=s.trim?s.trim():s.replace(Yv,"")),t&&t!=="")return s.replace(/>/g,"&gt;").replace(/</g,"&lt;").split(t);for(var r=[],a=s.length,o=0,l,c;o<a;o++)c=s.charAt(o),(c.charCodeAt(0)>=55296&&c.charCodeAt(0)<=56319||s.charCodeAt(o+1)>=65024&&s.charCodeAt(o+1)<=65039)&&(l=((s.substr(o,12).split($v)||[])[1]||"").length||2,c=s.substr(o,l),r.emoji=1,o+=l-1),r.push(n?c:c===">"?"&gt;":c==="<"?"&lt;":i&&c===" "&&(s.charAt(o-1)===" "||s.charAt(o+1)===" ")?"&nbsp;":c);return r}/*!
 * ScrambleTextPlugin 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Wo=(function(){function s(e){this.chars=an(e),this.sets=[],this.length=50;for(var i=0;i<20;i++)this.sets[i]=If(80,this.chars)}var t=s.prototype;return t.grow=function(i){for(var n=0;n<20;n++)this.sets[n]+=If(i-this.length,this.chars);this.length=i},s})(),ws,K0,Z0=function(){return ws||typeof window<"u"&&(ws=window.gsap)&&ws.registerPlugin&&ws},Kv=1,Ff=/\s+/g,If=function(t,e){for(var i=e.length,n="";--t>-1;)n+=e[~~(Math.random()*i)];return n},cu="ABCDEFGHIJKLMNOPQRSTUVWXYZ",Nf=cu.toLowerCase(),Zv={upperCase:new Wo(cu),lowerCase:new Wo(Nf),upperAndLowerCase:new Wo(cu+Nf)},Uf=function(){K0=ws=Z0()},El={version:"3.15.0",name:"scrambleText",register:function(t,e,i){ws=t,Uf()},init:function(t,e,i,n,r){if(K0||Uf(),this.prop="innerHTML"in t?"innerHTML":"textContent"in t?"textContent":0,!!this.prop){this.target=t,typeof e!="object"&&(e={text:e});var a=e.text||e.value||"",o=e.trim!==!1,l=this,c,u,f,h;return l.delimiter=c=e.delimiter||"",l.original=an(Dh(t).replace(Ff," ").split("&nbsp;").join(""),c,o),(a==="{original}"||a===!0||a==null)&&(a=l.original.join(c)),l.text=an((a||"").replace(Ff," "),c,o),l.hasClass=!!(e.newClass||e.oldClass),l.newClass=e.newClass,l.oldClass=e.oldClass,h=c==="",l.textHasEmoji=h&&!!l.text.emoji,l.charsHaveEmoji=!!e.chars&&!!an(e.chars).emoji,l.length=h?l.original.length:l.original.join(c).length,l.lengthDif=(h?l.text.length:l.text.join(c).length)-l.length,l.fillChar=e.fillChar||e.chars&&~e.chars.indexOf(" ")?"&nbsp;":"",l.charSet=f=Zv[e.chars||"upperCase"]||new Wo(e.chars),l.speed=.05/(e.speed||1),l.prevScrambleTime=0,l.setIndex=Math.random()*20|0,u=l.length+Math.max(l.lengthDif,0),u>f.length&&f.grow(u),l.chars=f.sets[l.setIndex],l.revealDelay=e.revealDelay||0,l.tweenLength=e.tweenLength!==!1,l.tween=i,l.rightToLeft=!!e.rightToLeft,l._props.push("scrambleText","text"),Kv}},render:function(t,e){var i=e.target,n=e.prop,r=e.text,a=e.delimiter,o=e.tween,l=e.prevScrambleTime,c=e.revealDelay,u=e.setIndex,f=e.chars,h=e.charSet,d=e.length,p=e.textHasEmoji,v=e.charsHaveEmoji,g=e.lengthDif,m=e.tweenLength,M=e.oldClass,b=e.newClass,_=e.rightToLeft,S=e.fillChar,y=e.speed,T=e.original,x=e.hasClass,E=r.length,C=o._time,F=C-l,I,O,L,U,V,H,K,Y,Q,j,dt;c&&(o._from&&(C=o._dur-C),t=C===0?0:C<c?1e-6:C===o._dur?1:o._ease((C-c)/(o._dur-c))),t<0?t=0:t>1&&(t=1),_&&(t=1-t),I=~~(t*E+.5),t?((F>y||F<-y)&&(e.setIndex=u=(u+(Math.random()*19|0))%20,e.chars=h.sets[u],e.prevScrambleTime+=F),U=f):U=T.join(a),dt=o._from?t:1-t,j=d+(m?o._from?dt*dt*dt:1-dt*dt*dt:1)*g,_?t===1&&(o._from||o.data==="isFromStart")?(L="",U=T.join(a)):(K=r.slice(I).join(a),v?L=an(U).slice(0,j-(p?an(K):K).length+.5|0).join(""):L=U.substr(0,j-(p?an(K):K).length+.5|0),U=K):(L=r.slice(0,I).join(a),O=(p?an(L):L).length,v?U=an(U).slice(O,j+.5|0).join(""):U=U.substr(O,j-O+.5|0)),x?(Y=_?M:b,Q=_?b:M,V=Y&&I!==0,H=Q&&I!==E,K=(V?"<span class='"+Y+"'>":"")+L+(V?"</span>":"")+(H?"<span class='"+Q+"'>":"")+a+U+(H?"</span>":"")):K=L+a+U,i[n]=S==="&nbsp;"&&~K.indexOf("  ")?K.split("  ").join("&nbsp;&nbsp;"):K}};El.emojiSafeSplit=an;El.getText=Dh;Z0()&&ws.registerPlugin(El);/*!
 * DrawSVGPlugin 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var dn,Ah,al,J0,Q0,Of,uu,j0,tm=function(){return typeof window<"u"},em=function(){return dn||tm()&&(dn=window.gsap)&&dn.registerPlugin&&dn},Jv=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,Xl={rect:["width","height"],circle:["r","r"],ellipse:["rx","ry"],line:["x2","y2"]},Ss=function(t){return Math.round(t*1e4)/1e4},Fn=function(t){return parseFloat(t)||0},Bf=function(t,e){var i=Fn(t);return~t.indexOf("%")?i/100*e:i},Za=function(t,e){return Fn(t.getAttribute(e))},Xo=Math.sqrt,kf=function(t,e,i,n,r,a){return Xo(Math.pow((Fn(i)-Fn(t))*r,2)+Math.pow((Fn(n)-Fn(e))*a,2))},zf=function(t){return console.warn(t)},im=function(t){return t.getAttribute("vector-effect")==="non-scaling-stroke"},Qv=1,jv=function(t,e,i){var n=t.indexOf(" "),r,a;return n<0?(r=i!==void 0?i+"":t,a=t):(r=t.substr(0,n),a=t.substr(n+1)),r=Bf(r,e),a=Bf(a,e),r>a?[a,r]:[r,a]},qo=function(t){if(t=Ah(t)[0],!t)return 0;var e=t.tagName.toLowerCase(),i=t.style,n=1,r=1,a,o,l,c,u,f,h;im(t)&&(r=t.getScreenCTM(),n=Xo(r.a*r.a+r.b*r.b),r=Xo(r.d*r.d+r.c*r.c));try{o=t.getBBox()}catch{zf("Some browsers won't measure invisible elements (like display:none or masks inside defs).")}var d=o||{x:0,y:0,width:0,height:0},p=d.x,v=d.y,g=d.width,m=d.height;if((!o||!g&&!m)&&Xl[e]&&(g=Za(t,Xl[e][0]),m=Za(t,Xl[e][1]),e!=="rect"&&e!=="line"&&(g*=2,m*=2),e==="line"&&(p=Za(t,"x1"),v=Za(t,"y1"),g=Math.abs(g-p),m=Math.abs(m-v))),e==="path")c=i.strokeDasharray,i.strokeDasharray="none",a=t.getTotalLength()||0,Ss(n)!==Ss(r)&&!Of&&(Of=1)&&zf("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."),a*=(n+r)/2,i.strokeDasharray=c;else if(e==="rect")a=g*2*n+m*2*r;else if(e==="line")a=kf(p,v,p+g,v+m,n,r);else if(e==="polyline"||e==="polygon")for(l=t.getAttribute("points").match(Jv)||[],e==="polygon"&&l.push(l[0],l[1]),a=0,u=2;u<l.length;u+=2)a+=kf(l[u-2],l[u-1],l[u],l[u+1],n,r)||0;else(e==="circle"||e==="ellipse")&&(f=g/2*n,h=m/2*r,a=Math.PI*(3*(f+h)-Xo((3*f+h)*(f+3*h))));return a||0},Vf=function(t,e){if(t=Ah(t)[0],!t)return[0,0];e||(e=qo(t)+1);var i=al.getComputedStyle(t),n=i.strokeDasharray||"",r=Fn(i.strokeDashoffset),a=n.indexOf(",");return a<0&&(a=n.indexOf(" ")),n=a<0?e:Fn(n.substr(0,a)),n>e&&(n=e),[-r||0,n-r||0]},Gf=function(){tm()&&(al=window,Q0=dn=em(),Ah=dn.utils.toArray,uu=dn.core.getStyleSaver,j0=dn.core.reverting||function(){},J0=((al.navigator||{}).userAgent||"").indexOf("Edge")!==-1)},nm={version:"3.15.0",name:"drawSVG",register:function(t){dn=t,Gf()},init:function(t,e,i,n,r){if(!t.getBBox)return!1;Q0||Gf();var a=qo(t),o,l,c;return this.styles=uu&&uu(t,"strokeDashoffset,strokeDasharray,strokeMiterlimit"),this.tween=i,this._style=t.style,this._target=t,e+""=="true"?e="0 100%":e?(e+"").indexOf(" ")===-1&&(e="0 "+e):e="0 0",o=Vf(t,a),l=jv(e,a,o[0]),this._length=Ss(a),this._dash=Ss(o[1]-o[0]),this._offset=Ss(-o[0]),this._dashPT=this.add(this,"_dash",this._dash,Ss(l[1]-l[0]),0,0,0,0,0,1),this._offsetPT=this.add(this,"_offset",this._offset,Ss(-l[0]),0,0,0,0,0,1),J0&&(c=al.getComputedStyle(t),c.strokeLinecap!==c.strokeLinejoin&&(l=Fn(c.strokeMiterlimit),this.add(t.style,"strokeMiterlimit",l,l+.01))),this._live=im(t)||~(e+"").indexOf("live"),this._nowrap=~(e+"").indexOf("nowrap"),this._props.push("drawSVG"),Qv},render:function(t,e){if(e.tween._time||!j0()){var i=e._pt,n=e._style,r,a,o,l;if(i){for(e._live&&(r=qo(e._target),r!==e._length&&(a=r/e._length,e._length=r,e._offsetPT&&(e._offsetPT.s*=a,e._offsetPT.c*=a),e._dashPT?(e._dashPT.s*=a,e._dashPT.c*=a):e._dash*=a));i;)i.r(t,i.d),i=i._next;o=e._dash||t&&t!==1&&1e-4||0,r=e._length-o+.1,l=e._offset,o&&l&&o+Math.abs(l%e._length)>e._length-.05&&(l+=l<0?.005:-.005)&&(r+=.005),n.strokeDashoffset=o?l:l+.001,n.strokeDasharray=r<.1?"none":o?o+"px,"+(e._nowrap?999999:r)+"px":"0px, 999999px"}}else e.styles.revert()},getLength:qo,getPosition:Vf};em()&&dn.registerPlugin(nm);const t_=""+new URL("unbounded-variable-D5afBTBx.woff2",import.meta.url).href,e_=""+new URL("martian-mono-variable-1TqSgyfh.woff2",import.meta.url).href,i_=""+new URL("instrument-sans-variable-BbzFLZTg.woff2",import.meta.url).href,sm="Unbounded Variable",Hf=[{family:sm,url:t_,descriptors:{weight:"200 900",display:"swap"}},{family:"Martian Mono Variable",url:e_,descriptors:{weight:"100 800",stretch:"75% 112.5%",display:"swap"}},{family:"Instrument Sans Variable",url:i_,descriptors:{weight:"400 700",display:"swap"}}];function n_(s=2500){const t=Hf.length,e=Hf.map(({family:r,url:a,descriptors:o})=>{const l=new FontFace(r,`url(${a}) format("woff2")`,o);return document.fonts.add(l),l.load()}),i=Promise.allSettled(e).then(r=>({loaded:r.filter(a=>a.status==="fulfilled").length,total:t})),n=new Promise(r=>setTimeout(()=>r({loaded:0,total:t}),s));return Promise.race([i,n])}function Rt(s,t,e){return Math.min(e,Math.max(t,s))}function pn(s,t,e){return s+(t-s)*e}function Ye(s,t,e,i){return pn(s,t,1-Math.exp(-e*i))}function rm(s,t,e){const i=e-t;return i<=0?t:t+((s-t)%i+i)%i}function s_(s,t){const e=s*180/Math.PI,i=rm(t,-Math.PI,Math.PI)*180/Math.PI,n=`${Math.abs(e).toFixed(1).padStart(4,"0")}°${e<0?"S":"N"}`,r=`${Math.abs(i).toFixed(1).padStart(5,"0")}°${i<0?"W":"E"}`;return`${n} ${r}`}const r_=[[1,"1:1"],[5/4,"5:4"],[4/3,"4:3"],[3/2,"3:2"],[16/10,"16:10"],[16/9,"16:9"],[2,"2:1"],[21/9,"21:9"]];function a_(s,t){if(s<=0||t<=0)return"—";const e=t>s,i=e?t/s:s/t;for(const[n,r]of r_)if(Math.abs(i-n)/n<.012){if(!e)return r;const[a,o]=r.split(":");return`${o}:${a}`}return e?`1:${i.toFixed(2)}`:`${i.toFixed(2)}:1`}function hi(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function _r(s,t){return String(s).padStart(Math.max(2,String(t).length),"0")}const ql=[1/0,1.4,1.15],o_=40,l_=55,c_=2.5,u_=8,h_=12,f_=.5;class d_{constructor(t,{enabled:e=!0}={}){P(this,"level",0);P(this,"frames",0);P(this,"windowStart",0);P(this,"slowFor",0);P(this,"fastFor",0);P(this,"lastRaise",-1/0);P(this,"ceiling",0);this.stage=t,this.enabled=e}get pixelRatio(){return this.stage.pixelRatio}get usableSteps(){let t=1;for(;t<ql.length&&ql[t]<this.stage.maxPixelRatio;)t++;return t}update(){if(!this.enabled)return;const t=performance.now()/1e3;this.windowStart===0&&(this.windowStart=t),this.frames++;const e=t-this.windowStart;if(e<f_)return;const i=this.frames/e;this.frames=0,this.windowStart=t,!(e>1.5)&&(this.slowFor=i<o_?this.slowFor+e:0,this.fastFor=i>l_?this.fastFor+e:0,this.slowFor>=c_&&this.level<this.usableSteps-1?(t-this.lastRaise<h_&&(this.ceiling=this.level+1),this.setLevel(this.level+1)):this.fastFor>=u_&&this.level>this.ceiling&&(this.lastRaise=t,this.setLevel(this.level-1)))}setLevel(t){this.level=t,this.slowFor=this.fastFor=0,this.stage.setPixelRatioCap(ql[t])}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ch="186",p_=0,Wf=1,m_=2,Yo=1,g_=2,ia=3,Ps=0,ti=1,Yi=2,Nn=0,ua=1,Ke=2,Xf=3,qf=4,v_=5,lr=100,__=101,x_=102,y_=103,M_=104,S_=200,b_=201,w_=202,E_=203,am=204,om=205,T_=206,D_=207,A_=208,C_=209,P_=210,R_=211,L_=212,F_=213,I_=214,hu=0,fu=1,du=2,Ca=3,pu=4,mu=5,gu=6,vu=7,lm=0,N_=1,U_=2,vn=0,cm=1,um=2,hm=3,fm=4,dm=5,pm=6,mm=7,gm=300,Rs=301,Tr=302,Yl=303,$l=304,Tl=306,ol=1e3,Ki=1001,_u=1002,Qe=1003,O_=1004,Ja=1005,Oe=1006,Kl=1007,mn=1008,Ei=1009,vm=1010,_m=1011,Pa=1012,Ph=1013,yn=1014,Zi=1015,Mn=1016,Rh=1017,Lh=1018,Ra=1020,xm=35902,ym=35899,Mm=1021,Sm=1022,Ji=1023,kn=1026,Es=1027,Fh=1028,Ih=1029,Ls=1030,Nh=1031,Uh=1033,$o=33776,Ko=33777,Zo=33778,Jo=33779,xu=35840,yu=35841,Mu=35842,Su=35843,bu=36196,wu=37492,Eu=37496,Tu=37488,Du=37489,ll=37490,Au=37491,Cu=37808,Pu=37809,Ru=37810,Lu=37811,Fu=37812,Iu=37813,Nu=37814,Uu=37815,Ou=37816,Bu=37817,ku=37818,zu=37819,Vu=37820,Gu=37821,Hu=36492,Wu=36494,Xu=36495,qu=36283,Yu=36284,cl=36285,$u=36286,B_=3200,Ku=0,k_=1,Zn="",$e="srgb",La="srgb-linear",ul="linear",me="srgb",Zl=7680,z_=519,V_=512,G_=513,H_=514,Oh=515,W_=516,X_=517,Bh=518,q_=519,bm=35044,Y_=35048,Yf="300 es",gn=2e3,Fa=2001;function $_(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function hl(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function K_(){const s=hl("canvas");return s.style.display="block",s}const $f={};function fl(...s){const t="THREE."+s.shift();console.log(t,...s)}function wm(s){const t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Yt(...s){s=wm(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function se(...s){s=wm(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function xr(...s){const t=s.join(" ");t in $f||($f[t]=!0,Yt(...s))}function Z_(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const J_={[hu]:fu,[du]:gu,[pu]:vu,[Ca]:mu,[fu]:hu,[gu]:du,[vu]:pu,[mu]:Ca};class Ns{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const n=i[t];if(n!==void 0){const r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}}const ni=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Kf=1234567;const ha=Math.PI/180,Ia=180/Math.PI;function _n(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ni[s&255]+ni[s>>8&255]+ni[s>>16&255]+ni[s>>24&255]+"-"+ni[t&255]+ni[t>>8&255]+"-"+ni[t>>16&15|64]+ni[t>>24&255]+"-"+ni[e&63|128]+ni[e>>8&255]+"-"+ni[e>>16&255]+ni[e>>24&255]+ni[i&255]+ni[i>>8&255]+ni[i>>16&255]+ni[i>>24&255]).toLowerCase()}function te(s,t,e){return Math.max(t,Math.min(e,s))}function kh(s,t){return(s%t+t)%t}function Q_(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function j_(s,t,e){return s!==t?(e-s)/(t-s):0}function fa(s,t,e){return(1-e)*s+e*t}function tx(s,t,e,i){return fa(s,t,1-Math.exp(-e*i))}function ex(s,t=1){return t-Math.abs(kh(s,t*2)-t)}function ix(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function nx(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function sx(s,t){return s+Math.floor(Math.random()*(t-s+1))}function rx(s,t){return s+Math.random()*(t-s)}function ax(s){return s*(.5-Math.random())}function ox(s){s!==void 0&&(Kf=s);let t=Kf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function lx(s){return s*ha}function cx(s){return s*Ia}function ux(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function hx(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function fx(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function dx(s,t,e,i,n){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),u=a((t+i)/2),f=r((t-i)/2),h=a((t-i)/2),d=r((i-t)/2),p=a((i-t)/2);switch(n){case"XYX":s.set(o*u,l*f,l*h,o*c);break;case"YZY":s.set(l*h,o*u,l*f,o*c);break;case"ZXZ":s.set(l*f,l*h,o*u,o*c);break;case"XZX":s.set(o*u,l*p,l*d,o*c);break;case"YXY":s.set(l*d,o*u,l*p,o*c);break;case"ZYZ":s.set(l*p,l*d,o*u,o*c);break;default:Yt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function $i(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ge(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ts={DEG2RAD:ha,RAD2DEG:Ia,generateUUID:_n,clamp:te,euclideanModulo:kh,mapLinear:Q_,inverseLerp:j_,lerp:fa,damp:tx,pingpong:ex,smoothstep:ix,smootherstep:nx,randInt:sx,randFloat:rx,randFloatSpread:ax,seededRandom:ox,degToRad:lx,radToDeg:cx,isPowerOfTwo:ux,ceilPowerOfTwo:hx,floorPowerOfTwo:fx,setQuaternionFromProperEuler:dx,normalize:ge,denormalize:$i},jh=class jh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};jh.prototype.isVector2=!0;let lt=jh;class Ri{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let l=i[n+0],c=i[n+1],u=i[n+2],f=i[n+3],h=r[a+0],d=r[a+1],p=r[a+2],v=r[a+3];if(f!==v||l!==h||c!==d||u!==p){let g=l*h+c*d+u*p+f*v;g<0&&(h=-h,d=-d,p=-p,v=-v,g=-g);let m=1-o;if(g<.9995){const M=Math.acos(g),b=Math.sin(M);m=Math.sin(m*M)/b,o=Math.sin(o*M)/b,l=l*m+h*o,c=c*m+d*o,u=u*m+p*o,f=f*m+v*o}else{l=l*m+h*o,c=c*m+d*o,u=u*m+p*o,f=f*m+v*o;const M=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=M,c*=M,u*=M,f*=M}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,n,r,a){const o=i[n],l=i[n+1],c=i[n+2],u=i[n+3],f=r[a],h=r[a+1],d=r[a+2],p=r[a+3];return t[e]=o*p+u*f+l*d-c*h,t[e+1]=l*p+u*h+c*f-o*d,t[e+2]=c*p+u*d+o*h-l*f,t[e+3]=u*p-o*f-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(n/2),f=o(r/2),h=l(i/2),d=l(n/2),p=l(r/2);switch(a){case"XYZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"YXZ":this._x=h*u*f+c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"ZXY":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f-h*d*p;break;case"ZYX":this._x=h*u*f-c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f+h*d*p;break;case"YZX":this._x=h*u*f+c*d*p,this._y=c*d*f+h*u*p,this._z=c*u*p-h*d*f,this._w=c*u*f-h*d*p;break;case"XZY":this._x=h*u*f-c*d*p,this._y=c*d*f-h*u*p,this._z=c*u*p+h*d*f,this._w=c*u*f+h*d*p;break;default:Yt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+o+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(a-n)*d}else if(i>o&&i>f){const d=2*Math.sqrt(1+i-o-f);this._w=(u-l)/d,this._x=.25*d,this._y=(n+a)/d,this._z=(r+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-i-f);this._w=(r-c)/d,this._x=(n+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-o);this._w=(a-n)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+n*c-r*l,this._y=n*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-n*o,this._w=a*u-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,n=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const tf=class tf{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*n-o*i),u=2*(o*e-r*n),f=2*(r*i-a*e);return this.x=e+l*c+a*f-o*u,this.y=i+l*u+o*c-r*f,this.z=n+l*f+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Jl.copy(this).projectOnVector(t),this.sub(Jl)}reflect(t){return this.sub(Jl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};tf.prototype.isVector3=!0;let A=tf;const Jl=new A,Zf=new Ri,ef=class ef{constructor(t,e,i,n,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c)}set(t,e,i,n,r,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=n,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],p=i[8],v=n[0],g=n[3],m=n[6],M=n[1],b=n[4],_=n[7],S=n[2],y=n[5],T=n[8];return r[0]=a*v+o*M+l*S,r[3]=a*g+o*b+l*y,r[6]=a*m+o*_+l*T,r[1]=c*v+u*M+f*S,r[4]=c*g+u*b+f*y,r[7]=c*m+u*_+f*T,r[2]=h*v+d*M+p*S,r[5]=h*g+d*b+p*y,r[8]=h*m+d*_+p*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*r*u+i*o*l+n*r*c-n*a*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=u*a-o*c,h=o*l-u*r,d=c*r-a*l,p=e*f+i*h+n*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=f*v,t[1]=(n*c-u*i)*v,t[2]=(o*i-n*a)*v,t[3]=h*v,t[4]=(u*e-n*l)*v,t[5]=(n*r-o*e)*v,t[6]=d*v,t[7]=(i*l-c*e)*v,t[8]=(a*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-n*c,n*l,-n*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return xr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ql.makeScale(t,e)),this}rotate(t){return xr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ql.makeRotation(-t)),this}translate(t,e){return xr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ql.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};ef.prototype.isMatrix3=!0;let $t=ef;const Ql=new $t,Jf=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qf=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function px(){const s={enabled:!0,workingColorSpace:La,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===me&&(n.r=Un(n.r),n.g=Un(n.g),n.b=Un(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===me&&(n.r=yr(n.r),n.g=yr(n.g),n.b=yr(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Zn?ul:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[La]:{primaries:t,whitePoint:i,transfer:ul,toXYZ:Jf,fromXYZ:Qf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:t,whitePoint:i,transfer:me,toXYZ:Jf,fromXYZ:Qf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}}),s}const re=px();function Un(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function yr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let zs;class mx{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{zs===void 0&&(zs=hl("canvas")),zs.width=t.width,zs.height=t.height;const n=zs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=zs}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=hl("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Un(e[i]/255)*255):e[i]=Un(e[i]);return{data:e,width:t.width,height:t.height}}else return Yt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gx=0;class zh{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:gx++}),this.uuid=_n(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(jl(n[a].image)):r.push(jl(n[a]))}else r=jl(n);i.url=r}return e||(t.images[this.uuid]=i),i}}function jl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?mx.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Yt("Texture: Unable to serialize Texture."),{})}let vx=0;const tc=new A;class ei extends Ns{constructor(t=ei.DEFAULT_IMAGE,e=ei.DEFAULT_MAPPING,i=Ki,n=Ki,r=Oe,a=mn,o=Ji,l=Ei,c=ei.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vx++}),this.uuid=_n(),this.name="",this.source=new zh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(tc).x}get height(){return this.source.getSize(tc).y}get depth(){return this.source.getSize(tc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Yt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Yt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ol:t.x=t.x-Math.floor(t.x);break;case Ki:t.x=t.x<0?0:1;break;case _u:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ol:t.y=t.y-Math.floor(t.y);break;case Ki:t.y=t.y<0?0:1;break;case _u:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ei.DEFAULT_IMAGE=null;ei.DEFAULT_MAPPING=gm;ei.DEFAULT_ANISOTROPY=1;const nf=class nf{constructor(t=0,e=0,i=0,n=1){this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,_=(d+1)/2,S=(m+1)/2,y=(u+h)/4,T=(f+v)/4,x=(p+g)/4;return b>_&&b>S?b<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(b),n=y/i,r=T/i):_>S?_<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(_),i=y/n,r=x/n):S<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(S),i=T/r,n=x/r),this.set(i,n,r,e),this}let M=Math.sqrt((g-p)*(g-p)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(f-v)/M,this.z=(h-u)/M,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};nf.prototype.isVector4=!0;let De=nf;class _x extends Ns{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Oe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new De(0,0,t,e),this.scissorTest=!1,this.viewport=new De(0,0,t,e),this.textures=[];const n={width:t,height:e,depth:i.depth},r=new ei(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Oe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const n=Object.assign({},t.textures[e].image);this.textures[e].source=new zh(n)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zi extends _x{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Em extends ei{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class xx extends ei{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Ml=class Ml{constructor(t,e,i,n,r,a,o,l,c,u,f,h,d,p,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c,u,f,h,d,p,v,g)}set(t,e,i,n,r,a,o,l,c,u,f,h,d,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=n,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ml().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,n=1/Vs.setFromMatrixColumn(t,0).length(),r=1/Vs.setFromMatrixColumn(t,1).length(),a=1/Vs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=a*u,d=a*f,p=o*u,v=o*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+p*c,e[5]=h-v*c,e[9]=-o*l,e[2]=v-h*c,e[6]=p+d*c,e[10]=a*l}else if(t.order==="YXZ"){const h=l*u,d=l*f,p=c*u,v=c*f;e[0]=h+v*o,e[4]=p*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=d*o-p,e[6]=v+h*o,e[10]=a*l}else if(t.order==="ZXY"){const h=l*u,d=l*f,p=c*u,v=c*f;e[0]=h-v*o,e[4]=-a*f,e[8]=p+d*o,e[1]=d+p*o,e[5]=a*u,e[9]=v-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const h=a*u,d=a*f,p=o*u,v=o*f;e[0]=l*u,e[4]=p*c-d,e[8]=h*c+v,e[1]=l*f,e[5]=v*c+h,e[9]=d*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const h=a*l,d=a*c,p=o*l,v=o*c;e[0]=l*u,e[4]=v-h*f,e[8]=p*f+d,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=d*f+p,e[10]=h-v*f}else if(t.order==="XZY"){const h=a*l,d=a*c,p=o*l,v=o*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+v,e[5]=a*u,e[9]=d*f-p,e[2]=p*f-d,e[6]=o*u,e[10]=v*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(yx,t,Mx)}lookAt(t,e,i){const n=this.elements;return _i.subVectors(t,e),_i.lengthSq()===0&&(_i.z=1),_i.normalize(),Wn.crossVectors(i,_i),Wn.lengthSq()===0&&(Math.abs(i.z)===1?_i.x+=1e-4:_i.z+=1e-4,_i.normalize(),Wn.crossVectors(i,_i)),Wn.normalize(),Qa.crossVectors(_i,Wn),n[0]=Wn.x,n[4]=Qa.x,n[8]=_i.x,n[1]=Wn.y,n[5]=Qa.y,n[9]=_i.y,n[2]=Wn.z,n[6]=Qa.z,n[10]=_i.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],p=i[2],v=i[6],g=i[10],m=i[14],M=i[3],b=i[7],_=i[11],S=i[15],y=n[0],T=n[4],x=n[8],E=n[12],C=n[1],F=n[5],I=n[9],O=n[13],L=n[2],U=n[6],V=n[10],H=n[14],K=n[3],Y=n[7],Q=n[11],j=n[15];return r[0]=a*y+o*C+l*L+c*K,r[4]=a*T+o*F+l*U+c*Y,r[8]=a*x+o*I+l*V+c*Q,r[12]=a*E+o*O+l*H+c*j,r[1]=u*y+f*C+h*L+d*K,r[5]=u*T+f*F+h*U+d*Y,r[9]=u*x+f*I+h*V+d*Q,r[13]=u*E+f*O+h*H+d*j,r[2]=p*y+v*C+g*L+m*K,r[6]=p*T+v*F+g*U+m*Y,r[10]=p*x+v*I+g*V+m*Q,r[14]=p*E+v*O+g*H+m*j,r[3]=M*y+b*C+_*L+S*K,r[7]=M*T+b*F+_*U+S*Y,r[11]=M*x+b*I+_*V+S*Q,r[15]=M*E+b*O+_*H+S*j,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],d=t[14],p=t[3],v=t[7],g=t[11],m=t[15],M=l*d-c*h,b=o*d-c*f,_=o*h-l*f,S=a*d-c*u,y=a*h-l*u,T=a*f-o*u;return e*(v*M-g*b+m*_)-i*(p*M-g*S+m*y)+n*(p*b-v*S+m*T)-r*(p*_-v*y+g*T)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],n=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-i*(r*u-o*l)+n*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],d=t[11],p=t[12],v=t[13],g=t[14],m=t[15],M=e*o-i*a,b=e*l-n*a,_=e*c-r*a,S=i*l-n*o,y=i*c-r*o,T=n*c-r*l,x=u*v-f*p,E=u*g-h*p,C=u*m-d*p,F=f*g-h*v,I=f*m-d*v,O=h*m-d*g,L=M*O-b*I+_*F+S*C-y*E+T*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/L;return t[0]=(o*O-l*I+c*F)*U,t[1]=(n*I-i*O-r*F)*U,t[2]=(v*T-g*y+m*S)*U,t[3]=(h*y-f*T-d*S)*U,t[4]=(l*C-a*O-c*E)*U,t[5]=(e*O-n*C+r*E)*U,t[6]=(g*_-p*T-m*b)*U,t[7]=(u*T-h*_+d*b)*U,t[8]=(a*I-o*C+c*x)*U,t[9]=(i*C-e*I-r*x)*U,t[10]=(p*y-v*_+m*M)*U,t[11]=(f*_-u*y-d*M)*U,t[12]=(o*E-a*F-l*x)*U,t[13]=(e*F-i*E+n*x)*U,t[14]=(v*b-p*S-g*M)*U,t[15]=(u*S-f*b+h*M)*U,this}scale(t){const e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,u*o+i,u*l-n*a,0,c*l-n*o,u*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,f=o+o,h=r*c,d=r*u,p=r*f,v=a*u,g=a*f,m=o*f,M=l*c,b=l*u,_=l*f,S=i.x,y=i.y,T=i.z;return n[0]=(1-(v+m))*S,n[1]=(d+_)*S,n[2]=(p-b)*S,n[3]=0,n[4]=(d-_)*y,n[5]=(1-(h+m))*y,n[6]=(g+M)*y,n[7]=0,n[8]=(p+b)*T,n[9]=(g-M)*T,n[10]=(1-(h+v))*T,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;t.x=n[12],t.y=n[13],t.z=n[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Vs.set(n[0],n[1],n[2]).length();const o=Vs.set(n[4],n[5],n[6]).length(),l=Vs.set(n[8],n[9],n[10]).length();r<0&&(a=-a),Hi.copy(this);const c=1/a,u=1/o,f=1/l;return Hi.elements[0]*=c,Hi.elements[1]*=c,Hi.elements[2]*=c,Hi.elements[4]*=u,Hi.elements[5]*=u,Hi.elements[6]*=u,Hi.elements[8]*=f,Hi.elements[9]*=f,Hi.elements[10]*=f,e.setFromRotationMatrix(Hi),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,n,r,a,o=gn,l=!1){const c=this.elements,u=2*r/(e-t),f=2*r/(i-n),h=(e+t)/(e-t),d=(i+n)/(i-n);let p,v;if(l)p=r/(a-r),v=a*r/(a-r);else if(o===gn)p=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Fa)p=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=gn,l=!1){const c=this.elements,u=2/(e-t),f=2/(i-n),h=-(e+t)/(e-t),d=-(i+n)/(i-n);let p,v;if(l)p=1/(a-r),v=a/(a-r);else if(o===gn)p=-2/(a-r),v=-(a+r)/(a-r);else if(o===Fa)p=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Ml.prototype.isMatrix4=!0;let le=Ml;const Vs=new A,Hi=new le,yx=new A(0,0,0),Mx=new A(1,1,1),Wn=new A,Qa=new A,_i=new A,jf=new le,td=new Ri;class Vi{constructor(t=0,e=0,i=0,n=Vi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],u=n[9],f=n[2],h=n[6],d=n[10];switch(e){case"XYZ":this._y=Math.asin(te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-te(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Yt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return jf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jf,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return td.setFromEuler(this),this.setFromQuaternion(td,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vi.DEFAULT_ORDER="XYZ";class Vh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Sx=0;const ed=new A,Gs=new Ri,bn=new le,ja=new A,Fr=new A,bx=new A,wx=new Ri,id=new A(1,0,0),nd=new A(0,1,0),sd=new A(0,0,1),rd={type:"added"},Ex={type:"removed"},Hs={type:"childadded",child:null},ec={type:"childremoved",child:null};class Ve extends Ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=_n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ve.DEFAULT_UP.clone();const t=new A,e=new Vi,i=new Ri,n=new A(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new le},normalMatrix:{value:new $t}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=Ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gs.setFromAxisAngle(t,e),this.quaternion.multiply(Gs),this}rotateOnWorldAxis(t,e){return Gs.setFromAxisAngle(t,e),this.quaternion.premultiply(Gs),this}rotateX(t){return this.rotateOnAxis(id,t)}rotateY(t){return this.rotateOnAxis(nd,t)}rotateZ(t){return this.rotateOnAxis(sd,t)}translateOnAxis(t,e){return ed.copy(t).applyQuaternion(this.quaternion),this.position.add(ed.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(id,t)}translateY(t){return this.translateOnAxis(nd,t)}translateZ(t){return this.translateOnAxis(sd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ja.copy(t):ja.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(Fr,ja,this.up):bn.lookAt(ja,Fr,this.up),this.quaternion.setFromRotationMatrix(bn),n&&(bn.extractRotation(n.matrixWorld),Gs.setFromRotationMatrix(bn),this.quaternion.premultiply(Gs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(se("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(rd),Hs.child=t,this.dispatchEvent(Hs),Hs.child=null):se("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ex),ec.child=t,this.dispatchEvent(ec),ec.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(rd),Hs.child=t,this.dispatchEvent(Hs),Hs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,t,bx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,wx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,n=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*n,r[13]+=i-r[1]*e-r[5]*i-r[9]*n,r[14]+=n-r[2]*e-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,n.name=this.name,n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.visible=this.visible,n.frustumCulled=this.frustumCulled,n.renderOrder=this.renderOrder,n.static=this.static,n.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),d=a(t.animations),p=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),p.length>0&&(i.nodes=p)}return i.object=n,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ve.DEFAULT_UP=new A(0,1,0);Ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ee extends Ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tx={type:"move"};class ic{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,i),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,p=.005;c.inputState.pinching&&h>d+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Tx)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Ee;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Tm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},to={h:0,s:0,l:0};function nc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Ct{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=re.workingColorSpace){return this.r=t,this.g=e,this.b=i,re.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=re.workingColorSpace){if(t=kh(t,1),e=te(e,0,1),i=te(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=nc(a,r,t+1/3),this.g=nc(a,r,t),this.b=nc(a,r,t-1/3)}return re.colorSpaceToWorking(this,n),this}setStyle(t,e=$e){function i(r){r!==void 0&&parseFloat(r)<1&&Yt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Yt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Yt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const i=Tm[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Yt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=yr(t.r),this.g=yr(t.g),this.b=yr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return re.workingToColorSpace(si.copy(this),t),Math.round(te(si.r*255,0,255))*65536+Math.round(te(si.g*255,0,255))*256+Math.round(te(si.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.workingToColorSpace(si.copy(this),e);const i=si.r,n=si.g,r=si.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(n-r)/f+(n<r?6:0);break;case n:l=(r-i)/f+2;break;case r:l=(i-n)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=re.workingColorSpace){return re.workingToColorSpace(si.copy(this),e),t.r=si.r,t.g=si.g,t.b=si.b,t}getStyle(t=$e){re.workingToColorSpace(si.copy(this),t);const e=si.r,i=si.g,n=si.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Xn),this.setHSL(Xn.h+t,Xn.s+e,Xn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Xn),t.getHSL(to);const i=fa(Xn.h,to.h,e),n=fa(Xn.s,to.s,e),r=fa(Xn.l,to.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const si=new Ct;Ct.NAMES=Tm;class Zu extends Ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vi,this.environmentIntensity=1,this.environmentRotation=new Vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Wi=new A,wn=new A,sc=new A,En=new A,Ws=new A,Xs=new A,ad=new A,rc=new A,ac=new A,oc=new A,lc=new De,cc=new De,uc=new De;class Ui{constructor(t=new A,e=new A,i=new A){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),Wi.subVectors(t,e),n.cross(Wi);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){Wi.subVectors(n,e),wn.subVectors(i,e),sc.subVectors(t,e);const a=Wi.dot(Wi),o=Wi.dot(wn),l=Wi.dot(sc),c=wn.dot(wn),u=wn.dot(sc),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(c*l-o*u)*h,p=(a*u-o*l)*h;return r.set(1-d-p,p,d)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(t,e,i,n,r,a,o,l){return this.getBarycoord(t,e,i,n,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,En.x),l.addScaledVector(a,En.y),l.addScaledVector(o,En.z),l)}static getInterpolatedAttribute(t,e,i,n,r,a){return lc.setScalar(0),cc.setScalar(0),uc.setScalar(0),lc.fromBufferAttribute(t,e),cc.fromBufferAttribute(t,i),uc.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(lc,r.x),a.addScaledVector(cc,r.y),a.addScaledVector(uc,r.z),a}static isFrontFacing(t,e,i,n){return Wi.subVectors(i,e),wn.subVectors(t,e),Wi.cross(wn).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wi.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),Wi.cross(wn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ui.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ui.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return Ui.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return Ui.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ui.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,r=this.c;let a,o;Ws.subVectors(n,i),Xs.subVectors(r,i),rc.subVectors(t,i);const l=Ws.dot(rc),c=Xs.dot(rc);if(l<=0&&c<=0)return e.copy(i);ac.subVectors(t,n);const u=Ws.dot(ac),f=Xs.dot(ac);if(u>=0&&f<=u)return e.copy(n);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(i).addScaledVector(Ws,a);oc.subVectors(t,r);const d=Ws.dot(oc),p=Xs.dot(oc);if(p>=0&&d<=p)return e.copy(r);const v=d*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(i).addScaledVector(Xs,o);const g=u*p-d*f;if(g<=0&&f-u>=0&&d-p>=0)return ad.subVectors(r,n),o=(f-u)/(f-u+(d-p)),e.copy(n).addScaledVector(ad,o);const m=1/(g+v+h);return a=v*m,o=h*m,e.copy(i).addScaledVector(Ws,a).addScaledVector(Xs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Us{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Xi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Xi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Xi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Xi):Xi.fromBufferAttribute(r,a),Xi.applyMatrix4(t.matrixWorld),this.expandByPoint(Xi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),eo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),eo.copy(i.boundingBox)),eo.applyMatrix4(t.matrixWorld),this.union(eo)}const n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Xi),Xi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ir),io.subVectors(this.max,Ir),qs.subVectors(t.a,Ir),Ys.subVectors(t.b,Ir),$s.subVectors(t.c,Ir),qn.subVectors(Ys,qs),Yn.subVectors($s,Ys),ps.subVectors(qs,$s);let e=[0,-qn.z,qn.y,0,-Yn.z,Yn.y,0,-ps.z,ps.y,qn.z,0,-qn.x,Yn.z,0,-Yn.x,ps.z,0,-ps.x,-qn.y,qn.x,0,-Yn.y,Yn.x,0,-ps.y,ps.x,0];return!hc(e,qs,Ys,$s,io)||(e=[1,0,0,0,1,0,0,0,1],!hc(e,qs,Ys,$s,io))?!1:(no.crossVectors(qn,Yn),e=[no.x,no.y,no.z],hc(e,qs,Ys,$s,io))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Xi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Tn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Tn=[new A,new A,new A,new A,new A,new A,new A,new A],Xi=new A,eo=new Us,qs=new A,Ys=new A,$s=new A,qn=new A,Yn=new A,ps=new A,Ir=new A,io=new A,no=new A,ms=new A;function hc(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){ms.fromArray(s,r);const o=n.x*Math.abs(ms.x)+n.y*Math.abs(ms.y)+n.z*Math.abs(ms.z),l=t.dot(ms),c=e.dot(ms),u=i.dot(ms);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const ke=new A,so=new lt;let Dx=0;class Wt extends Ns{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=bm,this.updateRanges=[],this.gpuType=Zi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)so.fromBufferAttribute(this,e),so.applyMatrix3(t),this.setXY(e,so.x,so.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix3(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=$i(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ge(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=$i(e,this.array)),e}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=$i(e,this.array)),e}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=$i(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=$i(e,this.array)),e}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),n=ge(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),n=ge(n,this.array),r=ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Dm extends Wt{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Am extends Wt{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class ie extends Wt{constructor(t,e,i){super(new Float32Array(t),e,i)}}const Ax=new Us,Nr=new A,fc=new A;class zn{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Ax.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Nr.subVectors(t,this.center);const e=Nr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(Nr,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Nr.copy(t.center).add(fc)),this.expandByPoint(Nr.copy(t.center).sub(fc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Cx=0;const Fi=new le,dc=new Ve,Ks=new A,xi=new Us,Ur=new Us,Xe=new A;class ce extends Ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cx++}),this.uuid=_n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new($_(t)?Am:Dm)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Fi.makeRotationFromQuaternion(t),this.applyMatrix4(Fi),this}rotateX(t){return Fi.makeRotationX(t),this.applyMatrix4(Fi),this}rotateY(t){return Fi.makeRotationY(t),this.applyMatrix4(Fi),this}rotateZ(t){return Fi.makeRotationZ(t),this.applyMatrix4(Fi),this}translate(t,e,i){return Fi.makeTranslation(t,e,i),this.applyMatrix4(Fi),this}scale(t,e,i){return Fi.makeScale(t,e,i),this.applyMatrix4(Fi),this}lookAt(t){return dc.lookAt(t),dc.updateMatrix(),this.applyMatrix4(dc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,r=t.length;n<r;n++){const a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ie(i,3))}else{const i=Math.min(t.length,e.count);for(let n=0;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Yt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Us);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const r=e[i];xi.setFromBufferAttribute(r),this.morphTargetsRelative?(Xe.addVectors(this.boundingBox.min,xi.min),this.boundingBox.expandByPoint(Xe),Xe.addVectors(this.boundingBox.max,xi.max),this.boundingBox.expandByPoint(Xe)):(this.boundingBox.expandByPoint(xi.min),this.boundingBox.expandByPoint(xi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const i=this.boundingSphere.center;if(xi.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Ur.setFromBufferAttribute(o),this.morphTargetsRelative?(Xe.addVectors(xi.min,Ur.min),xi.expandByPoint(Xe),Xe.addVectors(xi.max,Ur.max),xi.expandByPoint(Xe)):(xi.expandByPoint(Ur.min),xi.expandByPoint(Ur.max))}xi.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)Xe.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(Xe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Xe.fromBufferAttribute(o,c),l&&(Ks.fromBufferAttribute(t,c),Xe.add(Ks)),n=Math.max(n,i.distanceToSquared(Xe))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Wt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new A,l[x]=new A;const c=new A,u=new A,f=new A,h=new lt,d=new lt,p=new lt,v=new A,g=new A;function m(x,E,C){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,E),f.fromBufferAttribute(i,C),h.fromBufferAttribute(r,x),d.fromBufferAttribute(r,E),p.fromBufferAttribute(r,C),u.sub(c),f.sub(c),d.sub(h),p.sub(h);const F=1/(d.x*p.y-p.x*d.y);isFinite(F)&&(v.copy(u).multiplyScalar(p.y).addScaledVector(f,-d.y).multiplyScalar(F),g.copy(f).multiplyScalar(d.x).addScaledVector(u,-p.x).multiplyScalar(F),o[x].add(v),o[E].add(v),o[C].add(v),l[x].add(g),l[E].add(g),l[C].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let x=0,E=M.length;x<E;++x){const C=M[x],F=C.start,I=C.count;for(let O=F,L=F+I;O<L;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const b=new A,_=new A,S=new A,y=new A;function T(x){S.fromBufferAttribute(n,x),y.copy(S);const E=o[x];b.copy(E),b.sub(S.multiplyScalar(S.dot(E))).normalize(),_.crossVectors(y,E);const F=_.dot(l[x])<0?-1:1;a.setXYZW(x,b.x,b.y,b.z,F)}for(let x=0,E=M.length;x<E;++x){const C=M[x],F=C.start,I=C.count;for(let O=F,L=F+I;O<L;O+=3)T(t.getX(O+0)),T(t.getX(O+1)),T(t.getX(O+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Wt(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const n=new A,r=new A,a=new A,o=new A,l=new A,c=new A,u=new A,f=new A;if(t)for(let h=0,d=t.count;h<d;h+=3){const p=t.getX(h+0),v=t.getX(h+1),g=t.getX(h+2);n.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),u.subVectors(a,r),f.subVectors(n,r),u.cross(f),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)n.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(n,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Xe.fromBufferAttribute(t,e),Xe.normalize(),t.setXYZ(e,Xe.x,Xe.y,Xe.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let d=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*u;for(let m=0;m<u;m++)h[p++]=c[d++]}return new Wt(h,u,f)}if(this.index===null)return Yt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ce,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=t(h,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(n[l]=u,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const n=t.attributes;for(const c in n){const u=n[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Px{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=bm,this.updateRanges=[],this.version=0,this.uuid=_n()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,r=this.stride;n<r;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const ci=new A;class dl{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)ci.fromBufferAttribute(this,e),ci.applyMatrix4(t),this.setXYZ(e,ci.x,ci.y,ci.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ci.fromBufferAttribute(this,e),ci.applyNormalMatrix(t),this.setXYZ(e,ci.x,ci.y,ci.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ci.fromBufferAttribute(this,e),ci.transformDirection(t),this.setXYZ(e,ci.x,ci.y,ci.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=$i(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ge(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ge(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=$i(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=$i(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=$i(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=$i(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),n=ge(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ge(e,this.array),i=ge(i,this.array),n=ge(n,this.array),r=ge(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=r,this}clone(t){if(t===void 0){fl("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return new Wt(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new dl(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){fl("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const pc=new A,Rx=new A,Lx=new $t;class Kn{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=pc.subVectors(i,e).cross(Rx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const n=t.delta(pc),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Lx.getNormalMatrix(t),n=this.coplanarPoint(pc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Fx=0;class cs extends Ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fx++}),this.uuid=_n(),this.name="",this.type="Material",this.blending=ua,this.side=Ps,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=am,this.blendDst=om,this.blendEquation=lr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ct(0,0,0),this.blendAlpha=0,this.depthFunc=Ca,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=z_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zl,this.stencilZFail=Zl,this.stencilZPass=Zl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Yt(`Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Yt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ct().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Kn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new lt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new lt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Cm extends cs{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ct(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Zs;const Or=new A,Js=new A,Qs=new A,js=new lt,Br=new lt,Pm=new le,ro=new A,kr=new A,ao=new A,od=new lt,mc=new lt,ld=new lt;class Ix extends Ve{constructor(t=new Cm){if(super(),this.isSprite=!0,this.type="Sprite",Zs===void 0){Zs=new ce;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Px(e,5);Zs.setIndex([0,1,2,0,2,3]),Zs.setAttribute("position",new dl(i,3,0,!1)),Zs.setAttribute("uv",new dl(i,2,3,!1))}this.geometry=Zs,this.material=t,this.center=new lt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&se('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Js.setFromMatrixScale(this.matrixWorld),Pm.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Qs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Js.multiplyScalar(-Qs.z);const i=this.material.rotation;let n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));const a=this.center;oo(ro.set(-.5,-.5,0),Qs,a,Js,n,r),oo(kr.set(.5,-.5,0),Qs,a,Js,n,r),oo(ao.set(.5,.5,0),Qs,a,Js,n,r),od.set(0,0),mc.set(1,0),ld.set(1,1);let o=t.ray.intersectTriangle(ro,kr,ao,!1,Or);if(o===null&&(oo(kr.set(-.5,.5,0),Qs,a,Js,n,r),mc.set(0,1),o=t.ray.intersectTriangle(ro,ao,kr,!1,Or),o===null))return;const l=t.ray.origin.distanceTo(Or);l<t.near||l>t.far||e.push({distance:l,point:Or.clone(),uv:Ui.getInterpolation(Or,ro,kr,ao,od,mc,ld,new lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function oo(s,t,e,i,n,r){js.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(Br.x=r*js.x-n*js.y,Br.y=n*js.x+r*js.y):Br.copy(js),s.copy(t),s.x+=Br.x,s.y+=Br.y,s.applyMatrix4(Pm)}const Dn=new A,gc=new A,lo=new A,co=new A;class Dl{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){gc.copy(t).add(e).multiplyScalar(.5),lo.copy(e).sub(t).normalize(),co.copy(this.origin).sub(gc);const r=t.distanceTo(e)*.5,a=-this.direction.dot(lo),o=co.dot(this.direction),l=-co.dot(lo),c=co.lengthSq(),u=Math.abs(1-a*a);let f,h,d,p;if(u>0)if(f=a*l-o,h=a*o-l,p=r*u,f>=0)if(h>=-p)if(h<=p){const v=1/u;f*=v,h*=v,d=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;else h<=-p?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c):h<=p?(f=0,h=Math.min(Math.max(-r,-l),r),d=h*(h+2*l)+c):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),n&&n.copy(gc).addScaledVector(lo,h),d}intersectSphere(t,e){if(t.radius<0)return null;Dn.subVectors(t.center,this.origin);const i=Dn.dot(this.direction),n=Dn.dot(Dn)-i*i,r=t.radius*t.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,n=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,n=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),f>=0?(o=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,i,n,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=t.x-a.x,h=t.y-a.y,d=t.z-a.z,p=e.x-a.x,v=e.y-a.y,g=e.z-a.z,m=i.x-a.x,M=i.y-a.y,b=i.z-a.z,_=Math.abs(l),S=Math.abs(c),y=Math.abs(u);let T,x,E,C,F,I,O,L,U,V,H,K;if(_>=S&&_>=y?(E=l,I=f,U=p,K=m,l>=0?(T=c,x=u,C=h,F=d,O=v,L=g,V=M,H=b):(T=u,x=c,C=d,F=h,O=g,L=v,V=b,H=M)):S>=y?(E=c,I=h,U=v,K=M,c>=0?(T=u,x=l,C=d,F=f,O=g,L=p,V=b,H=m):(T=l,x=u,C=f,F=d,O=p,L=g,V=m,H=b)):(E=u,I=d,U=g,K=b,u>=0?(T=l,x=c,C=f,F=h,O=p,L=v,V=m,H=M):(T=c,x=l,C=h,F=f,O=v,L=p,V=M,H=m)),E===0)return null;const Y=T/E,Q=x/E,j=1/E,dt=C-Y*I,Et=F-Q*I,Xt=O-Y*U,qt=L-Q*U,jt=V-Y*K,J=H-Q*K,et=jt*qt-J*Xt,gt=dt*J-Et*jt,Vt=Xt*Et-qt*dt;if(n){if(et<0||gt<0||Vt<0)return null}else if((et<0||gt<0||Vt<0)&&(et>0||gt>0||Vt>0))return null;const Dt=et+gt+Vt;if(Dt===0)return null;const Gt=j*(et*I+gt*U+Vt*K);return(Dt>0?Gt<0:Gt>0)?null:this.at(Gt/Dt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gh extends cs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.combine=lm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const cd=new le,gs=new Dl,uo=new zn,ud=new A,ho=new A,fo=new A,po=new A,vc=new A,mo=new A,hd=new A,go=new A;class ae extends Ve{constructor(t=new ce,e=new Gh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(r&&o){mo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(vc.fromBufferAttribute(f,t),a?mo.addScaledVector(vc,u):mo.addScaledVector(vc.sub(e),u))}e.add(mo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),uo.copy(i.boundingSphere),uo.applyMatrix4(r),gs.copy(t.ray).recast(t.near),!(uo.containsPoint(gs.origin)===!1&&(gs.intersectSphere(uo,ud)===null||gs.origin.distanceToSquared(ud)>(t.far-t.near)**2))&&(cd.copy(r).invert(),gs.copy(t.ray).applyMatrix4(cd),!(i.boundingBox!==null&&gs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,gs)))}_computeIntersections(t,e,i){let n;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){const g=h[p],m=a[g.materialIndex],M=Math.max(g.start,d.start),b=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,S=b;_<S;_+=3){const y=o.getX(_),T=o.getX(_+1),x=o.getX(_+2);n=vo(this,m,t,i,c,u,f,y,T,x),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{const p=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const M=o.getX(g),b=o.getX(g+1),_=o.getX(g+2);n=vo(this,a,t,i,c,u,f,M,b,_),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=h.length;p<v;p++){const g=h[p],m=a[g.materialIndex],M=Math.max(g.start,d.start),b=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,S=b;_<S;_+=3){const y=_,T=_+1,x=_+2;n=vo(this,m,t,i,c,u,f,y,T,x),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{const p=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let g=p,m=v;g<m;g+=3){const M=g,b=g+1,_=g+2;n=vo(this,a,t,i,c,u,f,M,b,_),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}}}function Nx(s,t,e,i,n,r,a,o){let l;if(t.side===ti?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,t.side===Ps,o),l===null)return null;go.copy(o),go.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(go);return c<e.near||c>e.far?null:{distance:c,point:go.clone(),object:s}}function vo(s,t,e,i,n,r,a,o,l,c){s.getVertexPosition(o,ho),s.getVertexPosition(l,fo),s.getVertexPosition(c,po);const u=Nx(s,t,e,i,ho,fo,po,hd);if(u){const f=new A;Ui.getBarycoord(hd,ho,fo,po,f),n&&(u.uv=Ui.getInterpolatedAttribute(n,o,l,c,f,new lt)),r&&(u.uv1=Ui.getInterpolatedAttribute(r,o,l,c,f,new lt)),a&&(u.normal=Ui.getInterpolatedAttribute(a,o,l,c,f,new A),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new A,materialIndex:0};Ui.getNormal(ho,fo,po,h.normal),u.face=h,u.barycoord=f}return u}class Cr extends ei{constructor(t=null,e=1,i=1,n,r,a,o,l,c=Qe,u=Qe,f,h){super(null,a,o,l,c,u,n,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class da extends Wt{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const tr=new le,fd=new le,_o=[],dd=new Us,Ux=new le,zr=new ae,Vr=new zn;class Ox extends ae{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new da(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Ux)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Us),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,tr),dd.copy(t.boundingBox).applyMatrix4(tr),this.boundingBox.union(dd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new zn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,tr),Vr.copy(t.boundingSphere).applyMatrix4(tr),this.boundingSphere.union(Vr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(zr.geometry=this.geometry,zr.material=this.material,zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vr.copy(this.boundingSphere),Vr.applyMatrix4(i),t.ray.intersectsSphere(Vr)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,tr),fd.multiplyMatrices(i,tr),zr.matrixWorld=fd,zr.raycast(t,_o);for(let a=0,o=_o.length;a<o;a++){const l=_o[a];l.instanceId=r,l.object=this,e.push(l)}_o.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new da(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Cr(new Float32Array(n*this.count),n,this.count,Fh,Zi));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const vs=new zn,Bx=new lt(.5,.5),xo=new A;class Hh{constructor(t=new Kn,e=new Kn,i=new Kn,n=new Kn,r=new Kn,a=new Kn){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=gn,i=!1){const n=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],h=r[6],d=r[7],p=r[8],v=r[9],g=r[10],m=r[11],M=r[12],b=r[13],_=r[14],S=r[15];if(n[0].setComponents(c-a,d-u,m-p,S-M).normalize(),n[1].setComponents(c+a,d+u,m+p,S+M).normalize(),n[2].setComponents(c+o,d+f,m+v,S+b).normalize(),n[3].setComponents(c-o,d-f,m-v,S-b).normalize(),i)n[4].setComponents(l,h,g,_).normalize(),n[5].setComponents(c-l,d-h,m-g,S-_).normalize();else if(n[4].setComponents(c-l,d-h,m-g,S-_).normalize(),e===gn)n[5].setComponents(c+l,d+h,m+g,S+_).normalize();else if(e===Fa)n[5].setComponents(l,h,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(t){vs.center.set(0,0,0);const e=Bx.distanceTo(t.center);return vs.radius=.7071067811865476+e,vs.applyMatrix4(t.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(xo.x=n.normal.x>0?t.max.x:t.min.x,xo.y=n.normal.y>0?t.max.y:t.min.y,xo.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(xo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pl extends cs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ml=new A,gl=new A,pd=new le,Gr=new Dl,yo=new zn,_c=new A,md=new A;class Rm extends Ve{constructor(t=new ce,e=new pl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)ml.fromBufferAttribute(e,n-1),gl.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=ml.distanceTo(gl);t.setAttribute("lineDistance",new ie(i,1))}else Yt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yo.copy(i.boundingSphere),yo.applyMatrix4(n),yo.radius+=r,t.ray.intersectsSphere(yo)===!1)return;pd.copy(n).invert(),Gr.copy(t.ray).applyMatrix4(pd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let v=d,g=p-1;v<g;v+=c){const m=u.getX(v),M=u.getX(v+1),b=Mo(this,t,Gr,l,m,M,v);b&&e.push(b)}if(this.isLineLoop){const v=u.getX(p-1),g=u.getX(d),m=Mo(this,t,Gr,l,v,g,p-1);m&&e.push(m)}}else{const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let v=d,g=p-1;v<g;v+=c){const m=Mo(this,t,Gr,l,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=Mo(this,t,Gr,l,p-1,d,p-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Mo(s,t,e,i,n,r,a){const o=s.geometry.attributes.position;if(ml.fromBufferAttribute(o,n),gl.fromBufferAttribute(o,r),e.distanceSqToSegment(ml,gl,_c,md)>i)return;_c.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(_c);if(!(c<t.near||c>t.far))return{distance:c,point:md.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const gd=new A,vd=new A;class Lm extends Rm{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let n=0,r=e.count;n<r;n+=2)gd.fromBufferAttribute(e,n),vd.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+gd.distanceTo(vd);t.setAttribute("lineDistance",new ie(i,1))}else Yt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class kx extends Rm{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Fm extends cs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const _d=new le,Ju=new Dl,So=new zn,bo=new A;class Pr extends Ve{constructor(t=new ce,e=new Fm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),So.copy(i.boundingSphere),So.applyMatrix4(n),So.radius+=r,t.ray.intersectsSphere(So)===!1)return;_d.copy(n).invert(),Ju.copy(t.ray).applyMatrix4(_d);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=h,v=d;p<v;p++){const g=c.getX(p);bo.fromBufferAttribute(f,g),xd(bo,g,l,n,t,e,this)}}else{const h=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let p=h,v=d;p<v;p++)bo.fromBufferAttribute(f,p),xd(bo,p,l,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function xd(s,t,e,i,n,r,a){const o=Ju.distanceSqToPoint(s);if(o<e){const l=new A;Ju.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Im extends ei{constructor(t=[],e=Rs,i,n,r,a,o,l,c,u){super(t,e,i,n,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Al extends ei{constructor(t,e,i,n,r,a,o,l,c){super(t,e,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Na extends ei{constructor(t,e,i=yn,n,r,a,o=Qe,l=Qe,c,u=kn,f=1){if(u!==kn&&u!==Es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,n,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new zh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class zx extends Na{constructor(t,e=yn,i=Rs,n,r,a=Qe,o=Qe,l,c=kn){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,n,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Nm extends ei{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Le extends ce{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,d=0;p("z","y","x",-1,-1,i,e,t,a,r,0),p("z","y","x",1,-1,i,e,-t,a,r,1),p("x","z","y",1,1,t,i,e,n,a,2),p("x","z","y",1,-1,t,i,-e,n,a,3),p("x","y","z",1,-1,t,e,i,n,r,4),p("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new ie(c,3)),this.setAttribute("normal",new ie(u,3)),this.setAttribute("uv",new ie(f,2));function p(v,g,m,M,b,_,S,y,T,x,E){const C=_/T,F=S/x,I=_/2,O=S/2,L=y/2,U=T+1,V=x+1;let H=0,K=0;const Y=new A;for(let Q=0;Q<V;Q++){const j=Q*F-O;for(let dt=0;dt<U;dt++){const Et=dt*C-I;Y[v]=Et*M,Y[g]=j*b,Y[m]=L,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[g]=0,Y[m]=y>0?1:-1,u.push(Y.x,Y.y,Y.z),f.push(dt/T),f.push(1-Q/x),H+=1}}for(let Q=0;Q<x;Q++)for(let j=0;j<T;j++){const dt=h+j+U*Q,Et=h+j+U*(Q+1),Xt=h+(j+1)+U*(Q+1),qt=h+(j+1)+U*Q;l.push(dt,Et,qt),l.push(Et,Xt,qt),K+=6}o.addGroup(d,K,E),d+=K,h+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Le(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Wh extends ce{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new A,u=new lt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=e;f++,h+=3){const d=i+f/e*n;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/t+1)/2,u.y=(a[h+1]/t+1)/2,l.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new ie(a,3)),this.setAttribute("normal",new ie(o,3)),this.setAttribute("uv",new ie(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wh(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class hn extends ce{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),r=Math.floor(r);const u=[],f=[],h=[],d=[];let p=0;const v=[],g=i/2;let m=0;M(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new ie(f,3)),this.setAttribute("normal",new ie(h,3)),this.setAttribute("uv",new ie(d,2));function M(){const _=new A,S=new A;let y=0;const T=(e-t)/i;for(let x=0;x<=r;x++){const E=[],C=x/r,F=C*(e-t)+t;for(let I=0;I<=n;I++){const O=I/n,L=O*l+o,U=Math.sin(L),V=Math.cos(L);S.x=F*U,S.y=-C*i+g,S.z=F*V,f.push(S.x,S.y,S.z),_.set(U,T,V).normalize(),h.push(_.x,_.y,_.z),d.push(O,1-C),E.push(p++)}v.push(E)}for(let x=0;x<n;x++)for(let E=0;E<r;E++){const C=v[E][x],F=v[E+1][x],I=v[E+1][x+1],O=v[E][x+1];(t>0||E!==0)&&(u.push(C,F,O),y+=3),(e>0||E!==r-1)&&(u.push(F,I,O),y+=3)}c.addGroup(m,y,0),m+=y}function b(_){const S=p,y=new lt,T=new A;let x=0;const E=_===!0?t:e,C=_===!0?1:-1;for(let I=1;I<=n;I++)f.push(0,g*C,0),h.push(0,C,0),d.push(.5,.5),p++;const F=p;for(let I=0;I<=n;I++){const L=I/n*l+o,U=Math.cos(L),V=Math.sin(L);T.x=E*V,T.y=g*C,T.z=E*U,f.push(T.x,T.y,T.z),h.push(0,C,0),y.x=U*.5+.5,y.y=V*.5*C+.5,d.push(y.x,y.y),p++}for(let I=0;I<n;I++){const O=S+I,L=F+I;_===!0?u.push(L,L+1,O):u.push(L+1,L,O),x+=3}c.addGroup(m,x,_===!0?1:2),m+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class vl extends hn{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new vl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Cl extends ce{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};const r=[],a=[];o(n),c(i),u(),this.setAttribute("position",new ie(r,3)),this.setAttribute("normal",new ie(r.slice(),3)),this.setAttribute("uv",new ie(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const b=new A,_=new A,S=new A;for(let y=0;y<e.length;y+=3)d(e[y+0],b),d(e[y+1],_),d(e[y+2],S),l(b,_,S,M)}function l(M,b,_,S){const y=S+1,T=[];for(let x=0;x<=y;x++){T[x]=[];const E=M.clone().lerp(_,x/y),C=b.clone().lerp(_,x/y),F=y-x;for(let I=0;I<=F;I++)I===0&&x===y?T[x][I]=E:T[x][I]=E.clone().lerp(C,I/F)}for(let x=0;x<y;x++)for(let E=0;E<2*(y-x)-1;E++){const C=Math.floor(E/2);E%2===0?(h(T[x][C+1]),h(T[x+1][C]),h(T[x][C])):(h(T[x][C+1]),h(T[x+1][C+1]),h(T[x+1][C]))}}function c(M){const b=new A;for(let _=0;_<r.length;_+=3)b.x=r[_+0],b.y=r[_+1],b.z=r[_+2],b.normalize().multiplyScalar(M),r[_+0]=b.x,r[_+1]=b.y,r[_+2]=b.z}function u(){const M=new A;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];const _=g(M)/2/Math.PI+.5,S=m(M)/Math.PI+.5;a.push(_,1-S)}p(),f()}function f(){for(let M=0;M<a.length;M+=6){const b=a[M+0],_=a[M+2],S=a[M+4],y=Math.max(b,_,S),T=Math.min(b,_,S);y>.9&&T<.1&&(b<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),S<.2&&(a[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function d(M,b){const _=M*3;b.x=t[_+0],b.y=t[_+1],b.z=t[_+2]}function p(){const M=new A,b=new A,_=new A,S=new A,y=new lt,T=new lt,x=new lt;for(let E=0,C=0;E<r.length;E+=9,C+=6){M.set(r[E+0],r[E+1],r[E+2]),b.set(r[E+3],r[E+4],r[E+5]),_.set(r[E+6],r[E+7],r[E+8]),y.set(a[C+0],a[C+1]),T.set(a[C+2],a[C+3]),x.set(a[C+4],a[C+5]),S.copy(M).add(b).add(_).divideScalar(3);const F=g(S);v(y,C+0,M,F),v(T,C+2,b,F),v(x,C+4,_,F)}}function v(M,b,_,S){S<0&&M.x===1&&(a[b]=M.x-1),_.x===0&&_.z===0&&(a[b]=S/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cl(t.vertices,t.indices,t.radius,t.detail)}}class Sn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Yt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,n=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(n),e.push(r),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let n=0;const r=i.length;let a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-a,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(r-1);const u=i[n],h=i[n+1]-u,d=(a-u)/h;return(n+d)/(r-1)}getTangent(t,e){let n=t-1e-4,r=t+1e-4;n<0&&(n=0),r>1&&(r=1);const a=this.getPoint(n),o=this.getPoint(r),l=e||(a.isVector2?new lt:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new A,n=[],r=[],a=[],o=new A,l=new le;for(let d=0;d<=t;d++){const p=d/t;n[d]=this.getTangentAt(p,new A)}r[0]=new A,a[0]=new A;let c=Number.MAX_VALUE;const u=Math.abs(n[0].x),f=Math.abs(n[0].y),h=Math.abs(n[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],o),a[0].crossVectors(n[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(n[d-1],n[d]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(te(n[d-1].dot(n[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,p))}a[d].crossVectors(n[d],r[d])}if(e===!0){let d=Math.acos(te(r[0].dot(r[t]),-1,1));d/=t,n[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(n[p],d*p)),a[p].crossVectors(n[p],r[p])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Xh extends Sn{constructor(t=0,e=0,i=1,n=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new lt){const i=e,n=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(a?r=0:r=n),this.aClockwise===!0&&!a&&(r===n?r=-n:r=r-n);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,d=c-this.aY;l=h*u-d*f+this.aX,c=h*f+d*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Vx extends Xh{constructor(t,e,i,n,r,a){super(t,e,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function qh(){let s=0,t=0,e=0,i=0;function n(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){n(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,f){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+f)+(l-o)/f;h*=u,d*=u,n(a,o,h,d)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+i*o}}}const yd=new A,Md=new A,xc=new qh,yc=new qh,Mc=new qh;class Gx extends Sn{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new A){const i=e,n=this.points,r=n.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=n[(o-1)%r]:(Md.subVectors(n[0],n[1]).add(n[0]),c=Md);const f=n[o%r],h=n[(o+1)%r];if(this.closed||o+2<r?u=n[(o+2)%r]:(yd.subVectors(n[r-1],n[r-2]).add(n[r-1]),u=yd),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),xc.initNonuniformCatmullRom(c.x,f.x,h.x,u.x,p,v,g),yc.initNonuniformCatmullRom(c.y,f.y,h.y,u.y,p,v,g),Mc.initNonuniformCatmullRom(c.z,f.z,h.z,u.z,p,v,g)}else this.curveType==="catmullrom"&&(xc.initCatmullRom(c.x,f.x,h.x,u.x,this.tension),yc.initCatmullRom(c.y,f.y,h.y,u.y,this.tension),Mc.initCatmullRom(c.z,f.z,h.z,u.z,this.tension));return i.set(xc.calc(l),yc.calc(l),Mc.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new A().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Sd(s,t,e,i,n){const r=(i-t)*.5,a=(n-e)*.5,o=s*s,l=s*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*s+e}function Hx(s,t){const e=1-s;return e*e*t}function Wx(s,t){return 2*(1-s)*s*t}function Xx(s,t){return s*s*t}function pa(s,t,e,i){return Hx(s,t)+Wx(s,e)+Xx(s,i)}function qx(s,t){const e=1-s;return e*e*e*t}function Yx(s,t){const e=1-s;return 3*e*e*s*t}function $x(s,t){return 3*(1-s)*s*s*t}function Kx(s,t){return s*s*s*t}function ma(s,t,e,i,n){return qx(s,t)+Yx(s,e)+$x(s,i)+Kx(s,n)}class Um extends Sn{constructor(t=new lt,e=new lt,i=new lt,n=new lt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new lt){const i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ma(t,n.x,r.x,a.x,o.x),ma(t,n.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zx extends Sn{constructor(t=new A,e=new A,i=new A,n=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new A){const i=e,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ma(t,n.x,r.x,a.x,o.x),ma(t,n.y,r.y,a.y,o.y),ma(t,n.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Om extends Sn{constructor(t=new lt,e=new lt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new lt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new lt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jx extends Sn{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bm extends Sn{constructor(t=new lt,e=new lt,i=new lt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new lt){const i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(pa(t,n.x,r.x,a.x),pa(t,n.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qx extends Sn{constructor(t=new A,e=new A,i=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new A){const i=e,n=this.v0,r=this.v1,a=this.v2;return i.set(pa(t,n.x,r.x,a.x),pa(t,n.y,r.y,a.y),pa(t,n.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class km extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new lt){const i=e,n=this.points,r=(n.length-1)*t,a=Math.floor(r),o=r-a,l=n[a===0?a:a-1],c=n[a],u=n[a>n.length-2?n.length-1:a+1],f=n[a>n.length-3?n.length-1:a+2];return i.set(Sd(o,l.x,c.x,u.x,f.x),Sd(o,l.y,c.y,u.y,f.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new lt().fromArray(n))}return this}}var Qu=Object.freeze({__proto__:null,ArcCurve:Vx,CatmullRomCurve3:Gx,CubicBezierCurve:Um,CubicBezierCurve3:Zx,EllipseCurve:Xh,LineCurve:Om,LineCurve3:Jx,QuadraticBezierCurve:Bm,QuadraticBezierCurve3:Qx,SplineCurve:km});class jx extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Qu[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),n=this.getCurveLengths();let r=0;for(;r<n.length;){if(n[r]>=i){const a=n[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,n=this.curves.length;i<n;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let n=0,r=this.curves;n<r.length;n++){const a=r[n],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const n=t.curves[e];this.curves.push(n.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const n=this.curves[e];t.curves.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const n=t.curves[e];this.curves.push(new Qu[n.type]().fromJSON(n))}return this}}class bd extends jx{constructor(t){super(),this.type="Path",this.currentPoint=new lt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Om(this.currentPoint.clone(),new lt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,n){const r=new Bm(this.currentPoint.clone(),new lt(t,e),new lt(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(t,e,i,n,r,a){const o=new Um(this.currentPoint.clone(),new lt(t,e),new lt(i,n),new lt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new km(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,n,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,n,r,a),this}absarc(t,e,i,n,r,a){return this.absellipse(t,e,i,i,n,r,a),this}ellipse(t,e,i,n,r,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,n,r,a,o,l),this}absellipse(t,e,i,n,r,a,o,l){const c=new Xh(t,e,i,n,r,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Yh extends bd{constructor(t){super(t),this.uuid=_n(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,n=this.holes.length;i<n;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const n=t.holes[e];this.holes.push(n.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const n=this.holes[e];t.holes.push(n.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const n=t.holes[e];this.holes.push(new bd().fromJSON(n))}return this}}function ty(s,t,e=2){const i=t&&t.length,n=i?t[0]*e:s.length;let r=zm(s,0,n,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=ry(s,t,r,e)),s.length>80*e){o=s[0],l=s[1];let u=o,f=l;for(let h=e;h<n;h+=e){const d=s[h],p=s[h+1];d<o&&(o=d),p<l&&(l=p),d>u&&(u=d),p>f&&(f=p)}c=Math.max(u-o,f-l),c=c!==0?32767/c:0}return Ua(r,a,e,o,l,c,0),a}function zm(s,t,e,i,n){let r;if(n===gy(s,t,e,i)>0)for(let a=t;a<e;a+=i)r=wd(a/i|0,s[a],s[a+1],r);else for(let a=e-i;a>=t;a-=i)r=wd(a/i|0,s[a],s[a+1],r);return r&&Dr(r,r.next)&&(Ba(r),r=r.next),r}function Fs(s,t){if(!s)return s;t||(t=s);let e=s,i;do if(i=!1,!e.steiner&&(Dr(e,e.next)||Re(e.prev,e,e.next)===0)){if(Ba(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Ua(s,t,e,i,n,r,a){if(!s)return;!a&&r&&uy(s,i,n,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?iy(s,i,n,r):ey(s)){t.push(l.i,s.i,c.i),Ba(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=ny(Fs(s),t),Ua(s,t,e,i,n,r,2)):a===2&&sy(s,t,e,i,n,r):Ua(Fs(s),t,e,i,n,r,1);break}}}function ey(s){const t=s.prev,e=s,i=s.next;if(Re(t,e,i)>=0)return!1;const n=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,u=Math.min(n,r,a),f=Math.min(o,l,c),h=Math.max(n,r,a),d=Math.max(o,l,c);let p=i.next;for(;p!==t;){if(p.x>=u&&p.x<=h&&p.y>=f&&p.y<=d&&na(n,o,r,l,a,c,p.x,p.y)&&Re(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function iy(s,t,e,i){const n=s.prev,r=s,a=s.next;if(Re(n,r,a)>=0)return!1;const o=n.x,l=r.x,c=a.x,u=n.y,f=r.y,h=a.y,d=Math.min(o,l,c),p=Math.min(u,f,h),v=Math.max(o,l,c),g=Math.max(u,f,h),m=ju(d,p,t,e,i),M=ju(v,g,t,e,i);let b=s.prevZ,_=s.nextZ;for(;b&&b.z>=m&&_&&_.z<=M;){if(b.x>=d&&b.x<=v&&b.y>=p&&b.y<=g&&b!==n&&b!==a&&na(o,u,l,f,c,h,b.x,b.y)&&Re(b.prev,b,b.next)>=0||(b=b.prevZ,_.x>=d&&_.x<=v&&_.y>=p&&_.y<=g&&_!==n&&_!==a&&na(o,u,l,f,c,h,_.x,_.y)&&Re(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;b&&b.z>=m;){if(b.x>=d&&b.x<=v&&b.y>=p&&b.y<=g&&b!==n&&b!==a&&na(o,u,l,f,c,h,b.x,b.y)&&Re(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;_&&_.z<=M;){if(_.x>=d&&_.x<=v&&_.y>=p&&_.y<=g&&_!==n&&_!==a&&na(o,u,l,f,c,h,_.x,_.y)&&Re(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function ny(s,t){let e=s;do{const i=e.prev,n=e.next.next;!Dr(i,n)&&Gm(i,e,e.next,n)&&Oa(i,n)&&Oa(n,i)&&(t.push(i.i,e.i,n.i),Ba(e),Ba(e.next),e=s=n),e=e.next}while(e!==s);return Fs(e)}function sy(s,t,e,i,n,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&dy(a,o)){let l=Hm(a,o);a=Fs(a,a.next),l=Fs(l,l.next),Ua(a,t,e,i,n,r,0),Ua(l,t,e,i,n,r,0);return}o=o.next}a=a.next}while(a!==s)}function ry(s,t,e,i){const n=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*i,l=r<a-1?t[r+1]*i:s.length,c=zm(s,o,l,i,!1);c===c.next&&(c.steiner=!0),n.push(fy(c))}n.sort(ay);for(let r=0;r<n.length;r++)e=oy(n[r],e);return e}function ay(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const i=(s.next.y-s.y)/(s.next.x-s.x),n=(t.next.y-t.y)/(t.next.x-t.x);e=i-n}return e}function oy(s,t){const e=ly(s,t);if(!e)return t;const i=Hm(e,s);return Fs(i,i.next),Fs(e,e.next)}function ly(s,t){let e=t;const i=s.x,n=s.y;let r=-1/0,a;if(Dr(s,e))return e;do{if(Dr(s,e.next))return e.next;if(n<=e.y&&n>=e.next.y&&e.next.y!==e.y){const f=e.x+(n-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=i&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===i))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;e=a;do{if(i>=e.x&&e.x>=l&&i!==e.x&&Vm(n<c?i:r,n,l,c,n<c?r:i,n,e.x,e.y)){const f=Math.abs(n-e.y)/(i-e.x);Oa(e,s)&&(f<u||f===u&&(e.x>a.x||e.x===a.x&&cy(a,e)))&&(a=e,u=f)}e=e.next}while(e!==o);return a}function cy(s,t){return Re(s.prev,s,t.prev)<0&&Re(t.next,s,s.next)<0}function uy(s,t,e,i){let n=s;do n.z===0&&(n.z=ju(n.x,n.y,t,e,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,hy(n)}function hy(s){let t,e=1;do{let i=s,n;s=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(n=i,i=i.nextZ,o--):(n=a,a=a.nextZ,l--),r?r.nextZ=n:s=n,n.prevZ=r,r=n;i=a}r.nextZ=null,e*=2}while(t>1);return s}function ju(s,t,e,i,n){return s=(s-e)*n|0,t=(t-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function fy(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Vm(s,t,e,i,n,r,a,o){return(n-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(n-a)*(i-o)}function na(s,t,e,i,n,r,a,o){return!(s===a&&t===o)&&Vm(s,t,e,i,n,r,a,o)}function dy(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!py(s,t)&&(Oa(s,t)&&Oa(t,s)&&my(s,t)&&(Re(s.prev,s,t.prev)||Re(s,t.prev,t))||Dr(s,t)&&Re(s.prev,s,s.next)>0&&Re(t.prev,t,t.next)>0)}function Re(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Dr(s,t){return s.x===t.x&&s.y===t.y}function Gm(s,t,e,i){const n=Eo(Re(s,t,e)),r=Eo(Re(s,t,i)),a=Eo(Re(e,i,s)),o=Eo(Re(e,i,t));return!!(n!==r&&a!==o||n===0&&wo(s,e,t)||r===0&&wo(s,i,t)||a===0&&wo(e,s,i)||o===0&&wo(e,t,i))}function wo(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Eo(s){return s>0?1:s<0?-1:0}function py(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Gm(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Oa(s,t){return Re(s.prev,s,s.next)<0?Re(s,t,s.next)>=0&&Re(s,s.prev,t)>=0:Re(s,t,s.prev)<0||Re(s,s.next,t)<0}function my(s,t){let e=s,i=!1;const n=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&n<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==s);return i}function Hm(s,t){const e=th(s.i,s.x,s.y),i=th(t.i,t.x,t.y),n=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=n,n.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function wd(s,t,e,i){const n=th(s,t,e);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function Ba(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function th(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function gy(s,t,e,i){let n=0;for(let r=t,a=e-i;r<e;r+=i)n+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return n}class vy{static triangulate(t,e,i=2){return ty(t,e,i)}}class fr{static area(t){const e=t.length;let i=0;for(let n=e-1,r=0;r<e;n=r++)i+=t[n].x*t[r].y-t[r].x*t[n].y;return i*.5}static isClockWise(t){return fr.area(t)<0}static triangulateShape(t,e){const i=[],n=[],r=[];Ed(t),Td(i,t);let a=t.length;e.forEach(Ed);for(let l=0;l<e.length;l++)n.push(a),a+=e[l].length,Td(i,e[l]);const o=vy.triangulate(i,n);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Ed(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Td(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Pl extends ce{constructor(t=new Yh([new lt(.5,.5),new lt(-.5,.5),new lt(-.5,-.5),new lt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,n=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new ie(n,3)),this.setAttribute("uv",new ie(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:_y;let b,_=!1,S,y,T,x;if(m){b=m.getSpacedPoints(u),_=!0,h=!1;const nt=m.isCatmullRomCurve3?m.closed:!1;S=m.computeFrenetFrames(u,nt),y=new A,T=new A,x=new A}h||(g=0,d=0,p=0,v=0);const E=o.extractPoints(c);let C=E.shape;const F=E.holes;if(!fr.isClockWise(C)){C=C.reverse();for(let nt=0,rt=F.length;nt<rt;nt++){const ct=F[nt];fr.isClockWise(ct)&&(F[nt]=ct.reverse())}}function O(nt){const ct=10000000000000001e-36;let ut=nt[0];for(let pt=1;pt<=nt.length;pt++){const zt=pt%nt.length,k=nt[zt],ot=k.x-ut.x,At=k.y-ut.y,N=ot*ot+At*At,ne=Math.max(Math.abs(k.x),Math.abs(k.y),Math.abs(ut.x),Math.abs(ut.y)),Kt=ct*ne*ne;if(N<=Kt){nt.splice(zt,1),pt--;continue}ut=k}}O(C),F.forEach(O);const L=F.length,U=C;for(let nt=0;nt<L;nt++){const rt=F[nt];C=C.concat(rt)}function V(nt,rt,ct){return rt||se("ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(rt,ct)}const H=C.length;function K(nt,rt,ct){let ut,pt,zt;const k=nt.x-rt.x,ot=nt.y-rt.y,At=ct.x-nt.x,N=ct.y-nt.y,ne=k*k+ot*ot,Kt=k*N-ot*At;if(Math.abs(Kt)>Number.EPSILON){const R=Math.sqrt(ne),w=Math.sqrt(At*At+N*N),G=rt.x-ot/R,q=rt.y+k/R,Z=ct.x-N/w,ht=ct.y+At/w,mt=((Z-G)*N-(ht-q)*At)/(k*N-ot*At);ut=G+k*mt-nt.x,pt=q+ot*mt-nt.y;const tt=ut*ut+pt*pt;if(tt<=2)return new lt(ut,pt);zt=Math.sqrt(tt/2)}else{let R=!1;k>Number.EPSILON?At>Number.EPSILON&&(R=!0):k<-Number.EPSILON?At<-Number.EPSILON&&(R=!0):Math.sign(ot)===Math.sign(N)&&(R=!0),R?(ut=-ot,pt=k,zt=Math.sqrt(ne)):(ut=k,pt=ot,zt=Math.sqrt(ne/2))}return new lt(ut/zt,pt/zt)}const Y=[];for(let nt=0,rt=U.length,ct=rt-1,ut=nt+1;nt<rt;nt++,ct++,ut++)ct===rt&&(ct=0),ut===rt&&(ut=0),Y[nt]=K(U[nt],U[ct],U[ut]);const Q=[];let j,dt=Y.concat();for(let nt=0,rt=L;nt<rt;nt++){const ct=F[nt];j=[];for(let ut=0,pt=ct.length,zt=pt-1,k=ut+1;ut<pt;ut++,zt++,k++)zt===pt&&(zt=0),k===pt&&(k=0),j[ut]=K(ct[ut],ct[zt],ct[k]);Q.push(j),dt=dt.concat(j)}let Et;if(g===0)Et=fr.triangulateShape(U,F);else{const nt=[],rt=[];for(let ct=0;ct<g;ct++){const ut=ct/g,pt=d*Math.cos(ut*Math.PI/2),zt=p*Math.sin(ut*Math.PI/2)+v;for(let k=0,ot=U.length;k<ot;k++){const At=V(U[k],Y[k],zt);gt(At.x,At.y,-pt),ut===0&&nt.push(At)}for(let k=0,ot=L;k<ot;k++){const At=F[k];j=Q[k];const N=[];for(let ne=0,Kt=At.length;ne<Kt;ne++){const R=V(At[ne],j[ne],zt);gt(R.x,R.y,-pt),ut===0&&N.push(R)}ut===0&&rt.push(N)}}Et=fr.triangulateShape(nt,rt)}const Xt=Et.length,qt=p+v;for(let nt=0;nt<H;nt++){const rt=h?V(C[nt],dt[nt],qt):C[nt];_?(T.copy(S.normals[0]).multiplyScalar(rt.x),y.copy(S.binormals[0]).multiplyScalar(rt.y),x.copy(b[0]).add(T).add(y),gt(x.x,x.y,x.z)):gt(rt.x,rt.y,0)}for(let nt=1;nt<=u;nt++)for(let rt=0;rt<H;rt++){const ct=h?V(C[rt],dt[rt],qt):C[rt];_?(T.copy(S.normals[nt]).multiplyScalar(ct.x),y.copy(S.binormals[nt]).multiplyScalar(ct.y),x.copy(b[nt]).add(T).add(y),gt(x.x,x.y,x.z)):gt(ct.x,ct.y,f/u*nt)}for(let nt=g-1;nt>=0;nt--){const rt=nt/g,ct=d*Math.cos(rt*Math.PI/2),ut=p*Math.sin(rt*Math.PI/2)+v;for(let pt=0,zt=U.length;pt<zt;pt++){const k=V(U[pt],Y[pt],ut);gt(k.x,k.y,f+ct)}for(let pt=0,zt=F.length;pt<zt;pt++){const k=F[pt];j=Q[pt];for(let ot=0,At=k.length;ot<At;ot++){const N=V(k[ot],j[ot],ut);_?gt(N.x,N.y+b[u-1].y,b[u-1].x+ct):gt(N.x,N.y,f+ct)}}}jt(),J();function jt(){const nt=n.length/3;if(h){let rt=0,ct=H*rt;for(let ut=0;ut<Xt;ut++){const pt=Et[ut];Vt(pt[2]+ct,pt[1]+ct,pt[0]+ct)}rt=u+g*2,ct=H*rt;for(let ut=0;ut<Xt;ut++){const pt=Et[ut];Vt(pt[0]+ct,pt[1]+ct,pt[2]+ct)}}else{for(let rt=0;rt<Xt;rt++){const ct=Et[rt];Vt(ct[2],ct[1],ct[0])}for(let rt=0;rt<Xt;rt++){const ct=Et[rt];Vt(ct[0]+H*u,ct[1]+H*u,ct[2]+H*u)}}i.addGroup(nt,n.length/3-nt,0)}function J(){const nt=n.length/3;let rt=0;et(U,rt),rt+=U.length;for(let ct=0,ut=F.length;ct<ut;ct++){const pt=F[ct];et(pt,rt),rt+=pt.length}i.addGroup(nt,n.length/3-nt,1)}function et(nt,rt){let ct=nt.length;for(;--ct>=0;){const ut=ct;let pt=ct-1;pt<0&&(pt=nt.length-1);for(let zt=0,k=u+g*2;zt<k;zt++){const ot=H*zt,At=H*(zt+1),N=rt+ut+ot,ne=rt+pt+ot,Kt=rt+pt+At,R=rt+ut+At;Dt(N,ne,Kt,R)}}}function gt(nt,rt,ct){l.push(nt),l.push(rt),l.push(ct)}function Vt(nt,rt,ct){Gt(nt),Gt(rt),Gt(ct);const ut=n.length/3,pt=M.generateTopUV(i,n,ut-3,ut-2,ut-1);fe(pt[0]),fe(pt[1]),fe(pt[2])}function Dt(nt,rt,ct,ut){Gt(nt),Gt(rt),Gt(ut),Gt(rt),Gt(ct),Gt(ut);const pt=n.length/3,zt=M.generateSideWallUV(i,n,pt-6,pt-3,pt-2,pt-1);fe(zt[0]),fe(zt[1]),fe(zt[3]),fe(zt[1]),fe(zt[2]),fe(zt[3])}function Gt(nt){n.push(l[nt*3+0]),n.push(l[nt*3+1]),n.push(l[nt*3+2])}function fe(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return xy(e,i,t)}static fromJSON(t,e){const i=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];i.push(o)}const n=t.options.extrudePath;return n!==void 0&&(t.options.extrudePath=new Qu[n.type]().fromJSON(n)),new Pl(i,t.options)}}const _y={generateTopUV:function(s,t,e,i,n){const r=t[e*3],a=t[e*3+1],o=t[i*3],l=t[i*3+1],c=t[n*3],u=t[n*3+1];return[new lt(r,a),new lt(o,l),new lt(c,u)]},generateSideWallUV:function(s,t,e,i,n,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[i*3],u=t[i*3+1],f=t[i*3+2],h=t[n*3],d=t[n*3+1],p=t[n*3+2],v=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new lt(a,1-l),new lt(c,1-f),new lt(h,1-p),new lt(v,1-m)]:[new lt(o,1-l),new lt(u,1-f),new lt(d,1-p),new lt(g,1-m)]}};function xy(s,t,e){if(e.shapes=[],Array.isArray(s))for(let i=0,n=s.length;i<n;i++){const r=s[i];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class $h extends Cl{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new $h(t.radius,t.detail)}}class _l extends Cl{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new _l(t.radius,t.detail)}}class us extends ce{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,u=l+1,f=t/o,h=e/l,d=[],p=[],v=[],g=[];for(let m=0;m<u;m++){const M=m*h-a;for(let b=0;b<c;b++){const _=b*f-r;p.push(_,-M,0),v.push(0,0,1),g.push(b/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){const b=M+c*m,_=M+c*(m+1),S=M+1+c*(m+1),y=M+1+c*m;d.push(b,_,y),d.push(_,S,y)}this.setIndex(d),this.setAttribute("position",new ie(p,3)),this.setAttribute("normal",new ie(v,3)),this.setAttribute("uv",new ie(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new us(t.width,t.height,t.widthSegments,t.heightSegments)}}class Rl extends ce{constructor(t=.5,e=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],u=[];let f=t;const h=(e-t)/n,d=new A,p=new lt;for(let v=0;v<=n;v++){for(let g=0;g<=i;g++){const m=r+g/i*a;d.x=f*Math.cos(m),d.y=f*Math.sin(m),l.push(d.x,d.y,d.z),c.push(0,0,1),p.x=(d.x/e+1)/2,p.y=(d.y/e+1)/2,u.push(p.x,p.y)}f+=h}for(let v=0;v<n;v++){const g=v*(i+1);for(let m=0;m<i;m++){const M=m+g,b=M,_=M+i+1,S=M+i+2,y=M+1;o.push(b,_,y),o.push(_,S,y)}}this.setIndex(o),this.setAttribute("position",new ie(l,3)),this.setAttribute("normal",new ie(c,3)),this.setAttribute("uv",new ie(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Qi extends ce{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new A,h=new A,d=[],p=[],v=[],g=[];for(let m=0;m<=i;m++){const M=[],b=m/i,_=a+b*o,S=t*Math.cos(_),y=Math.sqrt(t*t-S*S);let T=0;m===0&&a===0?T=.5/e:m===i&&l===Math.PI&&(T=-.5/e);for(let x=0;x<=e;x++){const E=x/e,C=n+E*r;f.x=-y*Math.cos(C),f.y=S,f.z=y*Math.sin(C),p.push(f.x,f.y,f.z),h.copy(f).normalize(),v.push(h.x,h.y,h.z),g.push(E+T,1-b),M.push(c++)}u.push(M)}for(let m=0;m<i;m++)for(let M=0;M<e;M++){const b=u[m][M+1],_=u[m][M],S=u[m+1][M],y=u[m+1][M+1];(m!==0||a>0)&&d.push(b,_,y),(m!==i-1||l<Math.PI)&&d.push(_,S,y)}this.setIndex(d),this.setAttribute("position",new ie(p,3)),this.setAttribute("normal",new ie(v,3)),this.setAttribute("uv",new ie(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ga extends ce{constructor(t=1,e=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);const l=[],c=[],u=[],f=[],h=new A,d=new A,p=new A;for(let v=0;v<=i;v++){const g=a+v/i*o;for(let m=0;m<=n;m++){const M=m/n*r;d.x=(t+e*Math.cos(g))*Math.cos(M),d.y=(t+e*Math.cos(g))*Math.sin(M),d.z=e*Math.sin(g),c.push(d.x,d.y,d.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),p.subVectors(d,h).normalize(),u.push(p.x,p.y,p.z),f.push(m/n),f.push(v/i)}}for(let v=1;v<=i;v++)for(let g=1;g<=n;g++){const m=(n+1)*v+g-1,M=(n+1)*(v-1)+g-1,b=(n+1)*(v-1)+g,_=(n+1)*v+g;l.push(m,M,_),l.push(M,b,_)}this.setIndex(l),this.setAttribute("position",new ie(c,3)),this.setAttribute("normal",new ie(u,3)),this.setAttribute("uv",new ie(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ga(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function Ar(s){const t={};for(const e in s){t[e]={};for(const i in s[e]){const n=s[e][i];if(Dd(n))n.isRenderTargetTexture?(Yt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone();else if(Array.isArray(n))if(Dd(n[0])){const r=[];for(let a=0,o=n.length;a<o;a++)r[a]=n[a].clone();t[e][i]=r}else t[e][i]=n.slice();else t[e][i]=n}}return t}function ui(s){const t={};for(let e=0;e<s.length;e++){const i=Ar(s[e]);for(const n in i)t[n]=i[n]}return t}function Dd(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function yy(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Wm(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const My={clone:Ar,merge:ui};var Sy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,by=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class he extends cs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sy,this.fragmentShader=by,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ar(t.uniforms),this.uniformsGroups=yy(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const n=t.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=e[n.value]||null;break;case"c":this.uniforms[i].value=new Ct().setHex(n.value);break;case"v2":this.uniforms[i].value=new lt().fromArray(n.value);break;case"v3":this.uniforms[i].value=new A().fromArray(n.value);break;case"v4":this.uniforms[i].value=new De().fromArray(n.value);break;case"m3":this.uniforms[i].value=new $t().fromArray(n.value);break;case"m4":this.uniforms[i].value=new le().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class wy extends he{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Xa extends cs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ku,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ey extends cs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=B_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ty extends cs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Dy extends pl{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class Xm extends Ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ct(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const Sc=new le,Ad=new A,Cd=new A;class Ay{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=Ei,this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hh,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new De(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Ad.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ad),Cd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Cd),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,n){Sc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Sc,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=n?n.z/r.x:1,o=n?n.w/r.y:1,l=n?n.x/r.x:0,c=n?n.y/r.y:0;t.coordinateSystem===Fa||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Sc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const To=new A,Do=new Ri,en=new A;class qm extends Ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(To,Do,en),en.x===1&&en.y===1&&en.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(To,Do,en.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(To,Do,en),en.x===1&&en.y===1&&en.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(To,Do,en.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $n=new A,Pd=new lt,Rd=new lt;class bi extends qm{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ia*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ha*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ia*2*Math.atan(Math.tan(ha*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,Pd,Rd),e.subVectors(Rd,Pd)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ha*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Cy extends Ay{constructor(){super(new bi(90,1,.5,500)),this.isPointLightShadow=!0}}class Py extends Xm{constructor(t,e,i=0,n=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new Cy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Ll extends qm{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ry extends Xm{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ly extends ce{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}const er=-90,ir=1;class Fy extends Ve{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new bi(er,ir,t,e);n.layers=this.layers,this.add(n);const r=new bi(er,ir,t,e);r.layers=this.layers,this.add(r);const a=new bi(er,ir,t,e);a.layers=this.layers,this.add(a);const o=new bi(er,ir,t,e);o.layers=this.layers,this.add(o);const l=new bi(er,ir,t,e);l.layers=this.layers,this.add(l);const c=new bi(er,ir,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===gn)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Fa)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(i,0,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,n),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Iy extends bi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Ld=new le;class Ny{constructor(t,e,i=0,n=1/0){this.ray=new Dl(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new Vh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):se("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ld.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ld),this}intersectObject(t,e=!0,i=[]){return eh(t,this,i,e),i.sort(Fd),i}intersectObjects(t,e=!0,i=[]){for(let n=0,r=t.length;n<r;n++)eh(t[n],this,i,e);return i.sort(Fd),i}}function Fd(s,t){return s.distance-t.distance}function eh(s,t,e,i){let n=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)eh(r[a],t,e,!0)}}const sf=class sf{constructor(t,e,i,n){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,n){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=n,this}};sf.prototype.isMatrix2=!0;let Id=sf;function Nd(s,t,e,i){const n=Uy(i);switch(e){case Mm:return s*t;case Fh:return s*t/n.components*n.byteLength;case Ih:return s*t/n.components*n.byteLength;case Ls:return s*t*2/n.components*n.byteLength;case Nh:return s*t*2/n.components*n.byteLength;case Sm:return s*t*3/n.components*n.byteLength;case Ji:return s*t*4/n.components*n.byteLength;case Uh:return s*t*4/n.components*n.byteLength;case $o:case Ko:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Zo:case Jo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case yu:case Su:return Math.max(s,16)*Math.max(t,8)/4;case xu:case Mu:return Math.max(s,8)*Math.max(t,8)/2;case bu:case wu:case Tu:case Du:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Eu:case ll:case Au:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Cu:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Pu:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ru:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Lu:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Fu:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Iu:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Nu:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Uu:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ou:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Bu:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case ku:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case zu:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Vu:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Gu:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Hu:case Wu:case Xu:return Math.ceil(s/4)*Math.ceil(t/4)*16;case qu:case Yu:return Math.ceil(s/4)*Math.ceil(t/4)*8;case cl:case $u:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Uy(s){switch(s){case Ei:case vm:return{byteLength:1,components:1};case Pa:case _m:case Mn:return{byteLength:2,components:1};case Rh:case Lh:return{byteLength:2,components:4};case yn:case Ph:case Zi:return{byteLength:4,components:1};case xm:case ym:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ch}}));typeof window<"u"&&(window.__THREE__?Yt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ch);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ym(){let s=null,t=!1,e=null,i=null;function n(r,a){i=s.requestAnimationFrame(n),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Oy(s){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=s.createBuffer();s.bindBuffer(l,h),s.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(s.bindBuffer(c,o),f.length===0)s.bufferSubData(c,0,u);else{f.sort((d,p)=>d.start-p.start);let h=0;for(let d=1;d<f.length;d++){const p=f[h],v=f[d];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++h,f[h]=v)}f.length=h+1;for(let d=0,p=f.length;d<p;d++){const v=f[d];s.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var By=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ky=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Xy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Yy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$y=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ky=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Jy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,t1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,e1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,i1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,s1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,r1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,a1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,o1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,l1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,c1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,u1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,f1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,d1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,p1="gl_FragColor = linearToOutputTexel( gl_FragColor );",m1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,g1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,v1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,x1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,y1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,M1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,S1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,b1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,E1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,T1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,D1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,A1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,C1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,P1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,R1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,L1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,F1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,I1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,N1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,U1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,O1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,B1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,k1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z1=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,V1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,G1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,X1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,q1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Y1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,K1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Z1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,J1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Q1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,j1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,eM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,oM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,lM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,uM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,pM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_M=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,MM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,SM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,EM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,TM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,DM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,AM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,CM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,PM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,RM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,LM=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,FM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,IM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,NM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,UM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,OM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const BM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,XM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,YM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$M=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,KM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,JM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,aS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,cS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qt={alphahash_fragment:By,alphahash_pars_fragment:ky,alphamap_fragment:zy,alphamap_pars_fragment:Vy,alphatest_fragment:Gy,alphatest_pars_fragment:Hy,aomap_fragment:Wy,aomap_pars_fragment:Xy,batching_pars_vertex:qy,batching_vertex:Yy,begin_vertex:$y,beginnormal_vertex:Ky,bsdfs:Zy,iridescence_fragment:Jy,bumpmap_pars_fragment:Qy,clipping_planes_fragment:jy,clipping_planes_pars_fragment:t1,clipping_planes_pars_vertex:e1,clipping_planes_vertex:i1,color_fragment:n1,color_pars_fragment:s1,color_pars_vertex:r1,color_vertex:a1,common:o1,cube_uv_reflection_fragment:l1,defaultnormal_vertex:c1,displacementmap_pars_vertex:u1,displacementmap_vertex:h1,emissivemap_fragment:f1,emissivemap_pars_fragment:d1,colorspace_fragment:p1,colorspace_pars_fragment:m1,envmap_fragment:g1,envmap_common_pars_fragment:v1,envmap_pars_fragment:_1,envmap_pars_vertex:x1,envmap_physical_pars_fragment:P1,envmap_vertex:y1,fog_vertex:M1,fog_pars_vertex:S1,fog_fragment:b1,fog_pars_fragment:w1,gradientmap_pars_fragment:E1,lightmap_pars_fragment:T1,lights_lambert_fragment:D1,lights_lambert_pars_fragment:A1,lights_pars_begin:C1,lights_toon_fragment:R1,lights_toon_pars_fragment:L1,lights_phong_fragment:F1,lights_phong_pars_fragment:I1,lights_physical_fragment:N1,lights_physical_pars_fragment:U1,lights_fragment_begin:O1,lights_fragment_maps:B1,lights_fragment_end:k1,lightprobes_pars_fragment:z1,logdepthbuf_fragment:V1,logdepthbuf_pars_fragment:G1,logdepthbuf_pars_vertex:H1,logdepthbuf_vertex:W1,map_fragment:X1,map_pars_fragment:q1,map_particle_fragment:Y1,map_particle_pars_fragment:$1,metalnessmap_fragment:K1,metalnessmap_pars_fragment:Z1,morphinstance_vertex:J1,morphcolor_vertex:Q1,morphnormal_vertex:j1,morphtarget_pars_vertex:tM,morphtarget_vertex:eM,normal_fragment_begin:iM,normal_fragment_maps:nM,normal_pars_fragment:sM,normal_pars_vertex:rM,normal_vertex:aM,normalmap_pars_fragment:oM,clearcoat_normal_fragment_begin:lM,clearcoat_normal_fragment_maps:cM,clearcoat_pars_fragment:uM,iridescence_pars_fragment:hM,opaque_fragment:fM,packing:dM,premultiplied_alpha_fragment:pM,project_vertex:mM,dithering_fragment:gM,dithering_pars_fragment:vM,roughnessmap_fragment:_M,roughnessmap_pars_fragment:xM,shadowmap_pars_fragment:yM,shadowmap_pars_vertex:MM,shadowmap_vertex:SM,shadowmask_pars_fragment:bM,skinbase_vertex:wM,skinning_pars_vertex:EM,skinning_vertex:TM,skinnormal_vertex:DM,specularmap_fragment:AM,specularmap_pars_fragment:CM,tonemapping_fragment:PM,tonemapping_pars_fragment:RM,transmission_fragment:LM,transmission_pars_fragment:FM,uv_pars_fragment:IM,uv_pars_vertex:NM,uv_vertex:UM,worldpos_vertex:OM,background_vert:BM,background_frag:kM,backgroundCube_vert:zM,backgroundCube_frag:VM,cube_vert:GM,cube_frag:HM,depth_vert:WM,depth_frag:XM,distance_vert:qM,distance_frag:YM,equirect_vert:$M,equirect_frag:KM,linedashed_vert:ZM,linedashed_frag:JM,meshbasic_vert:QM,meshbasic_frag:jM,meshlambert_vert:tS,meshlambert_frag:eS,meshmatcap_vert:iS,meshmatcap_frag:nS,meshnormal_vert:sS,meshnormal_frag:rS,meshphong_vert:aS,meshphong_frag:oS,meshphysical_vert:lS,meshphysical_frag:cS,meshtoon_vert:uS,meshtoon_frag:hS,points_vert:fS,points_frag:dS,shadow_vert:pS,shadow_frag:mS,sprite_vert:gS,sprite_frag:vS},St={common:{diffuse:{value:new Ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new A},probesMax:{value:new A},probesResolution:{value:new A}},points:{diffuse:{value:new Ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Ct(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},ln={basic:{uniforms:ui([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:ui([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Ct(0)},envMapIntensity:{value:1}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:ui([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Ct(0)},specular:{value:new Ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:ui([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new Ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:ui([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new Ct(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:ui([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:ui([St.points,St.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:ui([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:ui([St.common,St.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:ui([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:ui([St.sprite,St.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distance:{uniforms:ui([St.common,St.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distance_vert,fragmentShader:Qt.distance_frag},shadow:{uniforms:ui([St.lights,St.fog,{color:{value:new Ct(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};ln.physical={uniforms:ui([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Ct(0)},specularColor:{value:new Ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const Ao={r:0,b:0,g:0},_S=new le,$m=new $t;$m.set(-1,0,0,0,1,0,0,0,1);function xS(s,t,e,i,n,r){const a=new Ct(0);let o=n===!0?0:1,l,c,u=null,f=0,h=null;function d(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){const _=M.backgroundBlurriness>0;b=t.get(b,_)}return b}function p(M){let b=!1;const _=d(M);_===null?g(a,o):_&&_.isColor&&(g(_,1),b=!0);const S=s.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,r):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function v(M,b){const _=d(b);_&&(_.isCubeTexture||_.mapping===Tl)?(c===void 0&&(c=new ae(new Le(1,1,1),new he({name:"BackgroundCubeMaterial",uniforms:Ar(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,y,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(_S.makeRotationFromEuler(b.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply($m),c.material.toneMapped=re.getTransfer(_.colorSpace)!==me,(u!==_||f!==_.version||h!==s.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,h=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ae(new us(2,2),new he({name:"BackgroundMaterial",uniforms:Ar(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:Ps,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=re.getTransfer(_.colorSpace)!==me,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||h!==s.toneMapping)&&(l.material.needsUpdate=!0,u=_,f=_.version,h=s.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,b){M.getRGB(Ao,Wm(s)),e.buffers.color.setClear(Ao.r,Ao.g,Ao.b,b,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(a,o)},render:p,addToRenderList:v,dispose:m}}function yS(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=h(null);let r=n,a=!1;function o(F,I,O,L,U){let V=!1;const H=f(F,L,O,I);r!==H&&(r=H,c(r.object)),V=d(F,L,O,U),V&&p(F,L,O,U),U!==null&&t.update(U,s.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,_(F,I,O,L),U!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function l(){return s.createVertexArray()}function c(F){return s.bindVertexArray(F)}function u(F){return s.deleteVertexArray(F)}function f(F,I,O,L){const U=L.wireframe===!0;let V=i[I.id];V===void 0&&(V={},i[I.id]=V);const H=F.isInstancedMesh===!0?F.id:0;let K=V[H];K===void 0&&(K={},V[H]=K);let Y=K[O.id];Y===void 0&&(Y={},K[O.id]=Y);let Q=Y[U];return Q===void 0&&(Q=h(l()),Y[U]=Q),Q}function h(F){const I=[],O=[],L=[];for(let U=0;U<e;U++)I[U]=0,O[U]=0,L[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:L,object:F,attributes:{},index:null}}function d(F,I,O,L){const U=r.attributes,V=I.attributes;let H=0;const K=O.getAttributes();for(const Y in K)if(K[Y].location>=0){const j=U[Y];let dt=V[Y];if(dt===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(dt=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(dt=F.instanceColor)),j===void 0||j.attribute!==dt||dt&&j.data!==dt.data)return!0;H++}return r.attributesNum!==H||r.index!==L}function p(F,I,O,L){const U={},V=I.attributes;let H=0;const K=O.getAttributes();for(const Y in K)if(K[Y].location>=0){let j=V[Y];j===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(j=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(j=F.instanceColor));const dt={};dt.attribute=j,j&&j.data&&(dt.data=j.data),U[Y]=dt,H++}r.attributes=U,r.attributesNum=H,r.index=L}function v(){const F=r.newAttributes;for(let I=0,O=F.length;I<O;I++)F[I]=0}function g(F){m(F,0)}function m(F,I){const O=r.newAttributes,L=r.enabledAttributes,U=r.attributeDivisors;O[F]=1,L[F]===0&&(s.enableVertexAttribArray(F),L[F]=1),U[F]!==I&&(s.vertexAttribDivisor(F,I),U[F]=I)}function M(){const F=r.newAttributes,I=r.enabledAttributes;for(let O=0,L=I.length;O<L;O++)I[O]!==F[O]&&(s.disableVertexAttribArray(O),I[O]=0)}function b(F,I,O,L,U,V,H){H===!0?s.vertexAttribIPointer(F,I,O,U,V):s.vertexAttribPointer(F,I,O,L,U,V)}function _(F,I,O,L){v();const U=L.attributes,V=O.getAttributes(),H=I.defaultAttributeValues;for(const K in V){const Y=V[K];if(Y.location>=0){let Q=U[K];if(Q===void 0&&(K==="instanceMatrix"&&F.instanceMatrix&&(Q=F.instanceMatrix),K==="instanceColor"&&F.instanceColor&&(Q=F.instanceColor)),Q!==void 0){const j=Q.normalized,dt=Q.itemSize,Et=t.get(Q);if(Et===void 0)continue;const Xt=Et.buffer,qt=Et.type,jt=Et.bytesPerElement,J=qt===s.INT||qt===s.UNSIGNED_INT||Q.gpuType===Ph;if(Q.isInterleavedBufferAttribute){const et=Q.data,gt=et.stride,Vt=Q.offset;if(et.isInstancedInterleavedBuffer){for(let Dt=0;Dt<Y.locationSize;Dt++)m(Y.location+Dt,et.meshPerAttribute);F.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Dt=0;Dt<Y.locationSize;Dt++)g(Y.location+Dt);s.bindBuffer(s.ARRAY_BUFFER,Xt);for(let Dt=0;Dt<Y.locationSize;Dt++)b(Y.location+Dt,dt/Y.locationSize,qt,j,gt*jt,(Vt+dt/Y.locationSize*Dt)*jt,J)}else{if(Q.isInstancedBufferAttribute){for(let et=0;et<Y.locationSize;et++)m(Y.location+et,Q.meshPerAttribute);F.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let et=0;et<Y.locationSize;et++)g(Y.location+et);s.bindBuffer(s.ARRAY_BUFFER,Xt);for(let et=0;et<Y.locationSize;et++)b(Y.location+et,dt/Y.locationSize,qt,j,dt*jt,dt/Y.locationSize*et*jt,J)}}else if(H!==void 0){const j=H[K];if(j!==void 0)switch(j.length){case 2:s.vertexAttrib2fv(Y.location,j);break;case 3:s.vertexAttrib3fv(Y.location,j);break;case 4:s.vertexAttrib4fv(Y.location,j);break;default:s.vertexAttrib1fv(Y.location,j)}}}}M()}function S(){E();for(const F in i){const I=i[F];for(const O in I){const L=I[O];for(const U in L){const V=L[U];for(const H in V)u(V[H].object),delete V[H];delete L[U]}}delete i[F]}}function y(F){if(i[F.id]===void 0)return;const I=i[F.id];for(const O in I){const L=I[O];for(const U in L){const V=L[U];for(const H in V)u(V[H].object),delete V[H];delete L[U]}}delete i[F.id]}function T(F){for(const I in i){const O=i[I];for(const L in O){const U=O[L];if(U[F.id]===void 0)continue;const V=U[F.id];for(const H in V)u(V[H].object),delete V[H];delete U[F.id]}}}function x(F){for(const I in i){const O=i[I],L=F.isInstancedMesh===!0?F.id:0,U=O[L];if(U!==void 0){for(const V in U){const H=U[V];for(const K in H)u(H[K].object),delete H[K];delete U[V]}delete O[L],Object.keys(O).length===0&&delete i[I]}}}function E(){C(),a=!0,r!==n&&(r=n,c(r.object))}function C(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:E,resetDefaultState:C,dispose:S,releaseStatesOfGeometry:y,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function MS(s,t,e){let i;function n(l){i=l}function r(l,c){s.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,u){u!==0&&(s.drawArraysInstanced(i,l,c,u),e.update(c,i,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let d=0;d<u;d++)h+=c[d];e.update(h,i,1)}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function SS(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(T){return!(T!==Ji&&i.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const x=T===Mn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Ei&&T!==Zi&&!x&&i.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(Yt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Yt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=s.getParameter(s.MAX_SAMPLES),y=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:_,maxSamples:S,samples:y}}function bS(s){const t=this;let e=null,i=0,n=!1,r=!1;const a=new Kn,o=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||n;return n=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const p=f.clippingPlanes,v=f.clipIntersection,g=f.clipShadows,m=s.get(f);if(!n||p===null||p.length===0||r&&!g)r?u(null):c();else{const M=r?0:i,b=M*4;let _=m.clippingState||null;l.value=_,_=u(p,h,b,d);for(let S=0;S!==b;++S)_[S]=e[S];m.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,p){const v=f!==null?f.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=d+v*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,_=d;b!==v;++b,_+=4)a.copy(f[b]).applyMatrix4(M,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}const dr=4,wS=6,ES=20,TS=256,Hr=new Ll,Ud=new Ct;let bc=null,wc=0,Ec=0,Tc=!1;const DS=new A,_s=new A;class Od{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){const{size:a=256,position:o=DS}=r;bc=this._renderer.getRenderTarget(),wc=this._renderer.getActiveCubeFace(),Ec=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(bc,wc,Ec),this._renderer.xr.enabled=Tc,t.scissorTest=!1,nr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Rs||t.mapping===Tr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),bc=this._renderer.getRenderTarget(),wc=this._renderer.getActiveCubeFace(),Ec=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Oe,minFilter:Oe,generateMipmaps:!1,type:Mn,format:Ji,colorSpace:La,depthBuffer:!1},n=Bd(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bd(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=AS(r)),this._blurMaterial=PS(r,t,e),this._ggxMaterial=CS(r,t,e)}return n}_compileMaterial(t){const e=new ae(new ce,t);this._renderer.compile(e,Hr)}_sceneToCubeUV(t,e,i,n,r){const l=new bi(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,d=f.toneMapping;f.getClearColor(Ud),f.toneMapping=vn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(n),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ae(new Le,new Gh({name:"PMREM.Background",side:ti,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,g=v.material;let m=!1;const M=t.background;M?M.isColor&&(g.color.copy(M),t.background=null,m=!0):(g.color.copy(Ud),m=!0);for(let b=0;b<6;b++){const _=b%3;_===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[b],r.y,r.z)):_===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[b]));const S=this._cubeSize;nr(n,_*S,b>2?S:0,S,S),f.setRenderTarget(n),m&&f.render(v,l),f.render(t,l)}f.toneMapping=d,f.autoClear=h,t.background=M}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===Rs||t.mapping===Tr;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=zd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kd());const r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;nr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Hr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=c*1.25,d=f*h,{_lodMax:p}=this,v=this._sizeLods[i],g=3*v*(i>p-dr?i-p+dr:0),m=4*(this._cubeSize-v);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=p-e,nr(r,g,m,3*v,2*v),n.setRenderTarget(r),n.render(o,Hr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-i,nr(t,g,m,3*v,2*v),n.setRenderTarget(t),n.render(o,Hr)}_blur(t,e,i,n){const r=this._pingPongRenderTarget,a=Math.min(n,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,n,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[n];l.material=o;const c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[n],f=3*u*(n>this._lodMax-dr?n-this._lodMax+dr:0),h=4*(this._cubeSize-u);nr(e,f,h,3*u,2*u),a.setRenderTarget(e),a.render(l,Hr)}}function AS(s){const t=[],e=[];let i=s;const n=s-dr+1+wS;for(let r=0;r<n;r++){const a=Math.pow(2,i);t.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,h=6,d=3,p=new Float32Array(d*h*f),v=new Float32Array(d*h*f);for(let m=0;m<f;m++){const M=m%3*2/3-1,b=m>2?0:-1,_=[M,b,0,M+2/3,b,0,M+2/3,b+1,0,M,b,0,M+2/3,b+1,0,M,b+1,0];p.set(_,d*h*m);for(let S=0;S<h;S++){const y=u[S*2]*2-1,T=u[S*2+1]*2-1;m===0?_s.set(1,T,y):m===1?_s.set(-y,1,-T):m===2?_s.set(-y,T,1):m===3?_s.set(-1,T,-y):m===4?_s.set(-y,-1,T):_s.set(y,T,-1),_s.toArray(v,(m*h+S)*d)}}const g=new ce;g.setAttribute("position",new Wt(p,d)),g.setAttribute("outputDirection",new Wt(v,d)),e.push(new ae(g,null)),i>dr&&i--}return{lodMeshes:e,sizeLods:t}}function Bd(s,t,e){const i=new zi(s,t,e);return i.texture.mapping=Tl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function nr(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function CS(s,t,e){return new he({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:TS,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function PS(s,t,e){return new he({name:"SphericalGaussianBlur",defines:{SAMPLES:ES,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Fl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function kd(){return new he({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function zd(){return new he({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Fl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Km extends zi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Im(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Le(5,5,5),r=new he({name:"CubemapFromEquirect",uniforms:Ar(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ti,blending:Nn});r.uniforms.tEquirect.value=e;const a=new ae(n,r),o=e.minFilter;return e.minFilter===mn&&(e.minFilter=Oe),new Fy(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}}function RS(s){let t=new WeakMap,e=new WeakMap,i=null;function n(h,d=!1){return h==null?null:d?a(h):r(h)}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Yl||d===$l)if(t.has(h)){const p=t.get(h).texture;return o(p,h.mapping)}else{const p=h.image;if(p&&p.height>0){const v=new Km(p.height);return v.fromEquirectangularTexture(s,h),t.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,p=d===Yl||d===$l,v=d===Rs||d===Tr;if(p||v){let g=e.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new Od(s)),g=p?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{const M=h.image;return p&&M&&M.height>0||v&&M&&l(M)?(i===null&&(i=new Od(s)),g=p?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,d){return d===Yl?h.mapping=Rs:d===$l&&(h.mapping=Tr),h}function l(h){let d=0;const p=6;for(let v=0;v<p;v++)h[v]!==void 0&&d++;return d===p}function c(h){const d=h.target;d.removeEventListener("dispose",c);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:f}}function LS(s){const t={};function e(i){if(t[i]!==void 0)return t[i];const n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&xr("WebGLRenderer: "+i+" extension not supported."),n}}}function FS(s,t,e,i){const n={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const p in h.attributes)t.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete n[h.id];const d=r.get(h);d&&(t.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return n[h.id]===!0||(h.addEventListener("dispose",a),n[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const d in h)t.update(h[d],s.ARRAY_BUFFER)}function c(f){const h=[],d=f.index,p=f.attributes.position;let v=0;if(p===void 0)return;if(d!==null){const M=d.array;v=d.version;for(let b=0,_=M.length;b<_;b+=3){const S=M[b+0],y=M[b+1],T=M[b+2];h.push(S,y,y,T,T,S)}}else{const M=p.array;v=p.version;for(let b=0,_=M.length/3-1;b<_;b+=3){const S=b+0,y=b+1,T=b+2;h.push(S,y,y,T,T,S)}}const g=new(p.count>=65535?Am:Dm)(h,1);g.version=v;const m=r.get(f);m&&t.remove(m),r.set(f,g)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function IS(s,t,e){let i;function n(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){s.drawElements(i,h,r,f*a),e.update(h,i,1)}function c(f,h,d){d!==0&&(s.drawElementsInstanced(i,h,r,f*a,d),e.update(h,i,d))}function u(f,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,d);let v=0;for(let g=0;g<d;g++)v+=h[g];e.update(v,i,1)}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function NS(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:se("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function US(s,t,e){const i=new WeakMap,n=new De;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let E=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();const d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let b=0;d===!0&&(b=1),p===!0&&(b=2),v===!0&&(b=3);let _=o.attributes.position.count*b,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const y=new Float32Array(_*S*4*f),T=new Em(y,_,S,f);T.type=Zi,T.needsUpdate=!0;const x=b*4;for(let C=0;C<f;C++){const F=g[C],I=m[C],O=M[C],L=_*S*4*C;for(let U=0;U<F.count;U++){const V=U*x;d===!0&&(n.fromBufferAttribute(F,U),y[L+V+0]=n.x,y[L+V+1]=n.y,y[L+V+2]=n.z,y[L+V+3]=0),p===!0&&(n.fromBufferAttribute(I,U),y[L+V+4]=n.x,y[L+V+5]=n.y,y[L+V+6]=n.z,y[L+V+7]=0),v===!0&&(n.fromBufferAttribute(O,U),y[L+V+8]=n.x,y[L+V+9]=n.y,y[L+V+10]=n.z,y[L+V+11]=O.itemSize===4?n.w:1)}}h={count:f,texture:T,size:new lt(_,S)},i.set(o,h),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];const p=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",h.size)}return{update:r}}function OS(s,t,e,i,n){let r=new WeakMap;function a(c){const u=n.render.frame,f=c.geometry,h=t.get(c,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}const BS={[cm]:"LINEAR_TONE_MAPPING",[um]:"REINHARD_TONE_MAPPING",[hm]:"CINEON_TONE_MAPPING",[fm]:"ACES_FILMIC_TONE_MAPPING",[pm]:"AGX_TONE_MAPPING",[mm]:"NEUTRAL_TONE_MAPPING",[dm]:"CUSTOM_TONE_MAPPING"};function kS(s,t,e,i,n,r){const a=new zi(t,e,{type:s,depthBuffer:n,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new ce;c.setAttribute("position",new ie([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ie([0,2,0,0,2,0],2));const u=new wy({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new ae(c,u),h=new Ll(-1,1,1,-1,0,1);let d=null,p=null,v=!1,g,m=null,M=[],b=!1;this.setSize=function(_,S){a.setSize(_,S),o!==null&&o.setSize(_,S),l!==null&&l.setSize(_,S);for(let y=0;y<M.length;y++){const T=M[y];T.setSize&&T.setSize(_,S)}},this.setEffects=function(_){M=_,b=M.length>0&&M[0].isRenderPass===!0;const S=a.width,y=a.height;M.length>0&&o===null&&(o=new zi(S,y,{type:Mn,depthBuffer:!1,stencilBuffer:!1}),l=new zi(S,y,{type:Mn,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<M.length;T++){const x=M[T];x.setSize&&x.setSize(S,y)}},this.begin=function(_,S){if(v||_.toneMapping===vn&&M.length===0)return!1;if(m=S,S!==null){const y=S.width,T=S.height;(a.width!==y||a.height!==T)&&this.setSize(y,T)}return b===!1&&_.setRenderTarget(a),g=_.toneMapping,_.toneMapping=vn,!0},this.hasRenderPass=function(){return b},this.end=function(_,S){_.toneMapping=g,v=!0;let y=a,T=o;for(let x=0;x<M.length;x++){const E=M[x];E.enabled!==!1&&(E.render(_,T,y,S),E.needsSwap!==!1&&(y=T,T=T===o?l:o))}if(d!==_.outputColorSpace||p!==_.toneMapping){d=_.outputColorSpace,p=_.toneMapping,u.defines={},re.getTransfer(d)===me&&(u.defines.SRGB_TRANSFER="");const x=BS[p];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=y.texture,_.setRenderTarget(m),_.render(f,h),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const Zm=new ei,ih=new Na(1,1),Jm=new Em,Qm=new xx,jm=new Im,Vd=[],Gd=[],Hd=new Float32Array(16),Wd=new Float32Array(9),Xd=new Float32Array(4);function Rr(s,t,e){const i=s[0];if(i<=0||i>0)return s;const n=t*e;let r=Vd[n];if(r===void 0&&(r=new Float32Array(n),Vd[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function He(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function We(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Il(s,t){let e=Gd[t];e===void 0&&(e=new Int32Array(t),Gd[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function zS(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function VS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2fv(this.addr,t),We(e,t)}}function GS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;s.uniform3fv(this.addr,t),We(e,t)}}function HS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4fv(this.addr,t),We(e,t)}}function WS(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(He(e,i))return;Xd.set(i),s.uniformMatrix2fv(this.addr,!1,Xd),We(e,i)}}function XS(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(He(e,i))return;Wd.set(i),s.uniformMatrix3fv(this.addr,!1,Wd),We(e,i)}}function qS(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(He(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(He(e,i))return;Hd.set(i),s.uniformMatrix4fv(this.addr,!1,Hd),We(e,i)}}function YS(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function $S(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2iv(this.addr,t),We(e,t)}}function KS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3iv(this.addr,t),We(e,t)}}function ZS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4iv(this.addr,t),We(e,t)}}function JS(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function QS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;s.uniform2uiv(this.addr,t),We(e,t)}}function jS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;s.uniform3uiv(this.addr,t),We(e,t)}}function tb(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;s.uniform4uiv(this.addr,t),We(e,t)}}function eb(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(ih.compareFunction=e.isReversedDepthBuffer()?Bh:Oh,r=ih):r=Zm,e.setTexture2D(t||r,n)}function ib(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||Qm,n)}function nb(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||jm,n)}function sb(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Jm,n)}function rb(s){switch(s){case 5126:return zS;case 35664:return VS;case 35665:return GS;case 35666:return HS;case 35674:return WS;case 35675:return XS;case 35676:return qS;case 5124:case 35670:return YS;case 35667:case 35671:return $S;case 35668:case 35672:return KS;case 35669:case 35673:return ZS;case 5125:return JS;case 36294:return QS;case 36295:return jS;case 36296:return tb;case 35678:case 36198:case 36298:case 36306:case 35682:return eb;case 35679:case 36299:case 36307:return ib;case 35680:case 36300:case 36308:case 36293:return nb;case 36289:case 36303:case 36311:case 36292:return sb}}function ab(s,t){s.uniform1fv(this.addr,t)}function ob(s,t){const e=Rr(t,this.size,2);s.uniform2fv(this.addr,e)}function lb(s,t){const e=Rr(t,this.size,3);s.uniform3fv(this.addr,e)}function cb(s,t){const e=Rr(t,this.size,4);s.uniform4fv(this.addr,e)}function ub(s,t){const e=Rr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function hb(s,t){const e=Rr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function fb(s,t){const e=Rr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function db(s,t){s.uniform1iv(this.addr,t)}function pb(s,t){s.uniform2iv(this.addr,t)}function mb(s,t){s.uniform3iv(this.addr,t)}function gb(s,t){s.uniform4iv(this.addr,t)}function vb(s,t){s.uniform1uiv(this.addr,t)}function _b(s,t){s.uniform2uiv(this.addr,t)}function xb(s,t){s.uniform3uiv(this.addr,t)}function yb(s,t){s.uniform4uiv(this.addr,t)}function Mb(s,t,e){const i=this.cache,n=t.length,r=Il(e,n);He(i,r)||(s.uniform1iv(this.addr,r),We(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=ih:a=Zm;for(let o=0;o!==n;++o)e.setTexture2D(t[o]||a,r[o])}function Sb(s,t,e){const i=this.cache,n=t.length,r=Il(e,n);He(i,r)||(s.uniform1iv(this.addr,r),We(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||Qm,r[a])}function bb(s,t,e){const i=this.cache,n=t.length,r=Il(e,n);He(i,r)||(s.uniform1iv(this.addr,r),We(i,r));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||jm,r[a])}function wb(s,t,e){const i=this.cache,n=t.length,r=Il(e,n);He(i,r)||(s.uniform1iv(this.addr,r),We(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Jm,r[a])}function Eb(s){switch(s){case 5126:return ab;case 35664:return ob;case 35665:return lb;case 35666:return cb;case 35674:return ub;case 35675:return hb;case 35676:return fb;case 5124:case 35670:return db;case 35667:case 35671:return pb;case 35668:case 35672:return mb;case 35669:case 35673:return gb;case 5125:return vb;case 36294:return _b;case 36295:return xb;case 36296:return yb;case 35678:case 36198:case 36298:case 36306:case 35682:return Mb;case 35679:case 36299:case 36307:return Sb;case 35680:case 36300:case 36308:case 36293:return bb;case 36289:case 36303:case 36311:case 36292:return wb}}class Tb{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=rb(e.type)}}class Db{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Eb(e.type)}}class Ab{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(t,e[o.id],i)}}}const Dc=/(\w+)(\])?(\[|\.)?/g;function qd(s,t){s.seq.push(t),s.map[t.id]=t}function Cb(s,t,e){const i=s.name,n=i.length;for(Dc.lastIndex=0;;){const r=Dc.exec(i),a=Dc.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){qd(e,c===void 0?new Tb(o,s,t):new Db(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new Ab(o),qd(e,f)),e=f}}}class Qo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Cb(o,l,this)}const n=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(t,e,i,n){const r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,r=t.length;n!==r;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function Yd(s,t,e){const i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}const Pb=37297;let Rb=0;function Lb(s,t){const e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const $d=new $t;function Fb(s){re._getMatrix($d,re.workingColorSpace,s);const t=`mat3( ${$d.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(s)){case ul:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return Yt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Kd(s,t,e){const i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Lb(s.getShaderSource(t),o)}else return r}function Ib(s,t){const e=Fb(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Nb={[cm]:"Linear",[um]:"Reinhard",[hm]:"Cineon",[fm]:"ACESFilmic",[pm]:"AgX",[mm]:"Neutral",[dm]:"Custom"};function Ub(s,t){const e=Nb[t];return e===void 0?(Yt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Co=new A;function Ob(){re.getLuminanceCoefficients(Co);const s=Co.x.toFixed(4),t=Co.y.toFixed(4),e=Co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(sa).join(`
`)}function kb(s){const t=[];for(const e in s){const i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function zb(s,t){const e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(t,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function sa(s){return s!==""}function Zd(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Jd(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Vb=/^[ \t]*#include +<([\w\d./]+)>/gm;function nh(s){return s.replace(Vb,Hb)}const Gb=new Map;function Hb(s,t){let e=Qt[t];if(e===void 0){const i=Gb.get(t);if(i!==void 0)e=Qt[i],Yt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return nh(e)}const Wb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qd(s){return s.replace(Wb,Xb)}function Xb(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function jd(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const qb={[Yo]:"SHADOWMAP_TYPE_PCF",[ia]:"SHADOWMAP_TYPE_VSM"};function Yb(s){return qb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const $b={[Rs]:"ENVMAP_TYPE_CUBE",[Tr]:"ENVMAP_TYPE_CUBE",[Tl]:"ENVMAP_TYPE_CUBE_UV"};function Kb(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":$b[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const Zb={[Tr]:"ENVMAP_MODE_REFRACTION"};function Jb(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Zb[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Qb={[lm]:"ENVMAP_BLENDING_MULTIPLY",[N_]:"ENVMAP_BLENDING_MIX",[U_]:"ENVMAP_BLENDING_ADD"};function jb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Qb[s.combine]||"ENVMAP_BLENDING_NONE"}function tw(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function ew(s,t,e,i){const n=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Yb(e),c=Kb(e),u=Jb(e),f=jb(e),h=tw(e),d=Bb(e),p=kb(r),v=n.createProgram();let g,m,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(sa).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(sa).join(`
`),m.length>0&&(m+=`
`)):(g=[jd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sa).join(`
`),m=[jd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==vn?"#define TONE_MAPPING":"",e.toneMapping!==vn?Qt.tonemapping_pars_fragment:"",e.toneMapping!==vn?Ub("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,Ib("linearToOutputTexel",e.outputColorSpace),Ob(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(sa).join(`
`)),a=nh(a),a=Zd(a,e),a=Jd(a,e),o=nh(o),o=Zd(o,e),o=Jd(o,e),a=Qd(a),o=Qd(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Yf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=M+g+a,_=M+m+o,S=Yd(n,n.VERTEX_SHADER,b),y=Yd(n,n.FRAGMENT_SHADER,_);n.attachShader(v,S),n.attachShader(v,y),e.index0AttributeName!==void 0?n.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&n.bindAttribLocation(v,0,"position"),n.linkProgram(v);function T(F){if(s.debug.checkShaderErrors){const I=n.getProgramInfoLog(v)||"",O=n.getShaderInfoLog(S)||"",L=n.getShaderInfoLog(y)||"",U=I.trim(),V=O.trim(),H=L.trim();let K=!0,Y=!0;if(n.getProgramParameter(v,n.LINK_STATUS)===!1)if(K=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,v,S,y);else{const Q=Kd(n,S,"vertex"),j=Kd(n,y,"fragment");se("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(v,n.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+U+`
`+Q+`
`+j)}else U!==""?Yt("WebGLProgram: Program Info Log:",U):(V===""||H==="")&&(Y=!1);Y&&(F.diagnostics={runnable:K,programLog:U,vertexShader:{log:V,prefix:g},fragmentShader:{log:H,prefix:m}})}n.deleteShader(S),n.deleteShader(y),x=new Qo(n,v),E=zb(n,v)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=n.getProgramParameter(v,Pb)),C},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Rb++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=y,this}let iw=0;class nw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const n=this._getShaderCacheForMaterial(t);return n.has(e)===!1&&(n.add(e),e.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new sw(t),e.set(t,i)),i}}class sw{constructor(t){this.id=iw++,this.code=t,this.usedTimes=0}}function rw(s){return s===Ls||s===ll||s===cl}function aw(s,t,e,i,n,r){const a=new Vh,o=new nw,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,E,C,F,I,O){const L=F.fog,U=I.geometry,V=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?F.environment:null,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,K=t.get(x.envMap||V,H),Y=K&&K.mapping===Tl?K.image.height:null,Q=d[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&Yt("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const j=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,dt=j!==void 0?j.length:0;let Et=0;U.morphAttributes.position!==void 0&&(Et=1),U.morphAttributes.normal!==void 0&&(Et=2),U.morphAttributes.color!==void 0&&(Et=3);let Xt,qt,jt,J;if(Q){const Me=ln[Q];Xt=Me.vertexShader,qt=Me.fragmentShader}else{Xt=x.vertexShader,qt=x.fragmentShader;const Me=o.getVertexShaderStage(x),de=o.getFragmentShaderStage(x);o.update(x,Me,de),jt=Me.id,J=de.id}const et=s.getRenderTarget(),gt=s.state.buffers.depth.getReversed(),Vt=I.isInstancedMesh===!0,Dt=I.isBatchedMesh===!0,Gt=!!x.map,fe=!!x.matcap,nt=!!K,rt=!!x.aoMap,ct=!!x.lightMap,ut=!!x.bumpMap&&x.wireframe===!1,pt=!!x.normalMap,zt=!!x.displacementMap,k=!!x.emissiveMap,ot=!!x.metalnessMap,At=!!x.roughnessMap,N=x.anisotropy>0,ne=x.clearcoat>0,Kt=x.dispersion>0,R=x.retroreflectivity>0,w=x.iridescence>0,G=x.sheen>0,q=x.transmission>0,Z=N&&!!x.anisotropyMap,ht=ne&&!!x.clearcoatMap,mt=ne&&!!x.clearcoatNormalMap,tt=ne&&!!x.clearcoatRoughnessMap,st=w&&!!x.iridescenceMap,vt=w&&!!x.iridescenceThicknessMap,Ot=G&&!!x.sheenColorMap,Mt=G&&!!x.sheenRoughnessMap,_t=!!x.specularMap,Bt=!!x.specularColorMap,Ht=!!x.specularIntensityMap,Zt=q&&!!x.transmissionMap,z=q&&!!x.thicknessMap,xt=!!x.gradientMap,it=!!x.alphaMap,yt=x.alphaTest>0,Tt=!!x.alphaHash,at=!!x.extensions;let kt=vn;x.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(kt=s.toneMapping);const Nt={shaderID:Q,shaderType:x.type,shaderName:x.name,vertexShader:Xt,fragmentShader:qt,defines:x.defines,customVertexShaderID:jt,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:Dt,batchingColor:Dt&&I._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&I.instanceColor!==null,instancingMorph:Vt&&I.morphTexture!==null,outputColorSpace:et===null?s.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:re.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Gt,matcap:fe,envMap:nt,envMapMode:nt&&K.mapping,envMapCubeUVHeight:Y,aoMap:rt,lightMap:ct,bumpMap:ut,normalMap:pt,displacementMap:zt,emissiveMap:k,normalMapObjectSpace:pt&&x.normalMapType===k_,normalMapTangentSpace:pt&&x.normalMapType===Ku,packedNormalMap:pt&&x.normalMapType===Ku&&rw(x.normalMap.format),metalnessMap:ot,roughnessMap:At,anisotropy:N,anisotropyMap:Z,clearcoat:ne,clearcoatMap:ht,clearcoatNormalMap:mt,clearcoatRoughnessMap:tt,dispersion:Kt,retroreflection:R,iridescence:w,iridescenceMap:st,iridescenceThicknessMap:vt,sheen:G,sheenColorMap:Ot,sheenRoughnessMap:Mt,specularMap:_t,specularColorMap:Bt,specularIntensityMap:Ht,transmission:q,transmissionMap:Zt,thicknessMap:z,gradientMap:xt,opaque:x.transparent===!1&&x.blending===ua&&x.alphaToCoverage===!1,alphaMap:it,alphaTest:yt,alphaHash:Tt,combine:x.combine,mapUv:Gt&&p(x.map.channel),aoMapUv:rt&&p(x.aoMap.channel),lightMapUv:ct&&p(x.lightMap.channel),bumpMapUv:ut&&p(x.bumpMap.channel),normalMapUv:pt&&p(x.normalMap.channel),displacementMapUv:zt&&p(x.displacementMap.channel),emissiveMapUv:k&&p(x.emissiveMap.channel),metalnessMapUv:ot&&p(x.metalnessMap.channel),roughnessMapUv:At&&p(x.roughnessMap.channel),anisotropyMapUv:Z&&p(x.anisotropyMap.channel),clearcoatMapUv:ht&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:mt&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:st&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:vt&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&p(x.sheenRoughnessMap.channel),specularMapUv:_t&&p(x.specularMap.channel),specularColorMapUv:Bt&&p(x.specularColorMap.channel),specularIntensityMapUv:Ht&&p(x.specularIntensityMap.channel),transmissionMapUv:Zt&&p(x.transmissionMap.channel),thicknessMapUv:z&&p(x.thicknessMap.channel),alphaMapUv:it&&p(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(pt||N),vertexNormals:!!U.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!U.attributes.uv&&(Gt||it),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&pt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:gt,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:dt,morphTextureStride:Et,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:kt,decodeVideoTexture:Gt&&x.map.isVideoTexture===!0&&re.getTransfer(x.map.colorSpace)===me,decodeVideoTextureEmissive:k&&x.emissiveMap.isVideoTexture===!0&&re.getTransfer(x.emissiveMap.colorSpace)===me,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Yi,flipSided:x.side===ti,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:at&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&x.extensions.multiDraw===!0||Dt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Nt.vertexUv1s=l.has(1),Nt.vertexUv2s=l.has(2),Nt.vertexUv3s=l.has(3),l.clear(),Nt}function g(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)E.push(C),E.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(m(E,x),M(E,x),E.push(s.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function m(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function M(x,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function b(x){const E=d[x.type];let C;if(E){const F=ln[E];C=My.clone(F.uniforms)}else C=x.uniforms;return C}function _(x,E){let C=u.get(E);return C!==void 0?++C.usedTimes:(C=new ew(s,E,x,n),c.push(C),u.set(E,C)),C}function S(x){if(--x.usedTimes===0){const E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function y(x){o.remove(x)}function T(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:b,acquireProgram:_,releaseProgram:S,releaseShaderCache:y,programs:c,dispose:T}}function ow(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function lw(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function tp(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function ep(){const s=[];let t=0;const e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,p,v,g,m){let M=s[t];return M===void 0?(M={id:h.id,object:h,geometry:d,material:p,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:g,group:m},s[t]=M):(M.id=h.id,M.object=h,M.geometry=d,M.material=p,M.materialVariant=a(h),M.groupOrder=v,M.renderOrder=h.renderOrder,M.z=g,M.group=m),t++,M}function l(h,d,p,v,g,m,M){M.reversedDepth===!0&&(g=-g);const b=o(h,d,p,v,g,m);p.transmission>0?i.push(b):p.transparent===!0?n.push(b):e.push(b)}function c(h,d,p,v,g,m){const M=o(h,d,p,v,g,m);p.transmission>0?i.unshift(M):p.transparent===!0?n.unshift(M):e.unshift(M)}function u(h,d){e.length>1&&e.sort(h||lw),i.length>1&&i.sort(d||tp),n.length>1&&n.sort(d||tp)}function f(){for(let h=t,d=s.length;h<d;h++){const p=s[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:f,sort:u}}function cw(){let s=new WeakMap;function t(i,n){const r=s.get(i);let a;return r===void 0?(a=new ep,s.set(i,[a])):n>=r.length?(a=new ep,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function uw(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new A,color:new Ct};break;case"SpotLight":e={position:new A,direction:new A,color:new Ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Ct,groundColor:new Ct};break;case"RectAreaLight":e={color:new Ct,position:new A,halfWidth:new A,halfHeight:new A};break}return s[t.id]=e,e}}}function hw(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let fw=0;function dw(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function pw(s){const t=new uw,e=hw(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new A);const n=new A,r=new le,a=new le;function o(c){let u=0,f=0,h=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let d=0,p=0,v=0,g=0,m=0,M=0,b=0,_=0,S=0,y=0,T=0,x=0,E=0,C=0;c.sort(dw);for(let I=0,O=c.length;I<O;I++){const L=c[I],U=L.color,V=L.intensity,H=L.distance;let K=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ls?K=L.shadow.map.texture:K=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=U.r*V,f+=U.g*V,h+=U.b*V;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(L.sh.coefficients[Y],V);C++}else if(L.isSunLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Q=L.shadow,j=e.get(L);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),i.sunShadow[p]=j,i.sunShadowMap[p]=K;const dt=Q.getViewportCount();for(let Et=0;Et<dt;Et++)i.sunShadowMatrix[v+Et]=Q.getMatrix(Et),i.sunShadowCascade[v+Et]=Q._cascadeData[Et];v+=dt,p++}i.sun[d]=Y,d++}else if(L.isDirectionalLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Q=L.shadow,j=e.get(L);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.directionalShadow[g]=j,i.directionalShadowMap[g]=K,i.directionalShadowMatrix[g]=L.shadow.matrix,S++}i.directional[g]=Y,g++}else if(L.isSpotLight){const Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(U).multiplyScalar(V),Y.distance=H,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,i.spot[M]=Y;const Q=L.shadow;if(L.map&&(i.spotLightMap[x]=L.map,x++,Q.updateMatrices(L),L.castShadow&&E++),i.spotLightMatrix[M]=Q.matrix,L.castShadow){const j=e.get(L);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,i.spotShadow[M]=j,i.spotShadowMap[M]=K,T++}M++}else if(L.isRectAreaLight){const Y=t.get(L);Y.color.copy(U).multiplyScalar(V),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),i.rectArea[b]=Y,b++}else if(L.isPointLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const Q=L.shadow,j=e.get(L);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,j.shadowCameraNear=Q.camera.near,j.shadowCameraFar=Q.camera.far,i.pointShadow[m]=j,i.pointShadowMap[m]=K,i.pointShadowMatrix[m]=L.shadow.matrix,y++}i.point[m]=Y,m++}else if(L.isHemisphereLight){const Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(V),Y.groundColor.copy(L.groundColor).multiplyScalar(V),i.hemi[_]=Y,_++}}b>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=St.LTC_FLOAT_1,i.rectAreaLTC2=St.LTC_FLOAT_2):(i.rectAreaLTC1=St.LTC_HALF_1,i.rectAreaLTC2=St.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const F=i.hash;(F.sunLength!==d||F.directionalLength!==g||F.pointLength!==m||F.spotLength!==M||F.rectAreaLength!==b||F.hemiLength!==_||F.numSunShadows!==p||F.numDirectionalShadows!==S||F.numPointShadows!==y||F.numSpotShadows!==T||F.numSpotMaps!==x||F.numLightProbes!==C)&&(i.sun.length=d,i.directional.length=g,i.spot.length=M,i.rectArea.length=b,i.point.length=m,i.hemi.length=_,i.sunShadow.length=p,i.sunShadowMap.length=p,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.directionalShadowMatrix.length=S,i.pointShadow.length=y,i.pointShadowMap.length=y,i.pointShadowMatrix.length=y,i.spotShadow.length=T,i.spotShadowMap.length=T,i.spotLightMatrix.length=T+x-E,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,F.sunLength=d,F.directionalLength=g,F.pointLength=m,F.spotLength=M,F.rectAreaLength=b,F.hemiLength=_,F.numSunShadows=p,F.numDirectionalShadows=S,F.numPointShadows=y,F.numSpotShadows=T,F.numSpotMaps=x,F.numLightProbes=C,i.version=fw++)}function l(c,u){let f=0,h=0,d=0,p=0,v=0,g=0;const m=u.matrixWorldInverse;for(let M=0,b=c.length;M<b;M++){const _=c[M];if(_.isSunLight){const S=i.sun[f];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),f++}else if(_.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(m),h++}else if(_.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const S=i.rectArea[v];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),v++}else if(_.isPointLight){const S=i.point[d];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){const S=i.hemi[g];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function ip(s){const t=new pw(s),e=[],i=[],n=[];function r(h){f.camera=h,e.length=0,i.length=0,n.length=0}function a(h){e.push(h)}function o(h){i.push(h)}function l(h){n.push(h)}function c(){t.setup(e)}function u(h){t.setupView(e,h)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function mw(s){let t=new WeakMap;function e(n,r=0){const a=t.get(n);let o;return a===void 0?(o=new ip(s),t.set(n,[o])):r>=a.length?(o=new ip(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const gw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_w=[new A(1,0,0),new A(-1,0,0),new A(0,1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1)],xw=[new A(0,-1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1),new A(0,-1,0),new A(0,-1,0)],np=new le,Wr=new A,Ac=new A;function yw(s,t,e){let i=new Hh;const n=new lt,r=new lt,a=new De,o=new Ey,l=new Ty,c={},u=e.maxTextureSize,f={[Ps]:ti,[ti]:Ps,[Yi]:Yi},h=new he({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:gw,fragmentShader:vw}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const p=new ce;p.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ae(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yo;let m=this.type;this.render=function(y,T,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||y.length===0)return;this.type===g_&&(Yt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Yo);const E=s.getRenderTarget(),C=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),I=s.state;I.setBlending(Nn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const O=m!==this.type;O&&T.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(U=>U.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,U=y.length;L<U;L++){const V=y[L],H=V.shadow;if(H===void 0){Yt("WebGLShadowMap:",V,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;n.copy(H.mapSize);const K=H.getFrameExtents();n.multiply(K),r.copy(H.mapSize),(n.x>u||n.y>u)&&(n.x>u&&(r.x=Math.floor(u/K.x),n.x=r.x*K.x,H.mapSize.x=r.x),n.y>u&&(r.y=Math.floor(u/K.y),n.y=r.y*K.y,H.mapSize.y=r.y));const Y=s.state.buffers.depth.getReversed();if(H.camera._reversedDepth=Y,H.map===null||O===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===ia){if(V.isPointLight){Yt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new zi(n.x,n.y,{format:Ls,type:Mn,minFilter:Oe,magFilter:Oe,generateMipmaps:!1}),H.map.texture.name=V.name+".shadowMap",H.map.depthTexture=new Na(n.x,n.y,Zi),H.map.depthTexture.name=V.name+".shadowMapDepth",H.map.depthTexture.format=kn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Qe,H.map.depthTexture.magFilter=Qe}else V.isPointLight?(H.map=new Km(n.x),H.map.depthTexture=new zx(n.x,yn)):(H.map=new zi(n.x,n.y),H.map.depthTexture=new Na(n.x,n.y,yn)),H.map.depthTexture.name=V.name+".shadowMap",H.map.depthTexture.format=kn,this.type===Yo?(H.map.depthTexture.compareFunction=Y?Bh:Oh,H.map.depthTexture.minFilter=Oe,H.map.depthTexture.magFilter=Oe):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Qe,H.map.depthTexture.magFilter=Qe);H.camera.updateProjectionMatrix()}H.map.isWebGLCubeRenderTarget!==!0&&(H.map.width!==n.x||H.map.height!==n.y)&&H.map.setSize(n.x,n.y);const Q=H.map.isWebGLCubeRenderTarget?6:H.getViewportCount();V.isPointLight!==!0&&H.updateMatrices(V,x);for(let j=0;j<Q;j++){const dt=H.getCamera(j);if(V.isPointLight){const Et=H.camera,Xt=H.matrix,qt=V.distance||Et.far;qt!==Et.far&&(Et.far=qt,Et.updateProjectionMatrix()),Wr.setFromMatrixPosition(V.matrixWorld),Et.position.copy(Wr),Ac.copy(Et.position),Ac.add(_w[j]),Et.up.copy(xw[j]),Et.lookAt(Ac),Et.updateMatrixWorld(),Xt.makeTranslation(-Wr.x,-Wr.y,-Wr.z),np.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),H._frustum.setFromProjectionMatrix(np,Et.coordinateSystem,Et.reversedDepth)}if(H.map.isWebGLCubeRenderTarget)s.setRenderTarget(H.map,j),s.clear();else{j===0&&(s.setRenderTarget(H.map),s.clear());const Et=H.getViewport(j);a.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),I.viewport(a)}i=H.getFrustum(j),_(T,x,dt,V,this.type)}H.isPointLightShadow!==!0&&this.type===ia&&M(H,x),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(E,C,F)};function M(y,T){const x=t.update(v);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,d.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),y.mapPass===null?y.mapPass=new zi(n.x,n.y,{format:Ls,type:Mn}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),h.uniforms.shadow_pass.value=y.map.depthTexture,h.uniforms.resolution.value.set(y.map.width,y.map.height),h.uniforms.radius.value=y.radius,s.setRenderTarget(y.mapPass),s.clear(),s.renderBufferDirect(T,null,x,h,v,null),d.uniforms.shadow_pass.value=y.mapPass.texture,d.uniforms.resolution.value.set(y.map.width,y.map.height),d.uniforms.radius.value=y.radius,s.setRenderTarget(y.map),s.clear(),s.renderBufferDirect(T,null,x,d,v,null)}function b(y,T,x,E){let C=null;const F=x.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(F!==void 0)C=F;else if(C=x.isPointLight===!0?l:o,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const I=C.uuid,O=T.uuid;let L=c[I];L===void 0&&(L={},c[I]=L);let U=L[O];U===void 0&&(U=C.clone(),L[O]=U,T.addEventListener("dispose",S)),C=U}if(C.visible=T.visible,C.wireframe=T.wireframe,E===ia?C.side=T.shadowSide!==null?T.shadowSide:T.side:C.side=T.shadowSide!==null?T.shadowSide:f[T.side],C.alphaMap=T.alphaMap,C.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,C.map=T.map,C.clipShadows=T.clipShadows,C.clippingPlanes=T.clippingPlanes,C.clipIntersection=T.clipIntersection,C.displacementMap=T.displacementMap,C.displacementScale=T.displacementScale,C.displacementBias=T.displacementBias,C.wireframeLinewidth=T.wireframeLinewidth,C.linewidth=T.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const I=s.properties.get(C);I.light=x}return C}function _(y,T,x,E,C){if(y.visible===!1)return;if(y.layers.test(T.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&C===ia)&&(!y.frustumCulled||y.intersectsFrustum(i))){y.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,y.matrixWorld);const O=t.update(y),L=y.material;if(Array.isArray(L)){const U=O.groups;for(let V=0,H=U.length;V<H;V++){const K=U[V],Y=L[K.materialIndex];if(Y&&Y.visible){const Q=b(y,Y,E,C);y.onBeforeShadow(s,y,T,x,O,Q,K),s.renderBufferDirect(x,null,O,Q,y,K),y.onAfterShadow(s,y,T,x,O,Q,K)}}}else if(L.visible){const U=b(y,L,E,C);y.onBeforeShadow(s,y,T,x,O,U,null),s.renderBufferDirect(x,null,O,U,y,null),y.onAfterShadow(s,y,T,x,O,U,null)}}const I=y.children;for(let O=0,L=I.length;O<L;O++)_(I[O],T,x,E,C)}function S(y){y.target.removeEventListener("dispose",S);for(const x in c){const E=c[x],C=y.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function Mw(s,t){function e(){let z=!1;const xt=new De;let it=null;const yt=new De(0,0,0,0);return{setMask:function(Tt){it!==Tt&&!z&&(s.colorMask(Tt,Tt,Tt,Tt),it=Tt)},setLocked:function(Tt){z=Tt},setClear:function(Tt,at,kt,Nt,Me){Me===!0&&(Tt*=Nt,at*=Nt,kt*=Nt),xt.set(Tt,at,kt,Nt),yt.equals(xt)===!1&&(s.clearColor(Tt,at,kt,Nt),yt.copy(xt))},reset:function(){z=!1,it=null,yt.set(-1,0,0,0)}}}function i(){let z=!1,xt=!1,it=null,yt=null,Tt=null;return{setReversed:function(at){if(xt!==at){const kt=t.get("EXT_clip_control");at?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),xt=at;const Nt=Tt;Tt=null,this.setClear(Nt)}},getReversed:function(){return xt},setTest:function(at){at?et(s.DEPTH_TEST):gt(s.DEPTH_TEST)},setMask:function(at){it!==at&&!z&&(s.depthMask(at),it=at)},setFunc:function(at){if(xt&&(at=J_[at]),yt!==at){switch(at){case hu:s.depthFunc(s.NEVER);break;case fu:s.depthFunc(s.ALWAYS);break;case du:s.depthFunc(s.LESS);break;case Ca:s.depthFunc(s.LEQUAL);break;case pu:s.depthFunc(s.EQUAL);break;case mu:s.depthFunc(s.GEQUAL);break;case gu:s.depthFunc(s.GREATER);break;case vu:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}yt=at}},setLocked:function(at){z=at},setClear:function(at){Tt!==at&&(Tt=at,xt&&(at=1-at),s.clearDepth(at))},reset:function(){z=!1,it=null,yt=null,Tt=null,xt=!1}}}function n(){let z=!1,xt=null,it=null,yt=null,Tt=null,at=null,kt=null,Nt=null,Me=null;return{setTest:function(de){z||(de?et(s.STENCIL_TEST):gt(s.STENCIL_TEST))},setMask:function(de){xt!==de&&!z&&(s.stencilMask(de),xt=de)},setFunc:function(de,Gi,ji){(it!==de||yt!==Gi||Tt!==ji)&&(s.stencilFunc(de,Gi,ji),it=de,yt=Gi,Tt=ji)},setOp:function(de,Gi,ji){(at!==de||kt!==Gi||Nt!==ji)&&(s.stencilOp(de,Gi,ji),at=de,kt=Gi,Nt=ji)},setLocked:function(de){z=de},setClear:function(de){Me!==de&&(s.clearStencil(de),Me=de)},reset:function(){z=!1,xt=null,it=null,yt=null,Tt=null,at=null,kt=null,Nt=null,Me=null}}}const r=new e,a=new i,o=new n,l=new WeakMap,c=new WeakMap;let u={},f={},h={},d=new WeakMap,p=[],v=null,g=!1,m=null,M=null,b=null,_=null,S=null,y=null,T=null,x=new Ct(0,0,0),E=0,C=!1,F=null,I=null,O=null,L=null,U=null;const V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,K=0;const Y=s.getParameter(s.VERSION);Y.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Y)[1]),H=K>=1):Y.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),H=K>=2);let Q=null,j={};const dt=s.getParameter(s.SCISSOR_BOX),Et=s.getParameter(s.VIEWPORT),Xt=new De().fromArray(dt),qt=new De().fromArray(Et);function jt(z,xt,it,yt){const Tt=new Uint8Array(4),at=s.createTexture();s.bindTexture(z,at),s.texParameteri(z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let kt=0;kt<it;kt++)z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY?s.texImage3D(xt,0,s.RGBA,1,1,yt,0,s.RGBA,s.UNSIGNED_BYTE,Tt):s.texImage2D(xt+kt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Tt);return at}const J={};J[s.TEXTURE_2D]=jt(s.TEXTURE_2D,s.TEXTURE_2D,1),J[s.TEXTURE_CUBE_MAP]=jt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[s.TEXTURE_2D_ARRAY]=jt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),J[s.TEXTURE_3D]=jt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(s.DEPTH_TEST),a.setFunc(Ca),ut(!1),pt(Wf),et(s.CULL_FACE),rt(Nn);function et(z){u[z]!==!0&&(s.enable(z),u[z]=!0)}function gt(z){u[z]!==!1&&(s.disable(z),u[z]=!1)}function Vt(z,xt){return h[z]!==xt?(s.bindFramebuffer(z,xt),h[z]=xt,z===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=xt),z===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=xt),!0):!1}function Dt(z,xt){let it=p,yt=!1;if(z){it=d.get(xt),it===void 0&&(it=[],d.set(xt,it));const Tt=z.textures;if(it.length!==Tt.length||it[0]!==s.COLOR_ATTACHMENT0){for(let at=0,kt=Tt.length;at<kt;at++)it[at]=s.COLOR_ATTACHMENT0+at;it.length=Tt.length,yt=!0}}else it[0]!==s.BACK&&(it[0]=s.BACK,yt=!0);yt&&s.drawBuffers(it)}function Gt(z){return v!==z?(s.useProgram(z),v=z,!0):!1}const fe={[lr]:s.FUNC_ADD,[__]:s.FUNC_SUBTRACT,[x_]:s.FUNC_REVERSE_SUBTRACT};fe[y_]=s.MIN,fe[M_]=s.MAX;const nt={[S_]:s.ZERO,[b_]:s.ONE,[w_]:s.SRC_COLOR,[am]:s.SRC_ALPHA,[P_]:s.SRC_ALPHA_SATURATE,[A_]:s.DST_COLOR,[T_]:s.DST_ALPHA,[E_]:s.ONE_MINUS_SRC_COLOR,[om]:s.ONE_MINUS_SRC_ALPHA,[C_]:s.ONE_MINUS_DST_COLOR,[D_]:s.ONE_MINUS_DST_ALPHA,[R_]:s.CONSTANT_COLOR,[L_]:s.ONE_MINUS_CONSTANT_COLOR,[F_]:s.CONSTANT_ALPHA,[I_]:s.ONE_MINUS_CONSTANT_ALPHA};function rt(z,xt,it,yt,Tt,at,kt,Nt,Me,de){if(z===Nn){g===!0&&(gt(s.BLEND),g=!1);return}if(g===!1&&(et(s.BLEND),g=!0),z!==v_){if(z!==m||de!==C){if((M!==lr||S!==lr)&&(s.blendEquation(s.FUNC_ADD),M=lr,S=lr),de)switch(z){case ua:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ke:s.blendFunc(s.ONE,s.ONE);break;case Xf:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case qf:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:se("WebGLState: Invalid blending: ",z);break}else switch(z){case ua:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ke:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Xf:se("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qf:se("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:se("WebGLState: Invalid blending: ",z);break}b=null,_=null,y=null,T=null,x.set(0,0,0),E=0,m=z,C=de}return}Tt=Tt||xt,at=at||it,kt=kt||yt,(xt!==M||Tt!==S)&&(s.blendEquationSeparate(fe[xt],fe[Tt]),M=xt,S=Tt),(it!==b||yt!==_||at!==y||kt!==T)&&(s.blendFuncSeparate(nt[it],nt[yt],nt[at],nt[kt]),b=it,_=yt,y=at,T=kt),(Nt.equals(x)===!1||Me!==E)&&(s.blendColor(Nt.r,Nt.g,Nt.b,Me),x.copy(Nt),E=Me),m=z,C=!1}function ct(z,xt){z.side===Yi?gt(s.CULL_FACE):et(s.CULL_FACE);let it=z.side===ti;xt&&(it=!it),ut(it),z.blending===ua&&z.transparent===!1?rt(Nn):rt(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);const yt=z.stencilWrite;o.setTest(yt),yt&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),k(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?et(s.SAMPLE_ALPHA_TO_COVERAGE):gt(s.SAMPLE_ALPHA_TO_COVERAGE)}function ut(z){F!==z&&(z?s.frontFace(s.CW):s.frontFace(s.CCW),F=z)}function pt(z){z!==p_?(et(s.CULL_FACE),z!==I&&(z===Wf?s.cullFace(s.BACK):z===m_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):gt(s.CULL_FACE),I=z}function zt(z){z!==O&&(H&&s.lineWidth(z),O=z)}function k(z,xt,it){z?(et(s.POLYGON_OFFSET_FILL),(L!==xt||U!==it)&&(L=xt,U=it,a.getReversed()&&(xt=-xt),s.polygonOffset(xt,it))):gt(s.POLYGON_OFFSET_FILL)}function ot(z){z?et(s.SCISSOR_TEST):gt(s.SCISSOR_TEST)}function At(z){z===void 0&&(z=s.TEXTURE0+V-1),Q!==z&&(s.activeTexture(z),Q=z)}function N(z,xt,it){it===void 0&&(Q===null?it=s.TEXTURE0+V-1:it=Q);let yt=j[it];yt===void 0&&(yt={type:void 0,texture:void 0},j[it]=yt),(yt.type!==z||yt.texture!==xt)&&(Q!==it&&(s.activeTexture(it),Q=it),s.bindTexture(z,xt||J[z]),yt.type=z,yt.texture=xt)}function ne(){const z=j[Q];z!==void 0&&z.type!==void 0&&(s.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function Kt(){try{s.compressedTexImage2D(...arguments)}catch(z){se("WebGLState:",z)}}function R(){try{s.compressedTexImage3D(...arguments)}catch(z){se("WebGLState:",z)}}function w(){try{s.texSubImage2D(...arguments)}catch(z){se("WebGLState:",z)}}function G(){try{s.texSubImage3D(...arguments)}catch(z){se("WebGLState:",z)}}function q(){try{s.compressedTexSubImage2D(...arguments)}catch(z){se("WebGLState:",z)}}function Z(){try{s.compressedTexSubImage3D(...arguments)}catch(z){se("WebGLState:",z)}}function ht(){try{s.texStorage2D(...arguments)}catch(z){se("WebGLState:",z)}}function mt(){try{s.texStorage3D(...arguments)}catch(z){se("WebGLState:",z)}}function tt(){try{s.texImage2D(...arguments)}catch(z){se("WebGLState:",z)}}function st(){try{s.texImage3D(...arguments)}catch(z){se("WebGLState:",z)}}function vt(z){return f[z]!==void 0?f[z]:s.getParameter(z)}function Ot(z,xt){f[z]!==xt&&(s.pixelStorei(z,xt),f[z]=xt)}function Mt(z){Xt.equals(z)===!1&&(s.scissor(z.x,z.y,z.z,z.w),Xt.copy(z))}function _t(z){qt.equals(z)===!1&&(s.viewport(z.x,z.y,z.z,z.w),qt.copy(z))}function Bt(z,xt){let it=c.get(xt);it===void 0&&(it=new WeakMap,c.set(xt,it));let yt=it.get(z);yt===void 0&&(yt=s.getUniformBlockIndex(xt,z.name),it.set(z,yt))}function Ht(z,xt){const yt=c.get(xt).get(z);l.get(xt)!==yt&&(s.uniformBlockBinding(xt,yt,z.__bindingPointIndex),l.set(xt,yt))}function Zt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),u={},f={},Q=null,j={},h={},d=new WeakMap,p=[],v=null,g=!1,m=null,M=null,b=null,_=null,S=null,y=null,T=null,x=new Ct(0,0,0),E=0,C=!1,F=null,I=null,O=null,L=null,U=null,Xt.set(0,0,s.canvas.width,s.canvas.height),qt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:gt,bindFramebuffer:Vt,drawBuffers:Dt,useProgram:Gt,setBlending:rt,setMaterial:ct,setFlipSided:ut,setCullFace:pt,setLineWidth:zt,setPolygonOffset:k,setScissorTest:ot,activeTexture:At,bindTexture:N,unbindTexture:ne,compressedTexImage2D:Kt,compressedTexImage3D:R,texImage2D:tt,texImage3D:st,pixelStorei:Ot,getParameter:vt,updateUBOMapping:Bt,uniformBlockBinding:Ht,texStorage2D:ht,texStorage3D:mt,texSubImage2D:w,texSubImage3D:G,compressedTexSubImage2D:q,compressedTexSubImage3D:Z,scissor:Mt,viewport:_t,reset:Zt}}function Sw(s,t,e,i,n,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new lt,u=new WeakMap,f=new Set;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,w){return p?new OffscreenCanvas(R,w):hl("canvas")}function g(R,w,G){let q=1;const Z=Kt(R);if((Z.width>G||Z.height>G)&&(q=G/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ht=Math.floor(q*Z.width),mt=Math.floor(q*Z.height);h===void 0&&(h=v(ht,mt));const tt=w?v(ht,mt):h;return tt.width=ht,tt.height=mt,tt.getContext("2d").drawImage(R,0,0,ht,mt),Yt("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ht+"x"+mt+")."),tt}else return"data"in R&&Yt("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),R;return R}function m(R){return R.generateMipmaps}function M(R){s.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function _(R,w,G,q,Z,ht=!1){if(R!==null){if(s[R]!==void 0)return s[R];Yt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let mt;q&&(mt=t.get("EXT_texture_norm16"),mt||Yt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let tt=w;if(w===s.RED&&(G===s.FLOAT&&(tt=s.R32F),G===s.HALF_FLOAT&&(tt=s.R16F),G===s.UNSIGNED_BYTE&&(tt=s.R8),G===s.UNSIGNED_SHORT&&mt&&(tt=mt.R16_EXT),G===s.SHORT&&mt&&(tt=mt.R16_SNORM_EXT)),w===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(tt=s.R8UI),G===s.UNSIGNED_SHORT&&(tt=s.R16UI),G===s.UNSIGNED_INT&&(tt=s.R32UI),G===s.BYTE&&(tt=s.R8I),G===s.SHORT&&(tt=s.R16I),G===s.INT&&(tt=s.R32I)),w===s.RG&&(G===s.FLOAT&&(tt=s.RG32F),G===s.HALF_FLOAT&&(tt=s.RG16F),G===s.UNSIGNED_BYTE&&(tt=s.RG8),G===s.UNSIGNED_SHORT&&mt&&(tt=mt.RG16_EXT),G===s.SHORT&&mt&&(tt=mt.RG16_SNORM_EXT)),w===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(tt=s.RG8UI),G===s.UNSIGNED_SHORT&&(tt=s.RG16UI),G===s.UNSIGNED_INT&&(tt=s.RG32UI),G===s.BYTE&&(tt=s.RG8I),G===s.SHORT&&(tt=s.RG16I),G===s.INT&&(tt=s.RG32I)),w===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(tt=s.RGB8UI),G===s.UNSIGNED_SHORT&&(tt=s.RGB16UI),G===s.UNSIGNED_INT&&(tt=s.RGB32UI),G===s.BYTE&&(tt=s.RGB8I),G===s.SHORT&&(tt=s.RGB16I),G===s.INT&&(tt=s.RGB32I)),w===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(tt=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(tt=s.RGBA16UI),G===s.UNSIGNED_INT&&(tt=s.RGBA32UI),G===s.BYTE&&(tt=s.RGBA8I),G===s.SHORT&&(tt=s.RGBA16I),G===s.INT&&(tt=s.RGBA32I)),w===s.RGB&&(G===s.UNSIGNED_SHORT&&mt&&(tt=mt.RGB16_EXT),G===s.SHORT&&mt&&(tt=mt.RGB16_SNORM_EXT),G===s.UNSIGNED_INT_5_9_9_9_REV&&(tt=s.RGB9_E5),G===s.UNSIGNED_INT_10F_11F_11F_REV&&(tt=s.R11F_G11F_B10F)),w===s.RGBA){const st=ht?ul:re.getTransfer(Z);G===s.FLOAT&&(tt=s.RGBA32F),G===s.HALF_FLOAT&&(tt=s.RGBA16F),G===s.UNSIGNED_BYTE&&(tt=st===me?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT&&mt&&(tt=mt.RGBA16_EXT),G===s.SHORT&&mt&&(tt=mt.RGBA16_SNORM_EXT),G===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function S(R,w){let G;return R?w===null||w===yn||w===Ra?G=s.DEPTH24_STENCIL8:w===Zi?G=s.DEPTH32F_STENCIL8:w===Pa&&(G=s.DEPTH24_STENCIL8,Yt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===yn||w===Ra?G=s.DEPTH_COMPONENT24:w===Zi?G=s.DEPTH_COMPONENT32F:w===Pa&&(G=s.DEPTH_COMPONENT16),G}function y(R,w){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Qe&&R.minFilter!==Oe?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function T(R){const w=R.target;w.removeEventListener("dispose",T),E(w),w.isVideoTexture&&u.delete(w),w.isHTMLTexture&&f.delete(w)}function x(R){const w=R.target;w.removeEventListener("dispose",x),F(w)}function E(R){const w=i.get(R);if(w.__webglInit===void 0)return;const G=R.source,q=d.get(G);if(q){const Z=q[w.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&C(R),Object.keys(q).length===0&&d.delete(G)}i.remove(R)}function C(R){const w=i.get(R);s.deleteTexture(w.__webglTexture);const G=R.source,q=d.get(G);delete q[w.__cacheKey],a.memory.textures--}function F(R){const w=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(w.__webglFramebuffer[q]))for(let Z=0;Z<w.__webglFramebuffer[q].length;Z++)s.deleteFramebuffer(w.__webglFramebuffer[q][Z]);else s.deleteFramebuffer(w.__webglFramebuffer[q]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[q])}else{if(Array.isArray(w.__webglFramebuffer))for(let q=0;q<w.__webglFramebuffer.length;q++)s.deleteFramebuffer(w.__webglFramebuffer[q]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let q=0;q<w.__webglColorRenderbuffer.length;q++)w.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[q]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const G=R.textures;for(let q=0,Z=G.length;q<Z;q++){const ht=i.get(G[q]);ht.__webglTexture&&(s.deleteTexture(ht.__webglTexture),a.memory.textures--),i.remove(G[q])}i.remove(R)}let I=0;function O(){I=0}function L(){return I}function U(R){I=R}function V(){const R=I;return R>=n.maxTextures&&Yt("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+n.maxTextures),I+=1,R}function H(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function K(R,w){const G=i.get(R);if(R.isVideoTexture&&N(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&G.__version!==R.version){const q=R.image;if(q===null)Yt("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Yt("WebGLRenderer: Texture marked for update but image is incomplete");else{gt(G,R,w);return}}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+w)}function Y(R,w){const G=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){gt(G,R,w);return}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+w)}function Q(R,w){const G=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){gt(G,R,w);return}e.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+w)}function j(R,w){const G=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&G.__version!==R.version){Vt(G,R,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+w)}const dt={[ol]:s.REPEAT,[Ki]:s.CLAMP_TO_EDGE,[_u]:s.MIRRORED_REPEAT},Et={[Qe]:s.NEAREST,[O_]:s.NEAREST_MIPMAP_NEAREST,[Ja]:s.NEAREST_MIPMAP_LINEAR,[Oe]:s.LINEAR,[Kl]:s.LINEAR_MIPMAP_NEAREST,[mn]:s.LINEAR_MIPMAP_LINEAR},Xt={[V_]:s.NEVER,[q_]:s.ALWAYS,[G_]:s.LESS,[Oh]:s.LEQUAL,[H_]:s.EQUAL,[Bh]:s.GEQUAL,[W_]:s.GREATER,[X_]:s.NOTEQUAL};function qt(R,w){if(w.type===Zi&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Oe||w.magFilter===Kl||w.magFilter===Ja||w.magFilter===mn||w.minFilter===Oe||w.minFilter===Kl||w.minFilter===Ja||w.minFilter===mn)&&Yt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,dt[w.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,dt[w.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,dt[w.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,Et[w.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,Et[w.minFilter]),w.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,Xt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Qe||w.minFilter!==Ja&&w.minFilter!==mn||w.type===Zi&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,n.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function jt(R,w){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",T));const q=w.source;let Z=d.get(q);Z===void 0&&(Z={},d.set(q,Z));const ht=H(w);if(ht!==R.__cacheKey){Z[ht]===void 0&&(Z[ht]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Z[ht].usedTimes++;const mt=Z[R.__cacheKey];mt!==void 0&&(Z[R.__cacheKey].usedTimes--,mt.usedTimes===0&&C(w)),R.__cacheKey=ht,R.__webglTexture=Z[ht].texture}return G}function J(R,w,G){return Math.floor(Math.floor(R/G)/w)}function et(R,w,G,q){const ht=R.updateRanges;if(ht.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,G,q,w.data);else{ht.sort((Ot,Mt)=>Ot.start-Mt.start);let mt=0;for(let Ot=1;Ot<ht.length;Ot++){const Mt=ht[mt],_t=ht[Ot],Bt=Mt.start+Mt.count,Ht=J(_t.start,w.width,4),Zt=J(Mt.start,w.width,4);_t.start<=Bt+1&&Ht===Zt&&J(_t.start+_t.count-1,w.width,4)===Ht?Mt.count=Math.max(Mt.count,_t.start+_t.count-Mt.start):(++mt,ht[mt]=_t)}ht.length=mt+1;const tt=e.getParameter(s.UNPACK_ROW_LENGTH),st=e.getParameter(s.UNPACK_SKIP_PIXELS),vt=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let Ot=0,Mt=ht.length;Ot<Mt;Ot++){const _t=ht[Ot],Bt=Math.floor(_t.start/4),Ht=Math.ceil(_t.count/4),Zt=Bt%w.width,z=Math.floor(Bt/w.width),xt=Ht,it=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Zt),e.pixelStorei(s.UNPACK_SKIP_ROWS,z),e.texSubImage2D(s.TEXTURE_2D,0,Zt,z,xt,it,G,q,w.data)}R.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,tt),e.pixelStorei(s.UNPACK_SKIP_PIXELS,st),e.pixelStorei(s.UNPACK_SKIP_ROWS,vt)}}function gt(R,w,G){let q=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(q=s.TEXTURE_3D);const Z=jt(R,w),ht=w.source;e.bindTexture(q,R.__webglTexture,s.TEXTURE0+G);const mt=i.get(ht);if(ht.version!==mt.__version||Z===!0){if(e.activeTexture(s.TEXTURE0+G),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const it=re.getPrimaries(re.workingColorSpace),yt=w.colorSpace===Zn?null:re.getPrimaries(w.colorSpace),Tt=w.colorSpace===Zn||it===yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt)}e.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment);let st=g(w.image,!1,n.maxTextureSize);st=ne(w,st);const vt=r.convert(w.format,w.colorSpace),Ot=r.convert(w.type);let Mt=_(w.internalFormat,vt,Ot,w.normalized,w.colorSpace,w.isVideoTexture);qt(q,w);let _t;const Bt=w.mipmaps,Ht=w.isVideoTexture!==!0,Zt=mt.__version===void 0||Z===!0,z=ht.dataReady,xt=y(w,st);if(w.isDepthTexture)Mt=S(w.format===Es,w.type),Zt&&(Ht?e.texStorage2D(s.TEXTURE_2D,1,Mt,st.width,st.height):e.texImage2D(s.TEXTURE_2D,0,Mt,st.width,st.height,0,vt,Ot,null));else if(w.isDataTexture)if(Bt.length>0){Ht&&Zt&&e.texStorage2D(s.TEXTURE_2D,xt,Mt,Bt[0].width,Bt[0].height);for(let it=0,yt=Bt.length;it<yt;it++)_t=Bt[it],Ht?z&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,_t.width,_t.height,vt,Ot,_t.data):e.texImage2D(s.TEXTURE_2D,it,Mt,_t.width,_t.height,0,vt,Ot,_t.data);w.generateMipmaps=!1}else Ht?(Zt&&e.texStorage2D(s.TEXTURE_2D,xt,Mt,st.width,st.height),z&&et(w,st,vt,Ot)):e.texImage2D(s.TEXTURE_2D,0,Mt,st.width,st.height,0,vt,Ot,st.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ht&&Zt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,xt,Mt,Bt[0].width,Bt[0].height,st.depth);for(let it=0,yt=Bt.length;it<yt;it++)if(_t=Bt[it],w.format!==Ji)if(vt!==null)if(Ht){if(z)if(w.layerUpdates.size>0){const Tt=Nd(_t.width,_t.height,w.format,w.type);for(const at of w.layerUpdates){const kt=_t.data.subarray(at*Tt/_t.data.BYTES_PER_ELEMENT,(at+1)*Tt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,at,_t.width,_t.height,1,vt,kt)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,_t.width,_t.height,st.depth,vt,_t.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,it,Mt,_t.width,_t.height,st.depth,0,_t.data,0,0);else Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?z&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,it,0,0,0,_t.width,_t.height,st.depth,vt,Ot,_t.data):e.texImage3D(s.TEXTURE_2D_ARRAY,it,Mt,_t.width,_t.height,st.depth,0,vt,Ot,_t.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{Ht&&Zt&&e.texStorage2D(s.TEXTURE_2D,xt,Mt,Bt[0].width,Bt[0].height);for(let it=0,yt=Bt.length;it<yt;it++)_t=Bt[it],w.format!==Ji?vt!==null?Ht?z&&e.compressedTexSubImage2D(s.TEXTURE_2D,it,0,0,_t.width,_t.height,vt,_t.data):e.compressedTexImage2D(s.TEXTURE_2D,it,Mt,_t.width,_t.height,0,_t.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?z&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,_t.width,_t.height,vt,Ot,_t.data):e.texImage2D(s.TEXTURE_2D,it,Mt,_t.width,_t.height,0,vt,Ot,_t.data)}else if(w.isDataArrayTexture)if(Ht){if(Zt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,xt,Mt,st.width,st.height,st.depth),z)if(w.layerUpdates.size>0){const it=Nd(st.width,st.height,w.format,w.type);for(const yt of w.layerUpdates){const Tt=st.data.subarray(yt*it/st.data.BYTES_PER_ELEMENT,(yt+1)*it/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,yt,st.width,st.height,1,vt,Ot,Tt)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,vt,Ot,st.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Mt,st.width,st.height,st.depth,0,vt,Ot,st.data);else if(w.isData3DTexture)Ht?(Zt&&e.texStorage3D(s.TEXTURE_3D,xt,Mt,st.width,st.height,st.depth),z&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,vt,Ot,st.data)):e.texImage3D(s.TEXTURE_3D,0,Mt,st.width,st.height,st.depth,0,vt,Ot,st.data);else if(w.isFramebufferTexture){if(Zt)if(Ht)e.texStorage2D(s.TEXTURE_2D,xt,Mt,st.width,st.height);else{let it=st.width,yt=st.height;for(let Tt=0;Tt<xt;Tt++)e.texImage2D(s.TEXTURE_2D,Tt,Mt,it,yt,0,vt,Ot,null),it>>=1,yt>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in s){const it=s.canvas;if(it.hasAttribute("layoutsubtree")||it.setAttribute("layoutsubtree","true"),st.parentNode!==it){it.appendChild(st),f.add(w),it.onpaint=yt=>{const Tt=yt.changedElements;for(const at of f)Tt.includes(at.image)&&(at.needsUpdate=!0)},it.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,st);else{const Tt=s.RGBA,at=s.RGBA,kt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Tt,at,kt,st)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Bt.length>0){if(Ht&&Zt){const it=Kt(Bt[0]);e.texStorage2D(s.TEXTURE_2D,xt,Mt,it.width,it.height)}for(let it=0,yt=Bt.length;it<yt;it++)_t=Bt[it],Ht?z&&e.texSubImage2D(s.TEXTURE_2D,it,0,0,vt,Ot,_t):e.texImage2D(s.TEXTURE_2D,it,Mt,vt,Ot,_t);w.generateMipmaps=!1}else if(Ht){if(Zt){const it=Kt(st);e.texStorage2D(s.TEXTURE_2D,xt,Mt,it.width,it.height)}z&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,vt,Ot,st)}else e.texImage2D(s.TEXTURE_2D,0,Mt,vt,Ot,st);m(w)&&M(q),mt.__version=ht.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function Vt(R,w,G){if(w.image.length!==6)return;const q=jt(R,w),Z=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+G);const ht=i.get(Z);if(Z.version!==ht.__version||q===!0){e.activeTexture(s.TEXTURE0+G);const mt=re.getPrimaries(re.workingColorSpace),tt=w.colorSpace===Zn?null:re.getPrimaries(w.colorSpace),st=w.colorSpace===Zn||mt===tt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);const vt=w.isCompressedTexture||w.image[0].isCompressedTexture,Ot=w.image[0]&&w.image[0].isDataTexture,Mt=[];for(let at=0;at<6;at++)!vt&&!Ot?Mt[at]=g(w.image[at],!0,n.maxCubemapSize):Mt[at]=Ot?w.image[at].image:w.image[at],Mt[at]=ne(w,Mt[at]);const _t=Mt[0],Bt=r.convert(w.format,w.colorSpace),Ht=r.convert(w.type),Zt=_(w.internalFormat,Bt,Ht,w.normalized,w.colorSpace),z=w.isVideoTexture!==!0,xt=ht.__version===void 0||q===!0,it=Z.dataReady;let yt=y(w,_t);qt(s.TEXTURE_CUBE_MAP,w);let Tt;if(vt){z&&xt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,yt,Zt,_t.width,_t.height);for(let at=0;at<6;at++){Tt=Mt[at].mipmaps;for(let kt=0;kt<Tt.length;kt++){const Nt=Tt[kt];w.format!==Ji?Bt!==null?z?it&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,kt,0,0,Nt.width,Nt.height,Bt,Nt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,kt,Zt,Nt.width,Nt.height,0,Nt.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,kt,0,0,Nt.width,Nt.height,Bt,Ht,Nt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,kt,Zt,Nt.width,Nt.height,0,Bt,Ht,Nt.data)}}}else{if(Tt=w.mipmaps,z&&xt){Tt.length>0&&yt++;const at=Kt(Mt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,yt,Zt,at.width,at.height)}for(let at=0;at<6;at++)if(Ot){z?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Mt[at].width,Mt[at].height,Bt,Ht,Mt[at].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Zt,Mt[at].width,Mt[at].height,0,Bt,Ht,Mt[at].data);for(let kt=0;kt<Tt.length;kt++){const Me=Tt[kt].image[at].image;z?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,kt+1,0,0,Me.width,Me.height,Bt,Ht,Me.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,kt+1,Zt,Me.width,Me.height,0,Bt,Ht,Me.data)}}else{z?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Bt,Ht,Mt[at]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Zt,Bt,Ht,Mt[at]);for(let kt=0;kt<Tt.length;kt++){const Nt=Tt[kt];z?it&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,kt+1,0,0,Bt,Ht,Nt.image[at]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+at,kt+1,Zt,Bt,Ht,Nt.image[at])}}}m(w)&&M(s.TEXTURE_CUBE_MAP),ht.__version=Z.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function Dt(R,w,G,q,Z,ht){const mt=r.convert(G.format,G.colorSpace),tt=r.convert(G.type),st=_(G.internalFormat,mt,tt,G.normalized,G.colorSpace),vt=i.get(w),Ot=i.get(G);if(Ot.__renderTarget=w,!vt.__hasExternalTextures){const Mt=Math.max(1,w.width>>ht),_t=Math.max(1,w.height>>ht);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?e.texImage3D(Z,ht,st,Mt,_t,w.depth,0,mt,tt,null):e.texImage2D(Z,ht,st,Mt,_t,0,mt,tt,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),At(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,Z,Ot.__webglTexture,0,ot(w)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,Z,Ot.__webglTexture,ht),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Gt(R,w,G){if(s.bindRenderbuffer(s.RENDERBUFFER,R),w.depthBuffer){const q=w.depthTexture,Z=q&&q.isDepthTexture?q.type:null,ht=S(w.stencilBuffer,Z),mt=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;At(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot(w),ht,w.width,w.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot(w),ht,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ht,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,mt,s.RENDERBUFFER,R)}else{const q=w.textures;for(let Z=0;Z<q.length;Z++){const ht=q[Z],mt=r.convert(ht.format,ht.colorSpace),tt=r.convert(ht.type),st=_(ht.internalFormat,mt,tt,ht.normalized,ht.colorSpace);At(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot(w),st,w.width,w.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot(w),st,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,st,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function fe(R,w,G){const q=w.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(w.depthTexture);if(Z.__renderTarget=w,(!Z.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,w.depthTexture.addEventListener("dispose",T)),Z.__webglTexture===void 0){Z.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),qt(s.TEXTURE_CUBE_MAP,w.depthTexture);const vt=r.convert(w.depthTexture.format),Ot=r.convert(w.depthTexture.type);let Mt;w.depthTexture.format===kn?Mt=s.DEPTH_COMPONENT24:w.depthTexture.format===Es&&(Mt=s.DEPTH24_STENCIL8);for(let _t=0;_t<6;_t++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Mt,w.width,w.height,0,vt,Ot,null)}}else K(w.depthTexture,0);const ht=Z.__webglTexture,mt=ot(w),tt=q?s.TEXTURE_CUBE_MAP_POSITIVE_X+G:s.TEXTURE_2D,st=w.depthTexture.format===Es?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(w.depthTexture.format===kn)At(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,st,tt,ht,0,mt):s.framebufferTexture2D(s.FRAMEBUFFER,st,tt,ht,0);else if(w.depthTexture.format===Es)At(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,st,tt,ht,0,mt):s.framebufferTexture2D(s.FRAMEBUFFER,st,tt,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(R){const w=i.get(R),G=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){const q=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),q){const Z=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),w.__depthDisposeCallback=Z}w.__boundDepthTexture=q}if(R.depthTexture&&!w.__autoAllocateDepthBuffer)if(G)for(let q=0;q<6;q++)fe(w.__webglFramebuffer[q],R,q);else{const q=R.texture.mipmaps;q&&q.length>0?fe(w.__webglFramebuffer[0],R,0):fe(w.__webglFramebuffer,R,0)}else if(G){w.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[q]),w.__webglDepthbuffer[q]===void 0)w.__webglDepthbuffer[q]=s.createRenderbuffer(),Gt(w.__webglDepthbuffer[q],R,!1);else{const Z=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=w.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,ht),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,ht)}}else{const q=R.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),Gt(w.__webglDepthbuffer,R,!1);else{const Z=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ht),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,ht)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function rt(R,w,G){const q=i.get(R);w!==void 0&&Dt(q.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&nt(R)}function ct(R){const w=R.texture,G=i.get(R),q=i.get(w);R.addEventListener("dispose",x);const Z=R.textures,ht=R.isWebGLCubeRenderTarget===!0,mt=Z.length>1;if(mt||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=w.version,a.memory.textures++),ht){G.__webglFramebuffer=[];for(let tt=0;tt<6;tt++)if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[tt]=[];for(let st=0;st<w.mipmaps.length;st++)G.__webglFramebuffer[tt][st]=s.createFramebuffer()}else G.__webglFramebuffer[tt]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let tt=0;tt<w.mipmaps.length;tt++)G.__webglFramebuffer[tt]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(mt)for(let tt=0,st=Z.length;tt<st;tt++){const vt=i.get(Z[tt]);vt.__webglTexture===void 0&&(vt.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&At(R)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let tt=0;tt<Z.length;tt++){const st=Z[tt];G.__webglColorRenderbuffer[tt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[tt]);const vt=r.convert(st.format,st.colorSpace),Ot=r.convert(st.type),Mt=_(st.internalFormat,vt,Ot,st.normalized,st.colorSpace,R.isXRRenderTarget===!0),_t=ot(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,_t,Mt,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+tt,s.RENDERBUFFER,G.__webglColorRenderbuffer[tt])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),Gt(G.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ht){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),qt(s.TEXTURE_CUBE_MAP,w);for(let tt=0;tt<6;tt++)if(w.mipmaps&&w.mipmaps.length>0)for(let st=0;st<w.mipmaps.length;st++)Dt(G.__webglFramebuffer[tt][st],R,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,st);else Dt(G.__webglFramebuffer[tt],R,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0);m(w)&&M(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(mt){for(let tt=0,st=Z.length;tt<st;tt++){const vt=Z[tt],Ot=i.get(vt);let Mt=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Mt=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Mt,Ot.__webglTexture),qt(Mt,vt),Dt(G.__webglFramebuffer,R,vt,s.COLOR_ATTACHMENT0+tt,Mt,0),m(vt)&&M(Mt)}e.unbindTexture()}else{let tt=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(tt=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(tt,q.__webglTexture),qt(tt,w),w.mipmaps&&w.mipmaps.length>0)for(let st=0;st<w.mipmaps.length;st++)Dt(G.__webglFramebuffer[st],R,w,s.COLOR_ATTACHMENT0,tt,st);else Dt(G.__webglFramebuffer,R,w,s.COLOR_ATTACHMENT0,tt,0);m(w)&&M(tt),e.unbindTexture()}R.depthBuffer&&nt(R)}function ut(R){const w=R.textures;for(let G=0,q=w.length;G<q;G++){const Z=w[G];if(m(Z)){const ht=b(R),mt=i.get(Z).__webglTexture;e.bindTexture(ht,mt),M(ht),e.unbindTexture()}}}const pt=[],zt=[];function k(R){if(R.samples>0){if(At(R)===!1){const w=R.textures,G=R.width,q=R.height;let Z=s.COLOR_BUFFER_BIT;const ht=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=i.get(R),tt=w.length>1;if(tt)for(let vt=0;vt<w.length;vt++)e.bindFramebuffer(s.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer);const st=R.texture.mipmaps;st&&st.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,mt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let vt=0;vt<w.length;vt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),tt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,mt.__webglColorRenderbuffer[vt]);const Ot=i.get(w[vt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ot,0)}s.blitFramebuffer(0,0,G,q,0,0,G,q,Z,s.NEAREST),l===!0&&(pt.length=0,zt.length=0,pt.push(s.COLOR_ATTACHMENT0+vt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(pt.push(ht),zt.push(ht),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,zt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,pt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),tt)for(let vt=0;vt<w.length;vt++){e.bindFramebuffer(s.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.RENDERBUFFER,mt.__webglColorRenderbuffer[vt]);const Ot=i.get(w[vt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+vt,s.TEXTURE_2D,Ot,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){const w=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function ot(R){return Math.min(n.maxSamples,R.samples)}function At(R){const w=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function N(R){const w=a.render.frame;u.get(R)!==w&&(u.set(R,w),R.update())}function ne(R,w){const G=R.colorSpace,q=R.format,Z=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==La&&G!==Zn&&(re.getTransfer(G)===me?(q!==Ji||Z!==Ei)&&Yt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):se("WebGLTextures: Unsupported texture color space:",G)),w}function Kt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=O,this.getTextureUnits=L,this.setTextureUnits=U,this.setTexture2D=K,this.setTexture2DArray=Y,this.setTexture3D=Q,this.setTextureCube=j,this.rebindTextures=rt,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=k,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=Dt,this.useMultisampledRTT=At,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function bw(s,t){function e(i,n=Zn){let r;const a=re.getTransfer(n);if(i===Ei)return s.UNSIGNED_BYTE;if(i===Rh)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Lh)return s.UNSIGNED_SHORT_5_5_5_1;if(i===xm)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===ym)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===vm)return s.BYTE;if(i===_m)return s.SHORT;if(i===Pa)return s.UNSIGNED_SHORT;if(i===Ph)return s.INT;if(i===yn)return s.UNSIGNED_INT;if(i===Zi)return s.FLOAT;if(i===Mn)return s.HALF_FLOAT;if(i===Mm)return s.ALPHA;if(i===Sm)return s.RGB;if(i===Ji)return s.RGBA;if(i===kn)return s.DEPTH_COMPONENT;if(i===Es)return s.DEPTH_STENCIL;if(i===Fh)return s.RED;if(i===Ih)return s.RED_INTEGER;if(i===Ls)return s.RG;if(i===Nh)return s.RG_INTEGER;if(i===Uh)return s.RGBA_INTEGER;if(i===$o||i===Ko||i===Zo||i===Jo)if(a===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===$o)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===$o)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ko)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Zo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Jo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===xu||i===yu||i===Mu||i===Su)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===xu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===yu)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Mu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Su)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===bu||i===wu||i===Eu||i===Tu||i===Du||i===ll||i===Au)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===bu||i===wu)return a===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Eu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Tu)return r.COMPRESSED_R11_EAC;if(i===Du)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ll)return r.COMPRESSED_RG11_EAC;if(i===Au)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Cu||i===Pu||i===Ru||i===Lu||i===Fu||i===Iu||i===Nu||i===Uu||i===Ou||i===Bu||i===ku||i===zu||i===Vu||i===Gu)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Cu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Pu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ru)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Lu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Iu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Nu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Uu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ou)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Bu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ku)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===zu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Vu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Gu)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Hu||i===Wu||i===Xu)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Hu)return a===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Wu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Xu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===qu||i===Yu||i===cl||i===$u)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===qu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Yu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===cl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===$u)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ra?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}const ww=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ew=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Tw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Nm(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new he({vertexShader:ww,fragmentShader:Ew,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new us(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Dw extends Ns{constructor(t,e){super();const i=this;let n=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,p=null;const v=typeof XRWebGLBinding<"u",g=new Tw,m={},M=e.getContextAttributes();let b=null,_=null;const S=[],y=[],T=new lt;let x=null,E=null;const C=new bi;C.viewport=new De;const F=new bi;F.viewport=new De;const I=[C,F],O=new Iy;let L=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let et=S[J];return et===void 0&&(et=new ic,S[J]=et),et.getTargetRaySpace()},this.getControllerGrip=function(J){let et=S[J];return et===void 0&&(et=new ic,S[J]=et),et.getGripSpace()},this.getHand=function(J){let et=S[J];return et===void 0&&(et=new ic,S[J]=et),et.getHandSpace()};function V(J){const et=y.indexOf(J.inputSource);if(et===-1)return;const gt=S[et];gt!==void 0&&(gt.update(J.inputSource,J.frame,c||a),gt.dispatchEvent({type:J.type,data:J.inputSource}))}function H(){n.removeEventListener("select",V),n.removeEventListener("selectstart",V),n.removeEventListener("selectend",V),n.removeEventListener("squeeze",V),n.removeEventListener("squeezestart",V),n.removeEventListener("squeezeend",V),n.removeEventListener("end",H),n.removeEventListener("inputsourceschange",K);for(let J=0;J<S.length;J++){const et=y[J];et!==null&&(y[J]=null,S[J].disconnect(et))}L=null,U=null,g.reset();for(const J in m)delete m[J];if(t.setRenderTarget(b),d=null,h=null,f=null,n=null,_=null,jt.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(T.width,T.height,!1),E!==null){const J=E.camera;J.fov=E.fov,J.zoom=E.zoom,J.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&Yt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&Yt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(n,e)),f},this.getFrame=function(){return p},this.getSession=function(){return n},this.setSession=async function(J){if(n=J,n!==null){if(b=t.getRenderTarget(),n.addEventListener("select",V),n.addEventListener("selectstart",V),n.addEventListener("selectend",V),n.addEventListener("squeeze",V),n.addEventListener("squeezestart",V),n.addEventListener("squeezeend",V),n.addEventListener("end",H),n.addEventListener("inputsourceschange",K),M.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(T),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,Vt=null,Dt=null;M.depth&&(Dt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,gt=M.stencil?Es:kn,Vt=M.stencil?Ra:yn);const Gt={colorFormat:e.RGBA8,depthFormat:Dt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Gt),n.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),_=new zi(h.textureWidth,h.textureHeight,{format:Ji,type:Ei,depthTexture:new Na(h.textureWidth,h.textureHeight,Vt,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const gt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(n,e,gt),n.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new zi(d.framebufferWidth,d.framebufferHeight,{format:Ji,type:Ei,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),jt.setContext(n),jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(J){for(let et=0;et<J.removed.length;et++){const gt=J.removed[et],Vt=y.indexOf(gt);Vt>=0&&(y[Vt]=null,S[Vt].disconnect(gt))}for(let et=0;et<J.added.length;et++){const gt=J.added[et];let Vt=y.indexOf(gt);if(Vt===-1){for(let Gt=0;Gt<S.length;Gt++)if(Gt>=y.length){y.push(gt),Vt=Gt;break}else if(y[Gt]===null){y[Gt]=gt,Vt=Gt;break}if(Vt===-1)break}const Dt=S[Vt];Dt&&Dt.connect(gt)}}const Y=new A,Q=new A;function j(J,et,gt){Y.setFromMatrixPosition(et.matrixWorld),Q.setFromMatrixPosition(gt.matrixWorld);const Vt=Y.distanceTo(Q),Dt=et.projectionMatrix.elements,Gt=gt.projectionMatrix.elements,fe=Dt[14]/(Dt[10]-1),nt=Dt[14]/(Dt[10]+1),rt=(Dt[9]+1)/Dt[5],ct=(Dt[9]-1)/Dt[5],ut=(Dt[8]-1)/Dt[0],pt=(Gt[8]+1)/Gt[0],zt=fe*ut,k=fe*pt,ot=Vt/(-ut+pt),At=ot*-ut;if(et.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(At),J.translateZ(ot),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Dt[10]===-1)J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const N=fe+ot,ne=nt+ot,Kt=zt-At,R=k+(Vt-At),w=rt*nt/ne*N,G=ct*nt/ne*N;J.projectionMatrix.makePerspective(Kt,R,w,G,N,ne),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function dt(J,et){et===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(et.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(n===null)return;let et=J.near,gt=J.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(gt=g.depthFar)),O.near=F.near=C.near=et,O.far=F.far=C.far=gt,(L!==O.near||U!==O.far)&&(n.updateRenderState({depthNear:O.near,depthFar:O.far}),L=O.near,U=O.far),O.layers.mask=J.layers.mask|6,C.layers.mask=O.layers.mask&-5,F.layers.mask=O.layers.mask&-3;const Vt=J.parent,Dt=O.cameras;dt(O,Vt);for(let Gt=0;Gt<Dt.length;Gt++)dt(Dt[Gt],Vt);Dt.length===2?j(O,C,F):O.projectionMatrix.copy(C.projectionMatrix),E===null&&J.isPerspectiveCamera&&(E={camera:J,fov:J.fov,zoom:J.zoom}),Et(J,O,Vt)};function Et(J,et,gt){gt===null?J.matrix.copy(et.matrixWorld):(J.matrix.copy(gt.matrixWorld),J.matrix.invert(),J.matrix.multiply(et.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ia*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(J){l=J,h!==null&&(h.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(J){return m[J]};let Xt=null;function qt(J,et){if(u=et.getViewerPose(c||a),p=et,u!==null){const gt=u.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Vt=!1;gt.length!==O.cameras.length&&(O.cameras.length=0,Vt=!0);for(let nt=0;nt<gt.length;nt++){const rt=gt[nt];let ct=null;if(d!==null)ct=d.getViewport(rt);else{const pt=f.getViewSubImage(h,rt);ct=pt.viewport,nt===0&&(t.setRenderTargetTextures(_,pt.colorTexture,pt.depthStencilTexture),t.setRenderTarget(_))}let ut=I[nt];ut===void 0&&(ut=new bi,ut.layers.enable(nt),ut.viewport=new De,I[nt]=ut),ut.matrix.fromArray(rt.transform.matrix),ut.matrix.decompose(ut.position,ut.quaternion,ut.scale),ut.projectionMatrix.fromArray(rt.projectionMatrix),ut.projectionMatrixInverse.copy(ut.projectionMatrix).invert(),ut.viewport.set(ct.x,ct.y,ct.width,ct.height),nt===0&&(O.matrix.copy(ut.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Vt===!0&&O.cameras.push(ut)}const Dt=n.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const nt=f.getDepthInformation(gt[0]);nt&&nt.isValid&&nt.texture&&g.init(nt,n.renderState)}if(Dt&&Dt.includes("camera-access")&&v){t.state.unbindTexture(),f=i.getBinding();for(let nt=0;nt<gt.length;nt++){const rt=gt[nt].camera;if(rt){let ct=m[rt];ct||(ct=new Nm,m[rt]=ct);const ut=f.getCameraImage(rt);ct.sourceTexture=ut}}}}for(let gt=0;gt<S.length;gt++){const Vt=y[gt],Dt=S[gt];Vt!==null&&Dt!==void 0&&Dt.update(Vt,et,c||a)}Xt&&Xt(J,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),p=null}const jt=new Ym;jt.setAnimationLoop(qt),this.setAnimationLoop=function(J){Xt=J},this.dispose=function(){}}}const Aw=new le,tg=new $t;tg.set(-1,0,0,0,1,0,0,0,1);function Cw(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,Wm(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function n(g,m,M,b,_){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),f(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),h(g,m),m.isMeshPhysicalMaterial&&d(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,M,b):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===ti&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===ti&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=t.get(m),b=M.envMap,_=M.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(Aw.makeRotationFromEuler(_)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(tg),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,M,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=b*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ti&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const M=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Pw(s,t,e,i){let n={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,S){const y=S.program;i.uniformBlockBinding(_,y)}function c(_,S){let y=n[_.id];y===void 0&&(g(_),y=u(_),n[_.id]=y,_.addEventListener("dispose",M));const T=S.program;i.updateUBOMapping(_,T);const x=t.render.frame;r[_.id]!==x&&(h(_),r[_.id]=x)}function u(_){const S=f();_.__bindingPointIndex=S;const y=s.createBuffer(),T=_.__size,x=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,T,x),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,S,y),y}function f(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return se("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const S=n[_.id],y=_.uniforms,T=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,S);for(let x=0,E=y.length;x<E;x++){const C=y[x];if(Array.isArray(C))for(let F=0,I=C.length;F<I;F++)d(C[F],x,F,T);else d(C,x,0,T)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(_,S,y,T){if(v(_,S,y,T)===!0){const x=_.__offset,E=_.value;if(Array.isArray(E)){let C=0;for(let F=0;F<E.length;F++){const I=E[F],O=m(I);p(I,_.__data,C),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(C+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(E,_.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,x,_.__data)}}function p(_,S,y){typeof _=="number"||typeof _=="boolean"?S[0]=_:_.isMatrix3?(S[0]=_.elements[0],S[1]=_.elements[1],S[2]=_.elements[2],S[3]=0,S[4]=_.elements[3],S[5]=_.elements[4],S[6]=_.elements[5],S[7]=0,S[8]=_.elements[6],S[9]=_.elements[7],S[10]=_.elements[8],S[11]=0):ArrayBuffer.isView(_)?S.set(new _.constructor(_.buffer,_.byteOffset,S.length)):_.toArray(S,y)}function v(_,S,y,T){const x=_.value,E=S+"_"+y;if(T[E]===void 0)return typeof x=="number"||typeof x=="boolean"?T[E]=x:ArrayBuffer.isView(x)?T[E]=x.slice():T[E]=x.clone(),!0;{const C=T[E];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return T[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function g(_){const S=_.uniforms;let y=0;const T=16;for(let E=0,C=S.length;E<C;E++){const F=Array.isArray(S[E])?S[E]:[S[E]];for(let I=0,O=F.length;I<O;I++){const L=F[I],U=Array.isArray(L.value)?L.value:[L.value];for(let V=0,H=U.length;V<H;V++){const K=U[V],Y=m(K),Q=y%T,j=Q%Y.boundary,dt=Q+j;y+=j,dt!==0&&T-dt<Y.storage&&(y+=T-dt),L.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=y,y+=Y.storage}}}const x=y%T;return x>0&&(y+=T-x),_.__size=y,_.__cache={},this}function m(_){const S={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(S.boundary=4,S.storage=4):_.isVector2?(S.boundary=8,S.storage=8):_.isVector3||_.isColor?(S.boundary=16,S.storage=12):_.isVector4?(S.boundary=16,S.storage=16):_.isMatrix3?(S.boundary=48,S.storage=48):_.isMatrix4?(S.boundary=64,S.storage=64):_.isTexture?Yt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(S.boundary=16,S.storage=_.byteLength):Yt("WebGLRenderer: Unsupported uniform value type.",_),S}function M(_){const S=_.target;S.removeEventListener("dispose",M);const y=a.indexOf(S.__bindingPointIndex);a.splice(y,1),s.deleteBuffer(n[S.id]),delete n[S.id],delete r[S.id]}function b(){for(const _ in n)s.deleteBuffer(n[_]);a=[],n={},r={}}return{bind:l,update:c,dispose:b}}const Rw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let nn=null;function Lw(){return nn===null&&(nn=new Cr(Rw,16,16,Ls,Mn),nn.name="DFG_LUT",nn.minFilter=Oe,nn.magFilter=Oe,nn.wrapS=Ki,nn.wrapT=Ki,nn.generateMipmaps=!1,nn.needsUpdate=!0),nn}class Fw{constructor(t={}){const{canvas:e=K_(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:d=Ei}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const v=d,g=new Set([Uh,Nh,Ih]),m=new Set([Ei,yn,Pa,Ra,Rh,Lh]),M=new Uint32Array(4),b=new Int32Array(4),_=new A;let S=null,y=null;const T=[],x=[];let E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let F=!1,I=null,O=null,L=null,U=null;this._outputColorSpace=$e;let V=0,H=0,K=null,Y=-1,Q=null;const j=new De,dt=new De;let Et=null;const Xt=new Ct(0);let qt=0,jt=e.width,J=e.height,et=1,gt=null,Vt=null;const Dt=new De(0,0,jt,J),Gt=new De(0,0,jt,J);let fe=!1;const nt=new Hh;let rt=!1,ct=!1;const ut=new le,pt=new A,zt=new De,k={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function At(){return K===null?et:1}let N=i;function ne(D,B){return e.getContext(D,B)}let Kt,R,w,G,q,Z,ht,mt,tt,st,vt,Ot,Mt,_t,Bt,Ht,Zt,z,xt,it,yt,Tt,at;try{const D={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ch}`),e.addEventListener("webglcontextlost",Me,!1),e.addEventListener("webglcontextrestored",de,!1),e.addEventListener("webglcontextcreationerror",Gi,!1),N===null){const B="webgl2";if(N=ne(B,D),N===null)throw ne(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}kt()}catch(D){throw e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",de,!1),e.removeEventListener("webglcontextcreationerror",Gi,!1),se("WebGLRenderer: "+D.message),D}function kt(){Kt=new LS(N),Kt.init(),yt=new bw(N,Kt),R=new SS(N,Kt,t,yt),w=new Mw(N,Kt),R.reversedDepthBuffer&&h&&w.buffers.depth.setReversed(!0),O=N.createFramebuffer(),L=N.createFramebuffer(),U=N.createFramebuffer(),G=new NS(N),q=new ow,Z=new Sw(N,Kt,w,q,R,yt,G),ht=new RS(C),mt=new Oy(N),Tt=new yS(N,mt),tt=new FS(N,mt,G,Tt),st=new OS(N,tt,mt,Tt,G),z=new US(N,R,Z),Bt=new bS(q),vt=new aw(C,ht,Kt,R,Tt,Bt),Ot=new Cw(C,q),Mt=new cw,_t=new mw(Kt),Zt=new xS(C,ht,w,st,p,l),Ht=new yw(C,st,R),at=new Pw(N,G,R,w),xt=new MS(N,Kt,G),it=new IS(N,Kt,G),G.programs=vt.programs,C.capabilities=R,C.extensions=Kt,C.properties=q,C.renderLists=Mt,C.shadowMap=Ht,C.state=w,C.info=G}v!==Ei&&(E=new kS(v,e.width,e.height,o,n,r));const Nt=new Dw(C,N);this.xr=Nt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const D=Kt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Kt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(D){D!==void 0&&(et=D,this.setSize(jt,J,!1))},this.getSize=function(D){return D.set(jt,J)},this.setSize=function(D,B,$=!0){if(Nt.isPresenting){Yt("WebGLRenderer: Can't change size while VR device is presenting.");return}jt=D,J=B,e.width=Math.floor(D*et),e.height=Math.floor(B*et),$===!0&&(e.style.width=D+"px",e.style.height=B+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,D,B)},this.getDrawingBufferSize=function(D){return D.set(jt*et,J*et).floor()},this.setDrawingBufferSize=function(D,B,$){jt=D,J=B,et=$,e.width=Math.floor(D*$),e.height=Math.floor(B*$),this.setViewport(0,0,D,B)},this.setEffects=function(D){if(v===Ei){se("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let B=0;B<D.length;B++)if(D[B].isOutputPass===!0){Yt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(j)},this.getViewport=function(D){return D.copy(Dt)},this.setViewport=function(D,B,$,W){D.isVector4?Dt.set(D.x,D.y,D.z,D.w):Dt.set(D,B,$,W),w.viewport(j.copy(Dt).multiplyScalar(et).round())},this.getScissor=function(D){return D.copy(Gt)},this.setScissor=function(D,B,$,W){D.isVector4?Gt.set(D.x,D.y,D.z,D.w):Gt.set(D,B,$,W),w.scissor(dt.copy(Gt).multiplyScalar(et).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(D){w.setScissorTest(fe=D)},this.setOpaqueSort=function(D){gt=D},this.setTransparentSort=function(D){Vt=D},this.getClearColor=function(D){return D.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor(...arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha(...arguments)},this.clear=function(D=!0,B=!0,$=!0){let W=0;if(D){let X=!1;if(K!==null){const wt=K.texture.format;X=g.has(wt)}if(X){const wt=K.texture.type,Lt=m.has(wt),bt=Zt.getClearColor(),Ft=Zt.getClearAlpha(),Ut=bt.r,Jt=bt.g,ee=bt.b;Lt?(M[0]=Ut,M[1]=Jt,M[2]=ee,M[3]=Ft,N.clearBufferuiv(N.COLOR,0,M)):(b[0]=Ut,b[1]=Jt,b[2]=ee,b[3]=Ft,N.clearBufferiv(N.COLOR,0,b))}else W|=N.COLOR_BUFFER_BIT}B&&(W|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),I=D},this.dispose=function(){e.removeEventListener("webglcontextlost",Me,!1),e.removeEventListener("webglcontextrestored",de,!1),e.removeEventListener("webglcontextcreationerror",Gi,!1),Zt.dispose(),Mt.dispose(),_t.dispose(),q.dispose(),ht.dispose(),st.dispose(),Tt.dispose(),at.dispose(),vt.dispose(),Nt.dispose(),Nt.removeEventListener("sessionstart",af),Nt.removeEventListener("sessionend",of),hs.stop()};function Me(D){D.preventDefault(),fl("WebGLRenderer: Context Lost."),F=!0}function de(){fl("WebGLRenderer: Context Restored."),F=!1;const D=G.autoReset,B=Ht.enabled,$=Ht.autoUpdate,W=Ht.needsUpdate,X=Ht.type;kt(),G.autoReset=D,Ht.enabled=B,Ht.autoUpdate=$,Ht.needsUpdate=W,Ht.type=X}function Gi(D){se("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function ji(D){const B=D.target;B.removeEventListener("dispose",ji),xg(B)}function xg(D){yg(D),q.remove(D)}function yg(D){const B=q.get(D).programs;B!==void 0&&(B.forEach(function($){vt.releaseProgram($)}),D.isShaderMaterial&&vt.releaseShaderCache(D))}this.renderBufferDirect=function(D,B,$,W,X,wt){B===null&&(B=k);const Lt=X.isMesh&&X.matrixWorld.determinantAffine()<0,bt=bg(D,B,$,W,X);w.setMaterial(W,Lt);let Ft=$.index,Ut=1;if(W.wireframe===!0){if(Ft=tt.getWireframeAttribute($),Ft===void 0)return;Ut=2}const Jt=$.drawRange,ee=$.attributes.position;let It=Jt.start*Ut,pe=(Jt.start+Jt.count)*Ut;wt!==null&&(It=Math.max(It,wt.start*Ut),pe=Math.min(pe,(wt.start+wt.count)*Ut)),Ft!==null?(It=Math.max(It,0),pe=Math.min(pe,Ft.count)):ee!=null&&(It=Math.max(It,0),pe=Math.min(pe,ee.count));const Be=pe-It;if(Be<0||Be===1/0)return;Tt.setup(X,W,bt,$,Ft);let be,_e=xt;if(Ft!==null&&(be=mt.get(Ft),_e=it,_e.setIndex(be)),X.isMesh)W.wireframe===!0?(w.setLineWidth(W.wireframeLinewidth*At()),_e.setMode(N.LINES)):_e.setMode(N.TRIANGLES);else if(X.isLine){let ii=W.linewidth;ii===void 0&&(ii=1),w.setLineWidth(ii*At()),X.isLineSegments?_e.setMode(N.LINES):X.isLineLoop?_e.setMode(N.LINE_LOOP):_e.setMode(N.LINE_STRIP)}else X.isPoints?_e.setMode(N.POINTS):X.isSprite&&_e.setMode(N.TRIANGLES);if(X.isBatchedMesh)if(Kt.get("WEBGL_multi_draw"))_e.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const ii=X._multiDrawStarts,Pt=X._multiDrawCounts,li=X._multiDrawCount,ue=Ft?mt.get(Ft).bytesPerElement:1,Li=q.get(W).currentProgram.getUniforms();for(let tn=0;tn<li;tn++)Li.setValue(N,"_gl_DrawID",tn),_e.render(ii[tn]/ue,Pt[tn])}else if(X.isInstancedMesh)_e.renderInstances(It,Be,X.count);else if($.isInstancedBufferGeometry){const ii=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Pt=Math.min($.instanceCount,ii);_e.renderInstances(It,Be,Pt)}else _e.render(It,Be)};function rf(D,B,$,W){I!==null&&D.isNodeMaterial&&I.setObject(W,D),rt===!0&&Bt.setState(D,$,!1),D.transparent===!0&&D.side===Yi&&D.forceSinglePass===!1?(D.side=ti,D.needsUpdate=!0,$a(D,B,W),D.side=Ps,D.needsUpdate=!0,$a(D,B,W),D.side=Yi):$a(D,B,W)}this.compile=function(D,B,$=null){$===null&&($=D),I!==null&&I.renderStart(D,B,$),y=_t.get($),y.init(B),x.push(y),$.traverseVisible(function(X){X.isLight&&X.layers.test(B.layers)&&(y.pushLight(X),X.castShadow&&y.pushShadow(X))}),D!==$&&D.traverseVisible(function(X){X.isLight&&X.layers.test(B.layers)&&(y.pushLight(X),X.castShadow&&y.pushShadow(X))}),y.setupLights(),I!==null&&I.updateLights(y.state.lightsArray),ct=this.localClippingEnabled,rt=Bt.init(this.clippingPlanes,ct),rt===!0&&Bt.setGlobalState(this.clippingPlanes,B),I!==null&&Ht.render(y.state.shadowsArray,$,B);const W=new Set;return D.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const wt=X.material;if(wt)if(Array.isArray(wt))for(let Lt=0;Lt<wt.length;Lt++){const bt=wt[Lt];rf(bt,$,B,X),W.add(bt)}else rf(wt,$,B,X),W.add(wt)}),y=x.pop(),I!==null&&I.renderEnd(),W},this.compileAsync=function(D,B,$=null){const W=this.compile(D,B,$);return new Promise(X=>{function wt(){if(W.forEach(function(Lt){const Ft=q.get(Lt).currentProgram;(Ft===void 0||Ft.isReady())&&W.delete(Lt)}),W.size===0){X(D);return}setTimeout(wt,10)}Kt.get("KHR_parallel_shader_compile")!==null?wt():setTimeout(wt,10)})};let Nl=null;function Mg(D){Nl&&Nl(D)}function af(){hs.stop()}function of(){hs.start()}const hs=new Ym;hs.setAnimationLoop(Mg),typeof self<"u"&&hs.setContext(self),this.setAnimationLoop=function(D){Nl=D,Nt.setAnimationLoop(D),D===null?hs.stop():hs.start()},Nt.addEventListener("sessionstart",af),Nt.addEventListener("sessionend",of),this.render=function(D,B){if(B!==void 0&&B.isCamera!==!0){se("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;I!==null&&I.renderStart(D,B);const $=Nt.enabled===!0&&Nt.isPresenting===!0,W=E!==null&&(K===null||$)&&E.begin(C,K);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Nt.enabled===!0&&Nt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Nt.cameraAutoUpdate===!0&&Nt.updateCamera(B),B=Nt.getCamera()),D.isScene===!0&&D.onBeforeRender(C,D,B,K),y=_t.get(D,x.length),y.init(B),y.state.textureUnits=Z.getTextureUnits(),x.push(y),ut.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),nt.setFromProjectionMatrix(ut,gn,B.reversedDepth),ct=this.localClippingEnabled,rt=Bt.init(this.clippingPlanes,ct),S=Mt.get(D,T.length),S.init(),T.push(S),Nt.enabled===!0&&Nt.isPresenting===!0){const Lt=C.xr.getDepthSensingMesh();Lt!==null&&Ul(Lt,B,-1/0,C.sortObjects)}Ul(D,B,0,C.sortObjects),S.finish(),I!==null&&I.updateLights(y.state.lightsArray),C.sortObjects===!0&&S.sort(gt,Vt),ot=Nt.enabled===!1||Nt.isPresenting===!1||Nt.hasDepthSensing()===!1,ot&&Zt.addToRenderList(S,D),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),rt===!0&&Bt.beginShadows();const X=y.state.shadowsArray;if(Ht.render(X,D,B),rt===!0&&Bt.endShadows(),(W&&E.hasRenderPass())===!1){const Lt=S.opaque,bt=S.transmissive;if(y.setupLights(),B.isArrayCamera){const Ft=B.cameras;if(bt.length>0)for(let Ut=0,Jt=Ft.length;Ut<Jt;Ut++){const ee=Ft[Ut];cf(Lt,bt,D,ee)}ot&&Zt.render(D);for(let Ut=0,Jt=Ft.length;Ut<Jt;Ut++){const ee=Ft[Ut];lf(S,D,ee,ee.viewport)}}else bt.length>0&&cf(Lt,bt,D,B),ot&&Zt.render(D),lf(S,D,B)}K!==null&&H===0&&(Z.updateMultisampleRenderTarget(K),Z.updateRenderTargetMipmap(K)),W&&E.end(C),D.isScene===!0&&D.onAfterRender(C,D,B),Tt.resetDefaultState(),Y=-1,Q=null,x.pop(),x.length>0?(y=x[x.length-1],Z.setTextureUnits(y.state.textureUnits),rt===!0&&Bt.setGlobalState(C.clippingPlanes,y.state.camera)):y=null,T.pop(),T.length>0?S=T[T.length-1]:S=null,I!==null&&I.renderEnd()};function Ul(D,B,$,W){if(D.visible===!1)return;if(D.layers.test(B.layers)){if(D.isGroup)$=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(B);else if(D.isLightProbeGrid)y.pushLightProbeGrid(D);else if(D.isLight)y.pushLight(D),D.castShadow&&y.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||D.intersectsFrustum(nt)){W&&zt.setFromMatrixPosition(D.matrixWorld).applyMatrix4(ut);const Lt=st.update(D),bt=D.material;bt.visible&&S.push(D,Lt,bt,$,zt.z,null,B)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||D.intersectsFrustum(nt))){const Lt=st.update(D),bt=D.material;if(W&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),zt.copy(D.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),zt.copy(Lt.boundingSphere.center)),zt.applyMatrix4(D.matrixWorld).applyMatrix4(ut)),Array.isArray(bt)){const Ft=Lt.groups;for(let Ut=0,Jt=Ft.length;Ut<Jt;Ut++){const ee=Ft[Ut],It=bt[ee.materialIndex];It&&It.visible&&S.push(D,Lt,It,$,zt.z,ee,B)}}else bt.visible&&S.push(D,Lt,bt,$,zt.z,null,B)}}const wt=D.children;for(let Lt=0,bt=wt.length;Lt<bt;Lt++)Ul(wt[Lt],B,$,W)}function lf(D,B,$,W){const{opaque:X,transmissive:wt,transparent:Lt}=D;y.setupLightsView($),rt===!0&&Bt.setGlobalState(C.clippingPlanes,$),W&&w.viewport(j.copy(W)),X.length>0&&Ya(X,B,$),wt.length>0&&Ya(wt,B,$),Lt.length>0&&Ya(Lt,B,$),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function cf(D,B,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[W.id]===void 0){const It=Kt.has("EXT_color_buffer_half_float")||Kt.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[W.id]=new zi(1,1,{generateMipmaps:!0,type:It?Mn:Ei,minFilter:mn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:re.workingColorSpace})}const wt=y.state.transmissionRenderTarget[W.id],Lt=W.viewport||j;wt.setSize(Lt.z*C.transmissionResolutionScale,Lt.w*C.transmissionResolutionScale);const bt=C.getRenderTarget(),Ft=C.getActiveCubeFace(),Ut=C.getActiveMipmapLevel();C.setRenderTarget(wt),C.getClearColor(Xt),qt=C.getClearAlpha(),qt<1&&C.setClearColor(16777215,.5),C.clear(),ot&&Zt.render($);const Jt=C.toneMapping;C.toneMapping=vn;const ee=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),y.setupLightsView(W),rt===!0&&Bt.setGlobalState(C.clippingPlanes,W),Ya(D,$,W),Z.updateMultisampleRenderTarget(wt),Z.updateRenderTargetMipmap(wt),Kt.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let pe=0,Be=B.length;pe<Be;pe++){const be=B[pe],{object:_e,geometry:ii,material:Pt,group:li}=be;if(Pt.side===Yi&&_e.layers.test(W.layers)){const ue=Pt.side;Pt.side=ti,Pt.needsUpdate=!0,uf(_e,$,W,ii,Pt,li),Pt.side=ue,Pt.needsUpdate=!0,It=!0}}It===!0&&(Z.updateMultisampleRenderTarget(wt),Z.updateRenderTargetMipmap(wt))}C.setRenderTarget(bt,Ft,Ut),C.setClearColor(Xt,qt),ee!==void 0&&(W.viewport=ee),C.toneMapping=Jt}function Ya(D,B,$){const W=B.isScene===!0?B.overrideMaterial:null;for(let X=0,wt=D.length;X<wt;X++){const Lt=D[X],{object:bt,geometry:Ft,group:Ut}=Lt;let Jt=Lt.material;Jt.allowOverride===!0&&W!==null&&(Jt=W),bt.layers.test($.layers)&&uf(bt,B,$,Ft,Jt,Ut)}}function uf(D,B,$,W,X,wt){I!==null&&X.isNodeMaterial&&I.setObject(D,X),D.onBeforeRender(C,B,$,W,X,wt),D.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),X.onBeforeRender(C,B,$,W,D,wt),X.transparent===!0&&X.side===Yi&&X.forceSinglePass===!1?(X.side=ti,X.needsUpdate=!0,C.renderBufferDirect($,B,W,X,D,wt),X.side=Ps,X.needsUpdate=!0,C.renderBufferDirect($,B,W,X,D,wt),X.side=Yi):C.renderBufferDirect($,B,W,X,D,wt),D.onAfterRender(C,B,$,W,X,wt)}function $a(D,B,$){B.isScene!==!0&&(B=k);const W=q.get(D),X=y.state.lights,wt=y.state.shadowsArray,Lt=X.state.version,bt=vt.getParameters(D,X.state,wt,B,$,y.state.lightProbeGridArray),Ft=vt.getProgramCacheKey(bt);let Ut=W.programs;W.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?B.environment:null,W.fog=B.fog;const Jt=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;W.envMap=ht.get(D.envMap||W.environment,Jt),W.envMapRotation=W.environment!==null&&D.envMap===null?B.environmentRotation:D.envMapRotation,Ut===void 0&&(D.addEventListener("dispose",ji),Ut=new Map,W.programs=Ut);let ee=Ut.get(Ft);if(ee!==void 0){if(W.currentProgram===ee&&W.lightsStateVersion===Lt)return ff(D,bt),ee}else bt.uniforms=vt.getUniforms(D),I!==null&&D.isNodeMaterial&&I.build(D,$,bt),D.onBeforeCompile(bt,C),ee=vt.acquireProgram(bt,Ft),Ut.set(Ft,ee),W.uniforms=bt.uniforms;const It=W.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(It.clippingPlanes=Bt.uniform),ff(D,bt),W.needsLights=Eg(D),W.lightsStateVersion=Lt,W.needsLights&&(It.ambientLightColor.value=X.state.ambient,It.lightProbe.value=X.state.probe,It.sunLights.value=X.state.sun,It.sunLightShadows.value=X.state.sunShadow,It.directionalLights.value=X.state.directional,It.directionalLightShadows.value=X.state.directionalShadow,It.spotLights.value=X.state.spot,It.spotLightShadows.value=X.state.spotShadow,It.rectAreaLights.value=X.state.rectArea,It.ltc_1.value=X.state.rectAreaLTC1,It.ltc_2.value=X.state.rectAreaLTC2,It.pointLights.value=X.state.point,It.pointLightShadows.value=X.state.pointShadow,It.hemisphereLights.value=X.state.hemi,It.sunShadowMatrix.value=X.state.sunShadowMatrix,It.sunShadowCascade.value=X.state.sunShadowCascade,It.directionalShadowMatrix.value=X.state.directionalShadowMatrix,It.spotLightMatrix.value=X.state.spotLightMatrix,It.spotLightMap.value=X.state.spotLightMap,It.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=y.state.lightProbeGridArray.length>0,W.currentProgram=ee,W.uniformsList=null,ee}function hf(D){if(D.uniformsList===null){const B=D.currentProgram.getUniforms();D.uniformsList=Qo.seqWithValue(B.seq,D.uniforms)}return D.uniformsList}function ff(D,B){const $=q.get(D);$.outputColorSpace=B.outputColorSpace,$.batching=B.batching,$.batchingColor=B.batchingColor,$.instancing=B.instancing,$.instancingColor=B.instancingColor,$.instancingMorph=B.instancingMorph,$.skinning=B.skinning,$.morphTargets=B.morphTargets,$.morphNormals=B.morphNormals,$.morphColors=B.morphColors,$.morphTargetsCount=B.morphTargetsCount,$.numClippingPlanes=B.numClippingPlanes,$.numIntersection=B.numClipIntersection,$.vertexAlphas=B.vertexAlphas,$.vertexTangents=B.vertexTangents,$.toneMapping=B.toneMapping}function Sg(D,B){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;_.setFromMatrixPosition(B.matrixWorld);for(let $=0,W=D.length;$<W;$++){const X=D[$];if(X.texture!==null&&X.boundingBox.containsPoint(_))return X}return null}function bg(D,B,$,W,X){B.isScene!==!0&&(B=k),Z.resetTextureUnits();const wt=B.fog,Lt=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?B.environment:null,bt=K===null?C.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:re.workingColorSpace,Ft=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ut=ht.get(W.envMap||Lt,Ft),Jt=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ee=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),It=!!$.morphAttributes.position,pe=!!$.morphAttributes.normal,Be=!!$.morphAttributes.color;let be=vn;W.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(be=C.toneMapping);const _e=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ii=_e!==void 0?_e.length:0,Pt=q.get(W),li=y.state.lights;if(rt===!0&&(ct===!0||D!==Q)){const Se=D===Q&&W.id===Y;Bt.setState(W,D,Se)}let ue=!1;W.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==li.state.version||Pt.outputColorSpace!==bt||X.isBatchedMesh&&Pt.batching===!1||!X.isBatchedMesh&&Pt.batching===!0||X.isBatchedMesh&&Pt.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Pt.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Pt.instancing===!1||!X.isInstancedMesh&&Pt.instancing===!0||X.isSkinnedMesh&&Pt.skinning===!1||!X.isSkinnedMesh&&Pt.skinning===!0||X.isInstancedMesh&&Pt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Pt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Pt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Pt.instancingMorph===!1&&X.morphTexture!==null||Pt.envMap!==Ut||W.fog===!0&&Pt.fog!==wt||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==Bt.numPlanes||Pt.numIntersection!==Bt.numIntersection)||Pt.vertexAlphas!==Jt||Pt.vertexTangents!==ee||Pt.morphTargets!==It||Pt.morphNormals!==pe||Pt.morphColors!==Be||Pt.toneMapping!==be||Pt.morphTargetsCount!==ii||!!Pt.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(ue=!0):(ue=!0,Pt.__version=W.version);let Li=Pt.currentProgram;ue===!0&&(Li=$a(W,B,X),I&&W.isNodeMaterial&&I.onUpdateProgram(W,Li,Pt));let tn=!1,Vn=!1,Os=!1;const ve=Li.getUniforms(),Ie=Pt.uniforms;if(w.useProgram(Li.program)&&(tn=!0,Vn=!0,Os=!0),W.id!==Y&&(Y=W.id,Vn=!0),Pt.needsLights){const Se=Sg(y.state.lightProbeGridArray,X);Pt.lightProbeGrid!==Se&&(Pt.lightProbeGrid=Se,Vn=!0)}if(tn||Q!==D){w.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),ve.setValue(N,"projectionMatrix",D.projectionMatrix),ve.setValue(N,"viewMatrix",D.matrixWorldInverse);const Hn=ve.map.cameraPosition;Hn!==void 0&&Hn.setValue(N,pt.setFromMatrixPosition(D.matrixWorld)),R.logarithmicDepthBuffer&&ve.setValue(N,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ve.setValue(N,"isOrthographic",D.isOrthographicCamera===!0),Q!==D&&(Q=D,Vn=!0,Os=!0)}if(Pt.needsLights&&(li.state.sunShadowMap.length>0&&ve.setValue(N,"sunShadowMap",li.state.sunShadowMap,Z),li.state.directionalShadowMap.length>0&&ve.setValue(N,"directionalShadowMap",li.state.directionalShadowMap,Z),li.state.spotShadowMap.length>0&&ve.setValue(N,"spotShadowMap",li.state.spotShadowMap,Z),li.state.pointShadowMap.length>0&&ve.setValue(N,"pointShadowMap",li.state.pointShadowMap,Z)),X.isSkinnedMesh){ve.setOptional(N,X,"bindMatrix"),ve.setOptional(N,X,"bindMatrixInverse");const Se=X.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),ve.setValue(N,"boneTexture",Se.boneTexture,Z))}X.isBatchedMesh&&(ve.setOptional(N,X,"batchingTexture"),ve.setValue(N,"batchingTexture",X._matricesTexture,Z),ve.setOptional(N,X,"batchingIdTexture"),ve.setValue(N,"batchingIdTexture",X._indirectTexture,Z),ve.setOptional(N,X,"batchingColorTexture"),X._colorsTexture!==null&&ve.setValue(N,"batchingColorTexture",X._colorsTexture,Z));const Gn=$.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&z.update(X,$,Li),(Vn||Pt.receiveShadow!==X.receiveShadow)&&(Pt.receiveShadow=X.receiveShadow,ve.setValue(N,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&B.environment!==null&&(Ie.envMapIntensity.value=B.environmentIntensity),Ie.dfgLUT!==void 0&&(Ie.dfgLUT.value=Lw()),Vn){if(ve.setValue(N,"toneMappingExposure",C.toneMappingExposure),Pt.needsLights&&wg(Ie,Os),wt&&W.fog===!0&&Ot.refreshFogUniforms(Ie,wt),Ot.refreshMaterialUniforms(Ie,W,et,J,y.state.transmissionRenderTarget[D.id]),Pt.needsLights&&Pt.lightProbeGrid){const Se=Pt.lightProbeGrid;Ie.probesSH.value=Se.texture,Ie.probesMin.value.copy(Se.boundingBox.min),Ie.probesMax.value.copy(Se.boundingBox.max),Ie.probesResolution.value.copy(Se.resolution)}Qo.upload(N,hf(Pt),Ie,Z)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Qo.upload(N,hf(Pt),Ie,Z),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ve.setValue(N,"center",X.center),ve.setValue(N,"modelViewMatrix",X.modelViewMatrix),ve.setValue(N,"normalMatrix",X.normalMatrix),ve.setValue(N,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){const Se=W.uniformsGroups;for(let Hn=0,Bs=Se.length;Hn<Bs;Hn++){const pf=Se[Hn];at.update(pf,Li),at.bind(pf,Li)}}return Li}function wg(D,B){D.ambientLightColor.needsUpdate=B,D.lightProbe.needsUpdate=B,D.sunLights.needsUpdate=B,D.sunLightShadows.needsUpdate=B,D.directionalLights.needsUpdate=B,D.directionalLightShadows.needsUpdate=B,D.pointLights.needsUpdate=B,D.pointLightShadows.needsUpdate=B,D.spotLights.needsUpdate=B,D.spotLightShadows.needsUpdate=B,D.rectAreaLights.needsUpdate=B,D.hemisphereLights.needsUpdate=B}function Eg(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(D,B,$){const W=q.get(D);W.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),q.get(D.texture).__webglTexture=B,q.get(D.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,B){const $=q.get(D);$.__webglFramebuffer=B,$.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(D,B=0,$=0){K=D,V=B,H=$;let W=null,X=!1,wt=!1;if(D){const bt=q.get(D);if(bt.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(N.FRAMEBUFFER,bt.__webglFramebuffer),j.copy(D.viewport),dt.copy(D.scissor),Et=D.scissorTest,w.viewport(j),w.scissor(dt),w.setScissorTest(Et),Y=-1;return}else if(bt.__webglFramebuffer===void 0)Z.setupRenderTarget(D);else if(bt.__hasExternalTextures)Z.rebindTextures(D,q.get(D.texture).__webglTexture,q.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const Jt=D.depthTexture;if(bt.__boundDepthTexture!==Jt){if(Jt!==null&&q.has(Jt)&&(D.width!==Jt.image.width||D.height!==Jt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(D)}}const Ft=D.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(wt=!0);const Ut=q.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Ut[B])?W=Ut[B][$]:W=Ut[B],X=!0):D.samples>0&&Z.useMultisampledRTT(D)===!1?W=q.get(D).__webglMultisampledFramebuffer:Array.isArray(Ut)?W=Ut[$]:W=Ut,j.copy(D.viewport),dt.copy(D.scissor),Et=D.scissorTest}else j.copy(Dt).multiplyScalar(et).floor(),dt.copy(Gt).multiplyScalar(et).floor(),Et=fe;if($!==0&&(W=O),w.bindFramebuffer(N.FRAMEBUFFER,W)&&w.drawBuffers(D,W),w.viewport(j),w.scissor(dt),w.setScissorTest(Et),X){const bt=q.get(D.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,bt.__webglTexture,$)}else if(wt){const bt=B;for(let Ft=0;Ft<D.textures.length;Ft++){const Ut=q.get(D.textures[Ft]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ft,Ut.__webglTexture,$,bt)}}else if(D!==null&&$!==0){const bt=q.get(D.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,bt.__webglTexture,$)}Y=-1};function df(D){const B=q.get(D);return(B.__readFormat!==D.format||B.__readType!==D.type)&&(B.__readFormat=D.format,B.__readType=D.type,B.__formatReadable=R.textureFormatReadable(D.format),B.__typeReadable=R.textureTypeReadable(D.type)),B}this.readRenderTargetPixels=function(D,B,$,W,X,wt,Lt,bt=0){if(!(D&&D.isWebGLRenderTarget)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=q.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Lt!==void 0&&(Ft=Ft[Lt]),Ft){w.bindFramebuffer(N.FRAMEBUFFER,Ft);try{const Ut=D.textures[bt],Jt=Ut.format,ee=Ut.type;D.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+bt);const It=df(Ut);if(It.__formatReadable===!1){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(It.__typeReadable===!1){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=D.width-W&&$>=0&&$<=D.height-X&&N.readPixels(B,$,W,X,yt.convert(Jt),yt.convert(ee),wt)}finally{const Ut=K!==null?q.get(K).__webglFramebuffer:null;w.bindFramebuffer(N.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(D,B,$,W,X,wt,Lt,bt=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=q.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Lt!==void 0&&(Ft=Ft[Lt]),Ft)if(B>=0&&B<=D.width-W&&$>=0&&$<=D.height-X){w.bindFramebuffer(N.FRAMEBUFFER,Ft);const Ut=D.textures[bt],Jt=Ut.format,ee=Ut.type;D.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+bt);const It=df(Ut);if(It.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(It.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const pe=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,pe),N.bufferData(N.PIXEL_PACK_BUFFER,wt.byteLength,N.STREAM_READ),N.readPixels(B,$,W,X,yt.convert(Jt),yt.convert(ee),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);const Be=K!==null?q.get(K).__webglFramebuffer:null;w.bindFramebuffer(N.FRAMEBUFFER,Be);const be=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Z_(N,be,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,pe),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,wt),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(pe),N.deleteSync(be),wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,B=null,$=0){const W=Math.pow(2,-$),X=Math.floor(D.image.width*W),wt=Math.floor(D.image.height*W),Lt=B!==null?B.x:0,bt=B!==null?B.y:0;Z.setTexture2D(D,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,Lt,bt,X,wt),w.unbindTexture()},this.copyTextureToTexture=function(D,B,$=null,W=null,X=0,wt=0){let Lt,bt,Ft,Ut,Jt,ee,It,pe,Be;const be=D.isCompressedTexture?D.mipmaps[wt]:D.image;if($!==null)Lt=$.max.x-$.min.x,bt=$.max.y-$.min.y,Ft=$.isBox3?$.max.z-$.min.z:1,Ut=$.min.x,Jt=$.min.y,ee=$.isBox3?$.min.z:0;else{const Ie=Math.pow(2,-X);Lt=Math.floor(be.width*Ie),bt=Math.floor(be.height*Ie),D.isDataArrayTexture?Ft=be.depth:D.isData3DTexture?Ft=Math.floor(be.depth*Ie):Ft=1,Ut=0,Jt=0,ee=0}W!==null?(It=W.x,pe=W.y,Be=W.z):(It=0,pe=0,Be=0);const _e=yt.convert(B.format),ii=yt.convert(B.type);let Pt;B.isData3DTexture?(Z.setTexture3D(B,0),Pt=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Z.setTexture2DArray(B,0),Pt=N.TEXTURE_2D_ARRAY):(Z.setTexture2D(B,0),Pt=N.TEXTURE_2D),w.activeTexture(N.TEXTURE0),w.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),w.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),w.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const li=w.getParameter(N.UNPACK_ROW_LENGTH),ue=w.getParameter(N.UNPACK_IMAGE_HEIGHT),Li=w.getParameter(N.UNPACK_SKIP_PIXELS),tn=w.getParameter(N.UNPACK_SKIP_ROWS),Vn=w.getParameter(N.UNPACK_SKIP_IMAGES);w.pixelStorei(N.UNPACK_ROW_LENGTH,be.width),w.pixelStorei(N.UNPACK_IMAGE_HEIGHT,be.height),w.pixelStorei(N.UNPACK_SKIP_PIXELS,Ut),w.pixelStorei(N.UNPACK_SKIP_ROWS,Jt),w.pixelStorei(N.UNPACK_SKIP_IMAGES,ee);const Os=D.isDataArrayTexture||D.isData3DTexture,ve=B.isDataArrayTexture||B.isData3DTexture;if(D.isDepthTexture){const Ie=q.get(D),Gn=q.get(B),Se=q.get(Ie.__renderTarget),Hn=q.get(Gn.__renderTarget);w.bindFramebuffer(N.READ_FRAMEBUFFER,Se.__webglFramebuffer),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let Bs=0;Bs<Ft;Bs++)Os&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,q.get(D).__webglTexture,X,ee+Bs),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,q.get(B).__webglTexture,wt,Be+Bs)),N.blitFramebuffer(Ut,Jt,Lt,bt,It,pe,Lt,bt,N.DEPTH_BUFFER_BIT,N.NEAREST);w.bindFramebuffer(N.READ_FRAMEBUFFER,null),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(X!==0||D.isRenderTargetTexture||q.has(D)){const Ie=q.get(D),Gn=q.get(B);w.bindFramebuffer(N.READ_FRAMEBUFFER,L),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,U);for(let Se=0;Se<Ft;Se++)Os?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ie.__webglTexture,X,ee+Se):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ie.__webglTexture,X),ve?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Gn.__webglTexture,wt,Be+Se):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Gn.__webglTexture,wt),X!==0?N.blitFramebuffer(Ut,Jt,Lt,bt,It,pe,Lt,bt,N.COLOR_BUFFER_BIT,N.NEAREST):ve?N.copyTexSubImage3D(Pt,wt,It,pe,Be+Se,Ut,Jt,Lt,bt):N.copyTexSubImage2D(Pt,wt,It,pe,Ut,Jt,Lt,bt);w.bindFramebuffer(N.READ_FRAMEBUFFER,null),w.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ve?D.isDataTexture||D.isData3DTexture?N.texSubImage3D(Pt,wt,It,pe,Be,Lt,bt,Ft,_e,ii,be.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(Pt,wt,It,pe,Be,Lt,bt,Ft,_e,be.data):N.texSubImage3D(Pt,wt,It,pe,Be,Lt,bt,Ft,_e,ii,be):D.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,wt,It,pe,Lt,bt,_e,ii,be.data):D.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,wt,It,pe,be.width,be.height,_e,be.data):N.texSubImage2D(N.TEXTURE_2D,wt,It,pe,Lt,bt,_e,ii,be);w.pixelStorei(N.UNPACK_ROW_LENGTH,li),w.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ue),w.pixelStorei(N.UNPACK_SKIP_PIXELS,Li),w.pixelStorei(N.UNPACK_SKIP_ROWS,tn),w.pixelStorei(N.UNPACK_SKIP_IMAGES,Vn),wt===0&&B.generateMipmaps&&N.generateMipmap(Pt),w.unbindTexture()},this.initRenderTarget=function(D){q.get(D).__webglFramebuffer===void 0&&Z.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?Z.setTextureCube(D,0):D.isData3DTexture?Z.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?Z.setTexture2DArray(D,0):Z.setTexture2D(D,0),w.unbindTexture()},this.resetState=function(){V=0,H=0,K=null,w.reset(),Tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}}const Iw=263693,Nw=1/20,Uw=new A;class Ow{constructor(t){P(this,"canvas");P(this,"renderer");P(this,"scene",new Zu);P(this,"camera");P(this,"overlay",new Zu);P(this,"overlayCamera");P(this,"coarse");P(this,"width",1);P(this,"height",1);P(this,"pixelRatio",1);P(this,"maxPixelRatio",1);P(this,"pixelRatioCap",1/0);P(this,"fps",60);P(this,"time",0);P(this,"frameCallbacks",[]);P(this,"resizeCallbacks",new Set);P(this,"resize",()=>{const t=window.innerWidth,e=window.innerHeight;this.width=t,this.height=e,this.maxPixelRatio=Math.min(window.devicePixelRatio||1,this.coarse?1.75:2),this.pixelRatio=Math.min(this.maxPixelRatio,this.pixelRatioCap),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),Object.assign(this.overlayCamera,{left:-t/2,right:t/2,top:e/2,bottom:-e/2}),this.overlayCamera.updateProjectionMatrix();for(const i of this.resizeCallbacks)i(t,e)});P(this,"tick",(t,e)=>{const i=Math.min(e/1e3,Nw);this.time+=i,i>0&&(this.fps=pn(this.fps,1/i,.05));for(const{callback:n}of this.frameCallbacks)n(this.time,i);this.renderer.autoClear=!0,this.renderer.render(this.scene,this.camera),this.overlay.children.length>0&&(this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.overlay,this.overlayCamera))});this.canvas=t,this.renderer=new Fw({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setClearColor(Iw,1),this.camera=new bi(40,1,.1,24e3),this.camera.position.set(0,0,60),this.overlayCamera=new Ll(-1,1,1,-1,-10,10),this.coarse=matchMedia("(pointer: coarse)").matches,this.resize(),addEventListener("resize",this.resize),ft.ticker.add(this.tick)}onFrame(t,e=0){const i={callback:t,priority:e},n=[...this.frameCallbacks];let r=n.length;for(;r>0&&n[r-1].priority>e;)r--;return n.splice(r,0,i),this.frameCallbacks=n,()=>{this.frameCallbacks=this.frameCallbacks.filter(a=>a!==i)}}onResize(t){return this.resizeCallbacks.add(t),()=>this.resizeCallbacks.delete(t)}project(t,e){const i=Uw.copy(t).project(this.camera);return e.x=(i.x*.5+.5)*this.width,e.y=(-i.y*.5+.5)*this.height,e}setPixelRatioCap(t){t!==this.pixelRatioCap&&(this.pixelRatioCap=t,this.resize())}gpuLabel(){const t=this.renderer.getContext(),e=t.getExtension("WEBGL_debug_renderer_info");let i=String((e?t.getParameter(e.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER))??"");const n=i.match(/^ANGLE \((.*)\)$/);return n&&(i=n[1].split(",")[1]??n[1]),i=i.replace(/ANGLE \w+ Renderer:\s*/i,"").replace(/\(0x[0-9a-f]+\)/gi,"").replace(/\s(Direct3D|vs_|ps_|OpenGL|Vulkan \d).*$/i,"").trim(),i?i.length>28?`${i.slice(0,27)}…`:i:"WebGL"}}const Bw=[{id:"aurora-from-orbit",title:"Aurora From Orbit",category:"Orbit",file:"aurora-from-orbit",width:1800,height:1198,tone:"#5b6570",accent:"#813582",credit:{name:"NASA",url:"https://unsplash.com/photos/NuE8Nu3otjo"}},{id:"matterhorn",title:"Matterhorn",category:"Mountains",place:"Swiss–Italian Alps",file:"matterhorn",width:1800,height:1350,tone:"#7d8bac",accent:"#98ace7",credit:{name:"Andras Toth",url:"https://unsplash.com/photos/E9CrQou9K0Y"}},{id:"jellyfish-in-blue",title:"Jellyfish in Blue",category:"Ocean",file:"jellyfish-in-blue",width:1800,height:1200,tone:"#0967ae",accent:"#05effd",credit:{name:"贝莉儿 NG",url:"https://unsplash.com/photos/bviex5lwf3s"}},{id:"dune-crossing",title:"Dune Crossing",category:"Desert",file:"dune-crossing",width:1800,height:1200,tone:"#b39ca3",accent:"#f47934",credit:{name:"Luca Zanon",url:"https://unsplash.com/photos/aViOQZzikVs"}},{id:"under-the-milky-way",title:"Under the Milky Way",category:"Night sky",file:"under-the-milky-way",width:1800,height:1200,tone:"#433229",accent:"#d3b189",credit:{name:"Greg Rakozy",url:"https://unsplash.com/photos/oMpAz-DN-9I"}},{id:"sea-cave-window",title:"Sea Cave Window",category:"Coast",file:"sea-cave-window",width:1800,height:1202,tone:"#40626c",accent:"#067293",credit:{name:"Stefan Kunze",url:"https://unsplash.com/photos/1-C334jLxG0"}},{id:"bridge-lights",title:"Bridge Lights",category:"City",place:"New York",file:"bridge-lights",width:1800,height:1200,tone:"#372944",accent:"#291f43",credit:{name:"Anders Jildén",url:"https://unsplash.com/photos/nrLtvA05jk8"}},{id:"slot-canyon",title:"Slot Canyon",category:"Desert",file:"slot-canyon",width:1800,height:1200,tone:"#66301e",accent:"#a44718",credit:{name:"Sebastian Boguszewicz",url:"https://unsplash.com/photos/YG_Fxyqz9xg"}},{id:"northern-lights",title:"Northern Lights",category:"Night sky",file:"northern-lights",width:1800,height:1800,tone:"#0d3f40",accent:"#02ae7d",credit:{name:"Marcelo Quinan",url:"https://unsplash.com/photos/R3pUGn5YiTg"}},{id:"trolltunga",title:"Trolltunga",category:"Fjords",place:"Norway",file:"trolltunga",width:1800,height:1200,tone:"#6a7a83",accent:"#fefff0",credit:{name:"Julia Caesar",url:"https://unsplash.com/photos/asct7UP3YDE"}},{id:"courtyard-sun",title:"Courtyard Sun",category:"Architecture",file:"courtyard-sun",width:1800,height:1200,tone:"#6d4a43",accent:"#edbd87",credit:{name:"Alexandre Perotto",url:"https://unsplash.com/photos/zCevd81eJDU"}},{id:"coastline-from-orbit",title:"Coastline From Orbit",category:"Orbit",file:"coastline-from-orbit",width:1800,height:1197,tone:"#455358",accent:"#22607b",credit:{name:"NASA",url:"https://unsplash.com/photos/6-jTZysYY_U"}},{id:"silver-lining",title:"Silver Lining",category:"Sky",file:"silver-lining",width:1800,height:1013,tone:"#61405d",accent:"#190338",credit:{name:"Cristian Baron",url:"https://unsplash.com/photos/dPFaq7RVzbQ"}},{id:"machu-picchu-in-cloud",title:"Machu Picchu in Cloud",category:"Mountains",place:"Peru",file:"machu-picchu-in-cloud",width:1800,height:1196,tone:"#9ea5aa",accent:"#dce5ef",credit:{name:"John Kutcher",url:"https://unsplash.com/photos/UIf9YO7LsuE"}},{id:"sunset-sea-stacks",title:"Sunset Sea Stacks",category:"Coast",file:"sunset-sea-stacks",width:1800,height:1200,tone:"#884636",accent:"#fe7b3b",credit:{name:"Jenna Beekhuis",url:"https://unsplash.com/photos/Bm0Ja6LZWl4"}},{id:"vertical-grid",title:"Vertical Grid",category:"Architecture",file:"vertical-grid",width:1200,height:1800,tone:"#a3b2bf",accent:"#b6e4fd",credit:{name:"Mihail Ribkin",url:"https://unsplash.com/photos/VjmlDjePHjE"}},{id:"circumpolar-trails",title:"Circumpolar Trails",category:"Night sky",file:"circumpolar-trails",width:1800,height:1200,tone:"#42434d",accent:"#404250",credit:{name:"Michael Hull",url:"https://unsplash.com/photos/UdvXJ95Yqt8"}},{id:"balloon-morning",title:"Balloon Morning",category:"Sky",place:"Cappadocia, Türkiye",file:"balloon-morning",width:1800,height:1200,tone:"#a98a69",accent:"#a46513",credit:{name:"Daniela Cuevas",url:"https://unsplash.com/photos/t7YycgAoVSw"}},{id:"canopy-falls",title:"Canopy Falls",category:"Forest",file:"canopy-falls",width:1800,height:1201,tone:"#4d5b3e",accent:"#3e5523",credit:{name:"Andrew Coelho",url:"https://unsplash.com/photos/VB-w_3dnyvI"}},{id:"city-lights-at-dusk",title:"City Lights at Dusk",category:"City",file:"city-lights-at-dusk",width:1800,height:1112,tone:"#344e5d",accent:"#028ad2",credit:{name:"Dmitry Sytnik",url:"https://unsplash.com/photos/bW2vHKCxbx4"}},{id:"crater-wall-from-orbit",title:"Crater Wall From Orbit",category:"Orbit",file:"crater-wall-from-orbit",width:1800,height:1125,tone:"#825d40",accent:"#ab6b37",credit:{name:"NASA",url:"https://unsplash.com/photos/E7q00J_8N7A"}},{id:"blue-ridges",title:"Blue Ridges",category:"Mountains",file:"blue-ridges",width:1800,height:1200,tone:"#617ba8",accent:"#02133b",credit:{name:"Luca Zanon",url:"https://unsplash.com/photos/X0OoHrPvgXE"}},{id:"ring-of-sparks",title:"Ring of Sparks",category:"Light",file:"ring-of-sparks",width:1800,height:1201,tone:"#53504d",accent:"#d5ccbc",credit:{name:"Kamesh Vedula",url:"https://unsplash.com/photos/ISL7czxIP-k"}},{id:"mossy-falls",title:"Mossy Falls",category:"Forest",file:"mossy-falls",width:1800,height:1350,tone:"#5f736f",accent:"#b7cfde",credit:{name:"Jeff Sheldon",url:"https://unsplash.com/photos/SdSc4sWVMRU"}},{id:"gold-above-the-clouds",title:"Gold Above the Clouds",category:"Sky",file:"gold-above-the-clouds",width:1800,height:1200,tone:"#bd815c",accent:"#d05804",credit:{name:"Nitish Meena",url:"https://unsplash.com/photos/RbbdzZBKRDY"}},{id:"cliffs-and-open-sea",title:"Cliffs and Open Sea",category:"Coast",file:"cliffs-and-open-sea",width:1800,height:1200,tone:"#848079",accent:"#815b2c",credit:{name:"Paweł Wojciechowski",url:"https://unsplash.com/photos/QYAojSRu82c"}},{id:"snowcap-under-stars",title:"Snowcap Under Stars",category:"Night sky",file:"snowcap-under-stars",width:1200,height:1800,tone:"#353959",accent:"#363b61",credit:{name:"kazuend",url:"https://unsplash.com/photos/2KXEb_8G5vo"}},{id:"field-lines",title:"Field Lines",category:"Aerial",file:"field-lines",width:1800,height:1205,tone:"#5b5730",accent:"#d5a35d",credit:{name:"Matt Benson",url:"https://unsplash.com/photos/rHbob_bEsSs"}},{id:"river-light-trails",title:"River Light Trails",category:"City",place:"Moscow",file:"river-light-trails",width:1800,height:1200,tone:"#573d5b",accent:"#6028d9",credit:{name:"Yulia Vambold",url:"https://unsplash.com/photos/s0ifr6qb6H0"}},{id:"bromo-caldera",title:"Bromo Caldera",category:"Mountains",place:"Java, Indonesia",file:"bromo-caldera",width:1800,height:816,tone:"#70766c",accent:"#674c35",credit:{name:"Harman Abiwardani",url:"https://unsplash.com/photos/WLUHO9A_xik"}},{id:"hoodoo-country",title:"Hoodoo Country",category:"Desert",file:"hoodoo-country",width:1200,height:1800,tone:"#6f696b",accent:"#1e79ad",credit:{name:"Drew Hays",url:"https://unsplash.com/photos/e6Fi_FBMfY0"}},{id:"fjord-from-the-cliff",title:"Fjord From the Cliff",category:"Fjords",file:"fjord-from-the-cliff",width:1800,height:1200,tone:"#5e8db1",accent:"#0250a1",credit:{name:"Alexey Topolyanskiy",url:"https://unsplash.com/photos/-oWyJoSqBRM"}}],kw={id:"sun",name:"Sun",kind:"Star",radius:48,rotationHours:609.1,tilt:7.25,color:"#ffcf7a",facts:{diameter:"1,392,700 km",fromSun:"—",day:"25 days (equator)",year:"230 million years (around the galaxy)",moons:"8 planets, 5 dwarf planets",blurb:"A G-type star holding 99.86% of the solar system’s mass."}},Cc={id:"home",name:"Gallery",kind:"Home world",radius:5,orbit:{a:320,e:.0167,i:0,node:0,peri:102.94,L0:100.46,period:1},color:"#9cc7ff",facts:{diameter:"32 photos wide",fromSun:"1.00 AU",day:"24 hours",year:"365.25 days",moons:"1 (the Moon)",blurb:"The photo globe, orbiting where Earth would be."}},zw={id:"moon",name:"Moon",kind:"Moon",parent:"home",radius:1.4,orbit:{a:42,e:.055,i:5.1,node:125.1,peri:83.3,L0:218.3,period:27.322/365.25},rotationHours:655.7,tilt:6.7,color:"#c9c6bf",texture:"moon",facts:{diameter:"3,474 km",fromSun:"1.00 AU",day:"29.5 days",year:"27.3 days (around home)",moons:"—",blurb:"Tidally locked: the same face always turns towards home."}},eg=[{id:"mercury",name:"Mercury",kind:"Planet",radius:1.9,orbit:{a:120,e:.2056,i:7,node:48.33,peri:77.46,L0:252.25,period:.2408},rotationHours:1407.6,tilt:.03,color:"#a59f98",texture:"mercury",facts:{diameter:"4,879 km",fromSun:"0.39 AU",day:"176 days",year:"88 days",moons:"0",blurb:"The smallest planet, scorched by day and frozen by night."}},{id:"venus",name:"Venus",kind:"Planet",radius:4.6,orbit:{a:200,e:.0068,i:3.39,node:76.68,peri:131.53,L0:181.98,period:.6152},rotationHours:-5832.5,tilt:177.4,color:"#e8cf9a",texture:"venus",atmosphere:"#f3dca8",facts:{diameter:"12,104 km",fromSun:"0.72 AU",day:"117 days (spins backwards)",year:"225 days",moons:"0",blurb:"Hidden under sulphuric clouds; the hottest planet at 465 °C."}},{id:"mars",name:"Mars",kind:"Planet",radius:2.7,orbit:{a:440,e:.0934,i:1.85,node:49.56,peri:336.04,L0:355.45,period:1.8808},rotationHours:24.62,tilt:25.19,color:"#c1603a",texture:"mars",atmosphere:"#e7a27f",facts:{diameter:"6,779 km",fromSun:"1.52 AU",day:"24.6 hours",year:"687 days",moons:"2",blurb:"Rust-red deserts, giant volcanoes and polar ice caps."}},{id:"ceres",name:"Ceres",kind:"Dwarf planet",radius:.9,orbit:{a:560,e:.0785,i:10.59,node:80.3,peri:153.9,L0:160,period:4.6},rotationHours:9.07,tilt:4,color:"#8d8a85",texture:"ceres",facts:{diameter:"940 km",fromSun:"2.77 AU",day:"9.1 hours",year:"4.6 years",moons:"0",blurb:"The largest body in the asteroid belt, with bright salt spots."}},{id:"jupiter",name:"Jupiter",kind:"Planet",radius:26,orbit:{a:820,e:.0484,i:1.3,node:100.46,peri:14.33,L0:34.4,period:11.862},rotationHours:9.93,tilt:3.13,color:"#d9b48a",texture:"jupiter",atmosphere:"#e9d2b0",facts:{diameter:"139,820 km",fromSun:"5.20 AU",day:"9.9 hours",year:"11.9 years",moons:"95",blurb:"The giant: its Great Red Spot is a storm wider than Earth."}},{id:"saturn",name:"Saturn",kind:"Planet",radius:21,orbit:{a:1120,e:.0539,i:2.49,node:113.67,peri:93.06,L0:49.95,period:29.457},rotationHours:10.66,tilt:26.73,color:"#e3cf9c",texture:"saturn",atmosphere:"#efe0b8",rings:{inner:26,outer:48,style:"saturn"},facts:{diameter:"116,460 km",fromSun:"9.54 AU",day:"10.7 hours",year:"29.5 years",moons:"146",blurb:"Ringed in ice: its rings span 280,000 km but are mostly 10 m thick."}},{id:"uranus",name:"Uranus",kind:"Planet",radius:12,orbit:{a:1420,e:.0473,i:.77,node:74.01,peri:173,L0:313.24,period:84.01},rotationHours:-17.24,tilt:97.77,color:"#a8dfe6",texture:"uranus",atmosphere:"#bff0f4",rings:{inner:17,outer:21,style:"uranus"},facts:{diameter:"50,724 km",fromSun:"19.2 AU",day:"17.2 hours (spins backwards)",year:"84 years",moons:"28",blurb:"An ice giant rolling on its side, tilted 98°."}},{id:"neptune",name:"Neptune",kind:"Planet",radius:11.5,orbit:{a:1700,e:.0086,i:1.77,node:131.78,peri:48.12,L0:304.88,period:164.8},rotationHours:16.11,tilt:28.32,color:"#4f74e3",texture:"neptune",atmosphere:"#7fa2ff",facts:{diameter:"49,244 km",fromSun:"30.1 AU",day:"16.1 hours",year:"165 years",moons:"16",blurb:"Deep blue and wind-whipped: the fastest winds in the solar system."}},{id:"pluto",name:"Pluto",kind:"Dwarf planet",radius:1.1,orbit:{a:1950,e:.2488,i:17.14,node:110.3,peri:224.07,L0:238.93,period:247.9},rotationHours:-153.3,tilt:122.5,color:"#cdb59a",texture:"pluto",facts:{diameter:"2,377 km",fromSun:"39.5 AU",day:"6.4 days",year:"248 years",moons:"5",blurb:"Home of a vast nitrogen-ice heart, Tombaugh Regio."}},{id:"haumea",name:"Haumea",kind:"Dwarf planet",radius:1,shape:[1.6,1,.55],orbit:{a:2100,e:.19,i:28.2,node:122.2,peri:1.2,L0:195,period:284},rotationHours:3.92,tilt:0,color:"#e6e8ee",texture:"haumea",facts:{diameter:"~1,600 km (egg-shaped)",fromSun:"43.1 AU",day:"3.9 hours",year:"284 years",moons:"2",blurb:"Spins so fast it has stretched into an egg shape."}},{id:"makemake",name:"Makemake",kind:"Dwarf planet",radius:.95,orbit:{a:2250,e:.16,i:29,node:79.6,peri:16.6,L0:180,period:306},rotationHours:22.8,tilt:0,color:"#c58a68",texture:"makemake",facts:{diameter:"1,430 km",fromSun:"45.4 AU",day:"22.8 hours",year:"306 years",moons:"1",blurb:"A reddish world of frozen methane in the Kuiper belt."}},{id:"eris",name:"Eris",kind:"Dwarf planet",radius:1.15,orbit:{a:2500,e:.3,i:44,node:35.95,peri:187.6,L0:20,period:559},rotationHours:25.9,tilt:0,color:"#eceff4",texture:"eris",facts:{diameter:"2,326 km",fromSun:"67.8 AU",day:"15.8 days",year:"559 years",moons:"1",blurb:"The most massive dwarf planet, on a steep, distant orbit."}}],Vw=1200,Gw=60,Pc=[0,1,10,100],Kh={shuttle:{kind:"Ship",short:"Low orbit",blurb:"A crew shuttle in low orbit, skimming a few radii above the photos.",facts:{route:"Low orbit round the gallery",lap:"70 seconds",crew:"Shuttle class"}},courier:{kind:"Ship",short:"Moon run",blurb:"A fast courier running loops out round the Moon and back.",facts:{route:"Gallery ⇄ Moon",lap:"About a minute",crew:"Courier class"}},cruiser:{kind:"Ship",short:"Mars · Jupiter",blurb:"A heavy cruiser on the long haul: Mars, Jupiter, then home again.",facts:{route:"Gallery → Mars → Jupiter",lap:"Long haul",crew:"Cruiser class"}},station:{kind:"Station",short:"Lunar orbit",blurb:"A ring station on a steep orbit round the Moon.",facts:{route:"Orbiting the Moon",lap:"50 seconds",crew:"Ring station"}}},xl=200,Hw=/\.(jpe?g|jfif|png|webp|gif|avif|heic|heif)$/i,sp={coarse:12e6,fine:32e6},Ww=360;function Xw(s,t){return{id:s.id,title:s.title,category:s.category,place:s.place,src:`${t}photos/${s.file}-sm.webp`,full:`${t}photos/${s.file}-lg.webp`,width:s.width,height:s.height,tone:s.tone,accent:s.accent,credit:s.credit}}function ig(s){const t=new Image;return t.decoding="async",t.src=s,t.decode().then(()=>t)}function rp(s){return s.type.startsWith("image/")||!s.type&&Hw.test(s.name)}async function qw(s){if(typeof createImageBitmap=="function")try{const e=await createImageBitmap(s,{imageOrientation:"from-image"});return{source:e,width:e.width,height:e.height,release:()=>e.close()}}catch{}const t=URL.createObjectURL(s);try{const e=await ig(t);return{source:e,width:e.naturalWidth,height:e.naturalHeight,release:()=>{}}}finally{URL.revokeObjectURL(t)}}function ap(s,t,e,i){const n=Math.min(1,i/Math.max(t,e)),r=document.createElement("canvas");r.width=Math.max(1,Math.round(t*n)),r.height=Math.max(1,Math.round(e*n));const a=r.getContext("2d");return a.imageSmoothingQuality="high",a.drawImage(s,0,0,r.width,r.height),r}function Yw(s){return new Promise(t=>s.toBlob(e=>t(e?URL.createObjectURL(e):null),"image/jpeg",.82))}function $w(s){const t=document.createElement("canvas");t.width=t.height=24;const e=t.getContext("2d",{willReadFrequently:!0});e.drawImage(s,0,0,24,24);const i=e.getImageData(0,0,24,24).data;let n=0,r=0,a=0,o={score:-1,rgb:[0,0,0]};for(let u=0;u<i.length;u+=4){n+=i[u],r+=i[u+1],a+=i[u+2];const f=Math.max(i[u],i[u+1],i[u+2]),h=Math.min(i[u],i[u+1],i[u+2]),d=(f+h)/510,p=(f-h)/255*(1-Math.abs(d-.5)*1.6);p>o.score&&(o={score:p,rgb:[i[u],i[u+1],i[u+2]]})}const l=i.length/4,c=u=>`#${u.map(f=>Math.round(f).toString(16).padStart(2,"0")).join("")}`;return{tone:c([n/l,r/l,a/l]),accent:c(o.rgb)}}function Kw(s){const t=s.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").replace(/\s+/g," ").trim();return t?t.charAt(0).toUpperCase()+t.slice(1):"Untitled photo"}class Zw extends EventTarget{constructor(e,i,{coarse:n=!1}={}){super();P(this,"photos");P(this,"originals");P(this,"renderer");P(this,"coarse");P(this,"textures",new Map);P(this,"isCustom",!1);P(this,"busy",!1);P(this,"urls",[]);P(this,"batch",0);this.photos=e,this.originals=e,this.renderer=i,this.coarse=n}get count(){return this.photos.length}indexOf(e){return this.photos.indexOf(e)}texture(e){return this.textures.get(e.id)}async loadTextures(e,i=this.photos){if(!this.renderer)return;let n=0;const r=i.length;await Promise.all(i.map(async a=>{try{if(!this.textures.has(a.id)){const o=await ig(a.src);this.textures.set(a.id,this.makeTexture(o))}}catch{}n+=1,e?.(n,r)}))}async replaceWith(e,{onProgress:i}={}){const n=[...e];if(this.busy)return{added:[],skipped:[],ignored:0,busy:!0};this.busy=!0;const r=n.filter(rp),a=n.filter(p=>!rp(p)).map(p=>p.name),o=Math.max(0,r.length-xl),l=r.slice(0,xl),c=this.coarse?sp.coarse:sp.fine,u=Rt(Math.round(Math.sqrt(c/Math.max(1,l.length)*1.5)),256,1024),f=++this.batch,h=[],d=[];try{const p=new Array(l.length);let v=0,g=0;const m=async()=>{for(;v<l.length;){const _=v++;p[_]=await this.readFile(l[_],`mine-${f}-${_}`,u,d),i?.(++g,l.length)}};if(await Promise.all(Array.from({length:Math.min(this.coarse?3:4,l.length)},m)),l.forEach((_,S)=>p[S]?h.push(p[S]):a.push(_.name)),h.length===0)return{added:h,skipped:a,ignored:o};const M=this.photos,b=this.urls;return this.photos=h,this.urls=d,this.isCustom=!0,this.emit("replace"),this.release(M,b),{added:h,skipped:a,ignored:o}}finally{this.busy=!1}}async restoreOriginals(){if(!this.isCustom||this.busy)return!1;this.busy=!0;try{await this.loadTextures(null,this.originals);const e=this.photos,i=this.urls;return this.photos=this.originals,this.urls=[],this.isCustom=!1,this.emit("restore"),this.release(e,i),!0}finally{this.busy=!1}}async readFile(e,i,n,r){let a=null;try{a=await qw(e);const{source:o,width:l,height:c}=a;if(!l||!c)return null;const u=ap(o,l,c,n),f=ap(u,u.width,u.height,Ww);a.release(),a=null;const{tone:h,accent:d}=$w(f),p=await Yw(f),v=URL.createObjectURL(e);if(r.push(v),p&&r.push(p),this.renderer){const g=this.makeTexture(u,()=>u.width=u.height=1);this.textures.set(i,g)}return{id:i,title:Kw(e.name),category:"Your photos",src:p??v,full:v,width:l,height:c,tone:h,accent:d,local:!0}}catch{return null}finally{a?.release()}}release(e,i){for(const n of e)this.textures.get(n.id)?.dispose(),this.textures.delete(n.id);for(const n of i)URL.revokeObjectURL(n)}emit(e){this.dispatchEvent(new CustomEvent("change",{detail:{reason:e,photos:this.photos}}))}makeTexture(e,i){const n=e instanceof HTMLCanvasElement?new Al(e):new ei(e);return n.colorSpace=$e,n.minFilter=mn,n.magFilter=Oe,n.generateMipmaps=!0,n.needsUpdate=!0,i&&(n.onUpdate=()=>{n.onUpdate=null,i()}),this.renderer&&(n.anisotropy=Math.min(4,this.renderer.capabilities.getMaxAnisotropy()),this.renderer.initTexture(n)),n}}function op(s){const t=(s.panelHeight+s.gap)/s.radius,e=Math.floor(s.maxLatitude/t+1e-9),i=[];for(let n=-e;n<=e;n++){const r=n*t,a=Math.min(Math.abs(r)+s.panelHeight/2/s.radius,Math.PI/2-.001),o=2*Math.PI*s.radius*Math.cos(a),l=Math.max(1,Math.floor(o/(s.panelWidth+s.gap))),c=2*Math.PI/l;i.push({index:n,lat:r,count:l,lonStep:c,lonOffset:Math.abs(n)%2==1?c/2:0})}return i}function lp(s){const t=[...s].sort((i,n)=>Math.abs(i.index)-Math.abs(n.index)||n.index-i.index),e=[];for(const i of t)for(let n=0;n<i.count;n++)e.push({row:i.index,column:n,lat:i.lat,lon:i.lonOffset+n*i.lonStep});return e}function Jw(s,t,e=.4){let i=1,n=s,r=op(n),a=lp(r);for(;a.length<t&&i*.94>=e;)i*=.94,n={...s,panelWidth:s.panelWidth*i,panelHeight:s.panelHeight*i,gap:s.gap*i},r=op(n),a=lp(r);return{options:n,rows:r,slots:a,scale:i}}function Qw(s,t){for(;t;)[s,t]=[t,s%t];return s}function ng(s,t){if(t<=0||s<=0)return[];let e=Math.max(1,Math.round(t/1.618));for(;Qw(e,t)!==1;)e++;return Array.from({length:s},(i,n)=>n*e%t)}function Po(s,t,e){const i=Math.cos(s);return[e*i*Math.sin(t),e*Math.sin(s),e*i*Math.cos(t)]}function jw(s,t,e){const i=-t;return{pitch:s,yaw:i+Math.round((e-i)/(2*Math.PI))*2*Math.PI}}const An=Math.PI*2;function cp(s,t){return Math.acos(Math.max(-1,Math.min(1,1-2*s/t)))}function tE(s,{aspect:t=1.35}={}){s=Math.max(1,Math.floor(s));const e=2*An/s;if(s===1)return[{index:0,kind:"cap",theta0:0,theta1:Math.PI,phi0:0,phi1:An,lat:Math.PI/2,lon:0,area:e}];if(s===2)return[{index:0,kind:"cap",theta0:0,theta1:Math.PI/2,phi0:0,phi1:An,lat:Math.PI/2,lon:0,area:e},{index:1,kind:"cap",theta0:Math.PI/2,theta1:Math.PI,phi0:0,phi1:An,lat:-Math.PI/2,lon:0,area:e}];const i=cp(1,s),n=Math.sqrt(e/t),r=Math.max(1,Math.round((Math.PI-2*i)/n)),a=(Math.PI-2*i)/r,o=[];let l=0;for(let d=0;d<r;d++){const p=i+d*a,v=p+a,g=An*(Math.cos(p)-Math.cos(v))/e,m=Math.max(1,Math.round(g+l));l+=g-m,o.push(m)}const c=[{index:0,kind:"cap",theta0:0,theta1:i,phi0:0,phi1:An,lat:Math.PI/2,lon:0,area:e}];let u=1,f=i,h=0;for(const d of o){const p=cp(u+d,s),v=An/d;for(let g=0;g<d;g++){const m=h+g*v;c.push({index:c.length,kind:"band",theta0:f,theta1:p,phi0:m,phi1:m+v,lat:Math.PI/2-(f+p)/2,lon:m+v/2,area:e})}h+=v/2,u+=d,f=p}return c.push({index:c.length,kind:"cap",theta0:f,theta1:Math.PI,phi0:0,phi1:An,lat:-Math.PI/2,lon:0,area:e}),c}function pr(s,t,e,i,n){const r=Math.sin(s);i[n]=e*r*Math.sin(t),i[n+1]=e*Math.cos(s),i[n+2]=e*r*Math.cos(t)}function eE(s,t){return s>t?[t/s,1]:[1,s/t]}function iE(s,{radius:t=5,photoAspect:e=1.5,segments:i=12}={}){const n=new ce;if(s.kind==="cap")return nE(n,s,t,e,i);const r=i,a=Math.max(2,Math.round(i*.75)),o=(r+1)*(a+1),l=new Float32Array(o*3),c=new Float32Array(o*3),u=new Float32Array(o*2),f=new Float32Array(o*2),h=(s.theta0+s.theta1)/2,d=(s.phi1-s.phi0)*Math.sin(h),p=s.theta1-s.theta0,[v,g]=eE(e,d/p);let m=0;for(let b=0;b<=a;b++){const _=b/a,S=s.theta0+(s.theta1-s.theta0)*_;for(let y=0;y<=r;y++){const T=y/r,x=s.phi0+(s.phi1-s.phi0)*T;pr(S,x,t,l,m*3),pr(S,x,1,c,m*3),u[m*2]=.5+(T-.5)*v,u[m*2+1]=.5-(_-.5)*g,f[m*2]=T,f[m*2+1]=_,m++}}const M=[];for(let b=0;b<a;b++)for(let _=0;_<r;_++){const S=b*(r+1)+_,y=S+r+1;M.push(S,y,S+1,S+1,y,y+1)}return n.setAttribute("position",new Wt(l,3)),n.setAttribute("normal",new Wt(c,3)),n.setAttribute("uv",new Wt(u,2)),n.setAttribute("aLocal",new Wt(f,2)),n.setIndex(M),n}function nE(s,t,e,i,n){const r=t.theta0===0,a=t.theta1-t.theta0,o=Math.max(3,Math.round(n*.6)),l=Math.max(16,n*3),c=1+o*(l+1),u=new Float32Array(c*3),f=new Float32Array(c*3),h=new Float32Array(c*2),d=new Float32Array(c*2),[p,v]=i>=1?[1/i,1]:[1,i],g=r?0:Math.PI;pr(g,0,e,u,0),pr(g,0,1,f,0),h[0]=h[1]=.5,d[0]=.5,d[1]=0;let m=1;for(let b=1;b<=o;b++){const _=b/o,S=r?a*_:Math.PI-a*_;for(let y=0;y<=l;y++){const T=y/l*An;pr(S,T,e,u,m*3),pr(S,T,1,f,m*3);const x=Math.sin(T)*_,E=Math.cos(T)*_*(r?-1:1);h[m*2]=.5+.5*x*p,h[m*2+1]=.5+.5*E*v,d[m*2]=y/l,d[m*2+1]=_,m++}}const M=[];for(let b=0;b<l;b++)M.push(0,1+b,1+b+1);for(let b=1;b<o;b++){const _=1+(b-1)*(l+1),S=_+l+1;for(let y=0;y<l;y++)M.push(_+y,S+y,_+y+1,_+y+1,S+y,S+y+1)}if(!r)for(let b=0;b<M.length;b+=3)[M[b+1],M[b+2]]=[M[b+2],M[b+1]];return s.setAttribute("position",new Wt(u,3)),s.setAttribute("normal",new Wt(f,3)),s.setAttribute("uv",new Wt(h,2)),s.setAttribute("aLocal",new Wt(d,2)),s.setIndex(M),s}const sE=`
  uniform float uWrap;
  uniform float uWrapRadius;
  uniform vec3 uCentre;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewW;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    if (uWrap > 0.0) {
      vec3 radial = normalize(world.xyz - uCentre);
      world.xyz = mix(world.xyz, uCentre + radial * uWrapRadius, uWrap);
      vNormalW = normalize(mix(vNormalW, radial, uWrap));
    }
    vViewW = cameraPosition - world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,rE=`
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform vec2 uCover;
  uniform float uAspect;
  uniform vec3 uTone;
  uniform vec3 uSignal;
  uniform float uHover;
  uniform float uReveal;
  uniform float uDim;
  uniform float uFade;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vViewW;

  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    // rounded panel outline, in units of panel height
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    float d = sdRoundRect(p, vec2(0.5 * uAspect, 0.5), 0.04);
    float aa = max(fwidth(d), 1e-4);
    float shape = 1.0 - smoothstep(-aa, aa, d);

    // reveal: a scan line sweeps bottom to top and leaves the photo behind it
    float scan = uReveal * 1.2 - 0.1;
    float shown = 1.0 - smoothstep(scan - 0.02, scan + 0.02, vUv.y);
    float scanGlow = (1.0 - smoothstep(0.0, 0.08, abs(vUv.y - scan))) * step(0.001, uReveal) * step(uReveal, 0.999);

    // cover-fit the photo, with a slight push-in on hover
    vec2 uv = (vUv - 0.5) * uCover * (1.0 - 0.06 * uHover) + 0.5;
    vec3 photo = mix(uTone, texture2D(uMap, uv).rgb, uHasMap);

    // panels turning away from the viewer fall into shadow
    float facing = clamp(dot(normalize(vNormalW), normalize(vViewW)), 0.0, 1.0);
    vec3 col = photo * mix(0.22, 1.0, smoothstep(0.05, 0.8, facing));

    // hairline border that brightens on hover
    float edge = 1.0 - smoothstep(0.0, 0.014 + aa, -d);
    col = mix(col, uSignal * (1.2 + uHover), edge * (0.32 + 0.68 * uHover));
    col += uSignal * scanGlow * 0.9;
    col *= (1.0 + 0.1 * uHover) * (1.0 - 0.7 * uDim) * uFade;

    float alpha = shape * shown * uOpacity;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`,aE=`
  varying vec3 vObj;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  void main() {
    vObj = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`,oE=`
  uniform vec3 uBase;
  uniform vec3 uLine;
  uniform vec3 uRim;
  uniform float uFade;
  uniform float uGrid;
  varying vec3 vObj;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  const float PI = 3.141592653589793;
  float gridLine(float v, float cells) {
    float x = v * cells;
    float w = fwidth(x);
    return 1.0 - smoothstep(0.0, w * 1.1, abs(fract(x + 0.5) - 0.5));
  }
  void main() {
    vec3 n = normalize(vObj);
    float lat = asin(clamp(n.y, -1.0, 1.0)) / PI + 0.5;    // 0..1
    float lon = atan(n.x, n.z) / (2.0 * PI) + 0.5;          // 0..1
    float grid = max(gridLine(lat, 12.0), gridLine(lon, 24.0) * (1.0 - smoothstep(0.9, 0.98, abs(n.y))));
    float fresnel = pow(1.0 - max(dot(vNormalV, vViewV), 0.0), 2.6);
    vec3 col = uBase + uLine * grid * 0.3 * uGrid + uRim * fresnel * 0.75;
    // fades by transparency, so a fading globe never blots out the stars behind it
    gl_FragColor = vec4(col, uFade);
    #include <colorspace_fragment>
  }
`,lE=`
  varying vec3 vNormalV;
  varying vec3 vViewV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`,cE=`
  uniform vec3 uColor;
  uniform float uStrength;
  uniform float uFade;
  varying vec3 vNormalV;
  varying vec3 vViewV;
  void main() {
    float i = pow(clamp(-dot(vNormalV, vViewV), 0.0, 1.0), 1.7) * uStrength * uFade;
    gl_FragColor = vec4(uColor, clamp(i, 0.0, 1.0));
    #include <colorspace_fragment>
  }
`,uE=`
  uniform vec3 uCenter;
  uniform float uGrow;
  uniform float uRadius;
  attribute vec2 aLocal;
  varying vec2 vUv;
  varying vec2 vLocal;
  varying float vTheta;
  varying vec3 vNormalW;
  varying vec3 vViewW;
  void main() {
    vUv = uv;
    vLocal = aLocal;
    vTheta = acos(clamp(position.y / uRadius, -1.0, 1.0));
    vec3 p = normalize(mix(uCenter, position, uGrow)) * uRadius;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * p);
    vViewW = cameraPosition - world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,hE=`
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform vec3 uTone;
  uniform vec3 uSignal;
  uniform vec3 uRim;
  uniform vec3 uSeamColor;
  uniform float uHover;
  uniform float uReveal;
  uniform float uDim;
  uniform float uFade;
  uniform float uOpacity;
  uniform float uGrow;
  uniform float uRadius;
  uniform float uKind;
  uniform vec2 uSpan;
  uniform float uSeam;
  uniform vec3 uSunDir;
  uniform float uDayNight;
  varying vec2 vUv;
  varying vec2 vLocal;
  varying float vTheta;
  varying vec3 vNormalW;
  varying vec3 vViewW;

  // distance to the cell's nearest edge, in world units
  float edgeDistance() {
    if (uKind > 0.5) return (1.0 - vLocal.y) * uSpan.y * uRadius;
    float width = uSpan.x * sin(vTheta) * uRadius;
    float dx = min(vLocal.x, 1.0 - vLocal.x) * width;
    float dy = min(vLocal.y, 1.0 - vLocal.y) * uSpan.y * uRadius;
    return min(dx, dy);
  }

  void main() {
    float d = edgeDistance();
    float aa = max(fwidth(d), 1e-4);
    // hairline seam (each neighbour draws its half) and a soft bevel inside it
    float seam = 1.0 - smoothstep(uSeam - aa * 0.5, uSeam + aa, d);
    float bevel = smoothstep(0.0, uSeam * 7.0, d);
    float border = 1.0 - smoothstep(uSeam * 2.6 - aa * 0.5, uSeam * 2.6 + aa, d);

    // reveal: bands scan bottom to top, caps from the pole outwards
    float along = uKind > 0.5 ? vLocal.y : 1.0 - vLocal.y;
    float scan = uReveal * 1.2 - 0.1;
    float shown = 1.0 - smoothstep(scan - 0.02, scan + 0.02, along);
    // cells are big, so their scan line is thinner than a panel's
    float scanGlow = (1.0 - smoothstep(0.0, 0.035, abs(along - scan))) * step(0.001, uReveal) * step(uReveal, 0.999);

    vec2 uv = (vUv - 0.5) * (1.0 - 0.06 * uHover) + 0.5;
    vec3 photo = mix(uTone, texture2D(uMap, uv).rgb, uHasMap);
    photo = mix(uTone * 0.32, photo, shown);

    vec3 n = normalize(vNormalW);
    float facing = clamp(dot(n, normalize(vViewW)), 0.0, 1.0);
    vec3 col = photo * mix(0.4, 1.0, smoothstep(0.0, 0.72, facing));
    col *= mix(0.84, 1.0, bevel);
    // optional day/night from a sun direction (off by default), never below 0.72
    float day = smoothstep(-0.3, 0.55, dot(n, uSunDir));
    col *= mix(1.0, mix(0.72, 1.0, day), uDayNight);

    // edges glow while a cell grows in, then settle into the dark seam
    float growing = uGrow * (1.0 - uGrow) * 4.0;
    col = mix(col, uSeamColor, seam * 0.92 * (1.0 - growing));
    col = mix(col, uSignal * 1.3, border * max(uHover, growing * 0.8));
    col += uRim * pow(1.0 - facing, 3.0) * 0.5;
    col += uSignal * scanGlow * 0.7;
    col *= (1.0 + 0.1 * uHover) * (1.0 - 0.7 * uDim) * uFade;
    gl_FragColor = vec4(col, uOpacity);
    #include <colorspace_fragment>
  }
`,fE=24,dE=240,pE=.5,mE=s=>.12+.34*(Math.abs(s)/(Math.PI/2)),sh=Math.PI*2,gE=new Ct("#9cc7ff"),vE=new Ct("#3f86ff"),_E=new Ct("#03060e"),sg=new Cr(new Uint8Array([10,18,36,255]),1,1);sg.needsUpdate=!0;function xE(s){const t=s.map(e=>e.width/e.height).sort((e,i)=>e-i);return Rt(t[Math.floor(t.length/2)]??1.5,.8,1.8)}function ka(s,t,e=new A){const i=Math.sin(s);return e.set(i*Math.sin(t),Math.cos(s),i*Math.cos(t))}function up(s,t,e,i,n){for(const r of[-sh,0,sh]){const a=Math.max(s,e+r),o=Math.min(t,i+r);if(n?o>=a-1e-6:o>a+1e-6)return!0}return!1}function yE(s){const t=(e,i)=>Math.abs(e-i)<1e-7;return s.map(e=>s.filter(i=>e===i?!1:t(e.theta1,i.theta0)||t(e.theta0,i.theta1)?up(e.phi0,e.phi1,i.phi0,i.phi1,!1):t(e.theta0,i.theta0)&&up(e.phi0,e.phi1,i.phi0,i.phi1,!0)).map(i=>i.index))}function ME(s,t){const e=[...s].sort((l,c)=>Math.abs(l.lat)-Math.abs(c.lat)||c.lat-l.lat||l.lon-c.lon),i=ng(s.length,t),n=new Array(s.length).fill(-1);if(t>=s.length)return e.forEach((l,c)=>n[l.index]=i[c]),n;const r=yE(s),a=s.map(l=>ka(Math.PI/2-l.lat,l.lon)),o=new Array(t).fill(0);return e.forEach((l,c)=>{let u=0,f=1/0;for(let h=0;h<t;h++){let d=o[h]*4+(h===i[c]?-.5:0);for(const p of r[l.index])n[p]===h&&(d+=100);for(let p=0;p<s.length;p++)n[p]===h&&(d+=Math.max(0,a[l.index].dot(a[p])-.2)*6);d<f&&(f=d,u=h)}n[l.index]=u,o[u]+=1}),n}function SE(s,t,e){const i=s.map(u=>ka(Math.PI/2-u.lat,u.lon)),n=new Float32Array(s.length*t).fill(-2);for(const u of e)for(let f=0;f<s.length;f++){const h=f*t+u.photo,d=i[f].dot(u.normal);d>n[h]&&(n[h]=d)}const r=[];for(let u=0;u<n.length;u++)n[u]>-2&&r.push(u);r.sort((u,f)=>n[f]-n[u]);const a=new Array(s.length).fill(-1),o=new Uint8Array(t);let l=s.length;for(const u of r){const f=Math.floor(u/t),h=u%t;if(!(a[f]!==-1||o[h])&&(a[f]=h,o[h]=1,--l===0))break}let c=0;for(let u=0;u<s.length;u++)if(a[u]===-1){for(;o[c];)c++;a[u]=c,o[c]=1}return a}function bE(s,t,e,i,n){const r=s.kind==="band";return new he({uniforms:{uMap:{value:e??sg},uHasMap:{value:e?1:0},uTone:{value:new Ct(t.tone)},uSignal:{value:gE.clone()},uRim:{value:vE.clone()},uSeamColor:{value:_E.clone()},uHover:{value:0},uReveal:{value:1},uDim:{value:0},uOpacity:{value:1},uGrow:{value:1},uCenter:{value:new A},uRadius:{value:i},uKind:{value:r?0:1},uSpan:{value:new lt(s.phi1-s.phi0,s.theta1-s.theta0)},uSeam:{value:.011},uFade:n.uFade,uSunDir:n.uSunDir,uDayNight:n.uDayNight},vertexShader:uE,fragmentShader:hE})}function wE(s,t){const e=[];if(s.kind==="cap"){const r=s.theta0===0?s.theta1:s.theta0;for(let a=0;a<12;a++)e.push(ka(r,a/12*sh).multiplyScalar(t));return e.push(new A(0,s.theta0===0?t:-t,0)),e}const i=[s.theta0,(s.theta0+s.theta1)/2,s.theta1],n=[s.phi0,(s.phi0+s.phi1)/2,s.phi1];for(const r of i)for(const a of n)e.push(ka(r,a).multiplyScalar(t));return e}class EE{constructor({radius:t,shared:e}){P(this,"group",new Ee);P(this,"cells",[]);P(this,"partition",[]);P(this,"radius");P(this,"shared");this.radius=t,this.shared=e,this.group.visible=!1}build(t,e=null){this.dispose();const i=t.photos;if(i.length===0)return;const n=Rt(i.length,fE,dE);this.partition=tE(n,{aspect:xE(i)});const r=e&&i.length>=n?SE(this.partition,i.length,e):ME(this.partition,i.length),a=n<=60?12:n<=140?10:8,o=this.radius;this.cells=this.partition.map((l,c)=>{const u=i[r[c]],f=iE(l,{radius:o,photoAspect:u.width/u.height,segments:a});f.computeBoundingSphere();const h=bE(l,u,t.texture(u),o,this.shared),d=l.kind==="cap",p=d?new A(0,l.lat>0?1:-1,0):ka(Math.PI/2-l.lat,l.lon);h.uniforms.uCenter.value.copy(p).multiplyScalar(o);const v=new ae(f,h);v.userData.panel=c,this.group.add(v);const g=(l.theta0+l.theta1)/2,m=l.theta1-l.theta0;return{index:c,kind:l.kind,mesh:v,photo:u,cell:l,lat:l.lat,lon:l.lon,normal:p,basePosition:p.clone().multiplyScalar(o),baseQuaternion:v.quaternion.clone(),corners:wE(l,o),width:d?m*o*2:(l.phi1-l.phi0)*Math.sin(g)*o,height:d?m*o*2:m*o,start:mE(l.lat),hover:0}})}dispose(){for(const t of this.cells)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.cells=[]}refreshTextures(t){for(const e of this.cells){const i=t.texture(e.photo),n=e.mesh.material.uniforms;i&&n.uMap.value!==i&&(n.uMap.value=i,n.uHasMap.value=1)}}cellAt(t){let e=null,i=-1/0;for(const n of this.cells){const r=n.normal.dot(t);r>i&&(e=n,i=r)}return e}update(t,e,i){for(const n of this.cells)n.hover=Ye(n.hover,n===e?1:0,10,t),n.mesh.material.uniforms.uHover.value=n.hover,i&&n.mesh.scale.setScalar(1+.022*n.hover)}applyMorph(t,e){for(const i of this.cells){const n=i.mesh.material.uniforms;let r=1,a=1;if(e)a=t;else{const l=Rt((t-i.start)/pE,0,1);r=1-Math.pow(1-l,3)}n.uGrow.value=r,n.uOpacity.value=a;const o=a<1;i.mesh.material.transparent!==o&&(i.mesh.material.transparent=o),i.mesh.visible=r>.001&&a>.001}}}const Ne=5,rg=new Ct("#2f7bff"),ra=new Ct("#9cc7ff"),ag=new Cr(new Uint8Array([10,18,36,255]),1,1);ag.needsUpdate=!0;const TE=new A(0,1,0),Ro=new A,Lo=new A,DE=new Vi,AE=ft.parseEase("power3.inOut"),Fo=(s,t,e)=>ts.smoothstep(s,t,e);function CE(s,t){return t>s?new lt(s/t,1):new lt(1,t/s)}function PE({texture:s,tone:t,panelAspect:e,imageAspect:i,shared:n}){const r=new he({uniforms:{uMap:{value:s??ag},uHasMap:{value:s?1:0},uCover:{value:CE(e,i)},uAspect:{value:e},uTone:{value:new Ct(t)},uSignal:{value:ra.clone()},uHover:{value:0},uReveal:{value:1},uDim:{value:0},uOpacity:{value:1},uWrap:{value:0},uWrapRadius:{value:Ne},uCentre:n.uCentre,uFade:n.uFade},vertexShader:sE,fragmentShader:rE});return r.alphaToCoverage=!0,r}function RE(s){return new he({uniforms:{uBase:{value:new Ct("#060c1c")},uLine:{value:new Ct("#2f7bff")},uRim:{value:new Ct("#3f86ff")},uFade:s.uFade,uGrid:{value:1}},vertexShader:aE,fragmentShader:oE,transparent:!0})}function LE(s){return new he({uniforms:{uColor:{value:rg.clone()},uStrength:{value:1},uFade:s.uFade},vertexShader:lE,fragmentShader:cE,side:ti,transparent:!0,depthWrite:!1,blending:Ke})}function FE(s,t,e,i){const n=[];for(let a=0;a<t;a++){const o=a/t*Math.PI*2,l=a%6==0?e*2.2:e;n.push(Math.cos(o)*s,Math.sin(o)*s,0,Math.cos(o)*(s+l),Math.sin(o)*(s+l),0)}const r=new ce;return r.setAttribute("position",new ie(n,3)),new Lm(r,i)}function Rc(s,t){const e=[];for(let n=0;n<256;n++){const r=n/256*Math.PI*2;e.push(new A(Math.cos(r)*s,Math.sin(r)*s,0))}const i=new kx(new ce().setFromPoints(e),t);return i.computeLineDistances(),i}function IE(){const s=document.createElement("canvas");s.width=s.height=512;const t=s.getContext("2d"),e=512/130;t.translate(256,256),t.scale(e,e),t.lineCap="butt",t.strokeStyle="#ffffff",t.lineWidth=1.6,t.setLineDash([2,4]),t.beginPath(),t.arc(0,0,60,0,Math.PI*2),t.stroke(),t.setLineDash([]),t.lineWidth=1,t.beginPath(),t.arc(0,0,52,0,Math.PI*2),t.stroke(),t.lineWidth=9,t.lineJoin="miter",t.beginPath(),t.moveTo(-34.8,-28),t.lineTo(-34.8,28),t.moveTo(-34.8,5),t.lineTo(-7.8,-25),t.moveTo(-22.6,-8.5),t.lineTo(-6.8,26.1),t.moveTo(10.3,-28),t.lineTo(10.3,28),t.moveTo(10.3,-23.5),t.lineTo(13.3,-23.5),t.arc(13.3,0,23.5,-Math.PI/2,Math.PI/2),t.lineTo(10.3,23.5),t.stroke();const i=new Al(s);return i.colorSpace=$e,i}class NE{constructor(t,e,i){P(this,"root",new Ee);P(this,"spin",new Ee);P(this,"panelGroup",new Ee);P(this,"shared",{uFade:{value:1},uTime:{value:0},uSunDir:{value:new A(1,0,0)},uDayNight:{value:0},uCentre:{value:new A}});P(this,"viewDir",new A(0,0,1));P(this,"controller",null);P(this,"blueprintPanels",[]);P(this,"sphere");P(this,"mode","blueprint");P(this,"morph",{t:0,applied:-1,tween:null,extras:1});P(this,"modeListeners",new Set);P(this,"core");P(this,"glow");P(this,"extras",new Ee);P(this,"layout");P(this,"hovered",null);P(this,"front",null);P(this,"interactive",!1);P(this,"suppressHover",!1);P(this,"fitDistance",18);P(this,"stage");P(this,"store");P(this,"reduced");P(this,"onSelect");P(this,"rowGeometries",new Map);P(this,"rings",new Ee);P(this,"ringMaterials",[]);P(this,"polar",[]);P(this,"polarMaterials",[]);P(this,"satellites");P(this,"raycaster",new Ny);P(this,"pointer",new lt);P(this,"hoverPoint",null);P(this,"assembling",!1);P(this,"minDistance",8);P(this,"maxDistance",30);this.stage=t,this.store=e,this.reduced=i.reduced,this.onSelect=i.onSelect,this.root.add(this.spin),this.spin.add(this.panelGroup),this.spin.rotation.order="XYZ",this.sphere=new EE({radius:Ne,shared:this.shared}),this.spin.add(this.sphere.group),i.blueprint===!1&&(this.mode="sphere",this.morph.t=1);const n=new ae(new Qi(4.825,96,64),RE(this.shared));this.spin.add(n);const r=new ae(new Qi(6.1,64,48),LE(this.shared));this.root.add(r),this.core=n,this.glow=r;const a=new pl({color:ra,transparent:!0,opacity:.32,depthWrite:!1}),o=new Dy({color:rg,transparent:!0,opacity:.55,dashSize:.18,gapSize:.22,depthWrite:!1}),l=new pl({color:ra,transparent:!0,opacity:.2,depthWrite:!1});this.ringMaterials.push(a,o,l);const c=new Ee;c.add(Rc(7.25,a),Rc(7.6,o),FE(Ne*1.62,120,.09,l)),c.rotation.set(1.22,0,-.32);const u=new Ee;u.add(Rc(6.5,l)),u.rotation.set(1.62,.5,.42),this.rings.add(c,u);const f=new Fm({color:ra,size:5,sizeAttenuation:!1,transparent:!0,depthWrite:!1});this.ringMaterials.push(f);const h=new ce;h.setAttribute("position",new ie(new Float32Array(6),3)),this.satellites=new Pr(h,f),this.satellites.userData.orbits=[c,u],this.extras.add(this.rings,this.satellites),this.root.add(this.extras),t.scene.add(this.root),this.root.visible=!1,t.onResize(()=>this.updateFit()),t.onFrame((d,p)=>this.update(d,p))}attachCamera(t){this.controller=t}build(){for(const a of this.blueprintPanels)a.mesh.removeFromParent(),a.mesh.material.dispose();for(const a of this.rowGeometries.values())a.geometry.dispose();this.rowGeometries.clear();for(const a of this.polar)a.removeFromParent();this.polar[0]?.geometry.dispose(),this.polar.length=0,this.polarMaterials[0]?.map?.dispose();for(const a of this.polarMaterials)a.dispose();this.polarMaterials=[],this.hovered=null,this.front=null,this.layout=Jw(this.baseOptions(),this.store.count);const t=ng(this.layout.slots.length,this.store.count),{panelWidth:e,panelHeight:i}=this.layout.options,n=e/i;this.blueprintPanels=this.layout.slots.map((a,o)=>{const l=this.rowGeometry(a.row,a.lat),c=this.store.photos[t[o]],u=PE({texture:this.store.texture(c),tone:c.tone,panelAspect:n,imageAspect:c.width/c.height,shared:this.shared}),f=new ae(l.geometry,u),h=l.center.clone().applyAxisAngle(TE,a.lon);return f.position.copy(h),f.rotation.y=a.lon,f.userData.panel=o,this.panelGroup.add(f),{index:o,mesh:f,photo:c,lat:a.lat,lon:a.lon,basePosition:h,baseQuaternion:f.quaternion.clone(),normal:new A(...Po(a.lat,a.lon,1)),corners:l.corners,hover:0}}),this.buildPolarBadges();const r=this.blueprintPanels.map((a,o)=>({normal:a.normal,photo:t[o]}));this.sphere.build(this.store,r),this.planMorph(),this.applyMorph(),this.updateFit()}get panels(){return this.mode==="sphere"?this.sphere.cells:this.blueprintPanels}assemble(t=1.5){const e=ft.timeline();if(this.root.visible=!0,this.reduced)return this.shared.uFade.value=0,e.to(this.shared.uFade,{value:1,duration:.6,ease:"power1.out"}),e;if(this.mode==="sphere")return this.assembleSphere(e,t);this.assembling=!0;const i=hi(17),n=this.updateViewDir();for(const r of this.blueprintPanels){const{mesh:a,basePosition:o,baseQuaternion:l}=r,c=r.normal.clone().multiplyScalar(20+i()*34).add(new A((i()-.5)*16,(i()-.5)*16,(i()-.5)*16)),u=new Ri().setFromEuler(new Vi(i()*Math.PI,i()*Math.PI,i()*Math.PI)),f={t:0};a.position.copy(c),a.quaternion.copy(u),a.material.uniforms.uReveal.value=0;const h=(1-r.normal.dot(n))*.5*.75+i()*.12;e.to(f,{t:1,duration:t,ease:"expo.out",onUpdate:()=>{a.position.lerpVectors(c,o,f.t),a.quaternion.slerpQuaternions(u,l,f.t)}},h),e.to(a.material.uniforms.uReveal,{value:1,duration:.8,ease:"power2.out"},h+t*.3)}return e.fromTo(this.shared.uFade,{value:0},{value:1,duration:.9,ease:"power2.out"},0),e.fromTo(this.rings.scale,{x:.6,y:.6,z:.6},{x:1,y:1,z:1,duration:1.8,ease:"expo.out"},.2),e.call(()=>this.assembling=!1),e}leave(){this.interactive=!1,this.setHover(null);const t=ft.timeline({onComplete:()=>void(this.root.visible=!1)}),e=this.reduced?.01:1;return t.to(this.root.position,{z:-26,y:3,duration:.9*e,ease:"power3.in"},0),t.to(this.root.rotation,{y:-.8,duration:.9*e,ease:"power3.in"},0),t.to(this.shared.uFade,{value:0,duration:.7,ease:"power2.in"},.1),t}enter(){this.root.visible=!0;const t=ft.timeline({onComplete:()=>void(this.interactive=!0)}),e=this.reduced?.01:1;return t.fromTo(this.root.position,{z:-26,y:-3},{z:0,y:0,duration:1.2*e,ease:"expo.out"},0),t.fromTo(this.root.rotation,{y:.8},{y:0,duration:1.2*e,ease:"expo.out"},0),t.to(this.shared.uFade,{value:1,duration:.8,ease:"power2.out"},.05),t}focus(t,e=!0){return this.controller?this.controller.lookAtLatLon(t.lat,t.lon,{distance:e?this.focusDistance(t):void 0,duration:.85}):Promise.resolve()}release(){this.controller?.release(this.fitDistance*.92)}spotlight(t){for(const e of[...this.blueprintPanels,...this.sphere.cells]){const i=t&&e!==t?.75:0,n=e.mesh.material.uniforms.uDim;n.value!==i&&ft.to(n,{value:i,duration:.5,overwrite:!0})}}screenRect(t){t.mesh.updateWorldMatrix(!0,!1);let e=1/0,i=1/0,n=-1/0,r=-1/0;const a=new A,o={x:0,y:0};for(const l of t.corners)a.copy(l).applyMatrix4(t.mesh.matrixWorld),this.stage.project(a,o),e=Math.min(e,o.x),i=Math.min(i,o.y),n=Math.max(n,o.x),r=Math.max(r,o.y);return{x:e,y:i,width:n-e,height:r-i}}panelFor(t){let e=null,i=-1/0;for(const n of this.panels){if(n.photo!==t)continue;const r=n.normal.dot(this.viewDir);r>i&&(e=n,i=r)}return e}viewCenter(){return this.controller?.viewCenter()??{lat:0,lon:0}}facing(t){return t.normal.dot(this.viewDir)}updateViewDir(){return this.viewDir.subVectors(this.stage.camera.position,this.root.position),this.viewDir.lengthSq()<1e-12&&this.viewDir.set(0,0,1),this.viewDir.normalize()}refreshTextures(){for(const t of this.blueprintPanels){const e=this.store.texture(t.photo),i=t.mesh.material.uniforms;e&&i.uMap.value!==e&&(i.uMap.value=e,i.uHasMap.value=1)}this.sphere.refreshTextures(this.store)}revealPhotos(t){const e=new Set(t),i=this.mode==="sphere"?this.blueprintPanels:this.sphere.cells;for(const o of i)o.mesh.material.uniforms.uReveal.value=1;const n=o=>o.normal.dot(this.viewDir),r=this.panels.filter(o=>e.has(o.photo)).sort((o,l)=>n(l)-n(o)),a=Math.min(.06,2.4/Math.max(1,r.length));r.forEach((o,l)=>{ft.fromTo(o.mesh.material.uniforms.uReveal,{value:0},{value:1,duration:this.reduced?.01:.9,delay:this.reduced?0:.2+l*a,ease:"power2.out"})})}get blueprint(){return this.mode==="blueprint"}get morphing(){return this.morph.t>0&&this.morph.t<1}onModeChange(t){return this.modeListeners.add(t),()=>this.modeListeners.delete(t)}setBlueprint(t,{animate:e=!0}={}){const i=t?"blueprint":"sphere",n=t?0:1;if(i!==this.mode){this.mode=i,this.setHover(null),this.front=null;for(const a of this.modeListeners)a(i)}this.morph.tween?.kill(),this.morph.tween=null;const r=Math.abs(this.morph.t-n);return!e||r===0||!this.root.visible?(this.morph.t=n,this.applyMorph(),Promise.resolve()):new Promise(a=>{this.morph.tween=ft.to(this.morph,{t:n,duration:(this.reduced?.4:1.25)*Math.max(.35,r),ease:r<.98?"power2.out":"power2.inOut",onUpdate:()=>this.applyMorph(),onComplete:()=>{this.morph.tween=null,a()},onInterrupt:a})})}setSun(t,e=1){t&&this.shared.uSunDir.value.copy(t).normalize(),ft.to(this.shared.uDayNight,{value:t?e:0,duration:.6,overwrite:!0})}planMorph(){const{panelWidth:t,panelHeight:e}=this.layout.options,i=new Map;for(const n of this.sphere.cells){let r=null,a=.8;for(const o of this.blueprintPanels){if(o.photo!==n.photo||i.has(o))continue;const l=o.normal.dot(n.normal);l>a&&(r=o,a=l)}r&&i.set(r,n)}for(const n of this.blueprintPanels){const r=i.get(n),a=r??this.sphere.cellAt(n.normal);if(!a){n.target=null;continue}const o=a.kind==="cap",l=o?.62:1;n.target={carrier:!!r,start:a.start,lat:o?Math.sign(a.lat)*(Math.PI/2-.02):a.lat,dLon:o?0:rm(a.lon-n.lon,-Math.PI,Math.PI),scaleX:r?Rt(a.width*l/t,.6,2.6):.6,scaleY:r?Rt(a.height*l/e,.6,2.6):.6}}}applyMorph(){const t=this.morph.t,e=this.reduced;this.morph.applied=t,this.morph.extras=1-Fo(t,0,.45),this.core.material.uniforms.uGrid.value=this.morph.extras,this.core.visible=t<1,this.glow.material.uniforms.uStrength.value=pn(1,.58,Fo(t,.1,.9)),this.extras.visible=this.morph.extras>.001,e||this.extras.scale.setScalar(1+.12*(1-this.morph.extras));for(const i of this.polar)i.visible=this.extras.visible;if(this.panelGroup.visible=t<1,this.sphere.group.visible=t>0,!this.assembling){this.sphere.applyMorph(t,e);for(const i of this.blueprintPanels)this.morphPanel(i,t,e)}}morphPanel(t,e,i){const{mesh:n,target:r}=t,a=n.material,o=r?r.start:.3;let l,c;if(i?(l=e,c=1-e):r?.carrier?(l=Rt((e-(o-.12))/.36,0,1),c=1-Fo(e,o+.34,o+.48)):(l=Rt((e-(o-.12))/.4,0,1),c=1-Fo(l,.25,.85)),a.uniforms.uOpacity.value=c,a.transparent=c<1,a.alphaToCoverage=!a.transparent,n.visible=c>.002,a.uniforms.uWrap.value=0,l===0||!r){n.position.copy(t.basePosition),n.quaternion.copy(t.baseQuaternion),n.scale.setScalar(1);return}if(i){n.position.copy(t.basePosition).multiplyScalar(1.006);return}const u=AE(l),f=r.carrier?u:u*.6,h=pn(t.lat,r.lat,f),d=t.lon+r.dLon*f,p=r.carrier?1.012+.03*Math.sin(Math.PI*u):1.006+.016*Math.sin(Math.PI*u);n.position.set(...Po(h,d,Ne*p)),n.quaternion.setFromEuler(DE.set(t.lat-h,d,0,"YXZ")),n.scale.set(pn(1,r.scaleX,u),pn(1,r.scaleY,u),1),a.uniforms.uWrap.value=u,a.uniforms.uWrapRadius.value=Ne*p}assembleSphere(t,e){this.assembling=!0;const i=hi(23),n=this.updateViewDir();for(const r of this.sphere.cells){const{mesh:a,normal:o}=r,l=9+i()*16,c={t:0};a.position.copy(o).multiplyScalar(l),a.material.uniforms.uReveal.value=0,a.material.uniforms.uGrow.value=.25;const u=(1-o.dot(n))*.5*.75+i()*.12;t.to(c,{t:1,duration:e,ease:"expo.out",onUpdate:()=>{a.position.copy(o).multiplyScalar(l*(1-c.t)),a.material.uniforms.uGrow.value=.25+.75*c.t}},u),t.to(a.material.uniforms.uReveal,{value:1,duration:.8,ease:"power2.out"},u+e*.3)}return t.fromTo(this.shared.uFade,{value:0},{value:1,duration:.9,ease:"power2.out"},0),t.call(()=>{this.assembling=!1;for(const r of this.sphere.cells)r.mesh.position.set(0,0,0)}),t}baseOptions(){return Math.min(this.stage.width,this.stage.height)<600?{radius:Ne,panelWidth:2.3,panelHeight:1.67,gap:.24,maxLatitude:1}:{radius:Ne,panelWidth:1.9,panelHeight:1.38,gap:.2,maxLatitude:1}}rowGeometry(t,e){const i=this.rowGeometries.get(t);if(i)return i;const{panelWidth:n,panelHeight:r}=this.layout.options,a=new us(n,r,12,8),o=a.attributes.position,l=a.attributes.normal,c=new A(...Po(e,0,Ne));for(let h=0;h<o.count;h++){const d=e+o.getY(h)/Ne,[p,v,g]=Po(d,o.getX(h)/(Ne*Math.cos(d)),Ne);l.setXYZ(h,p/Ne,v/Ne,g/Ne),o.setXYZ(h,p-c.x,v-c.y,g-c.z)}o.needsUpdate=!0,l.needsUpdate=!0,a.computeBoundingSphere();const u=o.count-1,f={geometry:a,center:c,corners:[0,12,u-12,u].map(h=>new A().fromBufferAttribute(o,h))};return this.rowGeometries.set(t,f),f}buildPolarBadges(){const t=Math.max(...this.layout.rows.map(h=>h.lat)),e=Math.PI/2-t-this.layout.options.panelHeight/2/Ne-.08;if(e<.12)return;const i=4.925,n=new Qi(i,64,12,0,Math.PI*2,0,e),r=n.attributes.position,a=n.attributes.uv,o=i*Math.sin(e);for(let h=0;h<r.count;h++)a.setXY(h,.5+r.getX(h)/(2*o),.5-r.getZ(h)/(2*o));a.needsUpdate=!0;const l=IE(),c=()=>new Gh({map:l,color:ra,transparent:!0,opacity:0,blending:Ke,depthWrite:!1});this.polarMaterials=[c(),c()];const u=new ae(n,this.polarMaterials[0]),f=new ae(n,this.polarMaterials[1]);f.rotation.x=Math.PI,this.polar.push(u,f),this.spin.add(u,f)}focusDistance(t){const e=Math.tan(ts.degToRad(this.stage.camera.fov/2)),i=this.stage.camera.aspect,{panelWidth:n,panelHeight:r}=t?.width?{panelWidth:t.width,panelHeight:t.height}:this.layout.options;return Rt(Ne+Math.max(r/(.9*e),n/(1.5*e*i)),this.minDistance,this.maxDistance)}updateFit(){const t=Math.tan(ts.degToRad(this.stage.camera.fov/2)),e=this.stage.width/this.stage.height,i=e<1?1:.84;this.fitDistance=Ne*1.12/(i*t*Math.min(1,e)),this.minDistance=7.4,this.maxDistance=this.fitDistance*1.7}get restDistance(){return this.fitDistance}pick(t,e){if(!this.root.visible||this.morphing)return null;this.pointer.set(t/this.stage.width*2-1,-(e/this.stage.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.stage.camera);const i=this.mode==="sphere"?this.sphere.group:this.panelGroup,n=this.raycaster.intersectObjects(i.children,!1)[0];if(!n)return null;const r=this.panels[n.object.userData.panel];return r.normal.dot(this.viewDir)>.15?r:null}setHover(t){t!==this.hovered&&(this.hovered=t)}update(t,e){var c;if(this.shared.uTime.value=t,!this.root.visible)return;if(this.shared.uCentre.value.copy(this.root.position),this.updateViewDir(),this.controller&&this.extras.quaternion.copy(this.controller.orbitQuaternion),this.interactive&&!this.suppressHover&&this.hoverPoint?this.setHover(this.pick(this.hoverPoint.x,this.hoverPoint.y)):(!this.interactive||this.suppressHover)&&this.setHover(null),this.morph.applied!==this.morph.t&&this.applyMorph(),this.morph.t<1)for(const u of this.blueprintPanels){u.hover=Ye(u.hover,u===this.hovered?1:0,10,e);const f=u.mesh.material.uniforms;f.uHover.value=u.hover,!this.assembling&&this.morph.t===0&&(u.mesh.position.copy(u.basePosition).multiplyScalar(1+.035*u.hover),u.mesh.scale.setScalar(1+.05*u.hover))}this.morph.t>0&&this.sphere.update(e,this.hovered,!this.assembling);let i=-1/0;const n=this.viewDir;for(const u of this.panels){const f=u.normal.dot(n);f>i&&(i=f,this.front=u)}const[r,a]=this.satellites.userData.orbits;this.reduced||(r.rotation.z+=e*.05,a.rotation.z-=e*.03);const o=this.satellites.geometry.attributes.position;Ro.set(Math.cos(t*.35)*Ne*1.45,Math.sin(t*.35)*Ne*1.45,0).applyEuler(r.rotation),Lo.set(Math.cos(-t*.22)*Ne*1.3,Math.sin(-t*.22)*Ne*1.3,0).applyEuler(a.rotation),o.setXYZ(0,Ro.x,Ro.y,Ro.z),o.setXYZ(1,Lo.x,Lo.y,Lo.z),o.needsUpdate=!0;const l=this.shared.uFade.value*this.morph.extras;for(const u of this.ringMaterials)u.opacity=((c=u.userData).base??(c.base=u.opacity))*l;if(this.polarMaterials.length===2){const u=n.y;this.polarMaterials[0].opacity=.85*l*ts.smoothstep(u,.3,.75),this.polarMaterials[1].opacity=.85*l*ts.smoothstep(-u,.3,.75)}}}const UE=`
  uniform float uProgress;
  uniform float uExplode;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScan;
  uniform float uSpan;
  attribute vec2 aTarget;
  attribute vec2 aStart;
  attribute vec4 aSeed; // x delay, y size, z phase, w swirl
  varying float vAlpha;
  varying float vHot;

  mat2 rot(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
  }

  void main() {
    float t = clamp((uProgress - aSeed.x * 0.45) / 0.55, 0.0, 1.0);
    float e = 1.0 - pow(1.0 - t, 3.0);
    // particles spiral in towards their letter
    vec2 offset = rot((1.0 - e) * (aSeed.w - 0.5) * 6.0) * aStart * (1.0 - e);
    vec2 pos = aTarget + offset;
    // a faint shimmer once the word has formed
    pos += vec2(sin(uTime * 2.1 + aSeed.z * 40.0), cos(uTime * 1.7 + aSeed.z * 33.0)) * 0.5 * e;
    // exit: everything is flung outward, the jump to space
    vec2 dir = normalize(aTarget + aStart * 0.03 + vec2(0.001));
    float x = uExplode * uExplode;
    pos += dir * x * (900.0 + 1700.0 * aSeed.y);

    float scanX = mix(-uSpan, uSpan, uScan);
    vHot = (1.0 - smoothstep(0.0, 70.0, abs(aTarget.x - scanX))) * step(0.001, uScan) * step(uScan, 0.999);
    vAlpha = (0.2 + 0.8 * e) * smoothstep(0.0, 0.2, t + 0.04) * (1.0 - smoothstep(0.5, 1.0, uExplode));

    gl_PointSize = (1.3 + aSeed.y * 1.7 + vHot * 1.6) * uPixelRatio * (1.0 + uExplode * 2.2);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 0.0, 1.0);
  }
`,OE=`
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vHot;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = (1.0 - smoothstep(0.1, 0.5, d)) * vAlpha * uOpacity;
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uColorA, uColorB, vHot), a);
    #include <colorspace_fragment>
  }
`,BE=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,kE=`
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uGlitch;
  uniform float uTime;
  varying vec2 vUv;
  float hash(float n) { return fract(sin(n) * 43758.5453123); }
  void main() {
    vec2 uv = vUv;
    float seed = floor(uTime * 16.0);
    float slice = floor(uv.y * 12.0);
    float on = step(0.55, hash(slice * 3.7 + seed));
    uv.x += (hash(slice * 7.1 + seed) - 0.5) * 0.09 * uGlitch * on;
    vec2 split = vec2(0.008 * uGlitch, 0.0);
    vec4 r = texture2D(uMap, uv + split);
    vec4 g = texture2D(uMap, uv);
    vec4 b = texture2D(uMap, uv - split);
    float a = max(g.a, max(r.a, b.a));
    vec3 col = vec3(r.r * r.a, g.g * g.a, b.b * b.a) / max(a, 0.001);
    float lines = 0.9 + 0.1 * sin(vUv.y * 260.0 + uTime * 24.0);
    gl_FragColor = vec4(col, a * uOpacity * lines);
    #include <colorspace_fragment>
  }
`,zE=.08,VE=.38,hp=[.42,1.3],fp=.32;class GE{constructor(t,e,i){P(this,"uniforms",{uProgress:{value:0},uExplode:{value:0},uTime:{value:0},uPixelRatio:{value:1},uScan:{value:0},uSpan:{value:400},uOpacity:{value:1},uColorA:{value:new Ct("#5b9bff")},uColorB:{value:new Ct("#ffffff")}});P(this,"textUniforms",{uMap:{value:null},uOpacity:{value:0},uGlitch:{value:0},uTime:{value:0}});P(this,"stage");P(this,"lines");P(this,"family");P(this,"probe",document.createElement("canvas").getContext("2d"));P(this,"points",null);P(this,"plane",null);P(this,"stopFrame",null);this.stage=t,this.lines=(Array.isArray(e)?e:[e]).filter(Boolean),this.family=i,this.stopFrame=t.onFrame(n=>{this.uniforms.uTime.value=n,this.textUniforms.uTime.value=n})}fitFontSize(t,e){const i=this.layout(100).width;return Math.max(18,Math.min(e,t/i*100))}measure(t){const{width:e,height:i}=this.layout(t);return{width:e,height:i}}build({x:t,y:e,fontSize:i}){this.clear();const n=this.layout(i),r=Math.ceil(i*.5),a=Math.ceil(i*.44),o=Math.ceil(n.width+r*2),l=Math.ceil(n.height+a*2),c=a+n.split,u=document.createElement("canvas");u.width=o,u.height=l;const f=u.getContext("2d",{willReadFrequently:!0});f.fillStyle="#fff",this.draw(f,n,r,a);const h=f.getImageData(0,0,o,l).data;let d=0;for(let V=3;V<h.length;V+=4)h[V]>128&&d++;const p=this.stage.coarse?5e3:11e3,v=Math.max(1,Math.floor(Math.sqrt(d/p))),g=Math.min(1,p*v*v/d),m=hi(5),M=[],b=[],_=[],S=t-this.stage.width/2-o/2,y=this.stage.height/2-e+l/2,T=Math.max(this.stage.width,this.stage.height)*.62;for(let V=0;V<l;V+=v){const H=n.lines.length>1&&V>c;for(let K=0;K<o;K+=v){if(h[(V*o+K)*4+3]<=128||m()>g)continue;const Y=S+K+(m()-.5)*v*.8,Q=y-V+(m()-.5)*v*.8,j=m()*Math.PI*2,dt=T*(.45+m()*.9);M.push(Y,Q),b.push(Math.cos(j)*dt-Y,Math.sin(j)*dt-Q);const Et=H?.2+m()*.45+K/o*.35:m()*.6+K/o*.4;_.push(Et,m(),m(),m())}}const x=M.length/2,E=new ce;E.setAttribute("position",new ie(new Float32Array(x*3),3)),E.setAttribute("aTarget",new ie(M,2)),E.setAttribute("aStart",new ie(b,2)),E.setAttribute("aSeed",new ie(_,4));const C=new Pr(E,new he({uniforms:this.uniforms,vertexShader:UE,fragmentShader:OE,transparent:!0,depthTest:!1,depthWrite:!1,blending:Ke}));C.frustumCulled=!1,C.renderOrder=2,this.uniforms.uSpan.value=o/2,this.uniforms.uPixelRatio.value=this.stage.pixelRatio;const F=this.stage.pixelRatio,I=document.createElement("canvas");I.width=Math.ceil(o*F),I.height=Math.ceil(l*F);const O=I.getContext("2d");O.scale(F,F),O.shadowColor="rgba(47, 123, 255, 0.95)",O.fillStyle="#eef4ff",this.draw(O,n,r,a,!0),O.shadowBlur=0,this.draw(O,n,r,a);const L=new Al(I);L.colorSpace=$e,L.minFilter=Oe,L.generateMipmaps=!1,this.textUniforms.uMap.value=L;const U=new ae(new us(o,l),new he({uniforms:this.textUniforms,vertexShader:BE,fragmentShader:kE,transparent:!0,depthTest:!1,depthWrite:!1}));U.position.set(t-this.stage.width/2,this.stage.height/2-e,0),U.renderOrder=1,this.points=C,this.plane=U,this.stage.overlay.add(U,C)}dispose(){this.clear(),this.stopFrame?.(),this.stopFrame=null}clear(){for(const t of[this.points,this.plane])t&&(t.removeFromParent(),t.geometry.dispose(),t.material.dispose());this.textUniforms.uMap.value?.dispose(),this.points=null,this.plane=null}layout(t){const[e,i]=this.lines,n=this.measureLine(e,t,zE*t),r=[n];let a=n.width,o=n.cap;if(n.baseline=n.cap,i){const l=t*VE,c=this.measureLine(i,l,0),u=Math.max(1,[...i].length-1),f=Rt((n.width-c.width)/u,hp[0]*l,hp[1]*l),h=this.measureLine(i,l,f);h.baseline=n.cap+fp*t+h.cap,r.push(h),a=Math.max(a,h.width),o=h.baseline}for(const l of r)l.x=(a-l.width)/2-l.inkLeft;return{lines:r,width:a,height:o,split:n.cap+fp*t/2}}measureLine(t,e,i){const n=this.probe;n.font=`600 ${e}px "${this.family}"`;const r=[];let a=0,o=1/0,l=-1/0;for(const u of t){const f=n.measureText(u);r.push(a),o=Math.min(o,a-f.actualBoundingBoxLeft),l=Math.max(l,a+f.actualBoundingBoxRight),a+=f.width+i}const c=n.measureText("H").actualBoundingBoxAscent||e*.72;return{text:t,size:e,offsets:r,inkLeft:o,width:l-o,cap:c}}draw(t,e,i,n,r=!1){t.textBaseline="alphabetic";for(const a of e.lines)t.font=`600 ${a.size}px "${this.family}"`,r&&(t.shadowBlur=a.size*(a===e.lines[0]?.28:.36)),[...a.text].forEach((l,c)=>t.fillText(l,i+a.x+a.offsets[c],n+a.baseline))}}class HE{constructor(t,e=220){P(this,"canvas");P(this,"ctx");P(this,"streaks");this.canvas=t,this.ctx=t.getContext("2d");const i=hi(23);this.streaks=Array.from({length:e},()=>({angle:i()*Math.PI*2,start:.02+i()*.45,speed:.5+i()*1.6,width:.6+i()*1.6,alpha:.35+i()*.65,white:i()>.6}))}play(t){const e=Math.min(window.devicePixelRatio||1,2),i=this.canvas.clientWidth,n=this.canvas.clientHeight;this.canvas.width=Math.round(i*e),this.canvas.height=Math.round(n*e),this.ctx.setTransform(e,0,0,e,0,0);const r={p:0};return ft.to(r,{p:1,duration:t,ease:"power1.in",onUpdate:()=>this.draw(r.p,i,n),onComplete:()=>this.ctx.clearRect(0,0,i,n)})}draw(t,e,i){const{ctx:n}=this;n.clearRect(0,0,e,i);const r=e/2,a=i/2,o=Math.hypot(e,i)/2,l=Math.sin(Math.PI*Math.min(1,t*1.05));n.lineCap="round";for(const c of this.streaks){const u=(c.start+t**2.2*c.speed*1.4)*o,f=(.015+t*t*.45*c.speed)*o,h=Math.cos(c.angle),d=Math.sin(c.angle),p=r+h*u,v=a+d*u,g=r+h*(u+f),m=a+d*(u+f),M=n.createLinearGradient(p,v,g,m),b=c.white?"232, 239, 255":"156, 199, 255";M.addColorStop(0,`rgba(${b}, 0)`),M.addColorStop(1,`rgba(${b}, ${(c.alpha*l).toFixed(3)})`),n.strokeStyle=M,n.lineWidth=c.width*(1+t),n.beginPath(),n.moveTo(p,v),n.lineTo(g,m),n.stroke()}}}const sn=s=>document.getElementById(s),dp=4.1,WE=9e3,XE=["KALIV","DIGITALS"],qE=.28;class YE{constructor(t){P(this,"active",!0);P(this,"finished");P(this,"options");P(this,"el",sn("intro"));P(this,"word");P(this,"warp");P(this,"tl",null);P(this,"spins",[]);P(this,"exiting",!1);P(this,"ready",!1);P(this,"fonts",null);P(this,"wordBuilt",!1);P(this,"readyPromise");P(this,"resolveFinished");P(this,"clockTimer",0);P(this,"live",[]);P(this,"stopFrame",null);P(this,"stopResize",null);P(this,"tickClock",()=>{const t=new Date;sn("intro-clock").textContent=t.toLocaleTimeString("en-GB",{hour12:!1});const e=-t.getTimezoneOffset(),i=Math.abs(e),n=String(Math.floor(i/60)).padStart(2,"0"),r=String(i%60).padStart(2,"0");sn("intro-zone").textContent=`UTC${e>=0?"+":"-"}${n}:${r}`});this.options=t,this.word=new GE(t.stage,XE,sm),this.warp=new HE(sn("intro-warp"),t.stage.coarse?140:220),this.finished=new Promise(e=>this.resolveFinished=e)}start(){this.tickClock(),this.clockTimer=window.setInterval(this.tickClock,1e3);const t=this.options.fonts.then(i=>void(this.fonts=i)),e=Promise.all([t,this.options.textures]);return this.readyPromise=Promise.race([e,new Promise(i=>setTimeout(i,WE))]).then(()=>{this.ready=!0}),sn("intro-skip").addEventListener("click",()=>this.skip()),this.stopFrame=this.options.stage.onFrame(()=>this.updateProgress()),this.stopResize=this.options.stage.onResize(()=>{this.wordBuilt&&!this.exiting&&this.layoutWord()}),this.options.reduced?this.playReduced():this.play(),this.finished}skip(){this.exiting||(this.tl?.pause(),this.exit(!0))}play(){const{space:t}=this.options,e=this.word,i=[...this.el.querySelectorAll("[data-scramble]")],n=i.map(a=>a.textContent??"");for(const a of i)a.textContent=" ";t.uniforms.uOpacity.value=0;const r=ft.timeline({defaults:{ease:"power3.out"}});this.tl=r,r.fromTo(".intro__beam",{scaleX:0,opacity:1},{scaleX:1,duration:.45,ease:"expo.out"},.05).to(".intro__beam",{scaleY:26,opacity:0,duration:.4,ease:"power2.in"},.5).fromTo(".intro__grid",{opacity:0},{opacity:1,duration:1.2},.5).to(t.uniforms.uOpacity,{value:1,duration:1.8,ease:"power1.inOut"},.4).fromTo(".intro__corner path",{drawSVG:"0%"},{drawSVG:"100%",duration:.8,stagger:.07,ease:"power3.inOut"},.55),i.forEach((a,o)=>{r.to(a,{duration:.9,scrambleText:{text:n[o],chars:"upperCase",speed:.5,revealDelay:.2}},.8+o*.12)}),r.fromTo("#reticle .ring",{drawSVG:"50% 50%"},{drawSVG:"0% 100%",duration:1.2,stagger:.08,ease:"expo.inOut"},.7).fromTo("#reticle .reticle__ticks",{opacity:0,scale:.85,svgOrigin:"0 0"},{opacity:1,scale:1,duration:1.4,ease:"expo.out"},.75).fromTo("#reticle .reticle__labels text",{opacity:0},{opacity:1,duration:.3,stagger:.12},1.3).fromTo("#emblem .emblem__stroke",{drawSVG:"0%"},{drawSVG:"100%",duration:1.1,stagger:.12,ease:"power2.inOut"},1.5).fromTo("#emblem",{scale:1.14,svgOrigin:"0 0"},{scale:1,duration:1.6,ease:"expo.out"},1.5),this.spins=[ft.to("#reticle .reticle__ticks",{rotation:360,svgOrigin:"0 0",duration:60,repeat:-1,ease:"none"}),ft.to("#reticle .reticle__spin-b",{rotation:-360,svgOrigin:"0 0",duration:26,repeat:-1,ease:"none"}),ft.to("#reticle .reticle__spin-c",{rotation:360,svgOrigin:"0 0",duration:5.5,repeat:-1,ease:"none"})],this.logLines().forEach((a,o)=>r.call(()=>this.addLog(a),[],1+o*qE)),r.addPause(.95,()=>{this.options.fonts.then(()=>{this.exiting||(this.layoutWord(),r.resume())})}),r.to(e.uniforms.uProgress,{value:1,duration:2.5,ease:"power2.inOut"},1).to(e.textUniforms.uOpacity,{value:1,duration:.5,ease:"power2.out"},3.05).fromTo(e.textUniforms.uGlitch,{value:1},{value:0,duration:.9,ease:"steps(9)"},3.05).to(e.uniforms.uOpacity,{value:.5,duration:.8},3.3).to("#intro-sub",{duration:1.2,scrambleText:{text:this.subText(),chars:"01<>/#",speed:.45}},3).fromTo(e.uniforms.uScan,{value:0},{value:1,duration:1.1,ease:"power1.inOut"},3.35),r.addPause(dp,()=>{this.readyPromise.then(()=>this.exit(!1))})}async playReduced(){const{space:t}=this.options;t.uniforms.uOpacity.value=1,ft.set(".intro__grid",{opacity:1}),ft.set(".intro__beam",{opacity:0}),sn("intro-sub").textContent=this.subText(),this.logLines().forEach(e=>this.addLog(e,!1)),await this.options.fonts,this.layoutWord(),this.word.uniforms.uOpacity.value=0,this.word.textUniforms.uOpacity.value=1,await Promise.all([this.readyPromise,new Promise(e=>setTimeout(e,1200))]),this.exit(!1)}subText(){const{photoCount:t,facts:e}=this.options;return`Space gallery · ${t} frames · ${e.worlds} worlds`}layoutWord(){const t=sn("intro-word"),e=Math.min(t.clientWidth,1240)*(this.options.stage.coarse?.88:.94),i=Math.min(this.options.stage.coarse?96:150,window.innerHeight*.14),n=this.word.fitFontSize(e,i),{height:r}=this.word.measure(n);this.el.style.setProperty("--word-h",`${Math.round(r+n*.36)}px`);const a=t.getBoundingClientRect();this.word.build({x:a.left+a.width/2,y:a.top+a.height/2,fontSize:n}),this.wordBuilt=!0}exit(t){if(this.exiting)return;this.exiting=!0;const e=this.word;sn("intro-status").textContent="Ready";const i=ft.timeline({onComplete:()=>this.finish()});if(this.options.reduced){i.to(e.textUniforms.uOpacity,{value:0,duration:.3,ease:"power1.out"},0),i.to(this.el,{opacity:0,duration:.45,ease:"power1.out"},0),i.add(this.options.handOver(),0);return}t&&i.timeScale(1.5),i.to(e.textUniforms.uGlitch,{value:1,duration:.2,ease:"steps(3)"},0).to([".intro__meta",".intro__log",".intro__progress",".intro__corner"],{opacity:0,duration:.35,ease:"power2.in"},.05).to("#reticle",{scale:2.6,opacity:0,duration:.95,ease:"power3.in",transformOrigin:"50% 50%"},.05).to("#intro-sub",{opacity:0,duration:.3},.1).to(e.uniforms.uOpacity,{value:1,duration:.2},.12).to(e.textUniforms.uOpacity,{value:0,duration:.25},.22).to(e.uniforms.uExplode,{value:1,duration:1.15,ease:"power2.in"},.2).to(".intro__grid",{opacity:0,duration:.6},.25).add(this.warp.play(1.35),.35).add(this.options.handOver(),.55).to(this.el,{opacity:0,duration:.5,ease:"power1.out"},1.3)}finish(){this.el.hidden=!0,this.active=!1,this.tl?.kill();for(const t of this.spins)t.kill();this.word.dispose(),window.clearInterval(this.clockTimer),this.stopFrame?.(),this.stopResize?.(),this.resolveFinished()}logLines(){const{facts:t,photoCount:e}=this.options,i=String(e).length,n=r=>String(r).padStart(i,"0");return[{label:"Renderer",value:()=>t.gpu},{label:"Fonts",value:()=>this.fonts?`${this.fonts.loaded}/${this.fonts.total}`:"loading"},{label:"Frames",value:()=>`${n(this.options.photosLoaded())}/${n(e)}`},{label:"Globe",value:()=>`${t.panels} panels · ${t.rows} rows`},{label:"Worlds",value:()=>t.worldsStatus?.()??`${t.worlds} + sun + moon`},{label:"Starfield",value:()=>`${t.stars} stars`},{label:"Status",value:()=>this.ready?"ready":"loading"}]}addLog(t,e=!0){const i=document.createElement("div"),n=document.createElement("b"),r=document.createElement("span"),a=document.createElement("em");n.textContent=e?"":t.label,r.textContent=` ${".".repeat(Math.max(2,12-t.label.length))} `,a.textContent=t.value(),i.append("› ",n,r,a),sn("intro-log").append(i),this.live.push({el:a,line:t}),e&&(ft.to(n,{duration:.5,scrambleText:{text:t.label,chars:"upperCase",speed:.6}}),ft.from([r,a],{opacity:0,duration:.3,delay:.25}))}updateProgress(){const t=this.options.photoCount||1,e=(this.fonts?.15:0)+.85*(this.options.photosLoaded()/t),i=this.tl?Math.min(1,this.tl.time()/dp):1,n=this.ready?i:Math.min(e,i);sn("intro-pct").textContent=String(Math.round(n*100)).padStart(3,"0"),ft.set("#intro-bar",{scaleX:n});for(const{el:r,line:a}of this.live){const o=a.value();r.textContent!==o&&(r.textContent=o)}}}const Xr=.22,Ii=1.25,va=45,pp=6e3,$E=.0052,mp=.0036,Io=1.45,KE=600,ZE=6,JE=.02,QE=20,Lc=24e3,jE=1.5,t2=900,e2=4,gp=9e3,vp=.7,i2=.24,_p=Math.PI*2,n2=ft.parseEase("power2.inOut"),s2=ft.parseEase("power2.inOut"),Fc=s=>s*s*(3-2*s),qr=new Vi(0,0,0,"YXZ"),Yr=new A,$r=new A,Kr=new A,Zr=new A,sr=new A,No=new A,xp=new Ri,yi={yaw:0,pitch:0};function Ic(s,t){return t.pitch=Math.asin(Rt(s.y,-1,1)),t.yaw=Math.atan2(-s.x,s.z),t}function yp(s,t,e,i){const n=e?t:Ye(s,t,4,i);return Math.abs(n-t)<.25?t:n}function Uo(s,t){return s+Math.round((t-s)/_p)*_p}class r2{constructor({stage:t,system:e,globe:i,reduced:n=!1,isBlocked:r=()=>!1,onTap:a=null}){P(this,"mode","orbit");P(this,"focus");P(this,"view",{yaw:0,pitch:Xr,distance:60});P(this,"goal",{yaw:0,pitch:Xr,distance:60});P(this,"velocity",{yaw:0,pitch:0});P(this,"center",new A);P(this,"orbitQuaternion",new Ri);P(this,"parallax",{x:0,y:0,tx:0,ty:0});P(this,"sway",1);P(this,"enabled",!1);P(this,"focusing",!1);P(this,"idleDrift",!0);P(this,"lastInput",0);P(this,"travel",null);P(this,"blend",{active:!1,t:0,duration:.9,from:new Ri});P(this,"fly",{yaw:0,pitch:0,goalYaw:0,goalPitch:0,velocity:new A,speed:0});P(this,"keys",{forward:0,back:0,left:0,right:0,up:0,down:0,boost:0});P(this,"input",{x:0,y:0,lift:0});P(this,"pointers",new Map);P(this,"drag",{active:!1,moved:!1,startX:0,startY:0,lastX:0,lastY:0,lastT:0,downT:0});P(this,"pinch",{distance:0,goal:0,power:1});P(this,"hoverPoint",{x:0,y:0});P(this,"hovering",!1);P(this,"nearest",{body:null,surface:1/0});P(this,"shift",{x:0,y:0,goalX:0,goalY:0});P(this,"listeners",{focus:new Set,travel:new Set,mode:new Set});P(this,"centerOut",{lat:0,lon:0});P(this,"homeFit",18);P(this,"frameMs",16);P(this,"lastFrameAt",0);P(this,"pickScreen",{x:0,y:0});P(this,"onPointerDown",t=>{if(!this.inputBlocked)if(this.canvas.setPointerCapture(t.pointerId),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.lastInput=this.stage.time,this.travel&&this.interruptTravel(),this.pointers.size===1){const e=this.drag;e.active=!0,e.moved=!1,e.startX=e.lastX=t.clientX,e.startY=e.lastY=t.clientY,e.lastT=performance.now(),e.downT=t.timeStamp,this.velocity.yaw=this.velocity.pitch=0}else this.pointers.size===2&&this.mode==="orbit"&&(this.pinch.distance=this.pinchSpan(),this.pinch.goal=this.goal.distance,this.pinch.power=1+.5*Fc(Rt((this.goal.distance-40)/360,0,1)),this.drag.moved=!0)});P(this,"span",{count:0,ax:0,ay:0,bx:0,by:0});P(this,"addToSpan",t=>{const e=this.span;e.count===0?(e.ax=t.x,e.ay=t.y):e.count===1&&(e.bx=t.x,e.by=t.y),e.count++});P(this,"onPointerMove",t=>{t.pointerType==="mouse"&&(this.hoverPoint.x=t.clientX,this.hoverPoint.y=t.clientY,this.hovering=!0,this.parallax.tx=(t.clientX/this.stage.width-.5)*2,this.parallax.ty=(t.clientY/this.stage.height-.5)*2);const e=this.pointers.get(t.pointerId);if(!e||this.inputBlocked)return;if(e.x=t.clientX,e.y=t.clientY,this.lastInput=this.stage.time,this.pointers.size===2){if(this.mode!=="orbit")return;const o=this.pinchSpan();if(this.pinch.distance>0&&o>0){const l=(this.pinch.distance/o)**this.pinch.power;this.goal.distance=this.clampDistance(this.pinch.goal*l)}return}const i=this.drag;if(!i.active)return;const n=performance.now(),r=t.clientX-i.lastX,a=t.clientY-i.lastY;if(Math.hypot(t.clientX-i.startX,t.clientY-i.startY)>ZE&&(i.moved=!0,this.canvas.classList.add("is-dragging")),this.mode==="fly")this.fly.goalYaw-=r*mp,this.fly.goalPitch=Rt(this.fly.goalPitch-a*mp,-Io,Io);else{const o=$E*Rt(this.view.distance/this.restDistanceOf(this.focus),.3,1.7);this.goal.yaw+=r*o,this.goal.pitch=Rt(this.goal.pitch+a*o,-Ii,Ii);const l=Math.max(1,n-i.lastT)/1e3;this.velocity.yaw=Ye(this.velocity.yaw,r*o/l,18,l),this.velocity.pitch=Ye(this.velocity.pitch,a*o/l,18,l)}i.lastX=t.clientX,i.lastY=t.clientY,i.lastT=n});P(this,"onPointerEnd",t=>{if(!this.pointers.has(t.pointerId))return;this.pointers.delete(t.pointerId);const e=this.drag;if(this.pointers.size>0){this.pinchSpan(),e.lastX=this.span.ax,e.lastY=this.span.ay;return}this.canvas.classList.remove("is-dragging");const i=KE+2*this.frameMs,n=!e.moved&&t.timeStamp-e.downT<i;e.active=!1,e.moved=!1,(performance.now()-e.lastT>90||this.reduced)&&(this.velocity.yaw=this.velocity.pitch=0),n&&t.type==="pointerup"&&!this.inputBlocked&&this.onTap?.(t.clientX,t.clientY,t)});P(this,"onWheel",t=>{if(this.inputBlocked||this.mode!=="orbit"||t.target?.closest?.(".lightbox, .intro, .sheet, .info-card, .hud-top, .flight"))return;t.preventDefault(),this.travel&&this.interruptTravel();const e=t.deltaMode===1?t.deltaY*32:t.deltaY;this.zoomBy(Math.exp(Rt(e,-200,200)*.0012))});P(this,"onKey",t=>{const e=t.type==="keydown"?1:0;if(e&&(this.mode!=="fly"||this.inputBlocked||t.metaKey||t.ctrlKey||t.altKey)||e&&t.target?.closest?.("input, textarea, select"))return;const i=this.keys;let n=!0;switch(t.code){case"KeyW":case"ArrowUp":i.forward=e;break;case"KeyS":case"ArrowDown":i.back=e;break;case"KeyA":case"ArrowLeft":i.left=e;break;case"KeyD":case"ArrowRight":i.right=e;break;case"KeyE":case"PageUp":i.up=e;break;case"KeyQ":case"PageDown":i.down=e;break;case"ShiftLeft":case"ShiftRight":i.boost=e;break;default:n=!1}n&&e&&(t.preventDefault(),this.lastInput=this.stage.time)});this.stage=t,this.camera=t.camera,this.canvas=t.canvas,this.system=e,this.globe=i,this.reduced=n,this.isBlocked=r,this.onTap=a,this.focus=e.home,this.bodyIndex=new Map(e.bodies.map((o,l)=>[o,l])),this.bodyPositions=e.bodies.map(()=>new A),this.solidRadii=e.bodies.map(o=>o.radius*Math.max(1,...o.def?.shape??[1])),this.keepOutRadii=e.bodies.map((o,l)=>o===e.home?o.radius*1.2:this.solidRadii[l]*1.05),this.homeFit=i.restDistance,this.camera.far=Lc,this.bindInput(),t.onResize(()=>this.onResize())}onFocusChange(t){return this.listeners.focus.add(t),()=>this.listeners.focus.delete(t)}onTravel(t){return this.listeners.travel.add(t),()=>this.listeners.travel.delete(t)}onModeChange(t){return this.listeners.mode.add(t),()=>this.listeners.mode.delete(t)}emit(t,...e){for(const i of this.listeners[t])i(...e)}setFocus(t){t!==this.focus&&(this.focus=t,this.emit("focus",t))}get home(){return this.system.home}get traveling(){return this.travel!==null}get atHome(){return this.mode==="orbit"&&!this.travel&&this.focus===this.system.home&&this.view.distance<va}get dragging(){return this.drag.active&&this.drag.moved}positionOf(t,e){const i=this.bodyIndex.get(t);return i!==void 0?e.copy(this.bodyPositions[i]):t.object3D.getWorldPosition(e)}solidRadius(t){const e=this.bodyIndex.get(t);return e===void 0?t.radius:this.solidRadii[e]}extentOf(t){return t.def?.rings?.style==="saturn"?t.def.rings.outer:t.def?this.solidRadius(t):t.radius*1.6}restDistanceOf(t){if(t===this.system.home)return this.globe.restDistance;const e=this.camera,i=Math.tan(ts.degToRad(e.fov/2)),n=e.aspect,r=n<1?1:.84,a=this.extentOf(t)*1.12/(r*i*Math.min(1,n)),o=t===this.system.sun?1.3:n<1?1.06:.88;return Math.max(a*o,this.minDistanceOf(t)*1.4)}minDistanceOf(t){return t===this.system.home?this.globe.minDistance:t.def?t.def.rings?.style==="saturn"?t.radius*1.35:this.solidRadius(t)*1.25:Math.max(t.radius*2.2,.6)}scaleOf(t){return this.restDistanceOf(t)/this.homeFit}viewCenter(){return this.centerOut.lat=this.view.pitch,this.centerOut.lon=-this.view.yaw,this.centerOut}get focusDistance(){return this.camera.position.distanceTo(this.center)}toScreen(t,e){const i=this.camera;No.copy(t).applyMatrix4(i.matrixWorldInverse);const n=-No.z,r=this.stage.height/2,a=r/Math.tan(ts.degToRad(i.fov/2));return n>1e-6&&(e.x=No.x/n*a+this.stage.width/2-this.shift.x,e.y=-No.y/n*a+r-this.shift.y),n}get focalPx(){return this.stage.height/2/Math.tan(ts.degToRad(this.camera.fov/2))}pick(t,e){const i=this.camera,n=this.focalPx,r=this.pickScreen;let a=null,o=1/0;const l=this.system.bodies;for(let u=0;u<l.length;u++){const f=this.toScreen(this.bodyPositions[u],r);if(f<=i.near)continue;const h=Math.max(l[u].pickRadius/f*n,22),d=r.x-t,p=r.y-e;d*d+p*p<=h*h&&f<o&&(a=l[u],o=f)}const c=this.system.ships?.list??[];for(let u=0;u<c.length;u++){const f=this.toScreen(c[u].object3D.getWorldPosition($r),r);if(f<=i.near)continue;const h=Math.max(c[u].radius*3*n/f,22),d=r.x-t,p=r.y-e;d*d+p*p<=h*h&&f<o&&(a=c[u],o=f)}return a}updateNearest(t){let e=null,i=1/0;const n=this.system.bodies;for(let a=0;a<n.length;a++){const o=t.distanceTo(this.bodyPositions[a])-this.solidRadii[a];o<i&&(i=o,e=n[a])}const r=this.system.ships?.list??[];for(let a=0;a<r.length;a++){const o=t.distanceTo(r[a].object3D.getWorldPosition($r))-r[a].radius;o<i&&(i=o)}return this.nearest.body=e,this.nearest.surface=Math.max(i,0),this.nearest}bindInput(){const t=this.canvas;t.addEventListener("pointerdown",this.onPointerDown),t.addEventListener("pointermove",this.onPointerMove),t.addEventListener("pointerup",this.onPointerEnd),t.addEventListener("pointercancel",this.onPointerEnd),t.addEventListener("pointerleave",e=>{e.pointerType==="mouse"&&(this.hovering=!1,this.parallax.tx=this.parallax.ty=0)}),addEventListener("wheel",this.onWheel,{passive:!1}),addEventListener("keydown",this.onKey),addEventListener("keyup",this.onKey),addEventListener("blur",()=>this.releaseKeys())}get inputBlocked(){return!this.enabled||this.isBlocked()}pinchSpan(){return this.span.count=0,this.pointers.forEach(this.addToSpan),Math.hypot(this.span.ax-this.span.bx,this.span.ay-this.span.by)}releaseKeys(){const t=this.keys;t.forward=t.back=t.left=t.right=t.up=t.down=t.boost=0}rotateBy(t,e){this.mode==="orbit"&&(this.travel&&this.interruptTravel(),this.goal.yaw+=t,this.goal.pitch=Rt(this.goal.pitch+e,-Ii,Ii),this.lastInput=this.stage.time)}zoomBy(t){this.mode==="orbit"&&(this.travel&&this.interruptTravel(),this.goal.distance=this.clampDistance(this.goal.distance*t),this.lastInput=this.stage.time)}clampDistance(t){return Rt(t,this.minDistanceOf(this.focus),pp)}onResize(){const t=this.globe.restDistance;if(this.focus===this.system.home&&!this.focusing&&Math.abs(this.goal.distance-this.homeFit)<.6&&(this.goal.distance=t),this.homeFit=t,this.goal.distance=this.clampDistance(this.goal.distance),this.shift.x!==0||this.shift.y!==0){const{width:e,height:i}=this.stage;this.camera.setViewOffset(e,i,this.shift.x,this.shift.y,e,i)}}lookAtLatLon(t,e,{distance:i=this.view.distance,duration:n=.85}={}){const{pitch:r,yaw:a}=jw(t,e,this.view.yaw),o={pitch:Rt(r,-1.53,1.53),yaw:a,distance:i};return this.focusing=!0,this.velocity.yaw=this.velocity.pitch=0,new Promise(l=>{const c=()=>{Object.assign(this.goal,o),this.goal.pitch=Rt(o.pitch,-Ii,Ii),this.focusing=!1,l()};ft.to(this.view,{...o,duration:this.reduced?.01:n,ease:"power3.inOut",overwrite:!0,onComplete:c,onInterrupt:()=>{this.focusing=!1,l()}})})}release(t){this.goal.distance=this.clampDistance(Math.max(this.goal.distance,t)),this.lastInput=this.stage.time}settleHome(){this.mode!=="orbit"||this.focus!==this.system.home||this.travel||(ft.killTweensOf(this.view),this.focusing=!1,this.goal.distance=this.globe.restDistance,this.goal.pitch=Xr,this.velocity.yaw=this.velocity.pitch=0,this.lastInput=this.stage.time)}dive({duration:t=2,ease:e="expo.inOut"}={}){const i=this.globe.restDistance;return this.goal.distance=i,ft.to(this.view,{distance:i,duration:t,ease:e,onStart:()=>void(this.focusing=!0),onComplete:()=>{this.focusing=!1,this.goal.distance=i}})}arrivalView(t,e,i){const n=this.positionOf(t,Kr);i.distance=Rt(e??this.restDistanceOf(t),this.minDistanceOf(t),pp);const r=Yr.subVectors(this.camera.position,n);r.lengthSq()<1e-8&&r.set(0,0,1),r.normalize(),Ic(r,yi);const a=this.system;if(t===a.home)i.yaw=yi.yaw,i.pitch=Xr;else if(t===a.sun)i.yaw=yi.yaw,i.pitch=Rt(Math.max(yi.pitch,.32),-.45,.6);else if(!t.def)i.yaw=yi.yaw,i.pitch=Rt(yi.pitch,-.45,.45);else{const o=Yr.subVectors(a.sunPosition,n);o.y=0,o.lengthSq()<1e-8&&o.set(0,0,1),Ic(o.normalize(),i);const l=Uo(i.yaw+vp,yi.yaw),c=Uo(i.yaw-vp,yi.yaw);i.yaw=Math.abs(l-yi.yaw)<Math.abs(c-yi.yaw)?l:c,i.pitch=i2}return i}flyTo(t,{distance:e,duration:i}={}){if(!t)return Promise.resolve(!1);this.mode==="fly"&&this.exitFly(),this.cancelTravel(),ft.killTweensOf(this.view),this.focusing=!1;const n=this.focus,r=this.arrivalView(t,e,{yaw:0,pitch:0,distance:0}),a=this.positionOf(n,$r).distanceTo(this.positionOf(t,Kr)),o=this.view,l=Math.log(o.distance),c=Math.log(r.distance),u=Math.max(o.distance,r.distance,a*.55),f=i??Rt(.9+.3*Math.log(1+a+Math.abs(r.distance-o.distance)*.5),1.6,3.5);return this.velocity.yaw=this.velocity.pitch=0,new Promise(h=>{const d={from:n,to:t,t:0,yaw0:o.yaw,pitch0:o.pitch,yaw1:Uo(r.yaw,o.yaw),pitch1:r.pitch,log0:l,log1:c,logPeak:Math.log(u),resolve:h,tween:null};if(this.travel=d,this.emit("travel","start",t),this.reduced||f<=0){d.t=1,this.applyTravel(),this.arrive();return}d.tween=ft.to(d,{t:1,duration:f,ease:"none",onComplete:()=>this.arrive()})})}goHome(t={}){return this.flyTo(this.system.home,{distance:this.globe.restDistance,...t})}applyTravel(){const t=this.travel,e=n2(t.t);this.positionOf(t.from,$r),this.positionOf(t.to,Kr),this.center.lerpVectors($r,Kr,e);const i=this.view;i.yaw=pn(t.yaw0,t.yaw1,e),i.pitch=pn(t.pitch0,t.pitch1,e);const n=e<.5?pn(t.log0,t.logPeak,Fc(e*2)):pn(t.logPeak,t.log1,Fc(e*2-1));i.distance=Math.exp(n),this.goal.yaw=i.yaw,this.goal.pitch=Rt(i.pitch,-Ii,Ii),this.goal.distance=i.distance}arrive(){const t=this.travel;t&&(this.travel=null,this.view.yaw=this.goal.yaw=t.yaw1,this.view.pitch=this.goal.pitch=t.pitch1,this.view.distance=this.goal.distance=Math.exp(t.log1),this.lastInput=this.stage.time,this.setFocus(t.to),this.emit("travel","end",t.to),t.resolve(!0))}interruptTravel(){const t=this.travel;t&&(t.tween?.kill(),this.travel=null,this.startBlend(.6),this.setFocus(t.to),this.orbitFromCamera(t.to),this.emit("travel","end",t.to),t.resolve(!1))}cancelTravel(){const t=this.travel;t&&(t.tween?.kill(),this.travel=null,t.resolve(!1))}orbitFromCamera(t){const e=this.positionOf(t,Kr);this.center.copy(e);const i=Yr.subVectors(this.camera.position,e);let n=i.length();n<1e-6&&(i.set(0,0,1),n=1e-6),Ic(i.divideScalar(n),yi);const r=this.view;r.yaw=Uo(yi.yaw,r.yaw),r.pitch=yi.pitch,r.distance=n,this.goal.yaw=r.yaw,this.goal.pitch=Rt(r.pitch,-Ii,Ii),this.goal.distance=this.clampDistance(n),this.velocity.yaw=this.velocity.pitch=0,this.parallax.x=this.parallax.y=0}startBlend(t){this.reduced||(this.blend.from.copy(this.camera.quaternion),this.blend.t=0,this.blend.duration=t,this.blend.active=!0)}enterFly(){if(this.mode==="fly"||!this.enabled)return;this.travel&&this.interruptTravel(),ft.killTweensOf(this.view),this.focusing=!1,this.blend.active=!1,qr.setFromQuaternion(this.camera.quaternion,"YXZ");const t=this.fly;t.yaw=t.goalYaw=qr.y,t.pitch=t.goalPitch=Rt(qr.x,-Io,Io),t.velocity.set(0,0,0),this.velocity.yaw=this.velocity.pitch=0,this.mode="fly",this.emit("mode","fly")}exitFly(){if(this.mode!=="fly")return;this.releaseKeys(),this.input.x=this.input.y=this.input.lift=0;const t=this.updateNearest(this.camera.position).body??this.system.home;this.mode="orbit",this.startBlend(.9),this.setFocus(t),this.orbitFromCamera(t),this.lastInput=this.stage.time,this.emit("mode","orbit")}toggleFly(){this.mode==="fly"?this.exitFly():this.enterFly()}updateFly(t){const e=this.fly,i=this.camera;e.yaw=Ye(e.yaw,e.goalYaw,12,t),e.pitch=Ye(e.pitch,e.goalPitch,12,t),i.quaternion.setFromEuler(qr.set(e.pitch,e.yaw,0,"YXZ"));const{keys:n,input:r}=this,a=Rt(n.right-n.left+r.x,-1,1),o=Rt(n.forward-n.back+r.y,-1,1),l=Rt(n.up-n.down+r.lift,-1,1),c=this.updateNearest(i.position).surface,u=Rt(.8*c,jE,t2)*(n.boost?e2:1);Zr.set(a,l,-o);const f=Zr.lengthSq();f>1&&Zr.normalize(),Zr.applyQuaternion(i.quaternion).multiplyScalar(u);const h=f>0?3:2.4,d=1-Math.exp(-h*t);e.velocity.lerp(Zr,d),i.position.addScaledVector(e.velocity,t),i.position.length()>gp&&i.position.setLength(gp),this.keepOut(i.position,null,e.velocity),e.speed=e.velocity.length()}update(t,e){const i=performance.now();this.lastFrameAt>0&&(this.frameMs=Math.max(this.frameMs*.95,Math.min(i-this.lastFrameAt,750))),this.lastFrameAt=i,this.refreshBodies(),this.mode==="fly"?this.updateFly(e):this.updateOrbit(t,e),this.updateViewShift(e),this.updatePlanes(),this.camera.updateMatrixWorld(),this.system.focus=this.mode==="fly"?null:this.travel?.to??this.focus}refreshBodies(){const t=this.system.bodies;for(let e=0;e<t.length;e++){const i=this.bodyPositions[e].set(0,0,0);for(let n=t[e].object3D;n&&!n.isScene;n=n.parent)i.add(n.position)}}updateOrbit(t,e){const{view:i,goal:n,velocity:r,camera:a}=this;if(this.travel)this.applyTravel();else{if(this.positionOf(this.focus,this.center),!this.drag.active&&!this.focusing){n.yaw+=r.yaw*e,n.pitch=Rt(n.pitch+r.pitch*e,-Ii,Ii);const f=Math.exp(-e*2.6);r.yaw*=f,r.pitch*=f,this.enabled&&!this.reduced&&this.idleDrift&&t-this.lastInput>3.5&&this.focus===this.system.home&&i.distance<va&&(n.yaw-=e*.06,n.pitch=Ye(n.pitch,Xr,.5,e))}this.focusing||(i.yaw=Ye(i.yaw,n.yaw,7,e),i.pitch=Ye(i.pitch,n.pitch,7,e),i.distance=Math.exp(Ye(Math.log(i.distance),Math.log(n.distance),5,e)))}const o=this.parallax;this.enabled&&(o.x=Ye(o.x,o.tx,2.5,e),o.y=Ye(o.y,o.ty,2.5,e)),this.sway=Ye(this.sway,this.travel?0:this.scaleOf(this.focus),3,e);const l=this.reduced?0:.5*this.sway,c=this.orbitQuaternion.setFromEuler(qr.set(-i.pitch,-i.yaw,0,"YXZ"));Yr.set(o.x*l,-o.y*l,i.distance).applyQuaternion(c),a.position.copy(this.center).add(Yr),this.keepOut(a.position,this.travel?null:this.focus,null),a.up.set(0,1,0).applyQuaternion(c),a.lookAt(this.center);const u=this.blend;u.active&&(u.t+=e/u.duration,u.t>=1?u.active=!1:(xp.copy(a.quaternion),a.quaternion.slerpQuaternions(u.from,xp,s2(u.t))))}keepOut(t,e,i){const n=this.system.bodies;for(let r=0;r<n.length;r++){if(n[r]===e)continue;const o=this.keepOutRadii[r]+this.camera.near;sr.subVectors(t,this.bodyPositions[r]);const l=sr.length();if(!(l>=o||l<1e-6)&&(sr.divideScalar(l),t.copy(this.bodyPositions[r]).addScaledVector(sr,o),i)){const c=i.dot(sr);c<0&&i.addScaledVector(sr,-c)}}}updatePlanes(){const t=this.camera,e=this.updateNearest(t.position).surface,i=Rt(e*.02,JE,QE);(Math.abs(i-t.near)>t.near*.08||t.far!==Lc)&&(t.near=i,t.far=Lc,t.updateProjectionMatrix())}setViewShift(t,e){this.shift.goalX=t,this.shift.goalY=e}updateViewShift(t){const e=this.shift,i=yp(e.x,e.goalX,this.reduced,t),n=yp(e.y,e.goalY,this.reduced,t);if(i===e.x&&n===e.y)return;e.x=i,e.y=n;const{width:r,height:a}=this.stage;i===0&&n===0?this.camera.clearViewOffset():this.camera.setViewOffset(r,a,i,n,r,a)}}const Jr=46,Nc=.12,a2='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 10.5L8 5.5l5 5" /></svg>',o2='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 5.5l5 5 5-5" /></svg>',l2='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" /></svg>';function Mp(s){const t=Math.abs(s);return t<Nc?0:Math.sign(s)*(t-Nc)/(1-Nc)}class c2{constructor({input:t,coarse:e,onExit:i}){P(this,"root",document.createElement("div"));P(this,"visible",!1);P(this,"stickPointer",null);P(this,"center",{x:0,y:0});P(this,"onStickDown",t=>{if(this.stickPointer!==null)return;t.preventDefault(),this.stickPointer=t.pointerId,this.stick.setPointerCapture(t.pointerId),this.stick.classList.add("is-held");const e=this.stick.getBoundingClientRect();this.center.x=e.left+e.width/2,this.center.y=e.top+e.height/2,this.onStickMove(t)});P(this,"onStickMove",t=>{if(t.pointerId!==this.stickPointer)return;let e=t.clientX-this.center.x,i=t.clientY-this.center.y;const n=Math.hypot(e,i);n>Jr&&(e*=Jr/n,i*=Jr/n),this.knob.style.transform=`translate(${e.toFixed(1)}px, ${i.toFixed(1)}px)`,this.input.x=Mp(e/Jr),this.input.y=Mp(-i/Jr)});P(this,"onStickUp",t=>{t.pointerId===this.stickPointer&&this.reset()});this.input=t;const n=this.root;n.className=`flight${e?" has-touch":""}`,n.hidden=!0,n.innerHTML=`
      <div class="flight__stick" aria-hidden="true">
        <span class="flight__ring"></span>
        <span class="flight__cross"></span>
        <span class="flight__knob"></span>
      </div>
      <div class="flight__lift" role="group" aria-label="Up and down">
        <button class="flight__btn" type="button" data-lift="1" aria-label="Up">${a2}</button>
        <button class="flight__btn" type="button" data-lift="-1" aria-label="Down">${o2}</button>
      </div>
      <div class="flight__bar">
        <p class="flight__title mono"><i></i>Free flight</p>
        <button class="flight__exit mono" type="button">${l2}<span>Exit</span><kbd>Esc</kbd></button>
      </div>
      <p class="flight__keys mono">W A S D move · Q E down / up · Shift boost · drag to look</p>`,this.stick=n.querySelector(".flight__stick"),this.knob=n.querySelector(".flight__knob"),n.querySelector(".flight__exit").addEventListener("click",()=>i()),this.stick.addEventListener("pointerdown",this.onStickDown),this.stick.addEventListener("pointermove",this.onStickMove),this.stick.addEventListener("pointerup",this.onStickUp),this.stick.addEventListener("pointercancel",this.onStickUp);for(const r of n.querySelectorAll(".flight__btn")){const a=Number(r.dataset.lift);r.addEventListener("pointerdown",l=>{l.preventDefault(),r.setPointerCapture(l.pointerId),r.classList.add("is-held"),this.input.lift=a});const o=()=>{r.classList.remove("is-held"),this.input.lift===a&&(this.input.lift=0)};r.addEventListener("pointerup",o),r.addEventListener("pointercancel",o),r.addEventListener("lostpointercapture",o),r.addEventListener("contextmenu",l=>l.preventDefault())}addEventListener("touchstart",()=>this.root.classList.add("has-touch"),{passive:!0,once:!0}),document.body.append(n)}show(){this.visible||(this.visible=!0,this.root.hidden=!1)}hide(){this.visible&&(this.visible=!1,this.root.hidden=!0,this.reset(),this.input.lift=0)}reset(){this.stickPointer=null,this.input.x=this.input.y=0,this.knob.style.transform="",this.stick.classList.remove("is-held")}}function u2(s,t=!1){const e=s[0].index!==null,i=new Set(Object.keys(s[0].attributes)),n=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new ce;let c=0;for(let u=0;u<s.length;++u){const f=s[u];let h=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),h++}if(h!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in f.morphAttributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(e){let u=0;const f=[];for(let h=0;h<s.length;++h){const d=s[h].index;for(let p=0;p<d.count;++p)f.push(d.getX(p)+u);u+=s[h].attributes.position.count}l.setIndex(f)}for(const u in r){const f=Sp(r[u]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,f)}for(const u in a){const f=a[u][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let h=0;h<f;++h){const d=[];for(let v=0;v<a[u].length;++v)d.push(a[u][v][h]);const p=Sp(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(p)}}}return l}function Sp(s){let t,e,i,n=-1,r=0;for(let c=0;c<s.length;++c){const u=s[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=u.gpuType),n!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const a=new t(r),o=new Wt(a,e,i);let l=0;for(let c=0;c<s.length;++c){const u=s[c];if(u.isInterleavedBufferAttribute){const f=l/e;for(let h=0,d=u.count;h<d;h++)for(let p=0;p<e;p++){const v=u.getComponent(h,p);o.setComponent(h+f,p,v)}}else a.set(u.array,l);l+=u.count*e}return n!==void 0&&(o.gpuType=n),o}function h2(s,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},i=s.getIndex(),n=s.getAttribute("position"),r=i?i.count:n.count;let a=0;const o=Object.keys(s.attributes),l={},c={},u=[],f=["getX","getY","getZ","getW"],h=["setX","setY","setZ","setW"];for(let M=0,b=o.length;M<b;M++){const _=o[M],S=s.attributes[_];l[_]=new S.constructor(new S.array.constructor(S.count*S.itemSize),S.itemSize,S.normalized);const y=s.morphAttributes[_];y&&(c[_]||(c[_]=[]),y.forEach((T,x)=>{const E=new T.array.constructor(T.count*T.itemSize);c[_][x]=new T.constructor(E,T.itemSize,T.normalized)}))}const d=t*.5,p=Math.log10(1/t),v=Math.pow(10,p),g=d*v;for(let M=0;M<r;M++){const b=i?i.getX(M):M;let _="";for(let S=0,y=o.length;S<y;S++){const T=o[S],x=s.getAttribute(T),E=x.itemSize;for(let C=0;C<E;C++)_+=`${Math.trunc(x[f[C]](b)*v+g)},`}if(_ in e)u.push(e[_]);else{for(let S=0,y=o.length;S<y;S++){const T=o[S],x=s.getAttribute(T),E=s.morphAttributes[T],C=x.itemSize,F=l[T],I=c[T];for(let O=0;O<C;O++){const L=f[O],U=h[O];if(F[U](a,x[L](b)),E)for(let V=0,H=E.length;V<H;V++)I[V][U](a,E[V][L](b))}}e[_]=a,u.push(a),a++}}const m=s.clone();for(const M in s.attributes){const b=l[M];if(m.setAttribute(M,new b.constructor(b.array.slice(0,a*b.itemSize),b.itemSize,b.normalized)),M in c)for(let _=0;_<c[M].length;_++){const S=c[M][_];m.morphAttributes[M][_]=new S.constructor(S.array.slice(0,a*S.itemSize),S.itemSize,S.normalized)}}return m.setIndex(u),m}function f2(s){const t=hi(s),e=new Uint8Array(512),i=Array.from({length:256},(o,l)=>l);for(let o=255;o>0;o--){const l=Math.floor(t()*(o+1));[i[o],i[l]]=[i[l],i[o]]}for(let o=0;o<512;o++)e[o]=i[o&255];const n=new Float32Array(256*3);for(let o=0;o<256;o++){const l=t()*2-1,c=t()*Math.PI*2,u=Math.sqrt(1-l*l);n.set([u*Math.cos(c),l,u*Math.sin(c)],o*3)}const r=o=>o*o*o*(o*(o*6-15)+10),a=(o,l,c,u)=>n[o*3]*l+n[o*3+1]*c+n[o*3+2]*u;return(o,l,c)=>{const u=Math.floor(o),f=Math.floor(l),h=Math.floor(c),d=o-u,p=l-f,v=c-h,g=u&255,m=f&255,M=h&255,b=r(d),_=r(p),S=r(v),y=(I,O,L)=>e[e[e[g+I]+m+O]+M+L],T=(I,O,L)=>I+(O-I)*L,x=T(a(y(0,0,0),d,p,v),a(y(1,0,0),d-1,p,v),b),E=T(a(y(0,1,0),d,p-1,v),a(y(1,1,0),d-1,p-1,v),b),C=T(a(y(0,0,1),d,p,v-1),a(y(1,0,1),d-1,p,v-1),b),F=T(a(y(0,1,1),d,p-1,v-1),a(y(1,1,1),d-1,p-1,v-1),b);return T(T(x,E,_),T(C,F,_),S)*1.6}}function Uc(s,t,e,i,n){let r=0,a=.5,o=1;for(let l=0;l<n;l++)r+=a*s(t*o,e*o,i*o),o*=2.07,a*=.5;return r}function d2(s,t){const e=s()*2-1,i=s()*Math.PI*2,n=Math.sqrt(1-e*e);return t.set(n*Math.cos(i),e,n*Math.sin(i))}function aa({seed:s=1,detail:t=1,smooth:e=!1,lumps:i=.34,craters:n=6}={}){let r=new $h(1,t);r.deleteAttribute("uv"),r.deleteAttribute("normal"),e&&(r=h2(r));const a=f2(s),o=hi(s*7919+17),l=[o()*50,o()*50,o()*50],c=[];for(let d=0;d<n;d++)c.push({dir:d2(o,new A),radius:.16+o()**1.6*.5,depth:.5+o()*.6});const u=r.attributes.position,f=new Float32Array(u.count*3),h=new A;for(let d=0;d<u.count;d++){h.fromBufferAttribute(u,d).normalize();const[p,v,g]=l;let m=1+i*Uc(a,h.x*.85+p,h.y*.85+v,h.z*.85+g,3);m+=.06*Uc(a,h.x*3.3-v,h.y*3.3+g,h.z*3.3-p,3);let M=0,b=0;for(const y of c){const x=Math.acos(Math.min(1,Math.max(-1,h.dot(y.dir))))/y.radius;if(x>1.5)continue;const E=x<1?x*x-1:0,C=Math.exp(-(((x-1)/.28)**2));m+=y.radius*.22*y.depth*(E+.45*C),M=Math.max(M,x<1?1-x:0),b=Math.max(b,C)}u.setXYZ(d,h.x*m,h.y*m,h.z*m);const _=Uc(a,h.x*5.1+9,h.y*5.1-3,h.z*5.1+1,2),S=Math.min(1,Math.max(.35,.78+.32*_-.16*M+.1*b));f[d*3]=S,f[d*3+1]=S*.97,f[d*3+2]=S*.93}return r.setAttribute("color",new Wt(f,3)),r.computeVertexNormals(),r.computeBoundingSphere(),r}const ki={uViewport:{value:new lt(1280,800)},uViewHeight:{value:800},uPixelRatio:{value:1},uPxScale:{value:1100}};function Zh(s,t){const e=s.getDrawingBufferSize(ki.uViewport.value);ki.uViewHeight.value=e.y,ki.uPixelRatio.value=s.getPixelRatio(),ki.uPxScale.value=e.y*t.projectionMatrix.elements[5]/2}const p2=`
  uniform float uWidthHead;
  uniform float uWidthTail;
  uniform float uMinPx;
  uniform float uMaxPx;
  uniform float uEnergyFloor;
  uniform float uViewHeight;
  attribute vec3 aTangent;
  attribute vec2 aStrip;
  varying vec2 vStrip;
  varying float vEnergy;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 tangent = (modelViewMatrix * vec4(aTangent, 0.0)).xyz;
    vec3 side = cross(tangent, mv.xyz);
    float len = length(side);
    side = len > 1e-9 ? side / len : vec3(0.0, 1.0, 0.0);
    float width = mix(uWidthHead, uWidthTail, aStrip.y);
    float pixel = -mv.z * 2.0 / (projectionMatrix[1][1] * uViewHeight);
    float shown = max(width, uMinPx * pixel);
    vEnergy = max(width / shown, uEnergyFloor);
    // hairline trails: fade out where the camera is so close they turn into beams
    if (uMaxPx > 0.0) vEnergy *= 1.0 - smoothstep(uMaxPx, uMaxPx * 3.0, shown / pixel);
    mv.xyz += side * (aStrip.x * shown * 0.5);
    vStrip = aStrip;
    gl_Position = projectionMatrix * mv;
  }
`,m2=`
  uniform vec3 uColor;
  uniform vec3 uColorTail;
  uniform float uOpacity;
  uniform float uFade;
  uniform float uHeadFade;
  uniform float uStreaks;
  uniform float uTime;
  varying vec2 vStrip;
  varying float vEnergy;
  void main() {
    float across = 1.0 - vStrip.x * vStrip.x;
    float along = pow(1.0 - vStrip.y, uFade) * smoothstep(0.0, uHeadFade, vStrip.y);
    float streak = 1.0;
    if (uStreaks > 0.0) {
      // filaments run along the ribbon (lines of constant x fan out from the
      // head as it widens) and shimmer slowly
      float bendA = 0.5 * sin(vStrip.y * 2.2 - uTime * 0.21);
      float bendB = 0.35 * sin(vStrip.y * 1.3 + uTime * 0.13 + 2.0);
      float s = sin(vStrip.x * 10.5 + bendA) * sin(vStrip.x * 4.3 + 1.7 + bendB);
      streak = mix(1.0, 0.5 + 0.5 * s * s * 1.7, uStreaks);
      across = mix(across, across * across, 0.5);
    }
    float alpha = along * across * streak * uOpacity * vEnergy;
    if (alpha < 0.002) discard;
    gl_FragColor = vec4(mix(uColor, uColorTail, vStrip.y), alpha);
    #include <colorspace_fragment>
  }
`;function g2({color:s="#9cc7ff",colorTail:t=s,opacity:e=.6,widthHead:i=.1,widthTail:n=.02,minPx:r=1.2,maxPx:a=0,energyFloor:o=0,fade:l=1.6,headFade:c=1e-4,streaks:u=0}={}){return new he({uniforms:{uColor:{value:new Ct(s)},uColorTail:{value:new Ct(t)},uOpacity:{value:e},uWidthHead:{value:i},uWidthTail:{value:n},uMinPx:{value:r},uMaxPx:{value:a},uEnergyFloor:{value:o},uFade:{value:l},uHeadFade:{value:c},uStreaks:{value:u},uTime:{value:0},uViewHeight:ki.uViewHeight},vertexShader:p2,fragmentShader:m2,transparent:!0,depthWrite:!1,blending:Ke})}class rh{constructor(t,e){this.count=t,this.points=new Float32Array(t*3),this.positions=new Float32Array(t*6),this.tangents=new Float32Array(t*6);const i=new Float32Array(t*4),n=[];for(let a=0;a<t;a++){const o=a/(t-1);if(i.set([-1,o,1,o],a*4),a<t-1){const l=a*2;n.push(l,l+1,l+2,l+1,l+3,l+2)}}const r=new ce;r.setAttribute("position",new Wt(this.positions,3)),r.setAttribute("aTangent",new Wt(this.tangents,3)),r.setAttribute("aStrip",new Wt(i,2)),r.setIndex(n),this.material=g2(e),this.mesh=new ae(r,this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}commit(){const{count:t,points:e,positions:i,tangents:n}=this;for(let a=0;a<t;a++){const o=Math.max(0,a-1)*3,l=Math.min(t-1,a+1)*3,c=a*3,u=e[o]-e[l],f=e[o+1]-e[l+1],h=e[o+2]-e[l+2];for(let d=0;d<2;d++){const p=a*6+d*3;i[p]=e[c],i[p+1]=e[c+1],i[p+2]=e[c+2],n[p]=u,n[p+1]=f,n[p+2]=h}}const{attributes:r}=this.mesh.geometry;r.position.needsUpdate=!0,r.aTangent.needsUpdate=!0}dispose(){this.mesh.removeFromParent(),this.mesh.geometry.dispose(),this.material.dispose()}}class Oc extends rh{constructor({count:t=48,duration:e=4,...i}={}){super(t,i),this.interval=e/(t-1),this.ring=new Float32Array(t*3),this.head=0,this.clock=0,this.primed=!1}reset(t){for(let e=0;e<this.count;e++)this.ring[e*3]=t.x,this.ring[e*3+1]=t.y,this.ring[e*3+2]=t.z;this.clock=0,this.primed=!0}update(t,e){if(this.primed||this.reset(t),this.clock+=e,this.clock>=this.interval){this.clock%=this.interval,this.head=(this.head+1)%this.count;const a=this.head*3;this.ring[a]=t.x,this.ring[a+1]=t.y,this.ring[a+2]=t.z}const{points:i,ring:n,count:r}=this;i[0]=t.x,i[1]=t.y,i[2]=t.z;for(let a=1;a<r;a++){const o=(this.head-a+1+r)%r*3;i[a*3]=n[o],i[a*3+1]=n[o+1],i[a*3+2]=n[o+2]}this.commit()}}const v2=`
  uniform float uTime;
  uniform float uPxScale;
  uniform float uMinPx;
  uniform float uMaxPx;
  uniform float uLift;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aIntensity;
  attribute vec4 aBlink;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // pulled towards the camera so a glow is never cut by the body it sits on
    mv.xyz += normalize(-mv.xyz) * min(uLift, -mv.z * 0.5);
    float px = aSize * uPxScale / max(-mv.z, 1e-3);
    float size = clamp(px, uMinPx, uMaxPx);
    float energy = clamp(px / uMinPx, 0.0, 1.0);
    float blink = 1.0;
    if (aBlink.x > 0.0) {
      float phase = fract(uTime / aBlink.x + aBlink.y);
      float on = smoothstep(0.0, 0.02, phase) * (1.0 - smoothstep(aBlink.z, aBlink.z + 0.04, phase));
      blink = mix(aBlink.w, 1.0, on);
    }
    vColor = aColor;
    vAlpha = aIntensity * blink * mix(0.35, 1.0, sqrt(energy));
    gl_PointSize = size;
    gl_Position = projectionMatrix * mv;
  }
`,_2=`
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float d2 = dot(p, p);
    if (d2 > 1.0) discard;
    float core = exp(-d2 * 14.0);
    float halo = exp(-d2 * 4.0) * 0.45 * (1.0 - d2);
    float alpha = (core + halo) * vAlpha;
    gl_FragColor = vec4(mix(vColor, vec3(1.0), core * 0.55), alpha);
    #include <colorspace_fragment>
  }
`;function x2({minPx:s=2,maxPx:t=160,lift:e=0}={}){return new he({uniforms:{uTime:{value:0},uMinPx:{value:s},uMaxPx:{value:t},uLift:{value:e},uPxScale:ki.uPxScale},vertexShader:v2,fragmentShader:_2,transparent:!0,depthWrite:!1,blending:Ke})}const y2=[0,0,1,1];class og{constructor(t,e){this.count=t,this.positions=new Float32Array(t*3),this.colors=new Float32Array(t*3),this.sizes=new Float32Array(t),this.intensities=new Float32Array(t),this.blinks=new Float32Array(t*4);const i=new ce;i.setAttribute("position",new Wt(this.positions,3)),i.setAttribute("aColor",new Wt(this.colors,3)),i.setAttribute("aSize",new Wt(this.sizes,1)),i.setAttribute("aIntensity",new Wt(this.intensities,1)),i.setAttribute("aBlink",new Wt(this.blinks,4)),this.material=x2(e),this.points=new Pr(i,this.material),this.points.frustumCulled=!1,this.points.renderOrder=3}define(t,{color:e,size:i,intensity:n=1,blink:r=y2}){const a=new Ct(e);this.colors.set([a.r,a.g,a.b],t*3),this.sizes[t]=i,this.intensities[t]=n,this.blinks.set(r,t*4);const{attributes:o}=this.points.geometry;o.aColor.needsUpdate=!0,o.aSize.needsUpdate=!0,o.aBlink.needsUpdate=!0,o.aIntensity.needsUpdate=!0}setPosition(t,e){this.positions[t*3]=e.x,this.positions[t*3+1]=e.y,this.positions[t*3+2]=e.z}commit(){this.points.geometry.attributes.position.needsUpdate=!0,this.points.geometry.attributes.aIntensity.needsUpdate=!0}dispose(){this.points.removeFromParent(),this.points.geometry.dispose(),this.material.dispose()}}const Si=Math.PI*2,ys=Math.PI/180,Oo=[[320,1],[440,1.52],[560,2.77],[820,5.2],[1120,9.54],[1420,19.2],[1700,30.1],[1950,39.5],[2100,43.1],[2250,45.4],[2500,67.8]];function M2(s){for(let t=1;t<Oo.length;t++){const[e,i]=Oo[t],[n,r]=Oo[t-1];if(s<=e||t===Oo.length-1)return r+(s-n)/(e-n)*(i-r)}return 1}const lg=s=>Si/M2(s)**1.5,cg=`
  // orbit = (a, e, n rad/yr, M0), plane = (node, inclination, argument of perihelion)
  vec3 orbitPoint(vec4 orbit, vec3 plane, float years) {
    float M = orbit.w + orbit.z * years;
    float e = orbit.y;
    float E = M + e * sin(M);
    E = M + e * sin(E);
    E = M + e * sin(E);
    float xv = orbit.x * (cos(E) - e);
    float yv = orbit.x * sqrt(1.0 - e * e) * sin(E);
    float cw = cos(plane.z), sw = sin(plane.z);
    float cO = cos(plane.x), sO = sin(plane.x);
    float ci = cos(plane.y), si = sin(plane.y);
    float xp = xv * cw - yv * sw;
    float yp = xv * sw + yv * cw;
    float x = xp * cO - yp * ci * sO;
    float y = xp * sO + yp * ci * cO;
    return vec3(x, yp * si, -y);
  }
`;function Ge(s){return Math.sqrt(-2*Math.log(1-s()))*Math.cos(Si*s())}function S2(s){const t=Rt((s-500)/18,0,1)*Rt((620-s)/10,0,1),e=.7+.3*Math.exp(-(((s-556)/30)**2)),i=(n,r,a)=>1-a*Math.exp(-(((s-n)/r)**2));return t*e*i(534,3.4,.92)*i(565,2.6,.8)*i(579,2.2,.72)*i(613,2.6,.85)}function b2(s){for(;;){const t=500+s()*120;if(s()<S2(t))return t}}function w2(s){const t=Math.exp(-(((s-2120)/150)**2)),e=.25*Rt((2400-s)/300,0,1);return Rt(t+e,0,1)}function E2(s){for(;;){const t=1850+s()*550;if(s()<w2(t))return t}}function Bc(s,t,e){const i=new Float32Array(s*4),n=new Float32Array(s*4),r={};for(let a=0;a<s;a++){e(t,r,a);const o=r.n??lg(r.a);i.set([r.a,r.e,o,r.M0],a*4),n.set([r.node,r.inc,r.peri,t()],a*4)}return{orbit:i,plane:n}}const T2=`
  vec3 spinAround(vec3 p, vec3 axis, float angle) {
    return mix(dot(axis, p) * axis, p, cos(angle)) + cross(axis, p) * sin(angle);
  }
  // Dark carbon-grey to dusty grey-tan, picked per rock.
  vec3 rockTint(float pick) {
    return mix(vec3(0.5, 0.49, 0.48), vec3(0.74, 0.66, 0.56), pick * pick) * (0.78 + 0.3 * fract(pick * 7.31));
  }
`,D2=`
  vec3 transformed = spinAround(position * aScale, aSpin.xyz, aSpin.w * uTime + aOrbit.w * 7.0);
  transformed += orbitPoint(aOrbit, aPlane.xyz, uYears);
  vTint = rockTint(aPlane.w);
`,A2=`
  vec3 rel = mod(aSeed.xyz * uBox + uDrift - uCameraLocal + 0.5 * uBox, uBox) - 0.5 * uBox;
  vec3 centre = uCameraLocal + rel;
  float edge = max(max(abs(rel.x), abs(rel.y)), abs(rel.z)) / uBox;
  float grow = uPresence * (1.0 - smoothstep(0.32, 0.5, edge)) * smoothstep(0.02, 0.06, length(rel) / uBox);
  grow *= smoothstep(uAvoid.w + 0.6, uAvoid.w + 3.0, distance(centre, uAvoid.xyz));
  vec3 transformed = spinAround(position * aScale * grow, aSpin.xyz, aSpin.w * uTime + aSeed.w * 40.0) + centre;
  vTint = rockTint(fract(aSeed.w * 13.7));
`;function bp(s,t){const e=new Xa({color:"#ffffff",vertexColors:!0,flatShading:!0,roughness:.95,metalness:0}),i=t==="field";return e.onBeforeCompile=n=>{Object.assign(n.uniforms,s),n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
        uniform float uYears;
        uniform float uTime;
        attribute vec4 aSpin;
        attribute vec3 aScale;
        varying vec3 vTint;
        ${i?"uniform vec3 uCameraLocal; uniform vec3 uDrift; uniform float uBox; uniform float uPresence; uniform vec4 uAvoid; attribute vec4 aSeed;":`attribute vec4 aOrbit; attribute vec4 aPlane; ${cg}`}
        ${T2}`).replace("#include <begin_vertex>",i?A2:D2),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vTint;`).replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= vTint;`)},e.customProgramCacheKey=()=>`belt-rock-${t}`,e}function wp(s,t,e,i,n,r,a){const o=new Ly;o.index=s.index;for(const h of Object.keys(s.attributes))o.setAttribute(h,s.attributes[h]);const l=new Float32Array(t*4),c=new Float32Array(t*3),u=new A;for(let h=0;h<t;h++){u.set(Ge(e),Ge(e),Ge(e)).normalize(),l.set([u.x,u.y,u.z,(.08+e()*.6)*(e()<.5?-1:1)],h*4);const d=i(e,h);c.set([d*(.8+e()*.5),d*(.65+e()*.35),d*(.75+e()*.4)],h*3)}for(const[h,[d,p]]of Object.entries(n))o.setAttribute(h,new da(d,p));o.setAttribute("aSpin",new da(l,4)),o.setAttribute("aScale",new da(c,3)),o.instanceCount=t,o.boundingSphere=new zn(new A,a);const f=new ae(o,r);return f.matrixAutoUpdate=!1,f}const C2=`
  varying vec3 vWorld;
  varying vec3 vLocal;
  void main() {
    vLocal = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,P2=`
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vWorld;
  varying vec3 vLocal;
  float gap(float a, float centre, float width, float depth) {
    float d = (a - centre) / width;
    return 1.0 - depth * exp(-d * d);
  }
  void main() {
    float a = length(vLocal.xz);
    float band = smoothstep(498.0, 540.0, a) * (1.0 - smoothstep(585.0, 624.0, a));
    band *= 0.6 + 0.4 * exp(-pow((a - 556.0) / 28.0, 2.0));
    band *= gap(a, 534.0, 3.4, 0.55) * gap(a, 565.0, 2.6, 0.45) * gap(a, 579.0, 2.2, 0.4) * gap(a, 613.0, 2.6, 0.5);
    vec3 toCamera = cameraPosition - vWorld;
    float distance = length(toCamera);
    float faceOn = abs(toCamera.y) / distance;
    float far = smoothstep(120.0, 700.0, distance);
    float angle = atan(vLocal.z, vLocal.x);
    float clumps = 0.75 + 0.25 * sin(angle * 23.0 + sin(angle * 7.0) * 2.0) * sin(angle * 11.0 + a * 0.08);
    float alpha = uOpacity * band * clumps * pow(faceOn, 0.6) * far;
    if (alpha < 0.002) discard;
    gl_FragColor = vec4(uColor, alpha);
    #include <colorspace_fragment>
  }
`;function R2(s){const t=new Rl(496,626,s,3);t.rotateX(-Math.PI/2);const e=new he({uniforms:{uColor:{value:new Ct("#cdb48e")},uOpacity:{value:.07}},vertexShader:C2,fragmentShader:P2,transparent:!0,depthWrite:!1,side:Yi,blending:Ke}),i=new ae(t,e);return i.name="belt-haze",i.matrixAutoUpdate=!1,i}const L2=`
  uniform float uYears;
  uniform float uPxScale;
  uniform float uMinPx;
  uniform float uMaxPx;
  uniform float uOpacity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  attribute vec4 aOrbit;
  attribute vec4 aPlane;
  attribute float aSize;
  varying vec3 vColor;
  varying float vAlpha;
  ${cg}
  void main() {
    vec3 p = orbitPoint(aOrbit, aPlane.xyz, uYears);
    vec4 world = modelMatrix * vec4(p, 1.0);
    vec4 mv = viewMatrix * world;
    float px = aSize * uPxScale / max(-mv.z, 1e-3);
    float energy = clamp(px / uMinPx, 0.0, 1.0);
    // Rocks look brightest with the Sun behind the viewer (full phase).
    vec3 sun = modelMatrix[3].xyz;
    float phase = dot(normalize(sun - world.xyz), normalize(cameraPosition - world.xyz));
    float light = 0.3 + 0.7 * (0.5 + 0.5 * phase);
    vColor = mix(uColorA, uColorB, aPlane.w);
    vAlpha = uOpacity * sqrt(energy) * light;
    gl_PointSize = clamp(px, uMinPx, uMaxPx);
    gl_Position = projectionMatrix * mv;
  }
`,F2=`
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float d2 = dot(p, p);
    if (d2 > 1.0) discard;
    gl_FragColor = vec4(vColor, vAlpha * (1.0 - d2) * (1.0 - d2));
    #include <colorspace_fragment>
  }
`;function Ep(s,t,e,i,n,r){const a=new ce;a.setAttribute("position",new Wt(new Float32Array(s*3),3)),a.setAttribute("aOrbit",new Wt(t.orbit,4)),a.setAttribute("aPlane",new Wt(t.plane,4));const o=new Float32Array(s);for(let u=0;u<s;u++)o[u]=i(e,u);a.setAttribute("aSize",new Wt(o,1)),a.boundingSphere=new zn(new A,r.radius);const l=new he({uniforms:{uYears:n.uYears,uPxScale:ki.uPxScale,uMinPx:{value:r.minPx},uMaxPx:{value:r.maxPx},uOpacity:{value:r.opacity},uColorA:{value:new Ct(r.colorA)},uColorB:{value:new Ct(r.colorB)}},vertexShader:L2,fragmentShader:F2,transparent:!0,depthWrite:!1,blending:Ke}),c=new Pr(a,l);return c.matrixAutoUpdate=!1,c}const kc=30,I2=95,Tp=5,N2=.035,Dp=(s,t,e)=>{const i=Rt((e-s)/(t-s),0,1);return i*i*(3-2*i)};class U2{constructor(t){this.radius=kc+t()*(I2-kc),this.e=t()*Math.min(.12,1-27/this.radius),this.inc=(t()*2-1)*38*ys,this.node=t()*Si,this.phase=t()*Si,this.rate=Si/(240*(this.radius/kc)**1.5)*(t()<.85?1:-1),this.size=.4+t()**2.2*1.8,this.stretch=new A(.85+t()*.4,.7+t()*.3,.8+t()*.35),this.axis=new A(Ge(t),Ge(t),Ge(t)).normalize(),this.spinRate=(.05+t()*.22)*(t()<.5?-1:1),this.spinPhase=t()*Si}positionAt(t,e){const i=this.phase+this.rate*t,n=this.radius*(1-this.e*this.e)/(1+this.e*Math.cos(i)),r=Math.cos(i)*n,a=Math.sin(i)*n,o=a*Math.sin(this.inc),l=a*Math.cos(this.inc),c=Math.cos(this.node),u=Math.sin(this.node);return e.set(r*c-l*u,o,r*u+l*c)}}function Ap(s){return new Xa({color:s,vertexColors:!0,roughness:.97,metalness:0,flatShading:!1})}class O2{constructor(t){P(this,"group",new Ve);P(this,"uniforms",{uYears:{value:0},uTime:{value:0}});this.system=t;const e=t.coarse;this.reduced=t.reduced,this.epoch=t.years,t.belts=this,this.disposables=[],this.beltGroup=new Ve,this.beltGroup.name="asteroid-belts",t.frame.add(this.beltGroup),this.nearGroup=new Ve,this.nearGroup.name="drifting-rocks",t.group.add(this.nearGroup),this.buildMainBelt(e?600:1400,e?2200:5200),this.buildBeltField(e?150:260,e?2:3),this.buildKuiperBelt(e?600:1500),this.buildDriftingRocks(24,e),this.buildFlyBy(e)}track(...t){return this.disposables.push(...t),t[0]}buildMainBelt(t,e){const i=hi(5101),n=eg.find(v=>v.id==="ceres").orbit,r=Si/n.period,a=(n.L0-n.peri)*ys+r*this.epoch,o=(v,g,m)=>{g.a=n.a+Ge(v)*9*m,g.e=Rt(n.e+Ge(v)*.01,0,.2),g.inc=(n.i+Ge(v)*1.1*m)*ys,g.node=(n.node+Ge(v)*2.5)*ys,g.peri=(n.peri-n.node)*ys,g.n=r,g.M0=a+Ge(v)*.2*m},l=(v,g,m,M)=>{g.n=void 0,g.a=b2(v),g.e=v()**1.5*m,g.inc=Rt(Math.abs(Ge(v))*M,0,14)*ys,g.node=v()*Si,g.peri=v()*Si,g.M0=v()*Si},c=this.track(bp(this.uniforms,"orbit")),u=(v,g)=>g*(1-v())**(-1/2.1),f=Math.round(t*.04);[{count:Math.ceil((t-f)/3),detail:1,size:v=>Rt(u(v,.07),.07,.3)},{count:Math.ceil((t-f)/3),detail:1,size:v=>Rt(u(v,.07),.07,.3)},{count:Math.floor((t-f)/3),detail:1,size:v=>Rt(u(v,.07),.07,.3)},{count:f,detail:3,size:v=>Rt(u(v,.3),.3,.8)}].forEach(({count:v,detail:g,size:m},M)=>{const b=Math.round(v*.16),_=Bc(v,i,(T,x,E)=>E<b?o(T,x,1):l(T,x,.1,3.6)),S=this.track(aa({seed:31+M*13,detail:g,lumps:.42,craters:g>1?6:3})),y=wp(S,v,i,m,{aOrbit:[_.orbit,4],aPlane:[_.plane,4]},c,640);this.track(y.geometry),y.name=`belt-rocks-${M}`,this.beltGroup.add(y)}),this.haze=R2(this.system.coarse?160:256),this.track(this.haze.geometry,this.haze.material),this.beltGroup.add(this.haze);const d=Bc(e,i,(v,g,m)=>m<e*.1?o(v,g,1.4):l(v,g,.008,3.2)),p=Ep(e,d,i,v=>.12+v()**3*.5,this.uniforms,{radius:640,minPx:1.3,maxPx:2.6,opacity:.7,colorA:"#a89c8c",colorB:"#dcc4a0"});this.track(p.geometry,p.material),p.name="belt-dust",this.beltGroup.add(p),this.beltDust=p}buildBeltField(t,e){const i=hi(3301),n=96;this.field={uniforms:{uCameraLocal:{value:new A},uDrift:{value:new A},uBox:{value:n},uPresence:{value:0},uAvoid:{value:new De(0,0,0,.9)}},ceres:this.system.bodyById("ceres"),camera:new A,tangent:new A};const r=new Float32Array(t*4);for(let u=0;u<t;u++)r.set([i(),i(),i(),i()],u*4);const a=this.track(bp({...this.uniforms,...this.field.uniforms},"field")),o=this.track(aa({seed:77,detail:e,lumps:.44,craters:5})),c=wp(o,t,i,u=>Rt(.08*(1-u())**(-1/1.9),.08,1.1),{aSeed:[r,4]},a,1);c.frustumCulled=!1,c.visible=!1,c.name="belt-field",this.track(c.geometry),this.beltGroup.add(c),this.field.mesh=c}updateBeltField(t){const e=this.field,{uniforms:i}=e,n=e.camera.setFromMatrixPosition(t.camera.matrixWorld).sub(this.system.frame.position),r=Math.hypot(n.x,n.z),a=Math.abs(n.y),o=Rt((r-485)/30,0,1)*Rt((640-r)/30,0,1)*Rt((130-a)/60,0,1);if(i.uPresence.value=o,e.mesh.visible=o>.01,!!e.mesh.visible){if(i.uCameraLocal.value.copy(n),r>1){const l=r*lg(r)*t.dtYears,c=i.uDrift.value;c.x+=n.z/r*l,c.z-=n.x/r*l;const u=i.uBox.value;c.set(c.x%u,0,c.z%u)}if(e.ceres){const l=e.ceres.object3D.position;i.uAvoid.value.set(l.x,l.y,l.z,e.ceres.radius)}}}buildKuiperBelt(t){const e=hi(7207),i=Bc(t,e,(r,a)=>{a.a=E2(r),a.e=r()**1.4*.14;const o=r()<.22;a.inc=Rt(Math.abs(Ge(r))*(o?13:4),0,34)*ys,a.node=r()*Si,a.peri=r()*Si,a.M0=r()*Si}),n=Ep(t,i,e,r=>.35+r()**4*1.6,this.uniforms,{radius:2700,minPx:1.2,maxPx:4,opacity:.75,colorA:"#bcd0f0",colorB:"#efe2d0"});this.track(n.geometry,n.material),n.name="kuiper-belt",this.beltGroup.add(n),this.kuiper=n}buildDriftingRocks(t,e){const i=hi(913);this.drifters=Array.from({length:t},()=>new U2(i));const n=3;this.nearMeshes=[];const r=["#8e8983","#7a7772","#948576"];for(let a=0;a<n;a++){const o=this.track(aa({seed:401+a*29,detail:e?6:9,smooth:!0,lumps:.38,craters:9})),l=this.track(Ap(r[a])),c=new Ox(o,l,Math.ceil(t/n));c.instanceMatrix.setUsage(Y_),c.name=`drifting-rocks-${a}`,c.frustumCulled=!1,this.nearGroup.add(c),this.nearMeshes.push(c)}this.drifters.forEach((a,o)=>{a.mesh=this.nearMeshes[o%n],a.slot=Math.floor(o/n)}),this.tmpMatrix=new le,this.tmpPosition=new A,this.tmpQuaternion=new Ri,this.tmpScale=new A,this.tmpView=new A,this.tmpAcross=new A,this.tmpClosest=new A,this.cameraPosition=new A,this.updateDrifters(0)}buildFlyBy(t){const e=this.track(aa({seed:1777,detail:t?5:8,smooth:!0,lumps:.45,craters:7})),i=this.track(Ap("#a89a8c"));this.flyBy=new ae(e,i),this.flyBy.name="fly-by-rock",this.flyBy.visible=!1,this.nearGroup.add(this.flyBy),this.flyState={active:!1,wait:8+Math.random()*10,start:new A,velocity:new A,axis:new A(0,1,0),spin:0,life:0,duration:0}}updateDrifters(t,e=null){const i=this.tmpMatrix,n=this.tmpPosition,r=this.tmpQuaternion,a=this.tmpScale,o=this.tmpView;let l=0,c=0;e&&(l=e.length(),c=Math.asin(Math.min(1,(Tp+1.5)/Math.max(l,Tp+1.5))));for(let u=0;u<this.drifters.length;u++){const f=this.drifters[u];f.positionAt(t,n),r.setFromAxisAngle(f.axis,f.spinPhase+f.spinRate*t);let h=f.size;if(e){const d=f.size*1.4;o.subVectors(n,e);const p=o.length();h*=Dp(3,14,p-d);const v=p*N2;if(h=h*v/Math.sqrt(h*h+v*v),p<l){const g=-o.dot(e)/(p*l),m=Math.acos(Rt(g,-1,1))-Math.atan(d/p);h*=Dp(c,c*1.35+.02,m)}}a.copy(f.stretch).multiplyScalar(Math.max(h,1e-4)),i.compose(n,r,a),f.mesh.setMatrixAt(f.slot,i)}for(const u of this.nearMeshes)u.instanceMatrix.needsUpdate=!0}launchFlyBy(t){const e=this.flyState,i=this.tmpView,n=this.tmpAcross,r=this.tmpClosest;t.getWorldDirection(i),n.set(Ge(Math.random),Ge(Math.random),Ge(Math.random)),n.addScaledVector(i,-n.dot(i)).normalize();const a=25+Math.random()*35;r.copy(i).multiplyScalar(.55+Math.random()*.4),r.addScaledVector(n,(Math.random()*2-1)*.7).normalize().multiplyScalar(a),e.velocity.crossVectors(r,i),e.velocity.lengthSq()<1e-6&&e.velocity.copy(n),e.velocity.normalize();const o=45+Math.random()*45,l=520;e.start.copy(r).addScaledVector(e.velocity,-l),e.velocity.multiplyScalar(o),e.duration=l*2/o,e.life=0,e.axis.set(Ge(Math.random),Ge(Math.random),Ge(Math.random)).normalize(),e.spin=(.4+Math.random()*.9)*(Math.random()<.5?-1:1);const c=.9+Math.random()*1.6;this.flyBy.scale.set(c*1.25,c*.8,c),e.active=!0,this.flyBy.visible=!0}updateFlyBy(t,e){const i=this.flyState;if(!i.active){if(this.reduced||!e)return;i.wait-=t,i.wait<=0&&this.launchFlyBy(e);return}i.life+=t,this.flyBy.position.copy(i.start).addScaledVector(i.velocity,i.life),this.flyBy.quaternion.setFromAxisAngle(i.axis,i.spin*i.life),i.life>=i.duration&&(i.active=!1,this.flyBy.visible=!1,i.wait=20+Math.random()*20)}update(t,e,i){this.uniforms.uYears.value=i.years-this.epoch,this.uniforms.uTime.value=t,i.camera&&(Zh(this.system.renderer,i.camera),this.updateBeltField(i));const n=i.camera?this.cameraPosition.setFromMatrixPosition(i.camera.matrixWorld):null;this.updateDrifters(t,n),this.updateFlyBy(e,i.camera)}dispose(){this.beltGroup.removeFromParent(),this.nearGroup.removeFromParent();for(const t of this.disposables)t.dispose?.();for(const t of this.nearMeshes)t.dispose();this.system.belts===this&&(this.system.belts=null)}}const Qr=Math.PI/180,B2=Date.UTC(2e3,0,1,12),k2=365.25*86400*1e3;function z2(s){return(s-B2)/k2}function V2(s,t){let e=t<.8?s:Math.PI;for(let i=0;i<8;i++){const n=(e-t*Math.sin(e)-s)/(1-t*Math.cos(e));if(e-=n,Math.abs(n)<1e-7)break}return e}function za(s,t,e){const{a:i,e:n,i:r,node:a,peri:o,L0:l,period:c}=s,f=(l+360*t/c)*Qr-o*Qr,h=V2(Math.atan2(Math.sin(f),Math.cos(f)),n),d=i*(Math.cos(h)-n),p=i*Math.sqrt(1-n*n)*Math.sin(h),v=(o-a)*Qr,g=a*Qr,m=r*Qr,M=Math.cos(v),b=Math.sin(v),_=Math.cos(g),S=Math.sin(g),y=Math.cos(m),T=Math.sin(m),x=d*M-p*b,E=d*b+p*M,C=x*_-E*y*S,F=x*S+E*y*_,I=E*T;return e.set(C,I,-F)}function G2(s){if(!s)return 0;const t=Math.abs(s)/24*Gw;return Math.sign(s)*Rt(t,8,600)}const _a=Math.PI/180;function Cp(s,t,e){e.set(0,0,0);for(let i=s.object3D;i&&i!==t;i=i.parent)e.add(i.position);return e}const Va=(s,t,e)=>{const i=Rt((e-s)/(t-s),0,1);return i*i*(3-2*i)},H2=`
  uniform vec3 uHead;
  uniform vec3 uTail;
  uniform float uWidth;
  uniform float uGlow;
  uniform vec2 uViewport;
  attribute vec2 aCorner;
  varying vec2 vPx;
  varying float vLength;
  varying float vVisible;
  void main() {
    vec4 head = projectionMatrix * viewMatrix * vec4(cameraPosition + uHead, 1.0);
    vec4 tail = projectionMatrix * viewMatrix * vec4(cameraPosition + uTail, 1.0);
    vVisible = step(0.0, head.w) * step(0.0, tail.w);
    vec2 halfView = uViewport * 0.5;
    vec2 hs = head.xy / head.w * halfView;
    vec2 ts = tail.xy / tail.w * halfView;
    vec2 dir = hs - ts;
    float len = length(dir);
    dir = len > 1e-3 ? dir / len : vec2(1.0, 0.0);
    vec2 normal = vec2(-dir.y, dir.x);
    vec4 base = aCorner.x > 0.5 ? head : tail;
    float along = aCorner.x > 0.5 ? uGlow : -uGlow * 0.2;
    vec2 offset = dir * along + normal * aCorner.y * uGlow;
    base.xy += offset / halfView * base.w;
    vPx = vec2(aCorner.x > 0.5 ? along : -len + along, aCorner.y * uGlow);
    vLength = len;
    gl_Position = base;
  }
`,W2=`
  uniform vec3 uColor;
  uniform vec3 uHeadColor;
  uniform float uAlpha;
  uniform float uWidth;
  uniform float uGlow;
  varying vec2 vPx;
  varying float vLength;
  varying float vVisible;
  void main() {
    float t = clamp(1.0 + vPx.x / max(vLength, 1.0), 0.0, 1.0);
    float width = mix(uWidth * 0.25, uWidth, t);
    float across = clamp(1.0 - abs(vPx.y) / width, 0.0, 1.0);
    float body = pow(t, 2.4) * across * across * step(vPx.x, 0.0);
    float d = length(vPx) / uGlow;
    float head = exp(-d * d * 9.0) + 0.35 * exp(-d * d * 2.5);
    float alpha = (body * 0.85 + head) * uAlpha * vVisible;
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(mix(uColor, uHeadColor, clamp(head * 1.4, 0.0, 1.0)), alpha);
    #include <colorspace_fragment>
  }
`;function X2(){const s=new ce;return s.setAttribute("position",new Wt(new Float32Array(12),3)),s.setAttribute("aCorner",new Wt(new Float32Array([0,-1,0,1,1,-1,1,1]),2)),s.setIndex([0,2,1,1,2,3]),s}const q2=9e3;class Y2{constructor(t){P(this,"active",!1);P(this,"start",new A);P(this,"axis",new A);this.uniforms={uHead:{value:new A},uTail:{value:new A},uWidth:{value:2},uGlow:{value:7},uAlpha:{value:0},uColor:{value:new Ct("#9cc7ff")},uHeadColor:{value:new Ct("#ffffff")},uViewport:ki.uViewport},this.mesh=new ae(t,new he({uniforms:this.uniforms,vertexShader:H2,fragmentShader:W2,transparent:!0,depthWrite:!1,blending:Ke})),this.mesh.frustumCulled=!1,this.mesh.visible=!1,this.mesh.renderOrder=1}launch(t,e){this.start.set(e()*1.6-.8,e()*1.3-.5,.5).unproject(t).sub(t.position).normalize();const i=(10+e()*45)*_a,n=this.axis.set((e()<.5?-1:1)*Math.cos(i),-Math.sin(i),0);n.transformDirection(t.matrixWorld),this.axis.crossVectors(this.start,n).normalize(),this.life=0,this.duration=.5+e()*.7,this.sweep=(7+e()*12)*_a,this.tailLag=this.duration*(.25+e()*.2),this.brightness=.55+e()*.45,this.uniforms.uWidth.value=(1.3+e()*1.4)*ki.uPixelRatio.value,this.uniforms.uGlow.value=(4+e()*4)*ki.uPixelRatio.value,this.uniforms.uColor.value.set(e()<.25?"#ffd9a8":"#9cc7ff"),this.active=!0,this.mesh.visible=!0}directionAt(t,e){const i=Rt(t,0,this.duration)/this.duration*this.sweep;return e.copy(this.start).applyAxisAngle(this.axis,i).multiplyScalar(q2)}eased(t){return this.duration*(t/this.duration)**1.4}update(t){if(!this.active)return;this.life+=t;const{life:e,duration:i}=this;this.directionAt(this.eased(e),this.uniforms.uHead.value),this.directionAt(this.eased(Math.max(0,e-this.tailLag)),this.uniforms.uTail.value);const n=Va(0,.12,e),r=1-Va(i*.6,i,e);this.uniforms.uAlpha.value=n*r*this.brightness,e>=i&&(this.active=!1,this.mesh.visible=!1)}}const $2=`
  uniform vec3 uBox;
  uniform vec3 uOrigin;
  uniform vec3 uLayerAlpha;
  uniform vec3 uVelocity;
  uniform float uStreak;
  uniform float uWidth;
  uniform vec2 uViewport;
  attribute vec4 aSeed;
  attribute vec3 aCorner;
  varying vec2 vCorner;
  varying float vAlpha;
  void main() {
    float box = aSeed.w < 0.5 ? uBox.x : (aSeed.w < 1.5 ? uBox.y : uBox.z);
    float layer = aSeed.w < 0.5 ? uLayerAlpha.x : (aSeed.w < 1.5 ? uLayerAlpha.y : uLayerAlpha.z);
    vec3 rel = mod(aSeed.xyz * box + uOrigin - cameraPosition + 0.5 * box, box) - 0.5 * box;
    vec3 world = cameraPosition + rel;
    vec3 travel = uVelocity * uStreak;
    float maxTravel = box * 0.18;
    float travelLength = length(travel);
    if (travelLength > maxTravel) travel *= maxTravel / travelLength;
    vec4 head = projectionMatrix * viewMatrix * vec4(world, 1.0);
    vec4 tail = projectionMatrix * viewMatrix * vec4(world + travel, 1.0);
    if (tail.w < 0.01) tail = head;
    vec2 halfView = uViewport * 0.5;
    vec2 dir = head.xy / max(head.w, 1e-3) * halfView - tail.xy / max(tail.w, 1e-3) * halfView;
    float len = length(dir);
    dir = len > 1e-3 ? dir / len : vec2(1.0, 0.0);
    vec2 normal = vec2(-dir.y, dir.x);
    vec4 base = aCorner.x > 0.5 ? head : tail;
    vec2 offset = normal * aCorner.y * uWidth + dir * (aCorner.x > 0.5 ? uWidth : -uWidth);
    base.xy += offset / halfView * base.w;
    float r = length(rel) / box;
    float edge = max(max(abs(rel.x), abs(rel.y)), abs(rel.z)) / box;
    vAlpha = layer * aCorner.z * (1.0 - smoothstep(0.36, 0.5, edge)) * smoothstep(0.015, 0.07, r) * step(0.0, head.w);
    vCorner = aCorner.xy;
    gl_Position = base;
  }
`,K2=`
  uniform vec3 uColor;
  varying vec2 vCorner;
  varying float vAlpha;
  void main() {
    float across = 1.0 - abs(vCorner.y);
    float alpha = vAlpha * across * mix(0.25, 1.0, vCorner.x);
    if (alpha < 0.003) discard;
    gl_FragColor = vec4(uColor, alpha);
    #include <colorspace_fragment>
  }
`,Ln=[{box:26,share:.42},{box:260,share:.33},{box:2600,share:.25}];function zc(s,t){const e=s/t;return Va(.05,.45,e)*(1-Va(4,12,e))*.8}function Z2(s,t,e){const i=new Float32Array(s*4*4),n=new Float32Array(s*4*3),r=new Uint16Array(s*6);let a=0,o=Math.round(s*Ln[0].share);for(let f=0;f<s;f++){f>=o&&a<Ln.length-1&&(a++,o+=Math.round(s*Ln[a].share));const h=t(),d=t(),p=t(),v=.35+t()*.65;for(let m=0;m<4;m++)i.set([h,d,p,a],(f*4+m)*4),n.set([m>>1,m&1?1:-1,v],(f*4+m)*3);const g=f*4;r.set([g,g+2,g+1,g+1,g+2,g+3],f*6)}const l=new ce;l.setAttribute("position",new Wt(new Float32Array(s*4*3),3)),l.setAttribute("aSeed",new Wt(i,4)),l.setAttribute("aCorner",new Wt(n,3)),l.setIndex(new Wt(r,1));const c=new he({uniforms:e,vertexShader:$2,fragmentShader:K2,transparent:!0,depthWrite:!1,blending:Ke}),u=new ae(l,c);return u.frustumCulled=!1,u.renderOrder=4,u}const Pp=900,jr=.86,Rp=16;class J2{constructor(t){P(this,"group",new Ee);this.system=t,this.reduced=t.reduced,t.effects=this,this.random=hi((Date.now()&65535)+99),this.tmp=new A,this.tmp2=new A,this.group.name="space-effects",t.group.add(this.group),this.buildShootingStars(),this.buildDust(t.coarse?420:520),this.buildComet(t)}buildShootingStars(){this.streakGeometry=X2(),this.stars=[0,1,2].map(()=>new Y2(this.streakGeometry));for(const t of this.stars)this.group.add(t.mesh);this.nextStar=2+this.random()*3,this.cameraRest=0}buildDust(t){this.dustUniforms={uBox:{value:new A(...Ln.map(e=>e.box))},uOrigin:{value:new A},uLayerAlpha:{value:new A},uVelocity:{value:new A},uStreak:{value:.07},uWidth:{value:1},uColor:{value:new Ct("#cfe0ff")},uViewport:ki.uViewport},this.dust=Z2(t,hi(4242),this.dustUniforms),this.dust.name="space-dust",this.group.add(this.dust),this.cameraVelocity=new A,this.velocity=new A,this.lastCamera=null,this.cameraSpeed=0,this.reference={body:null,position:new A,last:new A}}buildComet(t){const e=this.tmp.copy(t.frame.position).negate(),i=Math.atan2(-e.z,e.x)/_a,r=-Math.acos((1-420/Pp)/jr),a=r-jr*Math.sin(r),o=2*Math.atan(Math.sqrt((1+jr)/(1-jr))*Math.tan(r/2)),l=i+70-o/_a;this.cometOrbit={a:Pp,e:jr,i:24,node:l-60,peri:l,L0:a/_a+l-360*t.years/Rp,period:Rp},this.comet=new Ee,this.comet.name="comet",t.frame.add(this.comet),this.nucleusGeometry=aa({seed:2025,detail:4,smooth:!0,lumps:.5,craters:4}),this.nucleus=new ae(this.nucleusGeometry,new Xa({color:"#6d665e",vertexColors:!0,roughness:1})),this.nucleus.scale.set(.7,.45,.5),this.comet.add(this.nucleus),this.ionTail=new rh(14,{color:"#a9d2ff",colorTail:"#2f6bff",opacity:.75,widthHead:1.5,widthTail:14,minPx:1.4,energyFloor:.2,fade:1.25,headFade:.02,streaks:.9}),this.dustTail=new rh(22,{color:"#fff3dc",colorTail:"#ffcf8a",opacity:.5,widthHead:3,widthTail:60,minPx:2,energyFloor:.2,fade:1.6,headFade:.03,streaks:.35}),this.comet.add(this.ionTail.mesh,this.dustTail.mesh),this.coma=new og(3,{minPx:2.5,maxPx:420,lift:1.2}),this.coma.define(0,{color:"#7fc4ff",size:18,intensity:.5}),this.coma.define(1,{color:"#d9f1ff",size:5,intensity:.9}),this.coma.define(2,{color:"#ffffff",size:1.2,intensity:1}),this.comet.add(this.coma.points),this.cometPosition=new A,this.cometVelocity=new A,this.antiSun=new A}updateComet(t,e){const i=za(this.cometOrbit,t,this.cometPosition);za(this.cometOrbit,t+.002,this.cometVelocity).sub(i).normalize();const n=i.length(),r=this.antiSun.copy(i).divideScalar(n),a=Va(950,170,n);this.comet.position.copy(i),this.nucleus.rotation.set(e*.11,e*.07,0);const o=this.ionTail,l=12+320*a;for(let d=0;d<o.count;d++){const p=d/(o.count-1)*l;o.points[d*3]=r.x*p,o.points[d*3+1]=r.y*p,o.points[d*3+2]=r.z*p}o.commit(),o.material.uniforms.uOpacity.value=.15+.7*a,o.material.uniforms.uWidthTail.value=6+18*a,o.material.uniforms.uTime.value=e;const c=this.dustTail,u=10+210*a,f=this.cometVelocity;for(let d=0;d<c.count;d++){const p=d/(c.count-1),v=p*u,g=.42*u*p*p;c.points[d*3]=r.x*v-f.x*g,c.points[d*3+1]=r.y*v-f.y*g,c.points[d*3+2]=r.z*v-f.z*g}c.commit(),c.material.uniforms.uOpacity.value=.12+.45*a,c.material.uniforms.uWidthTail.value=12+60*a,c.material.uniforms.uTime.value=e;const h=this.coma;h.sizes[0]=7+30*a,h.sizes[1]=2.5+6*a,h.intensities[0]=.25+.5*a,h.intensities[1]=.5+.5*a,h.points.geometry.attributes.aSize.needsUpdate=!0,h.commit()}updateReference(t){const{system:e}=this,i=this.reference;let n=e.focus?.object3D?e.focus:null;if(n)n.object3D.getWorldPosition(i.position);else{n=e.sun;let r=1/0;for(const a of e.bodies){const l=(Cp(a,e.group,this.tmp2).distanceTo(t)-a.radius)/(a.radius+8);l<r&&(r=l,n=a)}Cp(n,e.group,i.position)}n!==i.body&&(i.body=n,i.last.copy(i.position))}updateDust(t,e){const i=this.tmp.setFromMatrixPosition(e.matrixWorld);this.updateReference(i);const n=this.reference,r=this.tmp2.subVectors(n.position,n.last);n.last.copy(n.position);const a=this.dustUniforms.uOrigin.value;a.add(r);const o=Ln[Ln.length-1].box;if(a.set(a.x%o,a.y%o,a.z%o),this.lastCamera&&t>0){const u=this.velocity.subVectors(i,this.lastCamera).sub(r),f=Math.max(200,.5*i.distanceTo(n.position));u.length()>f?this.cameraVelocity.set(0,0,0):this.cameraVelocity.lerp(u.divideScalar(t),1-Math.exp(-10*t))}this.lastCamera=(this.lastCamera??new A).copy(i);const l=this.cameraVelocity.length();this.cameraSpeed=l;const c=this.dustUniforms.uLayerAlpha.value;c.set(zc(l,Ln[0].box),zc(l,Ln[1].box),zc(l,Ln[2].box)),this.dust.visible=c.x+c.y+c.z>.01,this.dustUniforms.uVelocity.value.copy(this.cameraVelocity),this.dustUniforms.uWidth.value=.9*ki.uPixelRatio.value}updateShootingStars(t,e){for(const a of this.stars)a.update(t);if(this.reduced)return;const i=e.position.length()<60;this.cameraRest=this.cameraSpeed<.3?this.cameraRest+t:0;const n=i&&this.cameraRest>2;if(this.nextStar-=t,this.nextStar>0)return;let r=null;for(const a of this.stars)a.active||(r=a);r&&(e.updateMatrixWorld(),r.launch(e,this.random)),this.nextStar=n?1.5+this.random()*2:3+this.random()*3}update(t,e,i){const n=i.camera;n&&Zh(this.system.renderer,n),this.updateComet(i.years,t),n&&(this.updateDust(e,n),this.updateShootingStars(e,n))}dispose(){this.group.removeFromParent(),this.comet.removeFromParent();for(const t of this.stars)t.mesh.material.dispose();this.streakGeometry.dispose(),this.dust.geometry.dispose(),this.dust.material.dispose(),this.nucleusGeometry.dispose(),this.nucleus.material.dispose(),this.ionTail.dispose(),this.dustTail.dispose(),this.coma.dispose(),this.system.effects===this&&(this.system.effects=null)}}const ug=`
  float hash13(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
  }

  vec3 hash33(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.xxy + p.yxx) * p.zyx);
  }
`,hg=`
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  // 3D simplex noise in [-1, 1].
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
      i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
      i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`,Q2=`
  ${ug}
  ${hg}

  // Smoothstep that also accepts reversed edges (GLSL's is undefined then).
  float sstep(float a, float b, float x) {
    float t = clamp((x - a) / (b - a), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }

  // 1 inside [a, b], easing over +-soft at both edges.
  float band(float x, float a, float b, float soft) {
    return sstep(a - soft, a + soft, x) * (1.0 - sstep(b - soft, b + soft, x));
  }

  // Fractal sum of simplex octaves, roughly in [-1, 1].
  float fbm(vec3 p, int octaves) {
    float sum = 0.0;
    float amp = 0.5;
    float norm = 0.0;
    for (int i = 0; i < 9; i++) {
      if (i >= octaves) break;
      sum += amp * snoise(p);
      norm += amp;
      p = p * 2.02 + vec3(13.7, 7.1, 3.3);
      amp *= 0.5;
    }
    return sum / norm;
  }

  // Ridged multifractal in [0, 1]: sharp crests where the noise crosses zero.
  float ridged(vec3 p, int octaves) {
    float sum = 0.0;
    float amp = 0.5;
    float norm = 0.0;
    float weight = 1.0;
    for (int i = 0; i < 8; i++) {
      if (i >= octaves) break;
      float n = 1.0 - abs(snoise(p));
      n *= n * weight;
      weight = clamp(n * 1.6, 0.0, 1.0);
      sum += n * amp;
      norm += amp;
      p = p * 2.03 + vec3(5.3, 1.9, 8.4);
      amp *= 0.5;
    }
    return sum / norm;
  }

  vec3 warp3(vec3 p, float frequency, float amount) {
    vec3 q = p * frequency;
    return p + amount * vec3(fbm(q + 1.7, 4), fbm(q + 9.2, 4), fbm(q + 4.4, 4));
  }

  // 3D Worley noise: (F1, F2, random id of the nearest cell).
  vec3 worley(vec3 p) {
    vec3 cell = floor(p);
    vec3 f = p - cell;
    float f1 = 9.0;
    float f2 = 9.0;
    float id = 0.0;
    for (int z = -1; z <= 1; z++)
    for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec3 o = vec3(float(x), float(y), float(z));
      vec3 h = hash33(cell + o);
      vec3 d = o + h - f;
      float dd = dot(d, d);
      if (dd < f1) {
        f2 = f1;
        f1 = dd;
        id = h.z;
      } else if (dd < f2) {
        f2 = dd;
      }
    }
    return vec3(sqrt(f1), sqrt(f2), id);
  }
`,j2=`
  #define PI 3.141592653589793
  #define TAU 6.283185307179586

  vec3 dirFrom(float latDeg, float lonDeg) {
    float lat = radians(latDeg);
    float lon = radians(lonDeg);
    return vec3(cos(lat) * sin(lon), sin(lat), cos(lat) * cos(lon));
  }

  float latDeg(vec3 p) { return degrees(asin(clamp(p.y, -1.0, 1.0))); }
  float lonDeg(vec3 p) { return degrees(atan(p.x, p.z)); }
  float angleTo(vec3 p, vec3 c) { return acos(clamp(dot(p, c), -1.0, 1.0)); }

  // Azimuthal-equidistant coordinates of p around c, in radians (x east, y north).
  vec2 tangentCoords(vec3 p, vec3 c) {
    vec3 east = normalize(cross(vec3(0.0, 1.0, 0.0), c));
    vec3 north = cross(c, east);
    vec2 t = vec2(dot(p, east), dot(p, north));
    float len = length(t);
    return len > 1e-6 ? t / len * angleTo(p, c) : vec2(0.0);
  }

  vec3 rotateAround(vec3 p, vec3 k, float a) {
    float c = cos(a);
    float s = sin(a);
    return p * c + cross(k, p) * s + k * dot(k, p) * (1.0 - c);
  }

  // Height of a crater at normalised distance d (1 = rim): bowl, raised rim, ejecta.
  float craterProfile(float d) {
    float bowl = d < 1.0 ? max(d * d - 1.0, -0.8) : 0.0;
    float rim = exp(-pow((d - 1.0) * 3.2, 2.0)) * 0.42;
    float ejecta = d > 1.0 ? 0.1 * exp(-(d - 1.0) * 2.5) : 0.0;
    return (bowl + rim + ejecta) * (1.0 - sstep(1.7, 2.2, d));
  }

  // A field of craters about 1/scale radians apart; density = share of cells
  // holding one. Returns height in radii; fresh collects bright young ejecta.
  float craterField(vec3 p, float scale, float density, float seed, inout float fresh) {
    vec3 q = p * scale;
    vec3 cell = floor(q);
    float h = 0.0;
    for (int z = -1; z <= 1; z++)
    for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec3 id = cell + vec3(float(x), float(y), float(z));
      vec3 r = hash33(id + seed * 7.31);
      if (r.x > density) continue;
      vec3 c = id + hash33(id + seed * 3.17 + 11.0);
      // the crater is where a ball around c cuts the sphere surface
      float dr = length(c) - scale;
      float size = 0.2 + 0.25 * r.y * r.y;
      float rs2 = size * size - dr * dr;
      if (rs2 <= 0.0) continue;
      vec3 delta = q - c;
      float d = sqrt(max(dot(delta, delta) - dr * dr, 0.0) / rs2);
      if (d > 2.2) continue;
      h += craterProfile(d) * sqrt(rs2);
      if (r.z > 0.88) fresh = max(fresh, 1.0 - sstep(0.6, 2.1, d));
    }
    return h / scale;
  }

  // Bright ray system around a young crater at c (radius and reach in radians).
  float craterRays(vec3 p, vec3 c, float radius, float reach, float seed) {
    float cosA = dot(p, c);
    if (cosA < 0.0) return 0.0;
    vec2 t = tangentCoords(p, c);
    float dist = length(t);
    float az = atan(t.y, t.x);
    vec2 ring = vec2(cos(az), sin(az));
    float streak = pow(max(snoise(vec3(ring * 7.0, seed)), 0.0), 1.4);
    streak += 0.6 * pow(max(snoise(vec3(ring * 19.0, seed + 5.0)), 0.0), 2.0);
    float fall = exp(-dist / reach) * sstep(radius * 0.9, radius * 1.8, dist);
    float halo = exp(-pow((dist - radius * 1.2) / radius, 2.0)) * 0.7;
    return clamp(streak * fall + halo, 0.0, 1.0);
  }

  float basin(vec3 p, float latDegC, float lonDegC, float radius) {
    return 1.0 - sstep(radius * 0.72, radius * 1.05, angleTo(p, dirFrom(latDegC, lonDegC)));
  }
`,t3=`
  float mare(vec3 p, float latDegC, float lonDegC, float radius) {
    return 1.0 - sstep(radius * 0.55, radius * 1.1, angleTo(p, dirFrom(latDegC, lonDegC)));
  }

  void surface(vec3 p, out vec3 col, out float h) {
    vec3 wp = warp3(p, 2.2, 0.06);
    // maria: ancient lava-filled basins, almost all on the near side (+z)
    float m = mare(wp, 33.0, -16.0, 0.34);
    m = max(m, mare(wp, 28.0, 17.0, 0.21));
    m = max(m, mare(wp, 8.5, 31.0, 0.26));
    m = max(m, mare(wp, 17.0, 59.0, 0.15));
    m = max(m, mare(wp, -7.0, 51.0, 0.18));
    m = max(m, mare(wp, -15.0, 35.0, 0.11));
    m = max(m, mare(wp, -21.0, -17.0, 0.2));
    m = max(m, mare(wp, -24.0, -39.0, 0.11));
    m = max(m, mare(wp, 56.0, 0.0, 0.11));
    m = max(m, mare(wp, 54.0, -28.0, 0.1));
    m = max(m, mare(wp, 1.0, -15.0, 0.13));
    m = max(m, mare(wp, 27.0, 147.0, 0.07));
    m = max(m, mare(wp, -35.0, 162.0, 0.07));
    m = max(m, mare(wp, 12.0, -55.0, 0.48) * sstep(-0.35, 0.1, fbm(p * 2.0 + 3.0, 4) + 0.12));
    m = clamp(m, 0.0, 1.0);

    float fresh = 0.0;
    float older = 1.0 - m * 0.85;
    h = craterField(p, 3.5, 0.3, 11.0, fresh) * 0.22 * older;
    h += craterField(p, 8.0, 0.5, 12.0, fresh) * 0.28 * older;
    h += craterField(p, 18.0, 0.6, 13.0, fresh) * 0.3 * (1.0 - m * 0.6);
    h += craterField(p, 40.0, 0.65, 14.0, fresh) * 0.3;
    h += craterField(p, 90.0, 0.7, 15.0, fresh) * 0.26;
    h += fbm(p * 6.0, 5) * 0.006 - m * 0.006;

    vec3 highland = mix(vec3(0.58, 0.57, 0.55), vec3(0.73, 0.72, 0.69), 0.5 + 0.5 * fbm(p * 4.0 + 2.0, 5));
    vec3 mareCol = mix(vec3(0.36, 0.36, 0.37), vec3(0.47, 0.46, 0.44), 0.5 + 0.5 * fbm(p * 7.0, 4));
    col = mix(highland, mareCol, m);
    float rays = craterRays(p, dirFrom(-43.3, -11.2), 0.05, 0.5, 1.0);
    rays = max(rays, craterRays(p, dirFrom(9.6, -20.1), 0.05, 0.22, 2.0) * 0.8);
    rays = max(rays, craterRays(p, dirFrom(8.1, -38.0), 0.02, 0.14, 3.0) * 0.6);
    rays = max(rays, fresh * 0.45);
    col = mix(col, vec3(0.86, 0.86, 0.84), rays * 0.45);
  }
`,e3=`
  void surface(vec3 p, out vec3 col, out float h) {
    float plains = sstep(0.05, 0.3, fbm(p * 1.8 + 4.0, 5));
    float fresh = 0.0;
    float young = 1.0 - plains * 0.6;
    h = craterField(p, 3.0, 0.5, 1.0, fresh) * 0.38;
    h += craterField(p, 7.0, 0.6, 2.0, fresh) * 0.38;
    h += craterField(p, 16.0, 0.65, 3.0, fresh) * 0.36 * young;
    h += craterField(p, 36.0, 0.7, 4.0, fresh) * 0.34 * young;
    h += craterField(p, 80.0, 0.7, 5.0, fresh) * 0.3;
    h += fbm(p * 6.0, 4) * 0.006;
    // Caloris basin
    float a = angleTo(p, dirFrom(30.0, -160.0)) / 0.6;
    h += -0.012 * (1.0 - sstep(0.85, 1.05, a)) + exp(-pow((a - 1.0) * 7.0, 2.0)) * 0.014;

    float tone = 0.5 + 0.5 * fbm(p * 3.0 + 9.0, 5);
    col = mix(vec3(0.4, 0.38, 0.36), vec3(0.6, 0.57, 0.53), tone);
    col = mix(col, vec3(0.5, 0.47, 0.42), plains * 0.5);
    col = mix(col, vec3(0.6, 0.56, 0.5), (1.0 - sstep(0.8, 1.05, a)) * 0.25);
    float rays = craterRays(p, dirFrom(-3.0, 60.0), 0.03, 0.25, 4.0);
    rays = max(rays, craterRays(p, dirFrom(-36.0, -140.0), 0.03, 0.2, 5.0) * 0.8);
    col = mix(col, vec3(0.8, 0.78, 0.74), max(rays, fresh * 0.35) * 0.45);
  }
`,i3=`
  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    float lat = latDeg(p);
    float lon = atan(p.x, p.z);
    vec3 q = warp3(p, 1.6, 0.16);
    // the cloud deck streams east-west: noise stretched along latitude
    float streaks = fbm(vec3(q.x * 1.1, q.y * 9.0, q.z * 1.1), 6);
    float swirl = fbm(q * 3.2 + streaks * 1.4, 4);
    float t = sstep(-0.6, 0.6, streaks * 0.75 + swirl * 0.3);
    col = mix(vec3(0.85, 0.74, 0.54), vec3(0.97, 0.92, 0.8), t);
    col *= 0.97 + 0.05 * fbm(vec3(q.x * 3.0, q.y * 28.0, q.z * 3.0), 3);
    // the dark sideways "Y" of the upper clouds
    float lonRel = atan(sin(lon - 0.6), cos(lon - 0.6));
    float arm = abs(abs(radians(lat)) - 0.5 * max(lonRel + 0.4, 0.0));
    float chevron = exp(-pow(arm / 0.14, 2.0)) * band(lonRel, -1.3, 1.4, 0.4);
    col *= 1.0 - chevron * 0.12 * (0.6 + 0.4 * swirl);
    // bright polar collars
    col = mix(col, vec3(0.97, 0.94, 0.87), sstep(52.0, 78.0, abs(lat)) * 0.5);
  }
`,n3=`
  void surface(vec3 p, out vec3 col, out float h) {
    float lat = latDeg(p);
    float lon = lonDeg(p);
    vec3 wp = warp3(p, 2.0, 0.22);
    float southBias = 0.24 * exp(-pow((lat + 22.0) / 24.0, 2.0)) - 0.13;
    float dark = sstep(-0.02, 0.3, fbm(wp * 1.4, 5) + southBias) * (0.85 + 0.15 * fbm(p * 9.0, 3));
    dark = max(dark, basin(wp, 9.0, 69.0, 0.2) * 0.9);   // Syrtis Major
    dark = max(dark, basin(wp, 47.0, -30.0, 0.22) * 0.7); // Acidalia
    float hellas = 1.0 - sstep(0.22, 0.34, angleTo(p, dirFrom(-42.0, 70.0)));
    float argyre = 1.0 - sstep(0.1, 0.17, angleTo(p, dirFrom(-50.0, -43.0)));
    float tharsis = exp(-pow(angleTo(p, dirFrom(2.0, -105.0)) / 0.45, 2.0));
    dark *= (1.0 - hellas) * (1.0 - argyre * 0.8) * (1.0 - tharsis * 0.85);

    // Olympus Mons and the three Tharsis volcanoes
    float volcano = exp(-pow(angleTo(p, dirFrom(18.6, -134.0)) / 0.075, 2.0));
    volcano += 0.6 * exp(-pow(angleTo(p, dirFrom(-8.0, -121.0)) / 0.05, 2.0));
    volcano += 0.6 * exp(-pow(angleTo(p, dirFrom(1.0, -113.0)) / 0.05, 2.0));
    volcano += 0.6 * exp(-pow(angleTo(p, dirFrom(12.0, -104.0)) / 0.05, 2.0));

    // Valles Marineris: a long scar east of Tharsis, widest in the middle
    float along = radians(lon + 72.0);
    float wiggle = 0.035 * sin(along * 7.0) + 0.02 * fbm(p * 12.0, 3);
    float off = abs(radians(lat + 9.0) + along * 0.07 - wiggle);
    float width = 0.016 + 0.022 * exp(-pow((along + 0.15) / 0.3, 2.0));
    float valles = (1.0 - sstep(width * 0.35, width, off)) * band(along, -0.75, 0.75, 0.12);
    float branches = sstep(0.82, 0.95, ridged(p * 9.0 + 3.0, 3)) * exp(-pow(off / 0.09, 2.0)) * band(along, -0.6, 0.6, 0.2);
    float canyon = max(valles, branches * 0.6);

    float capEdge = 0.035 * fbm(p * 7.0, 4);
    float capN = sstep(71.0, 75.0, lat + capEdge * 57.0);
    float capS = sstep(74.0, 78.0, -lat + capEdge * 57.0);
    float troughs = sstep(0.6, 0.85, ridged(p * 7.0 + 2.0, 3)) * 0.35;

    float fresh = 0.0;
    float highlands = sstep(10.0, -25.0, lat + 18.0 * sin(radians(lon)));
    // from orbit Mars is its albedo markings; craters only roughen the highlands
    float craters = craterField(p, 6.0, 0.3, 21.0, fresh) * 0.1;
    craters += craterField(p, 14.0, 0.45, 22.0, fresh) * 0.11;
    craters += craterField(p, 32.0, 0.55, 23.0, fresh) * 0.1;
    h = craters * (0.15 + 0.85 * highlands) + tharsis * 0.012 + volcano * 0.02 - canyon * 0.014;
    h += -hellas * 0.01 + fbm(p * 5.0, 5) * 0.006;

    vec3 bright = vec3(0.82, 0.55, 0.35);
    vec3 rust = vec3(0.69, 0.37, 0.21);
    vec3 darkCol = vec3(0.37, 0.24, 0.17);
    col = mix(bright, rust, sstep(-0.35, 0.35, fbm(p * 4.0 + 2.0, 5)));
    col = mix(col, darkCol, dark * 0.9);
    // bright dust streaks trailing off craters
    col = mix(col, bright * 1.04, fresh * 0.25);
    col = mix(col, vec3(0.86, 0.62, 0.43), hellas * 0.5 + argyre * 0.3);
    col = mix(col, vec3(0.5, 0.27, 0.17), canyon * 0.85);
    vec3 ice = vec3(0.94, 0.93, 0.91) * (1.0 - troughs);
    col = mix(col, ice, max(capN, capS));
  }
`,s3=`
  void surface(vec3 p, out vec3 col, out float h) {
    float fresh = 0.0;
    h = craterField(p, 4.0, 0.5, 31.0, fresh) * 0.4;
    h += craterField(p, 9.0, 0.55, 32.0, fresh) * 0.38;
    h += craterField(p, 20.0, 0.6, 33.0, fresh) * 0.36;
    h += craterField(p, 45.0, 0.65, 34.0, fresh) * 0.3;
    h += fbm(p * 5.0, 4) * 0.01;
    // Occator crater and its salt faculae
    vec3 occator = dirFrom(19.8, -120.7);
    float a = angleTo(p, occator);
    h += craterProfile(a / 0.075) * 0.018;
    vec2 t = tangentCoords(p, occator);
    float salt = exp(-dot(t, t) / (0.015 * 0.015));
    salt += 0.7 * exp(-dot(t - vec2(0.03, 0.012), t - vec2(0.03, 0.012)) / (0.008 * 0.008));
    salt += 0.5 * exp(-dot(t - vec2(0.04, -0.01), t - vec2(0.04, -0.01)) / (0.006 * 0.006));
    salt += 0.6 * exp(-pow(angleTo(p, dirFrom(42.2, 0.4)) / 0.012, 2.0));
    salt += 0.4 * exp(-pow(angleTo(p, dirFrom(-22.0, 100.0)) / 0.01, 2.0));
    col = mix(vec3(0.32, 0.31, 0.3), vec3(0.45, 0.44, 0.42), 0.5 + 0.5 * fbm(p * 3.0, 5));
    col = mix(col, vec3(0.55, 0.54, 0.52), fresh * 0.3);
    col = mix(col, vec3(0.97, 0.97, 0.95), clamp(salt, 0.0, 1.0));
  }
`,r3=`
  vec3 jupiterBands(float l) {
    vec3 zone = vec3(0.92, 0.88, 0.79);
    vec3 equator = vec3(0.9, 0.82, 0.68);
    vec3 neb = vec3(0.6, 0.4, 0.28);
    vec3 seb = vec3(0.64, 0.45, 0.32);
    vec3 temperate = vec3(0.72, 0.58, 0.45);
    vec3 polar = vec3(0.5, 0.48, 0.47);
    vec3 c = zone;
    c = mix(c, equator, band(l, -6.0, 6.0, 1.5));
    c = mix(c, neb, band(l, 7.0, 18.0, 1.3));
    c = mix(c, seb, band(l, -19.5, -8.0, 1.3));
    c = mix(c, temperate, band(l, 24.0, 31.0, 1.6) * 0.8);
    c = mix(c, temperate, band(l, -34.0, -27.0, 1.6) * 0.7);
    c = mix(c, temperate * 0.96, band(l, 36.0, 42.0, 2.0) * 0.6);
    c = mix(c, temperate * 0.96, band(l, -45.0, -39.0, 2.0) * 0.5);
    c = mix(c, polar, sstep(42.0, 64.0, abs(l)) * 0.85);
    return c;
  }

  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    vec3 spotDir = dirFrom(-22.0, 30.0);
    vec2 g = tangentCoords(p, spotDir) / vec2(0.16, 0.1);
    float gr = length(g);
    // the Great Red Spot is an anticyclone: swirl the sampling point around it
    vec3 q = rotateAround(p, spotDir, 2.6 * exp(-gr * gr * 1.1));
    // generic eddies along the band edges
    vec3 tq = vec3(q.x * 2.0, q.y * 9.0, q.z * 2.0);
    float turb = fbm(tq + 3.0, 6);
    float eddies = fbm(q * 10.0 + turb * 1.5, 4);
    float wake = exp(-pow((latDeg(p) + 16.0) / 6.0, 2.0)) * sstep(0.1, -0.6, g.x * 0.085) * 1.6;
    float l = latDeg(q) + turb * 3.2 + eddies * (1.3 + wake);
    vec3 c = jupiterBands(l);
    c *= 0.92 + 0.14 * fbm(vec3(q.x * 1.5, q.y * 24.0, q.z * 1.5), 4);
    c *= 0.95 + 0.07 * fbm(vec3(q.x * 3.0, q.y * 60.0, q.z * 3.0), 3);
    c = mix(c, c * vec3(1.06, 0.95, 0.86), sstep(-0.2, 0.5, fbm(q * 2.5 + 8.0, 3)) * 0.6);
    // blue-grey festoons dragging off the north equatorial belt
    float festoon = exp(-pow((l - 5.5) / 2.2, 2.0)) * sstep(0.2, 0.6, fbm(vec3(q.x * 7.0, q.y * 3.0, q.z * 7.0), 4));
    c = mix(c, vec3(0.45, 0.47, 0.53), festoon * 0.55);
    // white ovals in the south temperate belt
    float ovals = 0.0;
    for (int i = 0; i < 4; i++) {
      vec2 o = tangentCoords(p, dirFrom(-33.5, -40.0 + float(i) * 62.0)) / vec2(0.035, 0.022);
      ovals = max(ovals, 1.0 - sstep(0.6, 1.0, length(o)));
    }
    c = mix(c, vec3(0.95, 0.93, 0.88), ovals * 0.85);
    // the Red Spot itself, in its pale hollow
    float spot = 1.0 - sstep(0.62, 1.0, gr);
    float hollow = exp(-pow((gr - 1.18) / 0.2, 2.0));
    vec3 red = mix(vec3(0.8, 0.46, 0.33), vec3(0.9, 0.6, 0.44), 0.5 + 0.5 * fbm(q * 26.0, 3));
    red = mix(red, vec3(0.86, 0.6, 0.45), exp(-gr * gr * 5.0) * 0.5);
    c = mix(c, vec3(0.95, 0.9, 0.81), hollow * 0.55);
    col = mix(c, red, spot);
  }
`,a3=`
  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    vec3 q = warp3(p, 3.0, 0.02);
    float l = latDeg(q) + fbm(vec3(q.x * 2.0, q.y * 14.0, q.z * 2.0), 5) * 0.9;
    vec3 base = vec3(0.89, 0.8, 0.61);
    vec3 light = vec3(0.95, 0.89, 0.73);
    vec3 dark = vec3(0.76, 0.64, 0.45);
    vec3 c = mix(base, light, band(l, -11.0, 11.0, 3.0) * 0.7);
    c = mix(c, dark, band(l, 14.0, 23.0, 3.0) * 0.45);
    c = mix(c, dark, band(l, -25.0, -16.0, 3.0) * 0.4);
    c = mix(c, dark * 1.04, band(l, 31.0, 39.0, 3.0) * 0.32);
    c = mix(c, dark * 1.04, band(l, -41.0, -33.0, 3.0) * 0.3);
    c = mix(c, dark * 1.06, band(l, 47.0, 54.0, 2.5) * 0.25);
    // fine banding: thin, soft, never a regular ripple
    c *= 0.985 + 0.03 * fbm(vec3(q.x * 2.5, q.y * 34.0, q.z * 2.5), 4) + 0.015 * fbm(vec3(q.x * 5.0, q.y * 80.0, q.z * 5.0), 3);
    // the north polar hexagon
    float r = 90.0 - l;
    float az = atan(p.z, p.x);
    float sector = mod(az + 0.3, PI / 3.0) - PI / 6.0;
    float hex = r * cos(sector) / cos(PI / 6.0);
    vec3 polar = vec3(0.7, 0.73, 0.74);
    c = mix(c, polar, (1.0 - sstep(11.0, 15.0, hex)) * 0.3);
    c = mix(c, polar * 0.88, exp(-pow((hex - 14.0) / 1.6, 2.0)) * 0.14);
    c = mix(c, vec3(0.7, 0.64, 0.52), sstep(60.0, 85.0, -l) * 0.4);
    col = c;
  }
`,o3=`
  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    float l = latDeg(p) + fbm(vec3(p.x * 2.0, p.y * 8.0, p.z * 2.0), 4) * 1.2;
    vec3 c = vec3(0.64, 0.86, 0.89);
    // a few broad, very faint bands
    c *= 0.985 + 0.018 * sin(l * 0.3) + 0.008 * fbm(vec3(p.x * 2.0, p.y * 20.0, p.z * 2.0), 3);
    c = mix(c, vec3(0.76, 0.92, 0.93), sstep(-35.0, -75.0, l) * 0.4);
    c = mix(c, vec3(0.72, 0.9, 0.92), sstep(55.0, 80.0, l) * 0.3);
    float clouds = sstep(0.6, 0.78, fbm(vec3(p.x * 4.0, p.y * 26.0, p.z * 4.0), 4)) * band(l, 22.0, 42.0, 6.0);
    col = mix(c, vec3(0.84, 0.96, 0.97), clouds * 0.14);
  }
`,l3=`
  void surface(vec3 p, out vec3 col, out float h) {
    h = 0.0;
    float lat = latDeg(p);
    vec3 q = warp3(p, 2.5, 0.05);
    float l = lat + fbm(vec3(q.x * 2.0, q.y * 10.0, q.z * 2.0), 5) * 3.0;
    vec3 deep = vec3(0.17, 0.28, 0.72);
    vec3 mid = vec3(0.26, 0.42, 0.86);
    vec3 light = vec3(0.4, 0.57, 0.93);
    vec3 c = mix(mid, light, band(l, -14.0, 14.0, 6.0) * 0.45);
    c = mix(c, deep, band(l, -66.0, -46.0, 5.0) * 0.7);
    c = mix(c, deep * 1.05, band(l, 24.0, 46.0, 6.0) * 0.4);
    c = mix(c, vec3(0.42, 0.56, 0.9), sstep(68.0, 86.0, abs(l)) * 0.4);
    c *= 0.95 + 0.08 * fbm(q * 7.0, 4);
    // the Great Dark Spot with its bright companion cloud
    vec2 g = tangentCoords(p, dirFrom(-20.0, 0.0)) / vec2(0.25, 0.13);
    float spot = 1.0 - sstep(0.45, 1.0, length(g));
    c = mix(c, vec3(0.1, 0.16, 0.47), spot * 0.8);
    vec2 cc = tangentCoords(p, dirFrom(-27.5, 6.0)) / vec2(0.14, 0.022);
    float companion = exp(-dot(cc, cc) * 1.6);
    float streakNoise = fbm(vec3(q.x * 1.6, q.y * 38.0, q.z * 1.6), 5);
    float zones = band(l, -46.0, -30.0, 4.0) + band(l, 18.0, 34.0, 4.0) * 0.7 + band(l, -74.0, -64.0, 3.0) * 0.6;
    float streak = sstep(0.22, 0.6, streakNoise) * zones;
    col = mix(c, vec3(0.92, 0.95, 1.0), clamp(streak + companion, 0.0, 1.0) * 0.85);
  }
`,c3=`
  void surface(vec3 p, out vec3 col, out float h) {
    float lat = latDeg(p);
    float lon = lonDeg(p);
    if (lon < 0.0) lon += 360.0;
    // Tombaugh Regio: a heart on the side facing away from Charon
    vec3 heartDir = dirFrom(18.0, 180.0);
    vec2 t = tangentCoords(p, heartDir) / 0.62;
    t += 0.08 * vec2(fbm(p * 4.0, 4), fbm(p * 4.0 + 3.0, 4));
    float X = t.x;
    float Y = t.y + 0.2;
    float a = X * X + Y * Y - 1.0;
    float heart = (1.0 - sstep(-0.035, 0.035, a * a * a - X * X * Y * Y * Y)) * sstep(0.0, 0.2, dot(p, heartDir));
    float sputnik = heart * (1.0 - sstep(-0.18, 0.05, X));
    vec3 cells = worley(p * 26.0);
    float cellEdges = sstep(0.02, 0.12, cells.y - cells.x);

    // Cthulhu and the other dark equatorial maculae
    float latw = lat + fbm(p * 3.0 + 9.0, 4) * 12.0;
    float cthulhu = band(lon, 15.0, 150.0, 18.0) * band(latw, -24.0, 8.0, 8.0);
    cthulhu *= sstep(-0.55, -0.1, fbm(p * 3.0 + 1.0, 5) + 0.1);
    float eastDark = band(lon, 205.0, 300.0, 15.0) * band(latw, -22.0, 0.0, 6.0) * sstep(0.0, 0.25, fbm(p * 3.5 + 5.0, 5));
    float dark = max(cthulhu, eastDark * 0.8) * (1.0 - heart);

    vec3 base = mix(vec3(0.8, 0.66, 0.52), vec3(0.89, 0.79, 0.65), 0.5 + 0.5 * fbm(p * 5.0, 5));
    base = mix(base, vec3(0.86, 0.68, 0.5), band(lat, 20.0, 50.0, 10.0) * 0.4);
    base = mix(base, vec3(0.8, 0.77, 0.72), sstep(50.0, 72.0, lat));
    vec3 heartCol = mix(vec3(0.88, 0.82, 0.74), vec3(0.95, 0.91, 0.85), sputnik);
    col = mix(base, vec3(0.38, 0.21, 0.13), dark);
    col = mix(col, heartCol, heart);
    col *= mix(1.0, 0.95 + 0.05 * cellEdges, sputnik);

    float fresh = 0.0;
    h = (craterField(p, 7.0, 0.3, 41.0, fresh) * 0.14 + craterField(p, 16.0, 0.4, 42.0, fresh) * 0.12) * (1.0 - heart);
    h += fbm(p * 6.0, 5) * 0.01 * (1.0 - sputnik) - sputnik * 0.008 + cellEdges * 0.002 * sputnik;
  }
`,u3=`
  void surface(vec3 p, out vec3 col, out float h) {
    float n = fbm(p * 3.0, 5);
    float sparkle = pow(0.5 + 0.5 * snoise(p * 70.0), 5.0);
    vec3 ice = mix(vec3(0.84, 0.87, 0.92), vec3(0.95, 0.96, 0.98), 0.5 + 0.5 * n);
    ice += sparkle * 0.08;
    float spot = 1.0 - sstep(0.18, 0.45, angleTo(p, dirFrom(12.0, 60.0)) + 0.06 * fbm(p * 6.0, 3));
    col = mix(ice, vec3(0.64, 0.4, 0.36), spot * 0.8);
    float fresh = 0.0;
    h = fbm(p * 4.0, 5) * 0.012 + craterField(p, 8.0, 0.3, 51.0, fresh) * 0.12;
  }
`,h3=`
  void surface(vec3 p, out vec3 col, out float h) {
    vec3 base = mix(vec3(0.62, 0.4, 0.29), vec3(0.8, 0.58, 0.44), 0.5 + 0.5 * fbm(p * 3.0, 5));
    float frost = sstep(0.1, 0.35, fbm(warp3(p, 2.0, 0.2) * 2.5 + 7.0, 5));
    col = mix(base, vec3(0.88, 0.78, 0.68), frost * 0.35);
    col *= 1.0 - sstep(0.75, 0.9, ridged(p * 3.0, 4)) * 0.12;
    float fresh = 0.0;
    h = fbm(p * 5.0, 5) * 0.01 + craterField(p, 10.0, 0.35, 61.0, fresh) * 0.13;
  }
`,f3=`
  void surface(vec3 p, out vec3 col, out float h) {
    col = mix(vec3(0.83, 0.83, 0.85), vec3(0.95, 0.95, 0.95), 0.5 + 0.5 * fbm(p * 3.0, 5));
    col = mix(col, vec3(0.9, 0.86, 0.8), sstep(0.2, 0.5, fbm(p * 2.0 + 4.0, 4)) * 0.45);
    float fresh = 0.0;
    h = fbm(p * 5.0, 5) * 0.008 + craterField(p, 9.0, 0.3, 71.0, fresh) * 0.12;
  }
`,d3=`
  vec4 bake(vec3 p) {
    vec3 cells = worley(warp3(p, 6.0, 0.012) * 34.0);
    float granules = sstep(0.0, 0.32, cells.y - cells.x) * (0.75 + 0.25 * cells.z);
    float mottle = 0.5 + 0.5 * fbm(p * 5.0, 5);
    float lat = abs(latDeg(p));
    float belt = band(lat, 8.0, 32.0, 5.0);
    float activity = fbm(p * 6.0 + 11.0, 5);
    float spots = sstep(0.36, 0.5, activity) * belt;
    spots = max(spots, sstep(0.5, 0.56, activity) * belt);
    float faculae = sstep(0.18, 0.4, activity) * belt;
    return vec4(granules, mottle, spots, faculae);
  }
`,fg={moon:{kind:"surface",glsl:t3,bump:2},mercury:{kind:"surface",glsl:e3,bump:2.4},venus:{kind:"gas",glsl:i3},mars:{kind:"surface",glsl:n3,bump:1.8},ceres:{kind:"surface",glsl:s3,bump:3},jupiter:{kind:"gas",glsl:r3},saturn:{kind:"gas",glsl:a3},uranus:{kind:"gas",glsl:o3},neptune:{kind:"gas",glsl:l3},pluto:{kind:"surface",glsl:c3,bump:2.2},haumea:{kind:"surface",glsl:u3,bump:2.5},makemake:{kind:"surface",glsl:h3,bump:2.5},eris:{kind:"surface",glsl:f3,bump:2.5},sun:{kind:"data",glsl:d3}},p3=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,m3=`
  varying vec2 vUv;
  uniform float uBump;
  uniform float uEps;
  ${Q2}
  ${j2}

  vec3 srgbToLinear(vec3 c) {
    return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
  }

  // Inverse of SphereGeometry's mapping: u = longitude, v = 1 - colatitude / PI.
  vec3 uvToDir(vec2 uv) {
    float phi = uv.x * TAU;
    float theta = (1.0 - uv.y) * PI;
    return vec3(-cos(phi) * sin(theta), cos(theta), sin(phi) * sin(theta));
  }
`,g3={albedo:`
    void main() {
      vec3 col;
      float h;
      surface(uvToDir(vUv), col, h);
      gl_FragColor = vec4(srgbToLinear(clamp(col, 0.0, 1.0)), 1.0);
    }
  `,normal:`
    void main() {
      vec3 p = uvToDir(vUv);
      vec3 east = vec3(p.z, 0.0, -p.x);
      float len = length(east);
      east = len > 1e-5 ? east / len : vec3(1.0, 0.0, 0.0);
      vec3 north = cross(p, east);
      vec3 col;
      float h0;
      float he;
      float hn;
      surface(p, col, h0);
      surface(normalize(p + east * uEps), col, he);
      surface(normalize(p + north * uEps), col, hn);
      vec2 slope = vec2(he - h0, hn - h0) / uEps * uBump;
      gl_FragColor = vec4(normalize(vec3(-slope, 1.0)) * 0.5 + 0.5, 1.0);
    }
  `,data:`
    void main() {
      gl_FragColor = bake(uvToDir(vUv));
    }
  `},v3={albedo:1,normal:3,data:1};class dg{constructor(t,{coarse:e=!1,profile:i=!1}={}){P(this,"jobs",[]);P(this,"active",null);P(this,"stats",[]);P(this,"paused",!1);this.renderer=t,this.coarse=e,this.profile=i,this.width=e?512:1024,this.height=e?256:512,this.budget=e?65536:262144,this.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy()),this.parallelCompile=!!t.compileAsync&&t.extensions.has("KHR_parallel_shader_compile"),this.scene=new Zu,this.camera=new Ll(-1,1,1,-1,0,1),this.quad=new ae(new us(2,2)),this.quad.frustumCulled=!1,this.scene.add(this.quad)}get pending(){let t=0;for(const e of this.jobs)e.done||t++;return t}bake(t,e,i={}){const n=typeof t=="string"?fg[t]:t,r=typeof t=="string"?t:n.name??"custom",a=i.width??this.width,o=i.height??this.height,l=i.mipmaps??!0,c=i.colorSpace??(e==="albedo"?$e:La),u=new zi(a,o,{depthBuffer:!1,generateMipmaps:l,minFilter:l?mn:Oe,magFilter:Oe,wrapS:ol,wrapT:Ki,colorSpace:c,anisotropy:l?this.anisotropy:1});u.texture.name=`${r}-${e}`;const f={name:r,pass:e,def:n,target:u,texture:u.texture,rowsPerStep:Math.max(8,Math.min(o,Math.round(this.budget/(a*v3[e])))),row:0,state:"queued",done:!1,priority:i.priority??(()=>0),onDone:i.onDone??null,material:null,startedAt:0,gpuMs:0,steps:0};return this.jobs.push(f),f}update(){if(this.paused)return;this.active||(this.active=this.nextJob());const t=this.active;t&&(t.state==="queued"&&this.compile(t),t.state==="ready"&&this.renderStrip(t))}flush(t=null){for(const e of this.jobs)if(!(e.done||t&&!t(e)))for(e.material||(e.material=this.createMaterial(e)),e.startedAt||(e.startedAt=performance.now()),e.state="ready";!e.done;)this.renderStrip(e);this.active?.done&&(this.active=null)}nextJob(){let t=null,e=1/0;for(const i of this.jobs){if(i.state!=="queued")continue;const n=i.priority();n<e&&(t=i,e=n)}return t}createMaterial(t){return new he({name:`bake-${t.name}-${t.pass}`,uniforms:{uBump:{value:t.def.bump??1},uEps:{value:Math.PI*2/t.target.width}},vertexShader:p3,fragmentShader:`${m3}
${t.def.glsl}
${g3[t.pass]}`,depthTest:!1,depthWrite:!1})}compile(t){t.material=this.createMaterial(t),t.state="compiling",t.startedAt=performance.now(),this.quad.material=t.material;const e=()=>{t.compileMs=performance.now()-t.startedAt,t.state==="compiling"&&(t.state="ready")};this.parallelCompile?this.renderer.compileAsync(this.quad,this.camera,this.scene).then(e,e):e()}renderStrip(t){const{renderer:e,quad:i}=this,n=t.target,r=Math.min(t.rowsPerStep,n.height-t.row),a=this.profile?performance.now():0;n.scissor.set(0,t.row,n.width,r),n.scissorTest=!0,i.material=t.material;const o=e.getRenderTarget(),l=e.autoClear;e.autoClear=!1,e.setRenderTarget(n),e.render(this.scene,this.camera),e.setRenderTarget(o),e.autoClear=l,this.profile&&(e.getContext().finish(),t.gpuMs+=performance.now()-a),t.row+=r,t.steps++,t.row>=n.height&&this.finish(t)}finish(t){t.state="done",t.done=!0,t.target.scissorTest=!1,t.material.dispose(),t.material=null,this.active===t&&(this.active=null),this.stats.push({texture:`${t.name}-${t.pass}`,size:`${t.target.width}x${t.target.height}`,steps:t.steps,compileMs:Math.round(t.compileMs??0),bakeMs:this.profile?Math.round(t.gpuMs):void 0,totalMs:Math.round(performance.now()-t.startedAt)}),t.onDone?.(t)}release(t){const e=this.jobs.indexOf(t);e<0||(this.jobs.splice(e,1),this.active===t&&(this.active=null),t.material?.dispose(),t.material=null,t.state="released",t.done=!0,t.target.dispose())}dispose(){for(const t of this.jobs)t.material?.dispose(),t.target.dispose();this.jobs.length=0,this.quad.geometry.dispose()}}const _3=`
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,x3=`
  uniform sampler2D uMap;
  uniform float uMapMix;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vWorldPos;

  vec3 heatColor(float heat) {
    vec3 c = mix(vec3(0.82, 0.24, 0.04), vec3(1.0, 0.56, 0.16), smoothstep(0.12, 0.42, heat));
    c = mix(c, vec3(1.0, 0.82, 0.5), smoothstep(0.4, 0.68, heat));
    return mix(c, vec3(1.0, 0.97, 0.9), smoothstep(0.66, 0.95, heat));
  }

  void main() {
    vec3 N = normalize(vNormalW);
    float mu = clamp(dot(N, normalize(cameraPosition - vWorldPos)), 0.0, 1.0);
    // two drifting granulation layers, crossfaded so the drift never resets visibly
    float cycle = uTime * 0.035;
    float phaseA = fract(cycle);
    float phaseB = fract(cycle + 0.5);
    vec4 base = texture2D(uMap, vUv);
    vec2 flow = (base.ga - 0.5) * vec2(0.03, 0.012);
    float a = texture2D(uMap, vUv + flow * phaseA).r;
    float b = texture2D(uMap, vUv + vec2(0.5, 0.0) - flow * phaseB).r;
    float granules = mix(0.5, mix(a, b, abs(phaseA * 2.0 - 1.0)), uMapMix);
    float mottle = mix(0.5, base.g, uMapMix);
    float spots = base.b * uMapMix;
    float faculae = base.a * uMapMix;

    // limb darkening (Eddington-like), then granulation, mottling and spots
    float limb = 1.0 - 0.56 * (1.0 - mu) - 0.24 * (1.0 - mu) * (1.0 - mu);
    float heat = limb * (0.86 + 0.36 * (granules - 0.5) + 0.18 * (mottle - 0.5));
    heat = heat * (1.0 - 0.66 * spots) + faculae * 0.18 * (1.0 - mu);
    // the centre peaks just under white so granulation stays visible up close
    vec3 color = heatColor(heat) * (0.32 + 0.78 * heat);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;function y3(s,{coarse:t=!1}={}){const e={uMap:{value:null},uMapMix:{value:0},uTime:{value:0}},i=new he({name:"sun-surface",uniforms:e,vertexShader:_3,fragmentShader:x3}),n=new ae(new Qi(1,t?64:96,t?32:48),i);return n.scale.setScalar(s.radius),n.name="sun-surface",{mesh:n,uniforms:e}}const M3=`
  uniform float uRadius;
  uniform float uViewportHeight;
  uniform float uStreakPx;
  varying vec2 vPx;
  varying vec2 vQuad;
  varying float vSunPx;
  void main() {
    vec4 center = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    float dist = length(center.xyz);
    float focal = projectionMatrix[1][1] * 0.5 * uViewportHeight;
    float sunPx = uRadius / sqrt(max(dist * dist - uRadius * uRadius, 1.0)) * focal;
    // sit just in front of the Sun so the sphere never hides the glow
    vec3 anchor = center.xyz - center.xyz / dist * uRadius * 1.04;
    // big enough for the corona and for the streak to fade out completely
    float halfPx = min(max(sunPx * 5.0, uStreakPx * 2.3), uViewportHeight * 4.0);
    vec3 offset = vec3(position.xy * halfPx * (-anchor.z / focal), 0.0);
    vPx = position.xy * halfPx;
    vQuad = position.xy;
    vSunPx = sunPx;
    gl_Position = anchor.z < -0.01 ? projectionMatrix * vec4(anchor + offset, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
  }
`,S3=`
  uniform float uTime;
  uniform float uFlare;
  uniform float uGlow;
  uniform float uStreakPx;
  uniform float uViewportHeight;
  uniform float uPixelRatio;
  uniform vec3 uStreakColor;
  varying vec2 vPx;
  varying vec2 vQuad;
  varying float vSunPx;
  ${hg}

  void main() {
    float len = length(vPx);
    float r = len / vSunPx;
    float outside = max(r - 1.0, 0.0);
    float outsidePx = max(len - vSunPx, 0.0);
    float overDisc = 1.0 - smoothstep(0.92, 1.0, r);

    vec3 glow = vec3(0.0);
    if (outside < 4.0) {
      // streamers: noise around the rim, slowly evolving
      vec2 dir = vPx / max(len, 1e-3);
      float s = 0.5 + 0.5 * snoise(vec3(dir * 1.7, uTime * 0.02));
      s = 0.6 * s + 0.4 * (0.5 + 0.5 * snoise(vec3(dir * 4.5, uTime * 0.035 + 3.0)));
      float inner = exp(-outside * 7.0);
      float corona = exp(-outside / (0.12 + 0.5 * s * s)) * (0.4 + 0.6 * s);
      glow = vec3(1.0, 0.93, 0.8) * inner * 0.7 + vec3(1.0, 0.76, 0.45) * corona * 0.36;
    }
    float glareRadius = min(0.035 * uViewportHeight + 0.22 * vSunPx, 0.09 * uViewportHeight);
    float glare = exp(-outsidePx / glareRadius) * 0.3 + exp(-outsidePx / (glareRadius * 3.5)) * 0.035;
    glow += vec3(1.0, 0.84, 0.62) * glare;
    glow *= mix(1.0, 0.05, overDisc);

    // flare streaks, in pixels
    float px = uPixelRatio;
    float streakLength = uStreakPx + vSunPx;
    float streak = exp(-abs(vPx.y) / (1.2 * px + vSunPx * 0.02)) * exp(-pow(abs(vPx.x) / streakLength, 1.5) * 2.6);
    float rays = 0.0;
    float rayLength = 0.35 * uStreakPx + 0.6 * vSunPx;
    for (int i = 0; i < 3; i++) {
      float a = 0.35 + float(i) * 1.0471976;
      vec2 axis = vec2(cos(a), sin(a));
      float across = abs(dot(vPx, vec2(-axis.y, axis.x)));
      float along = abs(dot(vPx, axis));
      rays += exp(-across / (0.8 * px + vSunPx * 0.006)) * exp(-along / rayLength);
    }
    vec3 flare = uStreakColor * streak * 0.3 + vec3(1.0, 0.93, 0.82) * rays * 0.1;
    // everything fades out before the quad's edge
    float edge = 1.0 - smoothstep(0.8, 1.0, max(abs(vQuad.x), abs(vQuad.y)));
    vec3 color = (glow + flare * uFlare * (1.0 - overDisc * 0.85)) * uGlow * edge;
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;class b3{constructor(t){P(this,"uniforms",{uRadius:{value:48},uViewportHeight:{value:800},uStreakPx:{value:400},uPixelRatio:{value:1},uTime:{value:0},uFlare:{value:1},uGlow:{value:1},uStreakColor:{value:new Ct("#9cc7ff")}});P(this,"viewport",new lt);this.system=t,this.renderer=t.renderer,this.uniforms.uRadius.value=t.sun.radius;const e=new he({name:"sun-corona",uniforms:this.uniforms,vertexShader:M3,fragmentShader:S3,transparent:!0,depthWrite:!1,blending:Ke});this.mesh=new ae(new us(2,2),e),this.mesh.name="sun-corona",this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,t.sun.object3D.add(this.mesh)}update(t,e,i){const n=this.uniforms;this.renderer.getDrawingBufferSize(this.viewport),n.uViewportHeight.value=this.viewport.y,n.uPixelRatio.value=this.renderer.getPixelRatio(),n.uStreakPx.value=Math.max(this.viewport.x,this.viewport.y)*.16,i.reduced||(n.uTime.value+=e);const r=i.camera.position.distanceTo(i.sunPosition),a=this.system.sun.radius/Math.max(r,1);n.uFlare.value=Rt(1.15-a*2.6,.3,1)}dispose(){this.mesh.removeFromParent(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const qa=`
  float sstep(float a, float b, float x) {
    float t = clamp((x - a) / (b - a), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }
`,w3=`
  varying vec2 vUv;
  varying vec3 vObjDir;
  varying vec3 vWorldPos;
  varying vec3 vCenter;
  #ifdef RING_SHADOW
    varying vec3 vRingNormal;
  #endif
  void main() {
    vUv = uv;
    vObjDir = position;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vCenter = modelMatrix[3].xyz;
    #ifdef RING_SHADOW
      vRingNormal = normalize(mat3(modelMatrix) * vec3(0.0, 1.0, 0.0));
    #endif
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,E3=`
  uniform sampler2D uMap;
  uniform sampler2D uNormalMap;
  uniform float uMapMix;
  uniform float uNormalMix;
  uniform float uNormalScale;
  uniform vec3 uBaseColor;
  uniform mat3 uNormalWorld;
  uniform vec3 uSunPos;
  uniform vec3 uSunColor;
  uniform vec3 uAmbient;
  uniform vec3 uAtmosphere;
  uniform float uWrap;
  uniform float uSpecular;
  varying vec2 vUv;
  varying vec3 vObjDir;
  varying vec3 vWorldPos;
  varying vec3 vCenter;
  #ifdef RING_SHADOW
    uniform sampler2D uRingProfile;
    uniform vec2 uRingRange;
    varying vec3 vRingNormal;
  #endif
  ${qa}

  void main() {
    vec3 P = normalize(vObjDir);
    vec3 geometric = normalize(uNormalWorld * P);
    vec3 N = geometric;
    #ifdef USE_NORMALMAP
      vec3 east = vec3(P.z, 0.0, -P.x);
      float len = length(east);
      east = len > 1e-5 ? east / len : vec3(1.0, 0.0, 0.0);
      vec3 north = cross(P, east);
      vec3 bump = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
      bump.xy *= uNormalScale * uNormalMix;
      N = normalize(uNormalWorld * (east * bump.x + north * bump.y + P * max(bump.z, 0.05)));
    #endif

    vec3 albedo = mix(uBaseColor, texture2D(uMap, vUv).rgb, uMapMix);
    vec3 L = normalize(uSunPos - vWorldPos);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float sunSide = dot(geometric, L);
    float lambert = max((dot(N, L) + uWrap) / (1.0 + uWrap), 0.0);
    // the geometric terminator stays crisp; relief can't light the night side
    float day = lambert * sstep(-0.06 - uWrap, 0.04, sunSide);

    #ifdef RING_SHADOW
      float facing = dot(L, vRingNormal);
      if (abs(facing) > 1e-4) {
        float t = dot(vCenter - vWorldPos, vRingNormal) / facing;
        if (t > 0.0) {
          float r = length(vWorldPos + L * t - vCenter);
          float u = (r - uRingRange.x) / (uRingRange.y - uRingRange.x);
          if (u > 0.0 && u < 1.0) day *= 1.0 - texture2D(uRingProfile, vec2(u, 0.5)).a * 0.82;
        }
      }
    #endif

    vec3 color = albedo * (uSunColor * day + uAmbient);
    vec3 H = normalize(L + V);
    color += uSunColor * uSpecular * pow(max(dot(N, H), 0.0), 40.0) * day;

    float facingViewer = max(dot(geometric, V), 0.0);
    float fresnel = pow(1.0 - facingViewer, 3.0);
    float limbLit = sstep(-0.25, 0.45, sunSide);
    // atmospheric haze on the limb: bright on the day side, a whisper at night
    color += uAtmosphere * fresnel * (0.06 + limbLit);
    // faint sky-light rim keeps dark silhouettes readable
    color += uAmbient * 0.7 * fresnel * (1.0 - limbLit);

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,T3=`
  varying vec3 vWorldPos;
  varying vec3 vCenter;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vCenter = modelMatrix[3].xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,D3=`
  uniform vec3 uColor;
  uniform float uRadius;
  uniform float uShell;
  uniform vec3 uSunPos;
  varying vec3 vWorldPos;
  varying vec3 vCenter;
  ${qa}

  void main() {
    vec3 D = normalize(vWorldPos - cameraPosition);
    vec3 offset = cameraPosition + D * dot(vCenter - cameraPosition, D) - vCenter;
    float height = length(offset);
    float x = clamp((height - uRadius) / (uShell - uRadius), 0.0, 1.0);
    float density = (1.0 - x) * (1.0 - x) * exp(-x * 2.5);
    vec3 L = normalize(uSunPos - vCenter);
    float lit = sstep(-0.35, 0.55, dot(offset / max(height, 1e-4), L));
    float forward = pow(max(dot(D, L), 0.0), 8.0);
    vec3 glow = uColor * density * (0.05 + lit + forward * 1.6);
    gl_FragColor = vec4(glow, 1.0);
    #include <colorspace_fragment>
  }
`,A3=`
  varying vec3 vWorldPos;
  varying vec2 vLocal;
  varying vec3 vCenter;
  varying vec3 vNormal;
  void main() {
    vLocal = position.xy;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vCenter = modelMatrix[3].xyz;
    vNormal = normalize(mat3(modelMatrix) * vec3(0.0, 0.0, 1.0));
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,C3=`
  uniform sampler2D uProfile;
  uniform vec2 uRange;
  uniform float uPlanetRadius;
  uniform vec3 uSunPos;
  uniform vec3 uSunColor;
  uniform vec3 uAmbient;
  uniform float uBrightness;
  varying vec3 vWorldPos;
  varying vec2 vLocal;
  varying vec3 vCenter;
  varying vec3 vNormal;
  ${qa}

  void main() {
    float u = (length(vLocal) - uRange.x) / (uRange.y - uRange.x);
    if (u < 0.0 || u > 1.0) discard;
    vec4 profile = texture2D(uProfile, vec2(u, 0.5));
    vec3 L = normalize(uSunPos - vWorldPos);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float mu0 = dot(vNormal, L);
    float mu = dot(vNormal, V);
    // optical depth: rings look denser seen edge-on
    float tau = -log(max(1.0 - profile.a, 0.02));
    float alpha = 1.0 - exp(-tau / max(abs(mu), 0.05));
    if (alpha < 0.003) discard;

    vec3 oc = vWorldPos - vCenter;
    float b = dot(oc, L);
    float shadow = 1.0;
    if (b < 0.0) shadow = sstep(uPlanetRadius * 0.97, uPlanetRadius * 1.03, sqrt(max(dot(oc, oc) - b * b, 0.0)));

    // the sunlit face reflects; from the far side light diffuses through thin parts
    float reflected = 0.3 + 0.7 * pow(abs(mu0), 0.35);
    float transmitted = exp(-tau) * (1.0 - exp(-tau)) * 2.4;
    float shade = mix(transmitted, reflected, step(0.0, mu0 * mu)) * sstep(0.0, 0.1, abs(mu0)) * shadow;
    vec3 color = profile.rgb * (uSunColor * shade * uBrightness + uAmbient * 0.6);
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`,P3=`
  #define MAX_ORBITS 16
  attribute vec3 aColor;
  attribute vec3 aOrbit;
  uniform vec3 uBodyPos[MAX_ORBITS];
  uniform float uBodyPhase[MAX_ORBITS];
  uniform float uBodyRadius[MAX_ORBITS];
  uniform float uOrbitSize[MAX_ORBITS];
  uniform float uOwnFade[MAX_ORBITS];
  uniform float uDashLevel[MAX_ORBITS];
  uniform vec2 uInsideFade;
  uniform float uOpacity;
  varying vec4 vColor;
  varying vec3 vDash;
  ${qa}

  void main() {
    int slot = int(aOrbit.y + 0.5);
    vec4 world = modelMatrix * vec4(position, 1.0);
    float camDist = distance(world.xyz, cameraPosition);
    float radius = uBodyRadius[slot];
    float nearBody = sstep(radius * 1.6, radius * 7.0 + 6.0, distance(position, uBodyPos[slot]));
    float nearCam = sstep(3.0, 45.0, camDist);
    float far = 1.0 / (1.0 + camDist * camDist / 3.6e7);
    float inside = sstep(uInsideFade.x, uInsideFade.y, distance(cameraPosition, modelMatrix[3].xyz) / uOrbitSize[slot]);
    float trail = exp(-fract(uBodyPhase[slot] - aOrbit.x) * 9.0);
    float alpha = (0.32 + 0.68 * trail) * nearBody * nearCam * far * inside * uOwnFade[slot] * uOpacity;
    vColor = vec4(aColor, alpha);
    float level = uDashLevel[slot];
    float count = exp2(floor(level));
    vDash = aOrbit.z > 0.0 ? vec3(aOrbit.x * count, aOrbit.x * count * 2.0, fract(level)) : vec3(-1.0);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,R3=`
  varying vec4 vColor;
  varying vec3 vDash;
  void main() {
    float on = 1.0;
    if (vDash.x >= 0.0) on = mix(step(fract(vDash.x), 0.55), step(fract(vDash.y), 0.55), vDash.z);
    if (on * vColor.a < 0.002) discard;
    gl_FragColor = vec4(vColor.rgb * vColor.a * on, 1.0);
    #include <colorspace_fragment>
  }
`,L3=`
  attribute vec3 aColor;
  attribute float aRadius;
  uniform float uViewportHeight;
  uniform float uPixelRatio;
  uniform float uOpacity;
  uniform vec3 uSunPos;
  varying vec3 vColor;
  varying float vAlpha;
  ${qa}

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec4 mv = viewMatrix * world;
    float depth = max(-mv.z, 1e-3);
    float pixels = aRadius * projectionMatrix[1][1] * 0.5 * uViewportHeight / depth;
    vec3 toSun = normalize(uSunPos - world.xyz);
    vec3 toCam = normalize(cameraPosition - world.xyz);
    float phase = 0.3 + 0.7 * (0.5 + 0.5 * dot(toSun, toCam));
    vAlpha = (1.0 - sstep(1.4, 4.0, pixels)) * step(0.0, -mv.z) * phase * uOpacity;
    vColor = aColor;
    mv.xyz += normalize(-mv.xyz) * aRadius * 1.2;
    gl_PointSize = vAlpha > 0.004 ? 6.0 * uPixelRatio : 0.0;
    gl_Position = projectionMatrix * mv;
  }
`,F3=`
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = (exp(-d * d * 7.0) + 0.35 * exp(-d * d * 2.0)) * (1.0 - d) * vAlpha;
    if (a < 0.003) discard;
    gl_FragColor = vec4(vColor * a, 1.0);
    #include <colorspace_fragment>
  }
`,ah=Math.PI*2,pg=Math.PI/180,rr=16,I3=new Ct("#fff4e0").multiplyScalar(1.02),N3=new Ct(.018,.024,.042),U3={venus:{wrap:.1,atmosphere:{rim:.38,halo:.9,shell:1.045}},mars:{wrap:.02,atmosphere:{rim:.3,halo:.7,shell:1.035}},jupiter:{wrap:.05,atmosphere:{rim:.26,halo:.55,shell:1.028}},saturn:{wrap:.05,atmosphere:{rim:.24,halo:.5,shell:1.028}},uranus:{wrap:.08,specular:.04,atmosphere:{rim:.36,halo:.75,shell:1.05}},neptune:{wrap:.08,specular:.05,atmosphere:{rim:.4,halo:.85,shell:1.05}},haumea:{specular:.32},eris:{specular:.16},pluto:{specular:.05},makemake:{specular:.05}},O3={"Home world":.85,Planet:.55,"Dwarf planet":.42,Moon:.5};function B3(s,t){let e=t<.8?s:Math.PI;for(let i=0;i<8;i++){const n=(e-t*Math.sin(e)-s)/(1-t*Math.cos(e));if(e-=n,Math.abs(n)<1e-7)break}return e}function k3(s,t){const e=(s.L0+360*t/s.period-s.peri)*pg;return(B3(Math.atan2(Math.sin(e),Math.cos(e)),s.e)/ah%1+1)%1}function z3(s,t=512){const e=hi(s),i=Float32Array.from({length:t},()=>e());return n=>{const r=Math.floor(n),a=n-r,o=i[(r%t+t)%t],l=i[((r+1)%t+t)%t];return o+(l-o)*a*a*(3-2*a)}}const Ms=(s,t,e)=>{const i=Rt((e-s)/(t-s),0,1);return i*i*(3-2*i)};function V3(s,t){const e=t(s*520),i=t(s*110+40),n=t(s*24+90),r=.8+.22*e+.14*i+.06*n;if(s<1.239)return[0,0,0,0];if(s<1.527){const o=Ms(.62,.7,t(s*60+7))*.16;return[.5*r,.46*r,.41*r,.07+.08*i+o+.04*e]}if(s<1.951){const o=(s-1.527)/.424,l=.5+.42*Ms(0,.3,o)+.12*(e-.5)+.06*(i-.5);return[(.84+.05*o)*r,(.76+.06*o)*r,(.62+.07*o)*r,Rt(l,0,.96)]}if(s<2.025)return[.44,.41,.37,.03+.07*e*Ms(1.96,2,s)];if(s<2.27){const o=1-Ms(0,.004,Math.abs(s-2.214)),l=1-Ms(0,.0015,Math.abs(s-2.262)),c=(.48+.12*i+.08*(e-.5))*(1-o*.92)*(1-l*.8);return[.77*r,.73*r,.66*r,c*(1-Ms(2.255,2.27,s)*.4)]}return[.8,.77,.72,.38*Math.exp(-(((s-2.281)/.0022)**2))]}const G3=[[1.637,.004,.28],[1.652,.004,.28],[1.666,.004,.3],[1.75,.006,.36],[1.786,.006,.36],[1.846,.004,.22],[1.863,.004,.3],[1.89,.005,.34],[1.957,.003,.2],[2.001,.013,.62]];function H3(s){let t=.006;for(const[e,i,n]of G3)t+=n*.5*Math.exp(-(((s-e)/i)**2));return[.34,.36,.38,Rt(t,0,.5)]}function W3(s,t,e,i){const r=new Uint8Array(4096),a=z3(s==="saturn"?7:9);for(let l=0;l<1024;l++){const c=t+(l+.5)/1024*(e-t),u=s==="saturn"?V3(c/i,a):H3(1.62+(c-t)/(e-t)*.4);for(let f=0;f<4;f++)r[l*4+f]=Math.round(Rt(u[f],0,1)*255)}const o=new Cr(r,1024,1);return o.colorSpace=$e,o.magFilter=Oe,o.minFilter=mn,o.generateMipmaps=!0,o.wrapS=Ki,o.needsUpdate=!0,o}function Lp(s,t,e){const i=new Cr(new Uint8Array([s,t,e,255]),1,1);return i.needsUpdate=!0,i}class X3{constructor({renderer:t,coarse:e=!1,profile:i=!1}){P(this,"baker");P(this,"system",null);P(this,"sunPosition",new A);P(this,"cameraPosition",new A);P(this,"lighting",{sunPosition:{value:this.sunPosition},sunColor:{value:I3.clone()},ambient:{value:N3.clone()}});P(this,"fades",[]);P(this,"geometries",new Map);P(this,"orbitLines",[]);P(this,"orbitOpacity",1);P(this,"orbitTarget",1);P(this,"glintTarget",1);P(this,"sunSurface",null);P(this,"viewport",new lt);P(this,"objects",[]);P(this,"textures",[]);P(this,"scratch",new A);P(this,"cameraLocal",new A);P(this,"zero",new A);this.renderer=t,this.coarse=e,this.baker=new dg(t,{coarse:e,profile:i}),this.placeholder=Lp(255,255,255),this.flatNormal=Lp(128,128,255),this.textures.push(this.placeholder,this.flatNormal)}sphere(t){return this.geometries.has(t)||this.geometries.set(t,new Qi(1,t,t/2)),this.geometries.get(t)}distanceTo(t,e){return t.getWorldPosition(this.scratch).distanceTo(this.cameraPosition)-e}fadeIn(t,e=.8){this.fades.push({uniform:t,rate:1/e})}createBody(t){if(t.id==="sun")return this.createSun(t);const e=U3[t.id]??{},i=fg[t.texture],n=i?.kind==="surface",a=t.radius>=4?this.coarse?64:96:this.coarse?48:64,o=this.lighting,l={uMap:{value:this.placeholder},uNormalMap:{value:this.flatNormal},uMapMix:{value:0},uNormalMix:{value:0},uNormalScale:{value:e.normalScale??1},uBaseColor:{value:new Ct(t.color)},uNormalWorld:{value:new $t},uSunPos:o.sunPosition,uSunColor:o.sunColor,uAmbient:o.ambient,uAtmosphere:{value:t.atmosphere?new Ct(t.atmosphere).multiplyScalar(e.atmosphere?.rim??.3):new Ct(0,0,0)},uWrap:{value:e.wrap??0},uSpecular:{value:e.specular??0}},c={};n&&(c.USE_NORMALMAP="");const u=[];let f=null;if(t.rings){const{inner:p,outer:v,style:g}=t.rings;f=W3(g,p,v,t.radius),this.textures.push(f),g==="saturn"&&(c.RING_SHADOW="",l.uRingProfile={value:f},l.uRingRange={value:new lt(p,v)})}const h=new he({name:`planet-${t.id}`,uniforms:l,defines:c,vertexShader:w3,fragmentShader:E3}),d=new ae(this.sphere(a),h);if(d.name=`${t.id}-surface`,this.objects.push(d),t.shape?d.scale.set(t.shape[0],t.shape[2],t.shape[1]).multiplyScalar(t.radius):d.scale.setScalar(t.radius),d.onBeforeRender=()=>l.uNormalWorld.value.getNormalMatrix(d.matrixWorld),i){const p=()=>this.distanceTo(d,t.radius),v=!this.coarse&&t.radius<1.2?{width:this.baker.width/2,height:this.baker.height/2}:{};this.baker.bake(t.texture,"albedo",{...v,priority:p,onDone:g=>{l.uMap.value=g.texture,this.fadeIn(l.uMapMix)}}),n&&this.baker.bake(t.texture,"normal",{...v,priority:()=>1e6+p(),onDone:g=>{l.uNormalMap.value=g.texture,this.fadeIn(l.uNormalMix)}})}return t.atmosphere&&e.atmosphere&&u.push(this.createAtmosphere(t,e.atmosphere)),t.rings&&u.push(this.createRings(t,f)),{mesh:d,extras:u,uniforms:l}}createSun(t){const e=y3(t,{coarse:this.coarse});return this.sunSurface=e,this.objects.push(e.mesh),this.baker.bake("sun","data",{priority:()=>this.distanceTo(e.mesh,t.radius)*.5,onDone:i=>{e.uniforms.uMap.value=i.texture,this.fadeIn(e.uniforms.uMapMix,1.2)}}),e.uniforms.uMap.value=this.placeholder,{mesh:e.mesh,extras:[],uniforms:e.uniforms}}createAtmosphere(t,e){const i=new he({name:`atmosphere-${t.id}`,uniforms:{uColor:{value:new Ct(t.atmosphere).multiplyScalar(e.halo)},uRadius:{value:t.radius},uShell:{value:t.radius*e.shell},uSunPos:this.lighting.sunPosition},vertexShader:T3,fragmentShader:D3,side:ti,transparent:!0,depthWrite:!1,blending:Ke}),n=new ae(this.sphere(this.coarse?48:64),i);return n.name=`${t.id}-atmosphere`,this.objects.push(n),n.scale.setScalar(t.radius*e.shell),n}createRings(t,e){const{inner:i,outer:n,style:r}=t.rings,a=new he({name:`rings-${t.id}`,uniforms:{uProfile:{value:e},uRange:{value:new lt(i,n)},uPlanetRadius:{value:t.radius},uSunPos:this.lighting.sunPosition,uSunColor:this.lighting.sunColor,uAmbient:this.lighting.ambient,uBrightness:{value:r==="saturn"?1.05:.45}},vertexShader:A3,fragmentShader:C3,side:Yi,transparent:!0,depthWrite:!1}),o=new ae(new Rl(i*.995,n*1.005,this.coarse?128:192,1),a);return o.name=`${t.id}-rings`,this.objects.push(o),o.rotation.x=-Math.PI/2,o}init(t){this.system=t;for(const i of t.bodies)i.pickRadius=Y3(i);const e=[t.home,...t.worlds];this.orbitLines.push(this.createOrbitLines(e,t.frame,[.3,.75])),this.orbitLines.push(this.createOrbitLines([t.moon],t.group,[1.3,2.6])),this.createGlints(t),this.setOrbitsVisible(this.orbitTarget>0)}createOrbitLines(t,e,i){const n=[],r=[],a=[],o=[],l=[],c=new A,u=new Ct,f=new Ct("#ffffff");t.forEach((m,M)=>{const{orbit:b}=m.def;l.push(n.length/3);const _=Rt(Math.round(b.a*.5),192,768),S=m.kind==="Dwarf planet";u.set(m.id==="home"?"#5f9dff":m.color).lerp(f,.18),u.multiplyScalar(O3[m.kind]??.5);const y=n.length/3;for(let T=0;T<=_;T++){const x=T/_*ah,C=((x-b.e*Math.sin(x))/pg+b.peri-b.L0)/360*b.period;za(b,C,c),n.push(c.x,c.y,c.z),r.push(u.r,u.g,u.b),a.push(T/_,M,S?1:0),T>0&&o.push(y+T-1,y+T)}});const h=new ce;h.setAttribute("position",new Wt(new Float32Array(n),3)),h.setAttribute("aColor",new Wt(new Float32Array(r),3)),h.setAttribute("aOrbit",new Wt(new Float32Array(a),3)),h.setIndex(o);const d={uBodyPos:{value:Array.from({length:rr},()=>new A)},uBodyPhase:{value:new Float32Array(rr)},uBodyRadius:{value:new Float32Array(rr)},uOrbitSize:{value:new Float32Array(rr).fill(1)},uOwnFade:{value:new Float32Array(rr).fill(1)},uDashLevel:{value:new Float32Array(rr).fill(5)},uInsideFade:{value:new lt(...i)},uOpacity:{value:1}};t.forEach((m,M)=>{d.uBodyRadius.value[M]=m.radius,d.uOrbitSize.value[M]=m.def.orbit.a});const p=new he({name:"orbit-lines",uniforms:d,vertexShader:P3,fragmentShader:R3,transparent:!0,depthWrite:!1,blending:Ke}),v=new Lm(h,p);v.name="orbit-lines",e.add(v),this.objects.push(v);const g=t.map((m,M)=>{const b=l[M],_=M+1<t.length?l[M+1]:n.length/3,S=[];for(let y=b;y<_;y+=8)S.push(n[y*3],n[y*3+1],n[y*3+2]);return Float32Array.from(S)});return{lines:v,bodies:t,uniforms:d,probes:g}}createGlints(t){const e=[t.home,t.moon,...t.worlds],i=new ce,n=new Float32Array(e.length*3),r=new Float32Array(e.length),a=new Ct;e.forEach((l,c)=>{a.set(l.id==="home"?"#9cc7ff":l.color),a.toArray(n,c*3),r[c]=l.def.rings?l.radius*1.6:l.radius}),this.glintPositions=new Wt(new Float32Array(e.length*3),3),i.setAttribute("position",this.glintPositions),i.setAttribute("aColor",new Wt(n,3)),i.setAttribute("aRadius",new Wt(r,1)),this.glintUniforms={uViewportHeight:{value:800},uPixelRatio:{value:1},uOpacity:{value:1},uSunPos:this.lighting.sunPosition};const o=new he({name:"planet-glints",uniforms:this.glintUniforms,vertexShader:L3,fragmentShader:F3,transparent:!0,depthWrite:!1,blending:Ke});this.glints=new Pr(i,o),this.glints.name="planet-glints",this.objects.push(this.glints),this.glints.frustumCulled=!1,this.glintBodies=e,t.group.add(this.glints)}setOrbitsVisible(t){this.orbitTarget=t?1:0}setGlintsVisible(t){this.glintTarget=t?1:0}update(t,e,i,n){this.system||this.init(n),this.syncLights(n),this.sunPosition.copy(i.sunPosition),this.cameraPosition.copy(i.camera.position),this.baker.update();for(let r=this.fades.length-1;r>=0;r--){const a=this.fades[r];a.uniform.value=Math.min(1,a.uniform.value+e*a.rate),a.uniform.value>=1&&this.fades.splice(r,1)}this.sunSurface&&!i.reduced&&(this.sunSurface.uniforms.uTime.value+=e),this.updateOrbits(i,e),this.updateGlints(e)}syncLights(t){const{sunLight:e,ambient:i}=t;e&&this.lighting.sunColor.value.copy(e.color).multiplyScalar(e.intensity/Math.PI),i&&this.lighting.ambient.value.copy(i.color).multiplyScalar(i.intensity/Math.PI)}updateOrbits(t,e){this.orbitOpacity=Ye(this.orbitOpacity,this.orbitTarget,6,e);const i=this.system.frame,n=this.cameraPosition;this.renderer.getDrawingBufferSize(this.viewport);const r=this.viewport.y*t.camera.projectionMatrix.elements[5]/2,a=26*this.renderer.getPixelRatio();for(const o of this.orbitLines){const{lines:l,bodies:c,uniforms:u,probes:f}=o;if(l.visible=this.orbitOpacity>.01,!l.visible)continue;u.uOpacity.value=this.orbitOpacity;const h=l.parent,d=this.cameraLocal.copy(n).sub(h===i?i.position:this.zero);for(let p=0;p<c.length;p++){const v=c[p],g=u.uBodyPos.value[p];v.id==="home"?g.copy(i.position).negate():g.copy(v.object3D.position),u.uBodyPhase.value[p]=k3(v.def.orbit,v.years??t.years);const m=v.def.orbit.a;if(u.uOwnFade.value[p]=Ms(m*.35,m*1.2,d.distanceTo(g)),v.kind==="Dwarf planet"){const M=Math.max(q3(f[p],d),v.radius*4),b=ah*m*r/(M*a);u.uDashLevel.value[p]=Rt(Math.log2(b),5,15)}}}}updateGlints(t){const e=this.glintUniforms;if(e.uOpacity.value=Ye(e.uOpacity.value,this.glintTarget,6,t),this.glints.visible=e.uOpacity.value>.01,!this.glints.visible)return;this.renderer.getDrawingBufferSize(this.viewport),e.uViewportHeight.value=this.viewport.y,e.uPixelRatio.value=this.renderer.getPixelRatio();const i=this.system.frame,n=this.glintPositions.array,r=this.glintBodies;for(let a=0;a<r.length;a++){const o=r[a].object3D,l=o.parent===i?i.position:null;n[a*3]=o.position.x+(l?.x??0),n[a*3+1]=o.position.y+(l?.y??0),n[a*3+2]=o.position.z+(l?.z??0)}this.glintPositions.needsUpdate=!0}dispose(){const t=new Set;for(const e of this.objects)e.removeFromParent(),t.add(e.geometry),e.material.dispose();for(const e of t)e.dispose();for(const e of this.geometries.values())e.dispose();for(const e of this.textures)e.dispose();this.objects.length=0,this.textures.length=0,this.geometries.clear(),this.fades.length=0,this.orbitLines.length=0,this.baker.dispose()}stats(){return{pending:this.baker.pending,bakes:this.baker.stats}}}function q3(s,t){let e=1/0;for(let i=0;i<s.length;i+=3){const n=s[i]-t.x,r=s[i+1]-t.y,a=s[i+2]-t.z;e=Math.min(e,n*n+r*r+a*a)}return Math.sqrt(e)}function Y3(s){return s.id==="home"?s.radius:s.id==="sun"?s.radius*1.08:s.def.rings?.style==="saturn"?s.def.rings.outer*.85:s.radius<3?Math.max(s.radius*2.4,s.radius+1.6):s.radius*1.15}async function $3({renderer:s,coarse:t=!1,profile:e=!1}){return new X3({renderer:s,coarse:t,profile:e})}const In=Math.PI/2,Fp=new le,K3=new A,Z3=new Ri,J3=new Vi,Q3=new A,Bo=new Ct,xa="#dde2ea",es="#2b3039",Ga="#7c8592",mg="#18294f",Ip="#2f7bff",yl="#9cc7ff",oh="#ffdca0",j3={red:"#ff3b3b",green:"#3dff7a",white:"#ffffff"},tT={red:[1.1,0,.5,.25],green:[1.1,0,.5,.25],white:[1.6,.3,.05,0]};class Ha{constructor(){P(this,"parts",[]);P(this,"lights",[])}add(t,{color:e=xa,glow:i=0,rough:n=.5,metal:r=.25,at:a=[0,0,0],rot:o=[0,0,0],scale:l=1}={}){const c=t.index?t.toNonIndexed():t;c!==t&&t.dispose();for(const p of Object.keys(c.attributes))p!=="position"&&p!=="normal"&&c.deleteAttribute(p);const u=typeof l=="number"?[l,l,l]:l;Fp.compose(K3.set(...a),Z3.setFromEuler(J3.set(...o)),Q3.set(...u)),c.applyMatrix4(Fp);const f=c.attributes.position.count,h=new Float32Array(f*3),d=new Float32Array(f*3);Bo.set(e);for(let p=0;p<f;p++)h.set([Bo.r,Bo.g,Bo.b],p*3),d.set([i,n,r],p*3);return c.setAttribute("color",new Wt(h,3)),c.setAttribute("aMat",new Wt(d,3)),this.parts.push(c),this}pair(t,e){const i=e.at??[0,0,0],n=e.rot??[0,0,0];return this.add(t(1),e),this.add(t(-1),{...e,at:[-i[0],i[1],i[2]],rot:[n[0],-n[1],-n[2]]}),this}nav(t,e){return this.lights.push({offset:new A(...t),color:j3[e],size:0,blink:tT[e],engine:!1}),this}engine(t,e,i){return this.lights.push({offset:new A(...t),color:e,size:i,blink:[0,0,1,1],engine:!0}),this}build(t,e){const i=u2(this.parts,!1);for(const n of this.parts)n.dispose();i.scale(t,t,t),i.computeBoundingSphere();for(const n of this.lights)n.offset.multiplyScalar(t),n.size=n.engine?n.size*t:e;return{geometry:i,lights:this.lights,radius:i.boundingSphere.radius}}}function ya(s,t,e=1){const i=new Yh;s.forEach(([r,a],o)=>o?i.lineTo(r*e,a):i.moveTo(r*e,a));const n=new Pl(i,{depth:t,bevelEnabled:!1});return n.rotateX(In),n.translate(0,t/2,0),n}function lh(s,t){const e=new Yh;s.forEach(([n,r],a)=>a?e.lineTo(n,r):e.moveTo(n,r));const i=new Pl(e,{depth:t,bevelEnabled:!1});return i.rotateY(-In),i.translate(t/2,0,0),i}function is(s,t,e,i=10){const n=new hn(s,t,e,i,1);return n.rotateX(In),n}function Jh(s){const t=new Wh(s,12);return t.rotateY(Math.PI),t}function eT(){const s=new Ha,t=[1,1,.78];s.add(is(.075,.092,.62,12),{scale:t}).add(new vl(.075,.2,12).rotateX(In),{at:[0,0,.41],scale:t}).add(new vl(.024,.062,12).rotateX(In),{color:es,rough:.8,at:[0,0,.48],scale:t}).add(new Le(.15,.022,.62),{color:es,rough:.8,at:[0,-.062,0]}).pair(()=>is(.026,.03,.13,8),{at:[.052,.05,-.25]}).add(new Qi(.06,12,6),{color:mg,glow:.35,rough:.12,metal:.6,at:[0,.043,.3],scale:[.95,.55,1.7]}).pair(e=>ya([[.02,.12],[.37,-.2],[.37,-.29],[.02,-.3]],.022,e),{at:[0,-.035,0]}).pair(e=>ya([[.02,.125],[.372,-.198],[.372,-.225],[.02,.085]],.025,e),{color:es,rough:.8,at:[0,-.035,0]}).pair(e=>ya([[.25,-.18],[.37,-.2],[.37,-.29],[.25,-.29]],.026,e),{color:es,at:[0,-.035,0]}).add(lh([[-.31,.05],[-.13,.05],[-.28,.25],[-.34,.25]],.018),{}).add(lh([[-.33,.21],[-.28,.21],[-.282,.25],[-.34,.25]],.022),{color:Ip,glow:.6}).pair(()=>new Le(.006,.012,.5),{color:Ip,glow:.9,at:[.089,0,.03]});for(const[e,i]of[[0,.028],[.046,-.022],[-.046,-.022]])s.add(is(.028,.036,.07,10),{color:Ga,metal:.7,rough:.35,at:[e,i,-.335]}),s.add(Jh(.028),{color:yl,glow:1.3,at:[e,i,-.376]}),s.engine([e,i,-.39],"#8fbaff",.075);return s.nav([.37,-.035,-.25],"red").nav([-.37,-.035,-.25],"green").nav([0,.255,-.33],"white"),s.build(.35,.018)}function iT(){const s=new Ha;return s.add(new _l(.5,0),{color:"#c7cdd8",at:[0,0,.06],scale:[.15,.09,1.02]}).add(new _l(.5,0),{color:mg,glow:.4,rough:.1,metal:.5,at:[0,.04,.2],scale:[.075,.06,.32]}).pair(t=>ya([[.05,.02],[.38,-.2],[.4,-.28],[.06,-.22]],.02,t),{color:"#a9b1be",at:[0,-.01,0]}).pair(t=>ya([[.33,-.17],[.38,-.2],[.4,-.28],[.34,-.25]],.024,t),{color:"#ff9a3c",glow:.5,at:[0,-.01,0]}).pair(()=>is(.045,.056,.44,8),{color:"#565f6d",metal:.55,rough:.4,at:[.16,0,-.17]}).pair(()=>new Le(.008,.01,.3),{color:"#5ff0ff",glow:1.2,at:[.205,0,-.14]}).pair(()=>Jh(.045),{color:"#5fd8f0",glow:1.4,at:[.16,0,-.397]}).add(lh([[-.3,.02],[-.12,.02],[-.26,.13],[-.31,.13]],.014),{color:"#a9b1be"}),s.engine([.16,0,-.41],"#7ff2ff",.095).engine([-.16,0,-.41],"#7ff2ff",.095),s.nav([.4,-.01,-.27],"red").nav([-.4,-.01,-.27],"green").nav([0,.135,-.3],"white"),s.build(.5,.022)}function nT(){const s=new Ha;s.add(new Le(.06,.05,.72),{color:Ga,at:[0,0,0]}).add(is(.04,.09,.24,6),{color:xa,at:[0,0,.43],scale:[1.15,1,.75],rot:[0,0,Math.PI/6]}).add(new Le(.07,.045,.1),{color:xa,at:[0,.07,.37]}).add(new Le(.072,.01,.022),{color:oh,glow:2.2,at:[0,.078,.418]}).add(new Le(.012,.004,.52),{color:yl,glow:1.1,at:[0,.027,.02]}).add(new hn(.004,.004,.07,4),{color:Ga,at:[0,.12,.34]}).add(new Qi(.045,10,4,0,Math.PI*2,0,.7),{color:xa,at:[0,.1,.06],rot:[.5,0,0]});for(let t=0;t<7;t++){const e=.34+t*.024,i=.09-(e-.31)/.24*.05;s.pair(()=>new Le(.004,.008,.012),{color:oh,glow:2,at:[i*1+.004,.012,e]})}for(const t of[.15,-.04])for(const[e,i]of[[.066,.05],[-.066,.05],[.066,-.05],[-.066,-.05]])s.add(is(.036,.036,.17,10),{color:t>0?"#c4cad3":"#9aa3af",at:[e,i,t]}),s.add(is(.038,.038,.012,10),{color:es,at:[e,i,t+.06]});s.pair(()=>new Le(.26,.005,.15),{color:"#2a2e35",rough:.7,at:[.165,0,-.22]});for(const t of[-.05,0,.05])s.pair(()=>new Le(.24,.006,.008),{color:"#ff7a3a",glow:.8,at:[.165,0,-.22+t]});s.add(new Le(.17,.13,.13),{color:"#6c7480",at:[0,0,-.34]}),s.add(new Le(.175,.02,.135),{color:es,at:[0,.04,-.34]});for(const[t,e]of[[.045,.036],[-.045,.036],[.045,-.036],[-.045,-.036]])s.add(is(.032,.048,.075,12),{color:"#2f343c",metal:.75,rough:.3,at:[t,e,-.442]}),s.add(Jh(.044),{color:"#7fa9ff",glow:1.1,at:[t,e,-.486]}),s.engine([t,e,-.5],"#9cc7ff",.07);return s.engine([0,0,-.58],"#5d8cff",.2),s.nav([.295,0,-.22],"red").nav([-.295,0,-.22],"green").nav([0,.13,.34],"white").nav([0,.07,-.34],"white"),s.build(2.5,.05)}function sT(){const s=new Ha;s.add(new ga(.4,.045,8,40).rotateX(In),{color:"#cfd5de",rough:.55}).add(new ga(.4,.047,3,40,Math.PI*2).rotateX(In),{color:es,scale:[1,.25,1]});for(let i=0;i<4;i++){const n=i/4*Math.PI*2;s.add(new hn(.012,.012,.3,6),{color:"#99a1ad",at:[Math.cos(n)*.205,0,Math.sin(n)*.205],rot:[0,-n,In]})}for(let i=0;i<28;i++){const n=i/28*Math.PI*2;s.add(new Le(.004,.014,.024),{color:oh,glow:2,at:[Math.cos(n)*.446,.012,Math.sin(n)*.446],rot:[0,-n,0]})}for(let i=0;i<4;i++){const n=i/4*Math.PI*2+Math.PI/4;s.nav([Math.cos(n)*.4,.05,Math.sin(n)*.4],i%2?"green":"red")}const t=new Ha;t.add(new hn(.075,.075,.22,12),{color:"#b9c0cb"}).add(new hn(.09,.09,.03,12),{color:es,at:[0,.06,0]}).add(new hn(.042,.042,.13,10),{color:xa,at:[0,.17,0]}).add(new ga(.036,.008,4,16).rotateX(In),{color:yl,glow:1.6,at:[0,.24,0]}).add(new Le(.024,.62,.024),{color:Ga,at:[0,-.4,0]}).add(new hn(.05,.05,.08,8),{color:"#aeb5c0",at:[0,-.2,0]});for(const i of[-.44,-.62]){t.add(new Le(.62,.012,.012),{color:Ga,at:[0,i,0]}),t.pair(()=>new Le(.24,.14,.006),{color:"#1b2c63",glow:.08,rough:.3,metal:.5,at:[.19,i,0]});for(const n of[-.06,0,.06])t.pair(()=>new Le(.004,.14,.008),{color:"#8a97b5",at:[.19+n,i,0]})}t.engine([0,.25,0],yl,.05),t.nav([0,-.72,0],"white").nav([.31,-.53,0],"red").nav([-.31,-.53,0],"green");const e=.85;return{ring:s.build(e,.02),core:t.build(e,.02)}}function rT(){const s=new Xa({vertexColors:!0,flatShading:!0,roughness:.5,metalness:.2});return s.onBeforeCompile=t=>{t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 aMat;
varying vec3 vMat;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vMat = aMat;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vMat;`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = vMat.y;`).replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor = vMat.z;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
        totalEmissiveRadiance += diffuseColor.rgb * vMat.x;
        // A faint signal-blue rim keeps night-side silhouettes readable.
        float rim = 1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
        totalEmissiveRadiance += vec3(0.16, 0.3, 0.62) * (rim * rim * rim) * 0.32 + diffuseColor.rgb * 0.018;`)},s.customProgramCacheKey=()=>"ship-hull",s}function Vc(s,t,e,i,n,r,a,o){let l=(t-s)/n-(e-s)/(n+r)+(e-t)/r,c=(e-t)/r-(i-t)/(r+a)+(i-e)/a;l*=r,c*=r;const u=-3*t+3*e-2*l-c,f=2*t-2*e+l+c;return t+o*(l+o*(u+o*f))}function Gc(s,t){return Math.max(Math.pow(s.distanceToSquared(t),.25),1e-4)}class Np{constructor(t,{samples:e=16,speedAt:i=()=>1}={}){this.points=t,this.samples=e,this.speedAt=i;const n=t.length*e+1;this.xyz=new Float32Array(n*3),this.length=new Float32Array(n),this.speed=new Float32Array(n),this.segmentLength=new Float32Array(t.length),this.lapLength=0,this.lapTime=0}rebuild(){const{points:t,samples:e,xyz:i,length:n,speed:r}=this,a=t.length;let o=0,l=0,c=0;for(let h=0;h<a;h++){const d=t[(h-1+a)%a],p=t[h],v=t[(h+1)%a],g=t[(h+2)%a],m=Gc(d,p),M=Gc(p,v),b=Gc(v,g);for(let _=0;_<e;_++){const S=_/e,y=o*3;if(i[y]=Vc(d.x,p.x,v.x,g.x,m,M,b,S),i[y+1]=Vc(d.y,p.y,v.y,g.y,m,M,b,S),i[y+2]=Vc(d.z,p.z,v.z,g.z,m,M,b,S),r[o]=this.speedAt(i[y],i[y+1],i[y+2]),o>0){const T=Math.hypot(i[y]-i[y-3],i[y+1]-i[y-2],i[y+2]-i[y-1]);l+=T,c+=T/Math.max(.001,(r[o-1]+r[o])/2)}n[o]=l,o++}}const u=o*3;i[u]=i[0],i[u+1]=i[1],i[u+2]=i[2];const f=Math.hypot(i[u]-i[u-3],i[u+1]-i[u-2],i[u+2]-i[u-1]);l+=f,c+=f/Math.max(.001,(r[o-1]+r[0])/2),n[o]=l,r[o]=r[0];for(let h=0;h<a;h++)this.segmentLength[h]=n[(h+1)*e]-n[h*e];this.lapLength=l,this.lapTime=c}locate(t,e){const{samples:i,xyz:n,length:r,speed:a}=this,o=this.points.length,l=Math.floor(t)%o,c=t-Math.floor(t),u=l*i,f=r[u]+c*this.segmentLength[l];let h=u;for(;h<u+i-1&&r[h+1]<f;)h++;const d=Math.max(1e-6,r[h+1]-r[h]),p=Math.min(1,Math.max(0,(f-r[h])/d)),v=h*3,g=v+3;return e.set(n[v]+(n[g]-n[v])*p,n[v+1]+(n[g+1]-n[v+1])*p,n[v+2]+(n[g+2]-n[v+2])*p),a[h]+(a[h+1]-a[h])*p}advance(t,e){const i=this.points.length;let n=t,r=e;for(let a=0;a<i*2&&r>0;a++){const o=Math.floor(n)%i,l=Math.max(1e-6,this.segmentLength[o]),c=(1-(n-Math.floor(n)))*l;r<c?(n+=r/l,r=0):(n=Math.floor(n)+1,r-=c)}return n%i}}const ar=new A,Up=new A,Op=new le,aT=new Ri,oT=new A(0,0,1);function gg(s,t,e,i){return ar.crossVectors(e,t),ar.lengthSq()<1e-8&&ar.set(1,0,0),ar.normalize(),Up.crossVectors(t,ar).normalize(),Op.makeBasis(ar,Up,t),s.setFromRotationMatrix(Op),i&&s.multiply(aT.setFromAxisAngle(oT,i)),s}const Hc=Math.PI*2,rn=Math.PI/180,Wc=new A(0,1,0),Bp=(s,t,e)=>{const i=Rt((e-s)/(t-s),0,1);return i*i*(3-2*i)};function Xc(s,t,e){e.set(0,0,0);for(let i=s.object3D;i&&i!==t;i=i.parent)e.add(i.position);return e}class ko{constructor(t,e,i,n,r){P(this,"throttle",1);P(this,"forward",new A(0,0,1));P(this,"bank",0);this.id=t,this.name=e,this.object3D=new Ee,this.object3D.name=t,this.mesh=new ae(i.geometry,n),this.object3D.add(this.mesh),this.radius=i.radius,this.anchors=[{object:this.mesh,lights:i.lights}],r.add(this.object3D)}}const lT={rate:50,bankGain:0,maxBank:0},cT={rate:4,bankGain:.8,maxBank:.7},uT={rate:2.5,bankGain:2.5,maxBank:.5},hT=new A;function kp(s,t,e,i,{rate:n,bankGain:r,maxBank:a}){const o=hT.copy(s.forward);s.forward.lerp(t,1-Math.exp(-n*i)).normalize();const l=i>0?o.cross(s.forward).dot(e)/i:0;s.bank=Ye(s.bank,Rt(-l*r,-a,a),2.5,i),gg(s.object3D.quaternion,s.forward,e,s.bank)}class fT{constructor(t){P(this,"list",[]);this.system=t,t.ships=this,this.group=new Ee,this.group.name="spacecraft",t.group.add(this.group),this.material=rT(),this.tmp=new A,this.tmp2=new A,this.tangent=new A,this.buildShuttle(),this.buildCourier(),this.buildCruiser(),this.buildStation(),this.buildLights(),this.update(0,0,t.ctx)}add(t){return this.list.push(t),t}buildShuttle(){this.shuttle=this.add(new ko("shuttle","Shuttle",eT(),this.material,this.group)),this.shuttle.orbit={a:12.5,e:.12,inc:28*rn,node:35*rn,period:70,phase:1.1},this.shuttle.trail=new Oc({count:44,duration:5.5,color:"#b9d6ff",colorTail:"#2f7bff",opacity:.45,widthHead:.018,widthTail:.007,minPx:1.1,maxPx:3,fade:1.2,headFade:.12}),this.group.add(this.shuttle.trail.mesh)}shuttleAt(t,e){const{a:i,e:n,inc:r,node:a,period:o,phase:l}=this.shuttle.orbit,c=l+Hc*t/o,u=c+2*n*Math.sin(c),f=i*(1-n*n)/(1+n*Math.cos(u)),h=f*Math.cos(u),d=f*Math.sin(u),p=d*Math.sin(r),v=d*Math.cos(r);return e.set(h*Math.cos(a)-v*Math.sin(a),p,h*Math.sin(a)+v*Math.cos(a))}updateShuttle(t,e){const i=this.shuttle,n=this.shuttleAt(t,i.object3D.position);this.shuttleAt(t+.05,this.tangent).sub(n).normalize();const r=this.tmp.copy(n).normalize();kp(i,this.tangent,r,e||1,lT),i.throttle=.8,this.trailFrom(i,i.trail,e)}buildCourier(){this.courierFrame=new Ee,this.courierFrame.name="courier-frame",this.group.add(this.courierFrame),this.courier=this.add(new ko("courier","Courier",iT(),this.material,this.courierFrame)),this.courierShape=[[0,4,.8,7.4],[1,-4.6,.6,3.8],[1,2.2,.3,4.4],[1,4.8,0,0],[1,2.2,-.3,-4.4],[1,-4.6,-.6,-3.8],[0,4,-.8,-7.4],[0,-5.2,-.5,-6.6],[0,-8.6,0,0],[0,-5.2,.5,6.6]],this.courierPoints=this.courierShape.map(()=>new A),this.moonDistance=42,this.courierPath=new Np(this.courierPoints,{samples:14,speedAt:(i,n,r)=>{const a=Math.hypot(i,n,r)-5,o=Math.hypot(i-this.moonDistance,n,r)-1.4;return .45+1.1*Bp(1.5,8,Math.min(a,o))}}),this.courier.place=.3,this.courier.pace=1,this.courier.trail=new Oc({count:40,duration:3.2,color:"#9ff6ff",colorTail:"#2f7bff",opacity:.42,widthHead:.02,widthTail:.007,minPx:1.1,maxPx:3,fade:1.2,headFade:.16}),this.courierFrame.add(this.courier.trail.mesh);const{i:t,node:e}=this.system.moon.def.orbit;this.moonNormal=new A(Math.sin(t*rn)*Math.sin(e*rn),Math.cos(t*rn),Math.sin(t*rn)*Math.cos(e*rn)).normalize(),this.basis=new le}updateCourier(t,e){const i=Xc(this.system.moon,this.system.group,this.tmp),n=i.length();this.moonDistance=n;const r=i.divideScalar(n),a=this.tmp2.copy(this.moonNormal);a.addScaledVector(r,-a.dot(r)).normalize();const o=this.tangent.crossVectors(r,a);this.courierFrame.quaternion.setFromRotationMatrix(this.basis.makeBasis(r,a,o));for(let l=0;l<this.courierShape.length;l++){const c=this.courierShape[l];this.courierPoints[l].set(c[0]*n+c[1],c[2],c[3])}this.courierPath.rebuild(),this.moveAlong(this.courier,this.courierPath,60,e,Wc,cT),this.trailFrom(this.courier,this.courier.trail,e)}buildCruiser(){this.cruiser=this.add(new ko("cruiser","Cruiser",nT(),this.material,this.group));const{system:t}=this;this.route=[t.home,t.bodyById("mars"),t.bodyById("jupiter")],this.routeClearance=[34,13,60],this.routeAt=this.route.map(()=>new A),this.cruiserPoints=Array.from({length:this.route.length*4},()=>new A),this.cruiserPath=new Np(this.cruiserPoints,{samples:16,speedAt:(e,i,n)=>{let r=1/0;for(let a=0;a<this.route.length;a++){const o=this.routeAt[a],l=Math.hypot(e-o.x,i-o.y,n-o.z)-this.route[a].radius;r=Math.min(r,l)}return .12+1.9*Bp(10,260,r)}}),this.cruiser.place=2.6,this.cruiser.pace=1,this.cruiser.trail=new Oc({count:64,duration:7,color:"#cfe0ff",colorTail:"#3d6dff",opacity:.5,widthHead:.16,widthTail:.05,minPx:1.3,maxPx:6,energyFloor:.35,fade:1.2,headFade:.1}),this.group.add(this.cruiser.trail.mesh),this.legDir=[new A,new A],this.swing={u:new A,w:new A,n:new A}}layCruiserRoute(){const{route:t,routeAt:e,routeClearance:i,cruiserPoints:n}=this,r=t.length;for(let f=0;f<r;f++)Xc(t[f],this.system.group,e[f]);const a=this.legDir[0],o=this.legDir[1],{u:l,w:c,n:u}=this.swing;for(let f=0;f<r;f++){const h=e[(f-1+r)%r],d=e[f],p=e[(f+1)%r],v=i[f];a.subVectors(d,h).normalize(),o.subVectors(p,d).normalize(),u.crossVectors(a,o),u.lengthSq()<1e-6&&u.copy(Wc),u.normalize(),l.subVectors(a,o),l.lengthSq()<1e-4&&l.crossVectors(a,u),l.normalize(),c.addVectors(a,o),c.lengthSq()<1e-4&&c.crossVectors(u,l),c.normalize();const m=(50+50*((1-a.dot(o))/2))*rn,M=f*4;n[M].copy(d).addScaledVector(l,v*Math.cos(m)).addScaledVector(c,-v*Math.sin(m)),n[M+1].copy(d).addScaledVector(l,v),n[M+2].copy(d).addScaledVector(l,v*Math.cos(m)).addScaledVector(c,v*Math.sin(m));const b=n[M+3];b.addVectors(d,p).multiplyScalar(.5),b.y+=(f%2?-1:1)*.07*d.distanceTo(p)}}updateCruiser(t){this.layCruiserRoute(),this.cruiserPath.rebuild(),this.moveAlong(this.cruiser,this.cruiserPath,360,t,Wc,uT),this.trailFrom(this.cruiser,this.cruiser.trail,t)}moveAlong(t,e,i,n,r,a){const o=e.lapTime/i;t.pace=n>0?Ye(t.pace,o,1.5,n):o;const l=e.locate(t.place,t.object3D.position);t.throttle=Rt(l/1.2,.3,1),t.place=e.advance(t.place,l*t.pace*n),e.locate(e.advance(t.place,t.radius*1.5),this.tangent),this.tangent.sub(t.object3D.position),this.tangent.lengthSq()>1e-10?this.tangent.normalize():this.tangent.copy(t.forward),kp(t,this.tangent,r,n||1,a)}buildStation(){const t=sT(),e=this.add(new ko("station","Station",t.core,this.material,this.group));e.ring=new ae(t.ring.geometry,this.material),e.object3D.add(e.ring),e.anchors.push({object:e.ring,lights:t.ring.lights}),e.radius=Math.max(t.core.radius,t.ring.radius),e.orbit={radius:3.1,inc:58*rn,node:20*rn,period:50,phase:.4},e.axis=new A(.28,1,-.16).normalize(),this.station=e}updateStation(t){const e=this.station,{radius:i,inc:n,node:r,period:a,phase:o}=e.orbit,l=o+Hc*t/a,c=i*Math.cos(l),u=i*Math.sin(l),f=e.object3D.position;f.set(c*Math.cos(r)-u*Math.cos(n)*Math.sin(r),u*Math.sin(n),c*Math.sin(r)+u*Math.cos(n)*Math.cos(r)),f.add(Xc(this.system.moon,this.system.group,this.tmp));const h=this.tmp.copy(this.system.sunPosition).sub(f).normalize();h.addScaledVector(e.axis,-h.dot(e.axis)),h.lengthSq()<1e-8&&h.set(1,0,0),gg(e.object3D.quaternion,h.normalize(),e.axis,0),e.ring.rotation.y=t*Hc/34,e.throttle=.6}buildLights(){let t=0;for(const i of this.list)for(const n of i.anchors)t+=n.lights.length;this.glows=new og(t,{minPx:1.6,maxPx:150});let e=0;for(const i of this.list)for(const n of i.anchors)for(const r of n.lights){r.index=e;const a=r.blink.slice();a[0]>0&&(a[1]=(a[1]+this.list.indexOf(i)*.37)%1),this.glows.define(e,{color:r.color,size:r.size,intensity:r.engine?1:1.2,blink:a}),e++}this.group.add(this.glows.points)}updateLights(t){const e=this.glows,i=this.tmp;for(const n of this.list){n.object3D.updateWorldMatrix(!0,!0);for(const r of n.anchors)for(const a of r.lights)if(i.copy(a.offset).applyMatrix4(r.object.matrixWorld),e.setPosition(a.index,i),a.engine){const o=this.system.reduced?1:.88+.12*Math.sin(t*41+a.index*2.3)*Math.sin(t*17+a.index);e.intensities[a.index]=(.45+.75*n.throttle)*o}}e.material.uniforms.uTime.value=t,e.commit()}trailFrom(t,e,i){const n=this.tmp2.set(0,0,-t.radius*.85);n.applyQuaternion(t.object3D.quaternion).add(t.object3D.position),e.update(n,i)}update(t,e,i){i?.camera&&Zh(this.system.renderer,i.camera),this.updateShuttle(t,e),this.updateCourier(t,e),this.updateCruiser(e),this.updateStation(t),this.updateLights(t);for(const n of this.list)n.trail&&(n.trail.material.uniforms.uTime.value=t)}dispose(){this.group.removeFromParent();for(const t of this.list){for(const e of t.anchors)e.object.geometry.dispose();t.trail?.dispose()}this.glows.dispose(),this.material.dispose(),this.system.ships===this&&(this.system.ships=null)}}const dT=[-.8677,.4972,3e-4],pT=[-.0549,-.0965,.9938],vg=9,zp=([s,t,e])=>`vec3(${s.toFixed(4)}, ${t.toFixed(4)}, ${e.toFixed(4)})`,mT={name:"sky",kind:"data",glsl:`
    float nebula(vec3 d, vec3 center, float size, float seed) {
      float a = angleTo(d, normalize(center)) / size;
      if (a > 2.4) return 0.0;
      vec3 q = warp3(d * 2.2 + seed, 1.1, 0.5);
      float cloud = sstep(-0.25, 0.65, fbm(q * 1.3, 5));
      float wisps = ridged(q * 1.8 + seed, 4);
      return cloud * (0.45 + 0.7 * wisps * wisps) * exp(-a * a * 1.3);
    }

    vec4 bake(vec3 d) {
      vec3 pole = ${zp(dT)};
      vec3 center = ${zp(pT)};
      vec3 side = cross(pole, center);
      float b = asin(clamp(dot(d, pole), -1.0, 1.0));
      float l = atan(dot(d, side), dot(d, center));

      // star clouds at three scales: big clouds, knots and a fine grain
      float clouds = 0.5 + 0.5 * fbm(d * 4.0 + 2.0, 6);
      float knots = 0.5 + 0.5 * fbm(d * 11.0 + 5.0, 5);
      float grain = 0.5 + 0.5 * fbm(d * 34.0, 3);
      float bw = b + 0.03 * fbm(d * 3.0 + 7.0, 4);
      float core = exp(-pow(bw / 0.11, 2.0));
      float wide = exp(-pow(bw / 0.3, 2.0));
      float bulge = exp(-(l * l) / 0.16 - (bw * bw) / 0.03);
      float toCenter = 0.5 + 0.5 * cos(l);
      float density = core * pow(clouds, 1.6) * 1.8 * (0.6 + 0.8 * knots) + wide * 0.12 * clouds;
      density *= 0.4 + 0.6 * toCenter;
      density += bulge * (0.8 + 0.6 * knots);
      density *= 0.75 + 0.5 * grain;

      // dust lanes, and the Great Rift splitting the band towards the centre
      float lanes = sstep(0.5, 0.85, ridged(d * 3.6 + 2.0, 5)) * exp(-pow(bw / 0.08, 2.0));
      float rift = exp(-pow((bw + 0.012 + 0.02 * sin(l * 3.0)) / 0.028, 2.0)) * band(l, -0.9, 1.2, 0.35);
      float dust = clamp(lanes * 0.7 + rift * (0.55 + 0.35 * knots), 0.0, 0.9);
      float stars = density;
      density *= 1.0 - dust;

      vec3 cool = vec3(0.62, 0.72, 1.0);
      vec3 warm = vec3(1.0, 0.86, 0.7);
      // kept dim and cool so the band sits behind the twinkling stars and the FUI blues
      vec3 color = mix(cool, warm, clamp(bulge * 1.2 + core * toCenter * 0.15, 0.0, 1.0)) * density * 0.018;
      // a few soft nebulae in signal blues, violet and teal
      color += vec3(0.14, 0.3, 1.0) * nebula(d, vec3(0.62, 0.28, 0.73), 0.32, 1.0) * 0.018;
      color += vec3(0.42, 0.22, 0.95) * nebula(d, vec3(-0.75, -0.35, 0.56), 0.26, 4.0) * 0.016;
      color += vec3(0.08, 0.55, 0.62) * nebula(d, vec3(0.2, -0.62, -0.75), 0.3, 7.0) * 0.013;
      color += vec3(0.25, 0.32, 0.95) * nebula(d, vec3(-0.35, 0.82, -0.45), 0.24, 9.0) * 0.01;
      // unresolved stars: a faint grain that follows the band
      color += cool * pow(0.5 + 0.5 * snoise(d * 90.0), 6.0) * (0.002 + 0.01 * stars);
      return vec4(sqrt(color * ${vg.toFixed(1)}), clamp(0.18 + stars * 0.8, 0.0, 1.0));
    }
  `},gT=`
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * viewMatrix * vec4(cameraPosition + position * 100.0, 1.0);
  }
`,vT=`
  #define PI 3.141592653589793
  uniform sampler2D uSky;
  uniform float uReady;
  uniform float uStarScale;
  uniform float uStarPixel;
  uniform float uOpacity;
  varying vec3 vDir;
  ${ug}

  void main() {
    vec3 d = normalize(vDir);
    vec2 uv = vec2(fract(atan(d.z, -d.x) / (2.0 * PI)), 1.0 - acos(clamp(d.y, -1.0, 1.0)) / PI);
    vec4 sky = texture2D(uSky, uv);
    vec3 color = sky.rgb * sky.rgb * (uReady / ${vg.toFixed(1)});
    float density = mix(0.3, sky.a, uReady);

    // tiny stars: one candidate per cell of a 3D grid, kept near the sphere
    vec3 q = d * uStarScale;
    vec3 cell = floor(q);
    vec3 h = hash33(cell);
    vec3 star = cell + 0.25 + 0.5 * h;
    float shell = abs(length(star) - uStarScale);
    float present = step(shell, 0.22) * step(hash13(cell + 17.0), 0.06 + 0.5 * density * density);
    float dist = length(cross(d, normalize(star))) * uStarScale / uStarPixel;
    float bright = 0.1 + 0.9 * pow(h.z, 8.0);
    vec3 tint = mix(vec3(0.72, 0.8, 1.0), vec3(1.0, 0.9, 0.78), h.x);
    color += tint * present * bright * exp(-dist * dist * 2.2) * 0.32;

    // dither so the faint gradients don't band in 8 bits
    gl_FragColor = vec4(color * uOpacity, 1.0);
    #include <colorspace_fragment>
    gl_FragColor.rgb += (hash13(vec3(gl_FragCoord.xy, 3.0)) - 0.5) / 255.0;
  }
`;class _T{constructor(t){P(this,"uniforms",{uSky:{value:null},uReady:{value:0},uStarScale:{value:300},uStarPixel:{value:.2},uOpacity:{value:1}});P(this,"viewport",new lt);this.system=t,this.renderer=t.renderer;const e=t.visuals?.baker;this.baker=e??new dg(t.renderer,{coarse:t.coarse}),this.ownsBaker=!e;const i=t.coarse?1024:2048;this.job=this.baker.bake(mT,"data",{width:i,height:i/2,mipmaps:!1,priority:()=>-1}),this.uniforms.uSky.value=this.job.texture;const n=new he({name:"sky-dome",uniforms:this.uniforms,vertexShader:gT,fragmentShader:vT,side:ti,depthTest:!1,depthWrite:!1,blending:Ke});this.mesh=new ae(new Qi(1,32,16),n),this.mesh.name="sky-dome",this.mesh.frustumCulled=!1,this.mesh.renderOrder=-1e3,t.group.add(this.mesh)}update(t,e,i){this.ownsBaker&&this.baker.update();const n=this.uniforms;this.job.done&&n.uReady.value<1&&(n.uReady.value=Math.min(1,n.uReady.value+e/1.2)),this.renderer.getDrawingBufferSize(this.viewport);const r=i.camera,a=2*Math.tan((r.fov??40)*Math.PI/360)/Math.max(this.viewport.y,1),o=Math.round(1/(a*5)/16)*16;n.uStarScale.value=o,n.uStarPixel.value=a*o}dispose(){this.mesh.removeFromParent(),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.ownsBaker?this.baker.dispose():this.baker.release(this.job)}}const Vp=Math.PI*2,xT=Math.PI/180,yT=.2,MT=12;function Gp(s,t,e={}){return{years:0,id:s.id,name:s.name,kind:s.kind,def:s,radius:s.radius,facts:s.facts,color:s.color,object3D:t,spin:null,mesh:null,pickRadius:Math.max(s.radius*1.15,1.6),spinSeconds:G2(s.rotationHours),...e}}function ST(s){const t=new Qi(s.radius,48,24),e=new Xa({color:s.color,roughness:1,metalness:0}),i=new ae(t,e);return s.shape&&i.scale.set(...s.shape),i}class bT{constructor({scene:t,renderer:e,camera:i,coarse:n=!1,reduced:r=!1,now:a=Date.now(),visuals:o=null}){P(this,"group",new Ee);P(this,"frame",new Ee);P(this,"bodies",[]);P(this,"worlds",[]);P(this,"systems",[]);P(this,"sunPosition",new A);P(this,"timeScale",1);P(this,"focus",null);P(this,"years");P(this,"ctx");this.renderer=e,this.camera=i,this.coarse=n,this.reduced=r,this.years=z2(a),this.visuals=o,this.group.name="solar-system",this.frame.name="heliocentric-frame",this.group.add(this.frame),t.add(this.group),this.sunLight=new Py("#fff4e0",3.2,0,0),this.ambient=new Ry("#7d90c0",.26),this.group.add(this.ambient),this.sun=this.addBody(kw,this.frame),this.sun.object3D.add(this.sunLight),this.home=Gp(Cc,new Ee),this.home.pickRadius=Cc.radius,this.group.add(this.home.object3D),this.bodies.push(this.home),this.moon=this.addBody(zw,this.group);for(const l of eg)this.worlds.push(this.addBody(l,this.frame));for(const l of this.bodies)l.years=this.years;this.ctx={years:this.years,dtYears:0,timeScale:this.timeScale,spinDt:0,sunPosition:this.sunPosition,camera:i,coarse:n,reduced:r,time:0,dt:0},this.update(0,0)}addBody(t,e){const i=new Ee;i.name=t.id;const n=new Ee;n.rotation.z=(t.tilt??0)*xT;const r=new Ee;n.add(r),i.add(n),e.add(i);const a=Gp(t,i);a.tilt=n,a.spin=r;const o=this.visuals?.createBody?.(t,{coarse:this.coarse,renderer:this.renderer})??{mesh:ST(t)};if(r.add(o.mesh),o.extras)for(const l of o.extras)n.add(l);return a.mesh=o.mesh,a.visual=o,this.bodies.push(a),a}bodyById(t){return this.bodies.find(e=>e.id===t)??null}worldPosition(t,e){return t.object3D.getWorldPosition(e)}setTimeScale(t){this.timeScale=t}addSystem(t){return this.systems.push(t),t}setOrbitsVisible(t){this.visuals?.setOrbitsVisible?.(t)}dispose(){for(const t of this.systems)t.dispose?.();if(this.systems.length=0,this.visuals?.dispose)this.visuals.dispose();else for(const t of this.bodies)t.mesh?.geometry.dispose(),t.mesh?.material.dispose();this.group.removeFromParent()}update(t,e){const i=this.reduced?Math.min(this.timeScale,1):this.timeScale,n=e*i/Vw;this.years+=n;const r=e*(i<=1?i:Math.sqrt(i)*2);za(Cc.orbit,this.years,this.frame.position).multiplyScalar(-1),this.sunPosition.copy(this.frame.position);for(const l of this.bodies){const{def:c}=l;if(c.parent?l.years+=Math.min(n,e*c.orbit.period/MT):l.years=this.years,c.orbit&&l!==this.home&&za(c.orbit,l.years,l.object3D.position),l.spin&&l.spinSeconds){const u=r/l.spinSeconds,f=e*yT;l.spin.rotation.y=(l.spin.rotation.y+Math.max(-f,Math.min(f,u))*Vp)%Vp}}this.moon.spin&&(this.moon.spin.rotation.y=Math.atan2(this.moon.object3D.position.x,this.moon.object3D.position.z)+Math.PI);const o=this.ctx;o.years=this.years,o.dtYears=n,o.timeScale=i,o.spinDt=r,o.time=t,o.dt=e,this.visuals?.update?.(t,e,o,this);for(const l of this.systems)l.update(t,e,o)}}const Hp=[["#9db4ff",.12],["#cad8ff",.2],["#f6f4ff",.38],["#fff1df",.18],["#ffd2a1",.12]],wT=`
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vTwinkle = 0.62 + 0.38 * sin(uTime * (0.6 + aPhase * 2.2) + aPhase * 31.0);
    vColor = aColor;
    gl_PointSize = clamp(aSize * uSize * uPixelRatio * (260.0 / -mv.z), 0.0, 9.0 * uPixelRatio);
    gl_Position = projectionMatrix * mv;
  }
`,ET=`
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = 1.0 - smoothstep(0.0, 0.5, d);
    a = a * a * vTwinkle * uOpacity;
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor, a);
    #include <colorspace_fragment>
  }
`,TT=[["#1d4bd8",.34,[-260,120,-700],900,.4],["#3b2a9e",.26,[320,-160,-820],1100,2.1],["#0f6f8f",.18,[80,260,-600],700,4]];function DT(s,t){const e=hi(t),i=new Float32Array(4096).map(()=>e()),n=(f,h)=>{const d=Math.floor(f),p=Math.floor(h),v=f-d,g=h-p,m=v*v*(3-2*v),M=g*g*(3-2*g),b=(x,E)=>i[(E&63)*64+(x&63)|0],_=b(d,p),S=b(d+1,p),y=b(d,p+1),T=b(d+1,p+1);return _+(S-_)*m+(y-_)*M+(_-S-y+T)*m*M},r=(f,h)=>{let d=0,p=.5,v=1;for(let g=0;g<5;g++)d+=p*n(f*v,h*v),v*=2.03,p*=.5;return d},a=document.createElement("canvas");a.width=a.height=s;const o=a.getContext("2d"),l=o.createImageData(s,s),c=4/s;for(let f=0;f<s;f++)for(let h=0;h<s;h++){const d=h*c,p=f*c,v=r(d+5.2,p+1.3)*2.2;let g=r(d+v,p+v*.8);const m=h/s-.5,M=f/s-.5,b=Math.max(0,1-Math.sqrt(m*m+M*M)*2);g=Math.max(0,g-.32)*2.1*b*b;const _=(f*s+h)*4;l.data[_]=l.data[_+1]=l.data[_+2]=255,l.data[_+3]=Math.min(255,g*255)}o.putImageData(l,0,0);const u=new Al(a);return u.colorSpace=$e,u}class AT{constructor(t){P(this,"group",new Ee);P(this,"uniforms",{uTime:{value:0},uPixelRatio:{value:1},uSize:{value:1},uOpacity:{value:1}});P(this,"starCount");const e=hi(3),i=t.coarse?2600:4200;this.starCount=i;const n=new Float32Array(i*3),r=new Float32Array(i*3),a=new Float32Array(i),o=new Float32Array(i),l=new Ct;for(let h=0;h<i;h++){const d=e()*2-1,p=e()*Math.PI*2,v=140+e()**.7*760,g=Math.sqrt(1-d*d);n.set([v*g*Math.cos(p),v*d,v*g*Math.sin(p)],h*3),a[h]=.55+e()**7*4.2,o[h]=e();let m=e(),M=Hp[0][0];for(const[b,_]of Hp){if(m<_){M=b;break}m-=_}l.set(M),r.set([l.r,l.g,l.b],h*3)}const c=new ce;c.setAttribute("position",new Wt(n,3)),c.setAttribute("aColor",new Wt(r,3)),c.setAttribute("aSize",new Wt(a,1)),c.setAttribute("aPhase",new Wt(o,1));const u=new Pr(c,new he({uniforms:this.uniforms,vertexShader:wT,fragmentShader:ET,depthTest:!1,depthWrite:!1,blending:Ke}));u.frustumCulled=!1,u.renderOrder=-999,this.group.add(u);const f=DT(t.coarse?192:256,11);for(const[h,d,[p,v,g],m,M]of TT){const b=new Ix(new Cm({map:f,color:new Ct(h),opacity:d,depthTest:!1,depthWrite:!1,blending:Ke,rotation:M}));b.renderOrder=-998,b.position.set(p,v,g),b.scale.setScalar(m),this.group.add(b)}t.scene.add(this.group),t.onResize(()=>this.uniforms.uPixelRatio.value=t.pixelRatio),this.uniforms.uPixelRatio.value=t.pixelRatio,t.onFrame((h,d)=>{this.uniforms.uTime.value=h,this.group.rotation.y+=d*.004,this.group.position.copy(t.camera.position)},10)}}function CT(s,t){const e=document.getElementById("file-input"),i=document.getElementById("drop");e.addEventListener("change",()=>{const o=[...e.files??[]];e.value="",o.length>0&&s(o)});const n=o=>[...o.dataTransfer?.types??[]].includes("Files");let r=0;const a=o=>{o!==!i.hidden&&(o?(i.hidden=!1,ft.fromTo(i,{opacity:0},{opacity:1,duration:.2})):ft.to(i,{opacity:0,duration:.2,onComplete:()=>void(i.hidden=!0)}))};return addEventListener("dragenter",o=>{!n(o)||t()||(o.preventDefault(),r+=1,a(!0))}),addEventListener("dragover",o=>{!n(o)||t()||(o.preventDefault(),o.dataTransfer&&(o.dataTransfer.dropEffect="copy"))}),addEventListener("dragleave",o=>{n(o)&&(r=Math.max(0,r-1),r===0&&a(!1))}),addEventListener("drop",o=>{if(!n(o)||(o.preventDefault(),r=0,a(!1),t()))return;const l=[...o.dataTransfer?.files??[]];l.length>0&&s(l)}),{openPicker:()=>e.click()}}const Je=s=>document.getElementById(s),PT={home:{labels:["View","Range","In view"],hint:"Drag to rotate · Scroll to zoom · B blueprint · P photos",coarseHint:"Drag to rotate · Pinch to zoom · Tap a photo"},space:{labels:["Focus","Range","Time"],hint:"Drag to orbit · Scroll to zoom · M worlds · F fly · G home",coarseHint:"Drag to orbit · Pinch to zoom · Tap a world"},fly:{labels:["Flight","Speed","Nearest"],hint:"WASD move · Q/E down/up · Shift boost · Drag to look · Esc exit",coarseHint:"Stick to move · Drag to look"}};function RT(s){return s===0?"Paused":`×${s}`}function qc(s){return s<1e3?s.toFixed(s<100?1:0).padStart(4,"0"):`${(s/1e3).toFixed(1)}k`}function qi(s,t){s.textContent!==t&&(s.textContent=t)}class LT{constructor(t,e){P(this,"top",Je("hud-top"));P(this,"bottom",Je("hud-bottom"));P(this,"frame",document.querySelector(".hud-frame"));P(this,"target",Je("target"));P(this,"targetLabel",Je("target-label"));P(this,"toastEl",Je("toast"));P(this,"hint",Je("hint"));P(this,"buttons",{blueprint:Je("btn-blueprint"),photos:Je("btn-photos")});P(this,"actionSlot",Je("hud-actions-more"));P(this,"fields",{frames:Je("ro-frames"),aLabel:Je("ro-a-label"),a:Je("ro-a"),bLabel:Je("ro-b-label"),b:Je("ro-b"),cLabel:Je("ro-c-label"),c:Je("ro-c"),fps:Je("ro-fps")});P(this,"coarse");P(this,"store");P(this,"mode","");P(this,"lastWrite",0);P(this,"targetPanel",null);P(this,"toastTimer",0);P(this,"toastShown",!1);this.store=t,this.coarse=e,ft.set([this.top,this.bottom,this.frame],{autoAlpha:0}),this.framesItem=this.fields.frames.parentElement,this.setMode("home")}setMode(t){if(t===this.mode)return;this.mode=t;const{labels:e,hint:i,coarseHint:n}=PT[t];this.fields.aLabel.textContent=e[0],this.fields.bLabel.textContent=e[1],this.fields.cLabel.textContent=e[2],this.framesItem.hidden=t!=="home",this.bottom.dataset.mode=t,this.hint.textContent=this.coarse?n:i,this.lastWrite=-1}setBlueprint(t){this.buttons.blueprint.setAttribute("aria-pressed",String(t))}addAction({id:t,label:e,icon:i,tip:n=e,pressed:r}){const a=document.createElement("button");return a.type="button",a.className="hud-btn",a.id=t,a.dataset.tip=n,a.setAttribute("aria-label",e),r!==void 0&&a.setAttribute("aria-pressed",String(r)),a.innerHTML=`${i}<span class="hud-btn__label">${e}</span>`,this.actionSlot.append(a),a}reveal(){const t=ft.timeline();return t.set([this.top,this.bottom,this.frame],{autoAlpha:1}),t.fromTo(this.top.children,{opacity:0,y:-14},{opacity:1,y:0,duration:.8,stagger:.08,ease:"power3.out"},0),t.fromTo(this.bottom.children,{opacity:0,y:14},{opacity:1,y:0,duration:.8,stagger:.08,ease:"power3.out"},.1),t.fromTo(this.frame.children,{opacity:0,scale:1.8},{opacity:1,scale:1,duration:.9,stagger:.05,ease:"expo.out"},0),[...this.bottom.querySelectorAll("dt")].forEach((e,i)=>{t.to(e,{duration:.6,scrambleText:{text:e.textContent??"",chars:"upperCase",speed:.6}},.2+i*.06)}),t}setDimmed(t){t||ft.set([this.top,this.bottom,this.frame],{visibility:"inherit"}),ft.to([this.top,this.bottom,this.frame],{autoAlpha:t?0:1,duration:t?.3:.5,overwrite:"auto"})}update(t,e,i,n){const r=n?.mode??"home";if(this.setMode(r),i&&this.trackTarget(r==="home"?i.hovered:null,i),t-this.lastWrite<.1)return;this.lastWrite=t;const a=this.store.count,o=this.fields;if(qi(o.frames,_r(a,a)),qi(o.fps,String(Math.round(e)).padStart(2,"0")),r==="fly")qi(o.a,"Free"),qi(o.b,`${qc(n.speed)} u/s`),qi(o.c,n.nearestName??"—");else if(r==="space")qi(o.a,n.focusName),qi(o.b,qc(n.range)),qi(o.c,RT(n.timeScale));else if(i){const{lat:l,lon:c}=i.viewCenter();qi(o.a,s_(l,c)),qi(o.b,qc(n?.range??0));const u=i.front;qi(o.c,u?`${_r(this.store.indexOf(u.photo)+1,a)} ${u.photo.title}`:"—")}}trackTarget(t,e){if(t!==this.targetPanel&&(this.targetPanel=t,ft.to(this.target,{opacity:t?1:0,duration:t?.25:.2,overwrite:"auto"}),t)){const i=this.store.count,n=_r(this.store.indexOf(t.photo)+1,i);if(this.targetLabel.textContent=`${n} · ${t.photo.title} · ${t.photo.category}`,e){const r=e.screenRect(t);ft.fromTo(this.target,{scale:1.25},{scale:1,duration:.35,ease:"expo.out"}),ft.set(this.target,{x:r.x,y:r.y,width:r.width,height:r.height})}}if(t&&e){const i=e.screenRect(t);ft.set(this.target,{x:i.x,y:i.y,width:i.width,height:i.height})}}toast(t,e=!1,i=e?6e3:4200){this.toastEl.textContent=t,this.toastEl.classList.toggle("is-error",e),this.toastShown||(ft.killTweensOf(this.toastEl),ft.fromTo(this.toastEl,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.35,ease:"power2.out"})),this.toastShown=!0,window.clearTimeout(this.toastTimer),i!==1/0&&(this.toastTimer=window.setTimeout(()=>{this.toastShown=!1,ft.to(this.toastEl,{autoAlpha:0,duration:.4})},i))}}const FT='<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.6" /><path d="M2.4 8h11.2M8 2.4c2 2.2 2 9 0 11.2M8 2.4c-2 2.2-2 9 0 11.2" /></svg>',IT='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M9 4.5L12.5 8 9 11.5" /></svg>';function NT(s){const t=Kh[s.id];if(t)return{kind:t.kind,blurb:t.blurb,rows:[["Route",t.facts.route],["Lap",t.facts.lap],["Class",t.facts.crew]]};const e=s.facts??{},i=s.kind==="Star";return{kind:s.kind,blurb:e.blurb??"",rows:[["Diameter",e.diameter],[i?"Place":"From Sun",i?"The centre":e.fromSun],["Day",e.day],["Year",e.year],[i?"Family":"Moons",e.moons]].filter(([,n])=>n)}}class UT{constructor(t){P(this,"root",document.createElement("aside"));P(this,"target",null);P(this,"visible",!1);P(this,"anim",null);this.options=t;const e=this.root;e.className="info-card",e.hidden=!0,e.setAttribute("aria-labelledby","info-title"),e.innerHTML=`
      <div class="info-card__inner">
        <header class="info-card__head">
          <i class="info-card__dot" aria-hidden="true"></i>
          <h2 class="info-card__title" id="info-title" aria-live="polite"></h2>
          <span class="chip info-card__kind"></span>
        </header>
        <p class="info-card__blurb"></p>
        <dl class="info-card__facts mono"></dl>
        <div class="info-card__actions">
          <button class="sheet-btn info-card__home" type="button">${FT}<span>Home</span><kbd class="info-card__key">G</kbd></button>
          <button class="sheet-btn sheet-btn--primary info-card__next" type="button"><span class="info-card__next-label">Next world</span>${IT}</button>
        </div>
      </div>`,this.inner=e.querySelector(".info-card__inner"),this.dot=e.querySelector(".info-card__dot"),this.title=e.querySelector(".info-card__title"),this.kind=e.querySelector(".info-card__kind"),this.blurb=e.querySelector(".info-card__blurb"),this.facts=e.querySelector(".info-card__facts"),this.nextLabel=e.querySelector(".info-card__next-label"),e.querySelector(".info-card__home").addEventListener("click",()=>t.onHome()),e.querySelector(".info-card__next").addEventListener("click",()=>t.onNext()),document.body.append(e)}get height(){return this.visible?this.root.offsetHeight:0}show(t){const e=t!==this.target;if(this.target=t,e&&this.fill(t),this.visible){e&&!this.options.reduced&&ft.fromTo(this.inner,{opacity:.25},{opacity:1,duration:.45,ease:"power2.out",overwrite:!0});return}this.visible=!0,this.root.hidden=!1,this.anim?.kill(),this.anim=this.options.reduced?ft.fromTo(this.root,{opacity:0},{opacity:1,duration:.2}):ft.fromTo(this.root,{opacity:0,y:14},{opacity:1,y:0,duration:.5,ease:"power3.out"})}hide(){this.visible&&(this.visible=!1,this.anim?.kill(),this.root.contains(document.activeElement)&&document.activeElement.blur(),this.anim=ft.to(this.root,{opacity:0,y:this.options.reduced?0:10,duration:this.options.reduced?.15:.3,ease:"power2.in",onComplete:()=>void(this.root.hidden=!0)}))}fill(t){const{kind:e,blurb:i,rows:n}=NT(t);this.dot.style.setProperty("--dot",t.color??"#cfe0ff"),this.title.textContent=t.name,this.kind.textContent=e,this.blurb.textContent=i;const r=n.map(([a,o])=>{const l=document.createElement("div"),c=document.createElement("dt"),u=document.createElement("dd");return c.textContent=a,u.textContent=o,l.append(c,u),l});this.facts.replaceChildren(...r),this.nextLabel.textContent=Kh[t.id]?"Next ship":"Next world"}}const OT=60,Yc=8,Wp={Star:{priority:0,range:1/0},"Home world":{priority:1,range:1/0},Planet:{priority:2,range:1/0},Moon:{priority:3,range:420},"Dwarf planet":{priority:4,range:1900},Ship:{priority:5,range:140}},or={x:0,y:0},Xp=new A,$c=new A,BT=(s,t)=>t.focused-s.focused||s.priority-t.priority||s.depth-t.depth,kT=(s,t,e)=>{const i=Rt((e-s)/(t-s),0,1);return i*i*(3-2*i)};class zT{constructor({explorer:t,system:e,coarse:i=!1,onSelect:n}){P(this,"root",document.createElement("div"));P(this,"entries",[]);P(this,"order",[]);P(this,"placed",[]);P(this,"enabled",!0);P(this,"active",!1);P(this,"shown",!1);P(this,"focus",null);this.explorer=t,this.system=e,this.height=i?26:20,this.root.className="labels",this.root.setAttribute("aria-label","Worlds in view"),this.root.hidden=!0,document.body.append(this.root);for(const r of e.bodies)this.add(r,r.kind,r.id==="home"?"#9cc7ff":r.color);for(const r of e.ships?.list??[])this.add(r,"Ship","#cfe0ff");this.root.addEventListener("click",r=>{const a=r.target.closest(".label"),o=a&&this.entries.find(l=>l.el===a);o&&n(o.target)});for(const r of this.entries)this.order.push(r)}add(t,e,i){const n=Wp[e]??Wp.Planet,r=document.createElement("button");r.type="button",r.className=`label label--${e.toLowerCase().replace(/\s+/g,"-")}`,r.tabIndex=-1,r.setAttribute("aria-label",`Fly to ${t.name}`),r.innerHTML='<i class="label__dot"></i><span class="label__name"></span>',r.querySelector(".label__name").textContent=t.name,r.style.setProperty("--dot",i),this.root.append(r),this.entries.push({target:t,el:r,priority:n.priority,range:n.range,index:this.explorer.bodyIndex.get(t),position:new A,width:0,x:0,y:0,depth:0,radiusPx:0,opacity:0,focused:0,shownX:-1e9,shownY:-1e9,shownOpacity:-1,on:!1})}setVisible(t){this.enabled=t}setActive(t){this.active=t}update(){const t=this.enabled&&this.active;if(t!==this.shown&&(this.shown=t,this.root.hidden=!t,!t))for(const i of this.entries)this.hide(i);if(!t)return;this.measure(),this.declutter();const e=this.entries;for(let i=0;i<e.length;i++)this.write(e[i])}measure(){const{explorer:t}=this,e=t.camera,i=t.focalPx,n=t.stage.width,r=t.stage.height,a=this.entries;for(let o=0;o<a.length;o++){const l=a[o],c=l.index===void 0?l.target.object3D.getWorldPosition(l.position):l.position.copy(t.bodyPositions[l.index]),u=t.toScreen(c,or);if(l.opacity=0,u<=e.near)continue;const f=l.target.radius*i/u;if(f>OT)continue;const h=e.position.distanceTo(c),p=l.range===1/0||l.target===this.focus?1:1-kT(l.range*.75,l.range,h);if(p<=.02)continue;l.width||(l.width=l.el.offsetWidth||90);const v=Math.max(f,3)+4;let g=or.x+v;g+l.width>n-Yc&&(g=or.x-v-l.width);const m=or.y-this.height/2;or.x<-Yc||or.x>n+Yc||m<-this.height||m>r||this.covered(l,c,h)||(l.x=g,l.y=m,l.depth=u,l.radiusPx=f,l.opacity=p,l.focused=l.target===this.focus?1:0)}}covered(t,e,i){const{explorer:n}=this,r=n.camera.position;Xp.subVectors(e,r).divideScalar(i);const a=this.system.bodies;for(let o=0;o<a.length;o++){if(a[o]===t.target)continue;$c.subVectors(n.bodyPositions[o],r);const l=$c.dot(Xp);if(l<=0||l>=i)continue;const c=n.solidRadii[o];if($c.lengthSq()-l*l<c*c)return!0}return!1}declutter(){const t=this.order;for(let n=1;n<t.length;n++){const r=t[n];let a=n-1;for(;a>=0&&BT(t[a],r)>0;)t[a+1]=t[a],a--;t[a+1]=r}const e=this.placed,i=this.height;e.length=0;for(let n=0;n<t.length;n++){const r=t[n];if(r.opacity<=0)continue;const a=r.x,o=r.x+r.width,l=r.y,c=r.y+i;let u=!0;for(let f=0;f<e.length;f++){const h=e[f];if(a<h.x+h.width&&o>h.x&&l<h.y+i&&c>h.y){u=!1;break}}u?e.push(r):r.opacity=0}}write(t){if(t.opacity<=0)return this.hide(t);const e=t.el;t.on||(t.on=!0,e.classList.add("is-on")),(Math.abs(t.x-t.shownX)>.3||Math.abs(t.y-t.shownY)>.3)&&(t.shownX=t.x,t.shownY=t.y,e.style.transform=`translate3d(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px, 0)`),Math.abs(t.opacity-t.shownOpacity)>.03&&(t.shownOpacity=t.opacity,e.style.opacity=t.opacity.toFixed(2))}hide(t){t.on&&(t.on=!1,t.shownOpacity=-1,t.el.classList.remove("is-on"),t.el.style.opacity="0")}}const VT=4.5,we=s=>document.getElementById(s);function GT(s){return{x:"left"in s?s.left:s.x,y:"top"in s?s.top:s.y,width:s.width,height:s.height}}class HT{constructor(t,e){P(this,"isOpen",!1);P(this,"photo",null);P(this,"store");P(this,"options");P(this,"root",we("lightbox"));P(this,"backdrop",we("lb-backdrop"));P(this,"area",we("lb-area"));P(this,"frame",we("lb-frame"));P(this,"img",we("lb-img"));P(this,"scan",we("lb-scan"));P(this,"meta",we("lb-meta"));P(this,"closeButton",we("lb-close"));P(this,"returnFocus",null);P(this,"loadToken",0);P(this,"closing",!1);P(this,"anim",null);P(this,"playButton",we("lb-play"));P(this,"progress",we("lb-progress"));P(this,"progressBar",we("lb-progress").firstElementChild);P(this,"drag",null);P(this,"slide",{x:0,y:0,scale:1});P(this,"suppressClick",!1);P(this,"slideshow",{playing:!1,timer:null});P(this,"onKey",t=>{if(this.isOpen){if(t.key==="Escape")t.preventDefault(),this.close();else if(t.key==="ArrowRight")t.preventDefault(),this.userStep(1);else if(t.key==="ArrowLeft")t.preventDefault(),this.userStep(-1);else if(t.key===" ")t.preventDefault(),t.repeat||this.toggleSlideshow();else if(t.key==="Tab"){const e=[...this.root.querySelectorAll("button, a[href]")].filter(r=>r.offsetParent!==null);if(e.length===0)return;const i=e[0],n=e[e.length-1];t.shiftKey&&document.activeElement===i?(t.preventDefault(),n.focus()):!t.shiftKey&&document.activeElement===n&&(t.preventDefault(),i.focus())}}});P(this,"applySlide",()=>{const{x:t,y:e,scale:i}=this.slide;this.frame.style.translate=t||e?`${t}px ${e}px`:"",this.frame.style.scale=i!==1?String(i):""});P(this,"onDragStart",t=>{!this.isOpen||this.closing||t.pointerType==="mouse"||this.drag||t.target.closest("button, a, .lightbox__meta")||(this.suppressClick=!1,this.drag={id:t.pointerId,x0:t.clientX,y0:t.clientY,dx:0,dy:0,axis:null,vx:0,vy:0,lastX:t.clientX,lastY:t.clientY,lastT:performance.now()})});P(this,"onDragMove",t=>{const e=this.drag;if(!e||t.pointerId!==e.id)return;const i=performance.now(),n=Math.max(1,i-e.lastT);if(e.vx=(t.clientX-e.lastX)/n,e.vy=(t.clientY-e.lastY)/n,e.lastX=t.clientX,e.lastY=t.clientY,e.lastT=i,e.dx=t.clientX-e.x0,e.dy=t.clientY-e.y0,!e.axis){if(Math.hypot(e.dx,e.dy)<10)return;e.axis=Math.abs(e.dx)>Math.abs(e.dy)?"x":"y",this.suppressClick=!0;try{this.root.setPointerCapture(t.pointerId)}catch{}this.stopSlideshow(),this.anim?.progress(1),ft.killTweensOf(this.slide)}if(e.axis==="x"){const r=this.store.count<2?e.dx*.25:e.dx;this.setSlide(r,0,1),this.img.style.opacity=String(1-Math.min(.5,Math.abs(r)/innerWidth))}else{const r=e.dy>0?e.dy:e.dy*.2,a=Rt(r/innerHeight,0,1);this.setSlide(e.dx*.3,r,1-a*.25),this.backdrop.style.opacity=String(1-a*1.2)}});P(this,"onDragEnd",t=>{const e=this.drag;if(!e||t.pointerId!==e.id||(this.drag=null,setTimeout(()=>this.suppressClick=!1,0),!e.axis))return;const i=t.type==="pointercancel";if(e.axis==="x"){const n=Math.abs(e.dx)>Math.min(110,innerWidth*.22),r=Math.abs(e.vx)>.45&&Math.abs(e.dx)>30&&Math.sign(e.vx)===Math.sign(e.dx);if(!i&&this.store.count>1&&(n||r)){const a=e.dx<0?1:-1;ft.to(this.slide,{x:-a*innerWidth*.6,duration:.22,ease:"power2.in",onUpdate:this.applySlide,onComplete:()=>{this.img.style.opacity="",this.step(a,{swiped:!0})}}),ft.to(this.img,{opacity:0,duration:.2});return}}else if(!i&&(e.dy>Math.min(140,innerHeight*.18)||e.vy>.5&&e.dy>40)){this.backdrop.style.opacity="",ft.set(this.backdrop,{opacity:Rt(1-e.dy/innerHeight*1.2,0,1)}),this.close();return}ft.to(this.slide,{x:0,y:0,scale:1,duration:.5,ease:"expo.out",onUpdate:this.applySlide}),ft.to(this.img,{opacity:1,duration:.3,onComplete:()=>this.img.style.opacity=""}),ft.to(this.backdrop,{opacity:1,duration:.3,onComplete:()=>this.backdrop.style.opacity=""})});this.store=t,this.options=e,this.closeButton.addEventListener("click",()=>void this.close()),this.backdrop.addEventListener("click",()=>{this.suppressClick||this.close()}),we("lb-prev").addEventListener("click",()=>this.userStep(-1)),we("lb-next").addEventListener("click",()=>this.userStep(1)),this.playButton.addEventListener("click",()=>this.toggleSlideshow()),addEventListener("keydown",this.onKey),addEventListener("keyup",i=>{this.isOpen&&i.key===" "&&i.preventDefault()}),addEventListener("resize",()=>{this.isOpen&&this.photo&&ft.set(this.frame,this.fit(this.photo))}),document.addEventListener("visibilitychange",()=>{const i=this.slideshow.timer;i&&(document.hidden?i.pause():i.resume())}),this.root.addEventListener("pointerdown",this.onDragStart),this.root.addEventListener("pointermove",this.onDragMove),this.root.addEventListener("pointerup",this.onDragEnd),this.root.addEventListener("pointercancel",this.onDragEnd)}open(t,e){if(this.isOpen)return;this.isOpen=!0,this.closing=!1,this.returnFocus=document.activeElement instanceof HTMLElement?document.activeElement:null,this.root.hidden=!1,this.setSlide(0,0,1),this.fill(t),this.playButton.disabled=this.store.count<2;const i=this.fit(t),n=this.options.reduced,r=ft.timeline();this.anim=r,r.fromTo(this.backdrop,{opacity:0},{opacity:1,duration:n?.15:.45,ease:"power2.out"},0),e&&!n?r.fromTo(this.frame,{...GT(e),opacity:1,scale:1},{...i,duration:.85,ease:"expo.inOut"},0):(ft.set(this.frame,i),r.fromTo(this.frame,{opacity:0,scale:.96},{opacity:1,scale:1,duration:.35,ease:"power2.out"},0)),r.add(this.revealMeta(),n?.05:.45),n||r.add(this.sweep(),.7),this.closeButton.focus({preventScroll:!0})}async close(){if(!this.isOpen||this.closing||!this.photo)return;if(this.closing=!0,this.stopSlideshow(),this.drag=null,this.anim?.kill(),ft.killTweensOf([this.frame,this.img,this.scan,this.backdrop,this.slide,...this.meta.children]),this.slide.x||this.slide.y||this.slide.scale!==1){const n=this.frame.getBoundingClientRect();ft.set(this.frame,{x:n.left,y:n.top,width:n.width,height:n.height,scale:1}),this.setSlide(0,0,1)}const t=this.photo,e=this.options.reduced?null:this.options.rectFor(t),i=ft.timeline();this.anim=i,i.to(this.meta.children,{opacity:0,y:12,duration:.25,stagger:.02,ease:"power2.in"},0),i.to(this.scan,{opacity:0,duration:.1},0),e&&e.width>4?(i.to(this.frame,{...e,opacity:1,scale:1,duration:.7,ease:"expo.inOut"},.05),i.to(this.frame,{opacity:0,duration:.2},.6)):i.to(this.frame,{opacity:0,scale:.96,duration:.3,ease:"power2.in"},0),i.to(this.backdrop,{opacity:0,duration:.5,ease:"power2.inOut"},.15),await i.then(),this.root.hidden=!0,ft.set(this.frame,{clearProps:"opacity,scale"}),ft.set(this.backdrop,{clearProps:"opacity"}),ft.set(this.meta.children,{clearProps:"opacity,transform"}),ft.set(this.img,{clearProps:"opacity,transform"}),this.isOpen=!1,this.closing=!1,this.anim=null,this.options.onClosed(t),this.returnFocus?.focus({preventScroll:!0})}userStep(t){this.stopSlideshow(),this.step(t)}step(t,{swiped:e=!1}={}){if(!this.isOpen||this.closing||!this.photo)return;this.anim?.progress(1);const i=this.store.count,n=(this.store.indexOf(this.photo)+t+i)%i,r=this.store.photos[n];this.fill(r),this.options.onStep(r);const a=this.fit(r);if(this.options.reduced){ft.killTweensOf(this.slide),this.setSlide(0,0,1),ft.set(this.frame,a),ft.fromTo(this.img,{opacity:.4},{opacity:1,duration:.25});return}e?(ft.set(this.frame,a),this.setSlide(t*Math.min(innerWidth*.45,320),0,1),ft.to(this.slide,{x:0,duration:.6,ease:"expo.out",onUpdate:this.applySlide}),ft.fromTo(this.img,{opacity:0},{opacity:1,duration:.4,ease:"power2.out"})):(ft.to(this.frame,{...a,duration:.6,ease:"expo.out",overwrite:!0}),ft.fromTo(this.img,{opacity:.25,x:t*24},{opacity:1,x:0,duration:.6,ease:"expo.out"})),this.sweep(),ft.fromTo(this.meta.children,{opacity:0,y:8},{opacity:1,y:0,duration:.45,stagger:.03,ease:"power2.out"})}fit(t){const e=this.area.getBoundingClientRect(),i=t.width/t.height;let n=e.width,r=n/i;return r>e.height&&(r=e.height,n=r*i),{x:e.left+(e.width-n)/2,y:e.top+(e.height-r)/2,width:n,height:r}}fill(t){this.photo=t;const e=this.store.count,i=this.store.indexOf(t);this.root.style.setProperty("--tone",t.tone),we("lb-index").textContent=`Frame ${_r(i+1,e)} / ${_r(e,e)}`,we("lb-category").textContent=t.category,we("lb-title").textContent=t.title,we("lb-place").textContent=t.place??"",we("lb-size").textContent=`${t.width} × ${t.height} px`,we("lb-ratio").textContent=a_(t.width,t.height),we("lb-tone").textContent=t.tone,we("lb-accent").textContent=t.accent,we("lb-tone-swatch").style.setProperty("--c",t.tone),we("lb-accent-swatch").style.setProperty("--c",t.accent);const n=we("lb-credit");if(n.replaceChildren(),t.local)n.textContent="Your photo · stays on this device";else if(t.credit){const l=document.createElement(t.credit.url?"a":"span");l.textContent=t.credit.name,l instanceof HTMLAnchorElement&&t.credit.url&&(l.href=t.credit.url,l.target="_blank",l.rel="noopener noreferrer"),n.append("Photo by ",l," on Unsplash")}const r=++this.loadToken,a=we("lb-res");if(this.img.alt=t.title,this.img.src=t.src,t.full===t.src){a.textContent="Original";return}a.textContent="Preview · loading full size";const o=new Image;o.decoding="async",o.src=t.full,o.decode().then(()=>{r===this.loadToken&&(this.img.src=t.full,a.textContent=`Full · ${Math.max(t.width,t.height)} px`)}).catch(()=>{r===this.loadToken&&(a.textContent="Preview · full size unavailable")})}revealMeta(){const t=ft.timeline();return t.fromTo(this.meta.children,{opacity:0,y:14},{opacity:1,y:0,duration:.6,stagger:.05,ease:"power3.out"}),t}sweep(){const t=ft.timeline();return t.fromTo(this.scan,{top:"0%",opacity:1},{top:"100%",duration:.7,ease:"power2.inOut"}),t.to(this.scan,{opacity:0,duration:.15},">-0.1"),t}toggleSlideshow(){this.slideshow.playing?this.stopSlideshow():this.playSlideshow()}playSlideshow(){!this.isOpen||this.closing||this.store.count<2||(this.slideshow.playing=!0,this.playButton.setAttribute("aria-pressed","true"),this.playButton.setAttribute("aria-label","Pause slideshow"),this.root.classList.add("is-playing"),this.restartTimer())}stopSlideshow(){const t=this.slideshow;t.timer?.kill(),t.timer=null,t.playing&&(t.playing=!1,this.playButton.setAttribute("aria-pressed","false"),this.playButton.setAttribute("aria-label","Play slideshow"),this.root.classList.remove("is-playing"),ft.to(this.progressBar,{scaleX:0,duration:.25,ease:"power2.out"}))}restartTimer(){const t=this.slideshow;t.timer?.kill(),t.timer=ft.fromTo(this.progressBar,{scaleX:0},{scaleX:1,duration:VT,ease:"none",onComplete:()=>{!t.playing||!this.isOpen||this.closing||(this.step(1),this.restartTimer())}}),document.hidden&&t.timer.pause()}setSlide(t,e,i){this.slide.x=t,this.slide.y=e,this.slide.scale=i,this.applySlide()}}const WT=matchMedia("(max-width: 640px)"),XT='button:not([disabled]), a[href], input:not([disabled]):not([tabindex="-1"]), [tabindex="0"]',qT='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" /></svg>',Pn=class Pn{constructor(t){P(this,"isOpen",!1);P(this,"options");P(this,"root");P(this,"panel");P(this,"backdrop");P(this,"head");P(this,"titleEl");P(this,"body");P(this,"foot");P(this,"returnFocus",null);P(this,"trigger",null);P(this,"anim",null);P(this,"drag",null);P(this,"onKey",t=>{if(!(!this.isOpen||t.defaultPrevented)){if(t.key==="Escape")t.preventDefault(),this.close();else if(t.key==="Tab"&&this.options.modal){const e=[...this.panel.querySelectorAll(XT)].filter(a=>a.offsetParent!==null);if(e.length===0)return;const i=e[0],n=e[e.length-1],r=this.panel.contains(document.activeElement);t.shiftKey&&(document.activeElement===i||!r)?(t.preventDefault(),n.focus()):!t.shiftKey&&(document.activeElement===n||!r)&&(t.preventDefault(),i.focus())}}});P(this,"onDragStart",t=>{!this.phone||!this.isOpen||t.target.closest("button")||(this.drag={id:t.pointerId,y0:t.clientY,y:0,lastY:t.clientY,lastT:performance.now(),v:0},this.panel.setPointerCapture(t.pointerId),this.anim?.progress(1))});P(this,"onDragMove",t=>{const e=this.drag;if(!e||t.pointerId!==e.id)return;const i=performance.now(),n=t.clientY-e.y0;e.y=n>0?n:n*.2,e.v=(t.clientY-e.lastY)/Math.max(1,i-e.lastT),e.lastY=t.clientY,e.lastT=i,ft.set(this.panel,{y:e.y}),ft.set(this.backdrop,{opacity:1-Math.max(0,e.y)/(this.panel.offsetHeight*1.4)})});P(this,"onDragEnd",t=>{const e=this.drag;!e||t.pointerId!==e.id||(this.drag=null,t.type==="pointerup"&&(e.y>this.panel.offsetHeight*.28||e.v>.5&&e.y>24)?this.close():(ft.to(this.panel,{y:0,duration:.45,ease:"expo.out"}),ft.to(this.backdrop,{opacity:1,duration:.3})))});this.options={modal:!0,...t};const{id:e,modal:i,className:n}=this.options;this.root=document.createElement("div"),this.root.className=`sheet${i?"":" sheet--modeless"}${n?` ${n}`:""}`,this.root.id=e,this.root.hidden=!0,this.root.innerHTML=`
      <div class="sheet__backdrop"></div>
      <section class="sheet__panel" role="dialog" aria-labelledby="${e}-title" tabindex="-1">
        <div class="sheet__grab" aria-hidden="true"><span class="sheet__handle"></span></div>
        <header class="sheet__head">
          <h2 class="sheet__title" id="${e}-title"></h2>
          <button class="lb-btn sheet__close" type="button" aria-label="Close">${qT}</button>
        </header>
        <div class="sheet__body"></div>
        <footer class="sheet__foot"></footer>
      </section>`,this.backdrop=this.root.querySelector(".sheet__backdrop"),this.panel=this.root.querySelector(".sheet__panel"),this.head=this.root.querySelector(".sheet__head"),this.titleEl=this.root.querySelector(".sheet__title"),this.body=this.root.querySelector(".sheet__body"),this.foot=this.root.querySelector(".sheet__foot"),i&&this.panel.setAttribute("aria-modal","true"),this.setTitle(this.options.title??"",this.options.meta),document.body.append(this.root),this.root.querySelector(".sheet__close").addEventListener("click",()=>this.close()),this.backdrop.addEventListener("click",()=>this.close()),addEventListener("keydown",this.onKey);for(const r of[this.root.querySelector(".sheet__grab"),this.head])r.addEventListener("pointerdown",this.onDragStart);this.panel.addEventListener("pointermove",this.onDragMove),this.panel.addEventListener("pointerup",this.onDragEnd),this.panel.addEventListener("pointercancel",this.onDragEnd)}setTitle(t,e){if(this.titleEl.replaceChildren(t),e){const i=document.createElement("span");i.className="sheet__meta mono",i.textContent=e,this.titleEl.append(" ",i)}}get phone(){return WT.matches}toggle(t){this.isOpen?this.close():this.open(t)}open(t=null){if(this.isOpen)return;Pn.current&&Pn.current!==this&&Pn.current.close({restoreFocus:!1,instant:!0}),Pn.current=this,this.isOpen=!0,this.trigger=t,this.trigger?.setAttribute("aria-expanded","true"),this.returnFocus=t??(document.activeElement instanceof HTMLElement?document.activeElement:null),this.foot.hidden=this.foot.childElementCount===0,this.root.hidden=!1,this.anim?.kill();const e=this.options.reduced,i=ft.timeline();if(this.anim=i,i.fromTo(this.backdrop,{opacity:0},{opacity:1,duration:e?.15:.35,ease:"power2.out"},0),e)i.fromTo(this.panel,{opacity:0,x:0,y:0},{opacity:1,duration:.18},0);else{const r=this.phone?{yPercent:100,xPercent:0}:{xPercent:100,yPercent:0};i.fromTo(this.panel,{...r,x:0,y:0,opacity:1},{xPercent:0,yPercent:0,duration:.55,ease:"expo.out"},0),i.fromTo(this.body.children,{opacity:0,y:10},{opacity:1,y:0,duration:.45,stagger:.04,ease:"power2.out",clearProps:"transform"},.12)}(this.options.initialFocus?.()??this.panel).focus({preventScroll:!0}),this.options.onOpen?.()}close({restoreFocus:t=!0,instant:e=!1}={}){if(!this.isOpen)return;this.isOpen=!1,Pn.current===this&&(Pn.current=null),this.trigger?.setAttribute("aria-expanded","false"),this.drag=null,this.anim?.kill();const i=()=>{this.root.hidden=!0,ft.set(this.panel,{clearProps:"transform,opacity"})};if(e)i();else{const n=this.options.reduced,r=ft.timeline({onComplete:i});if(this.anim=r,r.to(this.backdrop,{opacity:0,duration:n?.12:.3,ease:"power2.inOut"},0),n)r.to(this.panel,{opacity:0,duration:.15},0);else{const a=this.phone?{yPercent:100,y:0}:{xPercent:100};r.to(this.panel,{...a,duration:.38,ease:"power3.in"},0)}}t&&this.returnFocus?.focus({preventScroll:!0}),this.returnFocus=null,this.options.onClose?.()}};P(Pn,"current",null);let cn=Pn;const YT='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 11V2.5M4.5 6L8 2.5 11.5 6M2.5 10.5v3h11v-3" /></svg>',$T='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8a5 5 0 1 0 1.6-3.7M3 2.5v2.8h2.8" /></svg>';function qp(s,t,e){const i=document.createElement("button");return i.type="button",i.className=s,i.innerHTML=`${t}<span>${e}</span>`,i}class KT{constructor(t,e){P(this,"store");P(this,"options");P(this,"sheet");P(this,"status",document.createElement("p"));P(this,"grid",document.createElement("ul"));P(this,"useButton");P(this,"restoreButton");P(this,"note",document.createElement("p"));P(this,"current",0);P(this,"onGridKey",t=>{const e=t.target.closest(".thumb");if(!e)return;const i=this.store.count,n=Number(e.dataset.index),r=this.columns(),a={ArrowRight:1,ArrowLeft:-1,ArrowDown:r,ArrowUp:-r,Home:-n,End:i-1-n};if(!(t.key in a))return;t.preventDefault();const o=Math.min(i-1,Math.max(0,n+a[t.key])),l=this.grid.querySelectorAll(".thumb");l[this.current]?.setAttribute("tabindex","-1"),this.current=o,l[o].setAttribute("tabindex","0"),l[o].focus()});this.store=t,this.options=e,this.sheet=new cn({id:"photos-sheet",title:"Photos",className:"sheet--photos",reduced:e.reduced,initialFocus:()=>this.grid.querySelector('[tabindex="0"]')}),this.status.className="photos__status mono",this.grid.className="photos__grid",this.grid.setAttribute("aria-label","Photos in the gallery"),this.grid.addEventListener("keydown",this.onGridKey),this.grid.addEventListener("click",n=>{const r=n.target.closest(".thumb");if(!r)return;const a=this.store.photos[Number(r.dataset.index)];a&&this.options.onPick(a)}),this.sheet.body.append(this.status,this.grid),this.useButton=qp("sheet-btn sheet-btn--primary",YT,"Use my photos"),this.restoreButton=qp("sheet-btn",$T,"Restore originals"),this.useButton.addEventListener("click",()=>this.options.onUseMine()),this.restoreButton.addEventListener("click",()=>this.options.onRestore()),this.note.className="sheet__note mono",this.note.textContent=`JPG · PNG · WebP · AVIF · GIF · up to ${xl} · stays on this device`;const i=document.createElement("div");i.className="sheet__actions",i.append(this.useButton,this.restoreButton),this.sheet.foot.append(i,this.note),this.render()}get isOpen(){return this.sheet.isOpen}open(t){this.sheet.open(t)}close(t){this.sheet.close(t)}toggle(t){this.sheet.toggle(t)}render(){const{photos:t,isCustom:e}=this.store,i=t.length,n=this.sheet.panel.contains(document.activeElement)?document.activeElement:null;this.sheet.setTitle("Photos",`· ${i}`),this.status.textContent=e?`Your photos · ${i} · never uploaded`:`Original gallery · ${i} frames`,this.restoreButton.hidden=!e,this.useButton.querySelector("span").textContent=e?"Choose other photos":"Use my photos",this.grid.classList.toggle("is-dense",i>48),this.current=Math.min(this.current,Math.max(0,i-1));const r=t.map((a,o)=>{const l=document.createElement("li"),c=document.createElement("button");c.type="button",c.className="thumb",c.dataset.index=String(o),c.tabIndex=o===this.current?0:-1;const u=_r(o+1,i);c.setAttribute("aria-label",`${u} · ${a.title}`),c.style.setProperty("--tone",a.tone);const f=document.createElement("img");f.alt="",f.loading="lazy",f.decoding="async",f.draggable=!1,f.src=a.src;const h=document.createElement("span");h.className="thumb__index mono",h.textContent=u;const d=document.createElement("span");return d.className="thumb__title",d.textContent=a.title,c.append(f,h,d),l.append(c),l});this.grid.replaceChildren(...r),n&&(n.hidden||!n.isConnected)&&this.useButton.focus({preventScroll:!0})}columns(){return getComputedStyle(this.grid).gridTemplateColumns.split(" ").filter(Boolean).length||3}}const Yp=["mercury","venus","mars","jupiter","saturn","uranus","neptune"],$p=["ceres","pluto","haumea","makemake","eris"],ZT='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 3.5v9M10.5 3.5v9" /></svg>';function qe(s,t,e){const i=document.createElement(s);return t&&(i.className=t),e!==void 0&&(i.textContent=e),i}class JT{constructor(t,e){P(this,"sheet");P(this,"rows",new Map);P(this,"scaleButtons",[]);P(this,"toggles",{});P(this,"current",null);this.system=t,this.options=e,this.sheet=new cn({id:"worlds-sheet",title:"Worlds",meta:"· 12 + Sun + Moon",className:"sheet--worlds",reduced:e.reduced,initialFocus:()=>this.rows.get(this.current)?.button??this.rows.values().next().value?.button}),this.sheet.body.append(this.buildControls(),this.buildList())}get isOpen(){return this.sheet.isOpen}open(t){this.sheet.open(t)}close(t){this.sheet.close(t)}toggle(t){this.sheet.toggle(t)}buildControls(){const t=qe("div","worlds__controls"),e=qe("p","worlds__label mono","Time");e.id="worlds-time-label";const i=qe("div","seg");i.setAttribute("role","radiogroup"),i.setAttribute("aria-labelledby","worlds-time-label");for(const a of this.options.timeScales){const o=qe("button","seg__btn mono");o.type="button",o.setAttribute("role","radio"),o.setAttribute("aria-checked","false"),o.dataset.scale=String(a),a===0?o.innerHTML=`${ZT}<span class="sr-only">Pause</span>`:o.textContent=`${a}×`,this.options.reduced&&a>1&&(o.disabled=!0,o.title="Off with reduced motion"),o.addEventListener("click",()=>this.options.onTimeScale(a)),i.append(o),this.scaleButtons.push(o)}i.addEventListener("keydown",a=>{const o={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[a.key];if(!o)return;a.preventDefault();const l=this.scaleButtons.filter(f=>!f.disabled),c=l.findIndex(f=>f.getAttribute("aria-checked")==="true"),u=l[Math.min(l.length-1,Math.max(0,c+o))];this.options.onTimeScale(Number(u.dataset.scale)),u.focus()});const n=qe("p","worlds__keys mono","[ ] slower · faster"),r=qe("div","worlds__toggles");for(const[a,o,l]of[["orbits","Orbits",this.options.onOrbits],["labels","Labels",this.options.onLabels]]){const c=qe("button","switch mono");c.type="button",c.setAttribute("aria-pressed","true"),c.innerHTML=`<span class="switch__track" aria-hidden="true"><i></i></span><span>${o}</span>`,c.addEventListener("click",()=>l(c.getAttribute("aria-pressed")!=="true")),r.append(c),this.toggles[a]=c}return t.append(e,i,n,r),t}buildList(){const t=this.system,e=qe("div","worlds__list"),i=(r,a)=>{const o=qe("section","worlds__group"),l=qe("h3","worlds__heading mono",r),c=qe("ul","worlds__rows");for(const u of a)c.append(this.row(u));o.append(l,c),e.append(o)};i("Nearby",[t.home,t.moon,t.sun]),i(`Planets · ${Yp.length}`,Yp.map(r=>t.bodyById(r))),i(`Dwarf planets · ${$p.length}`,$p.map(r=>t.bodyById(r)));const n=t.ships?.list??[];return n.length&&i(`Ships · ${n.length}`,n),e}row(t){const e=qe("li"),i=qe("button","world");i.type="button";const n=Kh[t.id],r=t.id==="home"?"#9cc7ff":t.color??"#cfe0ff",a=n?"Ship":t.kind,o=n?n.short:t.id==="sun"?"Centre":t.facts?.fromSun??"",l=qe("i",`world__dot${n?" world__dot--ship":""}`);l.style.setProperty("--dot",r);const c=qe("span","world__text");return c.append(qe("span","world__name",t.name),qe("span","world__kind mono",a)),i.append(l,c,qe("span","world__fact mono",o)),i.setAttribute("aria-label",`${t.name}, ${a}${o?`, ${o}`:""}`),i.addEventListener("click",()=>this.options.onPick(t)),e.append(i),this.rows.set(t,{button:i}),e}setFocus(t){t!==this.current&&(this.rows.get(this.current)?.button.removeAttribute("aria-current"),this.current=t,this.rows.get(t)?.button.setAttribute("aria-current","true"))}setTimeScale(t){for(const e of this.scaleButtons){const i=Number(e.dataset.scale)===t;e.setAttribute("aria-checked",String(i)),e.tabIndex=i?0:-1}}setOrbits(t){this.toggles.orbits.setAttribute("aria-pressed",String(t))}setLabels(t){this.toggles.labels.setAttribute("aria-pressed",String(t))}}ft.registerPlugin(El,nm);const Qh=s=>document.getElementById(s),ri=matchMedia("(prefers-reduced-motion: reduce)").matches,cr=Qh("scene"),QT=Bw.map(s=>Xw(s,"./")),jT=n_(),Kp=new URLSearchParams(location.search),_g="kaliv.blueprint",Zp=matchMedia("(max-width: 640px)"),tD='<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="2.5" /><ellipse cx="8" cy="8" rx="6.6" ry="2.7" transform="rotate(-24 8 8)" /><circle cx="13.4" cy="4.9" r="0.9" /></svg>',eD='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.6l4.8 12.2L8 11l-4.8 2.8z" /><path d="M8 11v3.4" /></svg>';function iD(){try{return localStorage.getItem(_g)!=="off"}catch{return!0}}function nD(s){try{localStorage.setItem(_g,s?"on":"off")}catch{}}function Jp(s,t){try{const e=localStorage.getItem(s);return e===null?t:e==="on"}catch{return t}}function Qp(s,t){try{localStorage.setItem(s,t?"on":"off")}catch{}}function zo(s,t){return`${s} ${t}${s===1?"":"s"}`}function sD(){Qh("intro").hidden=!0,cr.hidden=!0;for(const t of document.querySelectorAll(".hud"))t.hidden=!0;const s=document.createElement("p");s.className="noscript",s.setAttribute("role","alert"),s.textContent="The 3D gallery needs WebGL, which this browser has turned off or doesn't support.",document.body.append(s)}async function rD(){let s;try{s=new Ow(cr)}catch{sD();return}const t=new AT(s),e=new Zw(QT,s.renderer,{coarse:s.coarse});let i=0;const n=e.loadTextures(k=>i=k);let r=null;const a=new LT(e,s.coarse),o=new NE(s,e,{reduced:ri,blueprint:iD(),onSelect:k=>void O(k)});o.build(),a.setBlueprint(o.blueprint),n.then(()=>o.refreshTextures());const{renderer:l,scene:c,camera:u,coarse:f}=s,h=performance.now(),d=await $3({renderer:l,coarse:f}),p=new bT({scene:c,renderer:l,camera:u,coarse:f,reduced:ri,visuals:d}),v=p.addSystem(new _T(p)),g=p.addSystem(new b3(p));for(const k of[O2,fT,J2])p.addSystem(new k(p));p.group.visible=!1;const m=performance.now()-h;l.extensions.has("KHR_parallel_shader_compile")&&setTimeout(()=>{U.active&&(p.group.visible=!0,l.compileAsync(c,u).catch(()=>{}),p.group.visible=!1)},600),s.onFrame((k,ot)=>{d.baker.paused=U.active&&ot>1/40,p.update(k,ot)},-30);function M(){const k=d.baker.jobs,ot=k.reduce((At,N)=>At+(N.done?1:0),0);return ot<k.length?`12 + sun + moon · ${ot}/${k.length}`:"12 + sun + moon · mapped"}function b(){p.group.visible=!0,ft.fromTo(v.uniforms.uOpacity,{value:0},{value:1,duration:ri?.3:1.8,ease:"power1.inOut"}),ft.fromTo(g.uniforms.uGlow,{value:0},{value:1,duration:ri?.3:1.6,ease:"power1.inOut"})}let _=!1,S=!1;const y=new r2({stage:s,system:p,globe:o,reduced:ri,isBlocked:()=>U.active||I.isOpen||S||cn.current!==null,onTap:(k,ot)=>T(k,ot)});o.attachCamera(y),s.onFrame((k,ot)=>y.update(k,ot),-20);function T(k,ot){if(_&&y.atHome){const N=o.pick(k,ot);if(N)return void O(N)}const At=y.pick(k,ot);At&&(At!==y.focus||y.mode==="fly"||!y.atHome)&&x(At)}function x(k){!k||!y.enabled||S||(k===p.home?y.atHome?y.settleHome():y.goHome():y.flyTo(k))}let E=null,C=0;s.onFrame(k=>{const ot=y.atHome;o.interactive=_&&ot&&!I.isOpen&&!S,o.suppressHover=y.dragging,o.hoverPoint=y.hovering?y.hoverPoint:null,o.shared.uSunDir.value.copy(p.sunPosition).normalize(),y.enabled&&!ot&&y.hovering&&!y.dragging&&!U.active?k-C>1/30&&(C=k,E=y.pick(y.hoverPoint.x,y.hoverPoint.y)):E=null,cr.classList.toggle("is-pointing",!!(o.hovered||E))},-15);function F(k,ot){a.setDimmed(!0),I.open(k,ot)}const I=new HT(e,{reduced:ri,rectFor:k=>{const ot=r&&r.photo===k?r:o.panelFor(k);return ot&&o.facing(ot)>.55?o.screenRect(ot):null},onStep:k=>{const ot=o.panelFor(k);ot&&(r=ot,o.spotlight(ot),o.focus(ot))},onClosed:()=>{a.setDimmed(!1),o.spotlight(null),o.release(),r=null}});async function O(k){!k||S||I.isOpen||(S=!0,a.trackTarget(null),r=k,o.spotlight(k),await o.focus(k),F(k.photo,o.screenRect(k)),S=!1)}function L(){const k=ft.timeline();return o.refreshTextures(),b(),k.add(y.dive({duration:ri?.01:2,ease:"expo.inOut"}),0),k.add(o.assemble(1.5),ri?0:.35),k.add(a.reveal(),ri?0:.95),k.call(()=>void(_=!0),[],ri?.4:1.9),k.call(()=>{y.enabled=!0,y.lastInput=s.time,o.setSun(p.sunPosition,1)},[],ri?.02:2),k}const U=new YE({stage:s,space:t,reduced:ri,fonts:jT,textures:n,photosLoaded:()=>i,photoCount:e.count,facts:{gpu:s.gpuLabel(),panels:o.panels.length,rows:o.layout.rows.length,stars:t.starCount,worlds:12,worldsStatus:M},handOver:L}),V={mode:"home",range:0,focusName:"",timeScale:1,speed:0,nearestName:""};s.onFrame(k=>{if(U.active)return;const ot=y.travel?.to??y.focus,At=ot===p.home&&u.position.lengthSq()<va*va;V.mode=y.mode==="fly"?"fly":y.atHome||At?"home":"space",V.range=y.mode==="fly"?y.nearest.surface:y.view.distance,V.focusName=ot.name,V.timeScale=p.ctx.timeScale,V.speed=y.fly.speed,V.nearestName=y.nearest.body?.name??"—",a.update(k,s.fps,o,V)});function H(k){o.setBlueprint(k),a.setBlueprint(k),nD(k)}a.buttons.blueprint.addEventListener("click",()=>H(!o.blueprint));const K=new KT(e,{reduced:ri,onPick:async k=>{K.close(),!(!y.atHome&&!await y.goHome())&&O(o.panelFor(k))},onUseMine:()=>j.openPicker(),onRestore:()=>void Q()});a.buttons.photos.addEventListener("click",()=>K.toggle(a.buttons.photos)),e.addEventListener("change",()=>{r=null,a.trackTarget(null),o.build(),o.refreshTextures(),o.revealPhotos(e.photos),K.render()});async function Y(k){if(e.busy)return;const ot=k.length>8;ot&&a.toast(`Reading ${zo(k.length,"file")}…`,!1,1/0);const{added:At,skipped:N,ignored:ne}=await e.replaceWith(k,{onProgress:(w,G)=>ot&&a.toast(`Reading photos · ${w} / ${G}`,!1,1/0)});if(At.length===0){a.toast("Couldn't read those files, so the gallery is unchanged. Use JPG, PNG or WebP images.",!0);return}K.close();const Kt=At.length===1?"It stays on this device and is never uploaded.":"They stay on this device and are never uploaded.",R=[`Showing your ${zo(At.length,"photo")}. ${Kt}`];if(ne>0&&R.push(`Only the first ${xl} images were used.`),N.length>0){const w=N.length===1?N[0]:zo(N.length,"file");R.push(`Skipped ${w} (couldn't read).`)}a.toast(R.join(" "),!1,N.length>0?6500:4800)}async function Q(){await e.restoreOriginals()&&a.toast(`Showing the original ${zo(e.count,"photo")}.`)}const j=CT(k=>void Y(k),()=>U.active||I.isOpen),dt=a.addAction({id:"btn-worlds",label:"Worlds",icon:tD,tip:"Worlds · M"});dt.setAttribute("aria-haspopup","dialog"),dt.setAttribute("aria-controls","worlds-sheet"),dt.setAttribute("aria-expanded","false");const Et=a.addAction({id:"btn-fly",label:"Fly",icon:eD,tip:"Fly · F",pressed:!1}),Xt=new JT(p,{reduced:ri,timeScales:Pc,onPick:k=>{Xt.close({restoreFocus:!1}),x(k)},onTimeScale:k=>jt(k),onOrbits:k=>gt(k),onLabels:k=>Vt(k)});dt.addEventListener("click",()=>Xt.toggle(dt));const qt=ri?Pc.filter(k=>k<=1):Pc;function jt(k){qt.includes(k)&&(p.setTimeScale(k),Xt.setTimeScale(k))}function J(k){const ot=qt.indexOf(p.timeScale);jt(qt[Rt(ot+k,0,qt.length-1)])}jt(1);const et=new zT({explorer:y,system:p,coarse:f,onSelect:k=>x(k)});function gt(k){p.setOrbitsVisible(k),Xt.setOrbits(k),Qp("kaliv.orbits",k)}function Vt(k){et.setVisible(k),Xt.setLabels(k),Qp("kaliv.labels",k)}gt(Jp("kaliv.orbits",!0)),Vt(Jp("kaliv.labels",!0)),s.onFrame(()=>{const k=y.mode==="fly"||y.traveling||y.focus!==p.home||y.view.distance>=va;et.setActive(!U.active&&y.enabled&&k&&!I.isOpen),et.focus=y.mode==="fly"?null:nt(),et.update()},5);const Dt=["sun","mercury","venus","moon","mars","ceres","jupiter","saturn","uranus","neptune","pluto","haumea","makemake","eris"].map(k=>p.bodyById(k)),Gt=p.ships?.list??[];function fe(k){const ot=Gt.includes(k)?Gt:Dt;return ot[(ot.indexOf(k)+1)%ot.length]}const nt=()=>y.travel?.to??y.focus,rt=new UT({reduced:ri,onHome:()=>x(p.home),onNext:()=>x(fe(nt()))});function ct(){const k=nt();Xt.setFocus(k);const ot=y.mode==="orbit"&&k!==p.home&&!I.isOpen;if(ot?rt.show(k):rt.hide(),!ot)y.setViewShift(0,0);else if(Zp.matches){const N=rt.root.offsetTop;y.setViewShift(0,Math.max(0,Math.round(s.height/2-(72+N)/2)))}else{const At=rt.root.offsetLeft+rt.root.offsetWidth;y.setViewShift(-Math.round(At/2),0)}}y.onFocusChange(ct),y.onTravel(ct),Zp.addEventListener("change",ct),s.onResize(()=>ct());const ut=new c2({input:y.input,coarse:f,onExit:()=>y.exitFly()});function pt(){!y.enabled||S||(cn.current&&cn.current.close({restoreFocus:!1}),y.toggleFly())}Et.addEventListener("click",()=>pt()),y.onModeChange(k=>{Et.setAttribute("aria-pressed",String(k==="fly")),k==="fly"?ut.show():ut.hide(),ct()}),Qh("brand").addEventListener("click",k=>{k.preventDefault(),cn.current&&cn.current.close(),x(p.home)});const zt=new d_(s,{enabled:Kp.get("aq")!=="0"});if(s.onFrame(()=>{U.active||zt.update()},20),addEventListener("keydown",k=>{if(k.defaultPrevented||k.metaKey||k.ctrlKey||k.altKey)return;if(U.active){(k.key==="Escape"||k.key==="Enter"||k.key===" ")&&(k.preventDefault(),U.skip());return}if(I.isOpen)return;const ot=k.target;if(ot.closest("input, textarea, select"))return;const At=k.key.toLowerCase();if(At==="p"&&!k.repeat){k.preventDefault(),K.toggle(a.buttons.photos);return}if(At==="m"&&!k.repeat){k.preventDefault(),Xt.toggle(dt);return}if((k.key==="["||k.key==="]")&&!K.isOpen){k.preventDefault(),J(k.key==="]"?1:-1);return}if(cn.current)return;if(k.key==="Escape"&&y.mode==="fly"){k.preventDefault(),y.exitFly();return}if(At==="b"&&!k.repeat){k.preventDefault(),H(!o.blueprint);return}if(At==="f"&&!k.repeat){k.preventDefault(),pt();return}if(At==="g"&&!k.repeat){k.preventDefault(),x(p.home);return}if(!(ot===document.body||ot===document.documentElement||ot===cr)||!y.enabled||S||y.mode!=="orbit")return;const ne={ArrowLeft:[.32,0],ArrowRight:[-.32,0],ArrowUp:[0,.22],ArrowDown:[0,-.22]},Kt={"+":.85,"=":.85,"-":1.18,_:1.18};ne[k.key]?(k.preventDefault(),y.rotateBy(...ne[k.key])):Kt[k.key]&&ot===cr?(k.preventDefault(),y.zoomBy(Kt[k.key])):(k.key==="Enter"||k.key===" "&&ot===cr)&&o.front&&o.interactive&&(k.preventDefault(),O(o.front))}),Kp.has("debug")){const k=()=>{const{render:ot,memory:At}=s.renderer.info;return{calls:ot.calls,triangles:ot.triangles,geometries:At.geometries,textures:At.textures,pixelRatio:s.pixelRatio,near:s.camera.near,buildMs:Math.round(m),pendingBakes:d.baker.pending}};window.gallery={stage:s,globe:o,store:e,hud:a,lightbox:I,photosPanel:K,setBlueprint:H,replacePhotos:Y,system:p,explorer:y,visuals:d,worldsPanel:Xt,infoCard:rt,labels:et,quality:zt,flyTo:ot=>x(p.bodyById(ot)??Gt.find(At=>At.id===ot)),setTimeScale:jt,stats:k}}U.start()}rD();
