!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){window.addEventListener("DOMContentLoaded",()=>{console.log("init javascript");const e=document.getElementById("audio"),t=document.querySelector(".player"),n=t.querySelector(".player__nav-play"),r=t.querySelector(".player__nav-vol-progress"),a=t.querySelector(".player__nav-volbar-img"),l=t.querySelector(".player__quality-btn"),o=t.querySelector(".player__nav-eq"),i=t.querySelector("#player__eq"),c=t.querySelector("#player__wrap"),u=t.querySelector(".player__eq-icon"),s=document.querySelectorAll(".player__eq-input"),d=t.querySelector(".player__eq-select-btn"),y=t.querySelector(".player__eq-select-wrap"),p=t.querySelector(".player__eq-controls-checkbox"),v=t.querySelectorAll(".player__eq-select-item");function f(){e.paused?n.style.backgroundImage="url(icons/btn_play_off.png)":n.style.backgroundImage="url(icons/btn_play_on.png)"}e.volume=.5,n.addEventListener("click",()=>{0==n.getAttribute("data-play")?(n.setAttribute("data-play",1),e.play(),f()):(n.setAttribute("data-play",0),e.pause(),f())}),r.addEventListener("input",()=>{const t=r.value;e.volume=t/100,function(e,t){0==e&&t.setAttribute("src","icons/volume_icon_off.png"),e>1&&e<80&&t.setAttribute("src","icons/volume_icon_half.png"),e>80&&t.setAttribute("src","icons/volume_icon_full.png")}(t,a)}),a.addEventListener("click",()=>{0==e.volume?(r.value=50,e.volume=.5,a.setAttribute("src","icons/volume_icon_half.png")):(r.value=0,e.volume=0,a.setAttribute("src","icons/volume_icon_off.png"))}),u.addEventListener("click",()=>{c.style.display="flex",i.style.display="none",o.setAttribute("data-active",0)}),l.addEventListener("click",()=>{320==l.getAttribute("data-quality")?(l.setAttribute("src","icons/bitrate_left.png"),e.setAttribute("src","https://myradio24.org/vinila_128"),e.play(),l.setAttribute("data-quality",128)):(l.setAttribute("src","icons/bitrate_right.png"),e.setAttribute("src","https://myradio24.org/vinila"),e.play(),l.setAttribute("data-quality",320))}),d.addEventListener("click",()=>{0==d.getAttribute("data-open")?(d.setAttribute("data-open",1),y.style.display="flex"):(d.setAttribute("data-open",0),y.style.display="none")});const b=new(window.AudioContext||window.webkitAudioContext),_=b.createMediaElementSource(e),g=function(){let e;return e=[32,64,125,250,500,1e3,2e3,4e3,8e3,14e3].map(m),e.reduce((function(e,t){return e.connect(t),t})),e}();function m(e){const t=b.createBiquadFilter();return t.type="peaking",t.frequency.value=e,t.Q.value=1,t.gain.value=0,t}o.addEventListener("click",()=>{0==o.getAttribute("data-active")?(c.style.display="none",i.style.display="flex",o.style.backgroundImage="url(icons/btn_eq_on.png)",o.setAttribute("data-active",1)):2==o.getAttribute("data-active")?(c.style.display="flex",i.style.display="none",o.setAttribute("data-active",0)):(c.style.display="flex",i.style.display="none",o.style.backgroundImage="url(icons/btn_eq_off.png)",o.setAttribute("data-active",0))}),function(e){e.onplay=e=>{b.resume()},e.addEventListener("play",()=>b.resume()),_.connect(g[0]),g[g.length-1].connect(b.destination),s.forEach((e,t)=>{e.addEventListener("change",e=>{g[t].gain.value=e.target.value,o.setAttribute("data-active",2),0==p.checked&&p.click()})})}(e);const q={rock:[5.4,4.5,-3.6,-6.6,-2.7,2.1,6,7.5,7.8,8.1],jazz:[3,6.3,3.6,-3.9,-5.1,1.2,9,1.4,2,2.5],dub:[5.1,4.8,4.1,1.5,-2.4,-3.2,-1.6,1.6,5.2,5.5],trance:[7.4,6.6,4.2,2.1,0,-2.1,0,2.1,4.2,6.6],classic:[1.8,2.1,2.1,-.3,-2.7,-3.9,-3.9,1,2.4,8.1]};function A(){g.forEach(e=>{e.gain.value=0}),s.forEach(e=>{e.value=0})}v.forEach(e=>{e.addEventListener("click",e=>{const t=e.target.getAttribute("data-pattern");d.innerHTML=e.target.textContent,"flat"==t?A():"custom"!=t&&q[t].forEach((e,t)=>{g[t].gain.value=e,s[t].value=e}),console.log()})}),p.addEventListener("change",()=>{0==p.checked&&A()}),document.querySelector("button").addEventListener("click",(function(){b.resume().then(()=>{console.log("Playback resumed successfully")})}));setInterval(()=>{let e=new Date,t=e.getUTCHours()+3;document.querySelector(".player__live-time").innerHTML=(t>24?"0":"")+(t>24?t-24:t)+":"+(e.getMinutes()<10?"0":"")+e.getMinutes()},1e3)})}]);