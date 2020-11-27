// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/modal-form.js":[function(require,module,exports) {
/* --------MODAL window open/close------------- */
var refs = {
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  backdrop: document.querySelector("[data-backdrop]")
};

if (refs.openModalBtn) {
  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.backdrop.addEventListener('click', onBackdropClick);
}

;

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    toggleModal();
  }

  ;
}

;

function toggleModal() {
  !refs.backdrop.classList.contains("is-open") ? window.addEventListener('keydown', onPressEscape) : window.removeEventListener('keydown', onPressEscape);
  refs.backdrop.classList.toggle("is-open");
}

;

function onPressEscape(event) {
  if (event.code === 'Escape') {
    toggleModal();
  }

  ;
}

;
/* add focus on modal */

var modalRef = document.querySelector('[data-modal]');
refs.openModalBtn.addEventListener('click', modalFocus);

function modalFocus() {
  modalRef.focus();
  modalRef.style.outline = 'none';
}
/* CHECKBOX-icon in modal add attribute CHECKED */


var checkboxIconRef = document.querySelector('[data-checkbox-icon] svg');
var checkboxInputRef = document.querySelector('[data-checkbox-input]');
var checkboxLabelRef = document.querySelector('[data-checkbox-label]');
checkboxIconRef.addEventListener('focus', addEventListenerAddChecked());
checkboxLabelRef.addEventListener('click', function (event) {
  return event.preventDefault();
});
checkboxLabelRef.addEventListener('click', byClickChecked);

function addEventListenerAddChecked() {
  window.addEventListener('keydown', onPressEnterAdd);
}

;

function onPressEnterAdd(event) {
  if (event.target.classList.contains('checkbox-icon') && event.code === 'Enter') {
    checkboxInputRef.setAttribute('checked', '');
    checkboxIconRef.classList.add('checked');
    window.removeEventListener('keydown', onPressEnterAdd);
    window.addEventListener('keydown', onPressEnterRemove);
  }
}

;

function onPressEnterRemove(event) {
  if (event.target.classList.contains('checkbox-icon') && event.code === 'Enter') {
    checkboxInputRef.removeAttribute('checked');
    checkboxIconRef.classList.remove('checked');
    window.removeEventListener('keydown', onPressEnterRemove);
    addEventListenerAddChecked();
  }
}

;

function byClickChecked(event) {
  if (event.target.classList.contains('form__text-checkbox') || event.target.classList.contains('checkbox-icon')) {
    if (checkboxInputRef.hasAttribute('checked')) {
      checkboxInputRef.removeAttribute('checked');
      checkboxIconRef.classList.remove('checked');
      addEventListenerAddChecked();
    } else {
      checkboxInputRef.setAttribute('checked', '');
      checkboxIconRef.classList.add('checked');
      window.addEventListener('keydown', onPressEnterRemove);
    }

    ;
  }

  ;
}

;
/* ========================================= */

/* --------FORM in modal window------------- */

var formModalRef = document.querySelector('[data-form-modal]');

var takeFormData = function takeFormData(event) {
  event.preventDefault(); //забороняє браузеру відправляти форму при натисканні кнопки
  // console.dir(event.target.elements); //так можна отримати доступ до елементів форми

  var formRef = event.target; // тут міститься посилання на форму

  /* -------------- */

  var formInputArray = formRef.querySelectorAll('input');
  var checked = true;
  formInputArray.forEach(function (input) {
    if (!input.hasAttribute('checked')) {
      input.style.borderColor = '#d41443';

      if (input.getAttribute('type') === 'checkbox') {
        var _checkboxIconRef = formRef.querySelector('.checkbox-icon');

        _checkboxIconRef.classList.add('border-not-checked');
      }

      ;
      checked = false;
    }
  });

  if (!checked) {
    console.log('not all inputs checked');
    return;
  }

  ;
  /* -------------- */

  var formData = new FormData(formRef); //створюємо новий об'єкт

  var submittedData = {}; //об'єкт для збору даних з форми, який надішлеться на бекенд

  formData.forEach(function (value, key) {
    //цей об'єкт просто має ф-цію форіч і дані інпутів у вигляді value та key = name інпута
    submittedData[key] = value; //записуємо дані в об'єкт
  });
  console.dir(submittedData); //показує в консолі обєкт з даними

  toggleModal(); // закриває форму

  formInputArray.forEach(function (input) {
    input.value = '';
    input.removeAttribute('checked');
  });
  /* --------видаляю все з чекбокса----------- */

  checkboxIconRef.classList.remove('border-not-checked');
  checkboxInputRef.removeAttribute('checked');
  checkboxIconRef.classList.remove('checked');
  window.removeEventListener('keydown', onPressEnterRemove);
  addEventListenerAddChecked();
  /* --------кінець видаляю все з чекбокса----------- */
};

if (formModalRef) {
  formModalRef.addEventListener('submit', takeFormData);
}

;
/* --------------------- */

/* ---------перевірка заповнення INPUT в модалці------------ */

var modalInputArray = document.querySelectorAll('[data-form-modal] input');

var checkedInput = function checkedInput(event) {
  var pattern;

  if (event.target.name === "name") {
    pattern = /^[a-zA-ZА-Яа-яЁё\s]+$/;
  }

  if (event.target.name === "tel") {
    pattern = /^[0-9]{9,12}(\s*)?$/;
  }

  if (event.target.name === "email") {
    pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/;
  }

  if (!pattern.test(event.target.value)) {
    event.target.style.outlineColor = '#d41443';
    event.target.removeAttribute('checked');
  } else {
    event.target.style.outlineColor = 'inherit';
    event.target.style.borderColor = 'rgba(33, 33, 33, 0.2)';
    event.target.setAttribute('checked', '');
  }
};

modalInputArray.forEach(function (input) {
  return input.addEventListener('input', _.debounce(checkedInput, 500));
});
/* ----------------------------- */
// const labelRef = document.querySelector('label');
// labelRef.addEventListener('click', (e) => {
//   e.preventDefault();
//   console.log(e.preventDefault());
// });
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52314" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/modal-form.js"], null)
//# sourceMappingURL=/modal-form.40274c32.js.map