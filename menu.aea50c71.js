parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"i0CD":[function(require,module,exports) {
var e=document.querySelector("[data-menu-button]"),t=document.querySelector("[data-menu-block]"),n=document.querySelector("[data-header-container]"),o=window.innerHeight,r=document.querySelector("body");r.classList.add("mobile-menu-close");var i=function(){var i=t.getBoundingClientRect().height,a=n.getBoundingClientRect().height;i===o?(n.removeAttribute("style"),t.removeAttribute("style")):(t.style.height="".concat(o,"px"),t.style.paddingTop="60px",n.style.height="".concat(a,"px"));var l="true"===e.getAttribute("aria-expanded")||!1;e.setAttribute("aria-expanded",!l),r.classList.toggle("mobile-menu-open"),r.classList.toggle("mobile-menu-close");var c=t.parentNode;if(c.classList.contains("container")){var s=document.createElement("div");s.classList.add("wrapper"),s.appendChild(t),c.appendChild(s),setTimeout(function(){return s.classList.add("animate")},250),s.addEventListener("click",function(e){e.target===e.currentTarget&&(r.classList.toggle("mobile-menu-open"),r.classList.toggle("mobile-menu-close"),n.removeAttribute("style"),t.removeAttribute("style"),c.appendChild(t),document.querySelector(".wrapper").remove())})}else{var d=document.querySelector(".wrapper");c.parentNode.appendChild(t),d.remove()}},a=function(){if(window.innerWidth>=1200&&r.classList.contains("mobile-menu-open")){r.classList.toggle("mobile-menu-open"),r.classList.toggle("mobile-menu-close"),t.removeAttribute("style"),n.removeAttribute("style");var e=t.parentNode;if(e.classList.contains("wrapper"))e.parentNode.appendChild(t),e.remove()}};e.addEventListener("click",i),window.addEventListener("resize",_.throttle(a,500));var l=document.querySelectorAll("[data-menu-block] .link"),c=function(){window.innerWidth<768&&r.classList.contains("mobile-menu-open")&&i()},s=function(e){e.forEach(function(e){return e.addEventListener("click",c)})};s(l);var d=document.querySelectorAll('a[href*="#"]'),u=function(e){e.preventDefault();var t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth",block:"start"})};d.forEach(function(e){e.addEventListener("click",u)});
},{}]},{},["i0CD"], null)
//# sourceMappingURL=/team-project-HTML-CSS/menu.aea50c71.js.map