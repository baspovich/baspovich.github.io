!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){window.addEventListener("DOMContentLoaded",()=>{console.log("init javascript");const e=document.getElementById("audio"),t=document.querySelector(".player"),n=t.querySelector(".player__nav-play"),r=t.querySelector(".player__nav-vol-progress"),a=t.querySelector(".player__nav-volbar-img"),o=t.querySelector(".player__quality-btn"),i=t.querySelector(".player__nav-eq"),l=t.querySelector("#player__eq"),u=t.querySelector("#player__wrap"),c=t.querySelector(".player__eq-icon"),s=document.querySelectorAll(".player__eq-input");function d(){e.paused?n.style.backgroundImage="url(icons/btn_play_off.png)":n.style.backgroundImage="url(icons/btn_play_on.png)"}e.volume=.5,n.addEventListener("click",()=>{0==n.getAttribute("data-play")?(n.setAttribute("data-play",1),e.play(),d()):(n.setAttribute("data-play",0),e.pause(),d())}),r.addEventListener("input",()=>{const t=r.value;e.volume=t/100,function(e,t){0==e&&t.setAttribute("src","icons/volume_icon_off.png"),e>1&&e<80&&t.setAttribute("src","icons/volume_icon_half.png"),e>80&&t.setAttribute("src","icons/volume_icon_full.png")}(t,a)}),a.addEventListener("click",()=>{0==e.volume?(r.value=50,e.volume=.5,a.setAttribute("src","icons/volume_icon_half.png")):(r.value=0,e.volume=0,a.setAttribute("src","icons/volume_icon_off.png"))}),c.addEventListener("click",()=>{u.style.display="flex",l.style.display="none",i.setAttribute("data-active",0)}),o.addEventListener("click",()=>{320==o.getAttribute("data-quality")?(o.setAttribute("src","icons/bitrate_left.png"),e.setAttribute("src","https://myradio24.org/vinila_128"),e.play(),o.setAttribute("data-quality",128)):(o.setAttribute("src","icons/bitrate_right.png"),e.setAttribute("src","https://myradio24.org/vinila"),e.play(),o.setAttribute("data-quality",320))});const y=new(window.AudioContext||window.webkitAudioContext);function p(e){const t=y.createBiquadFilter();return t.type="peaking",t.frequency.value=e,t.Q.value=1,t.gain.value=0,t}i.addEventListener("click",()=>{0==i.getAttribute("data-active")?(u.style.display="none",l.style.display="flex",i.style.backgroundImage="url(icons/btn_eq_on.png)",i.setAttribute("data-active",1)):1==i.getAttribute("data-active")?(s.forEach(e=>{e.value=0}),i.style.backgroundImage="url(icons/btn_eq_off.png)",i.setAttribute("data-active",2)):(u.style.display="flex",l.style.display="none",i.setAttribute("data-active",0))}),function(e){const t=y.createMediaElementSource(e),n=function(){let e;return e=[32,64,125,250,500,1e3,2e3,4e3,8e3,14e3].map(p),e.reduce((function(e,t){return e.connect(t),t})),e}();e.onplay=e=>{y.resume()},e.addEventListener("play",()=>y.resume()),t.connect(n[0]),n[n.length-1].connect(y.destination),s.forEach((e,t)=>{e.addEventListener("change",e=>{n[t].gain.value=e.target.value})})}(e),document.querySelector("button").addEventListener("click",(function(){y.resume().then(()=>{console.log("Playback resumed successfully")})}));setInterval(()=>{let e=new Date,t=e.getUTCHours()+3;document.querySelector(".player__live-time").innerHTML=(t>24?"0":"")+(t>24?t-24:t)+":"+(e.getMinutes()<10?"0":"")+e.getMinutes()},1e3)})}]);